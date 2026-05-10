import dotenv from "dotenv";
import formidable from "formidable";
import fs from "fs";
import { parse } from "csv-parse";

dotenv.config();

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (req) => {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

const cleanKey = (key) => key.replace(/^\uFEFF/, "");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;

    const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

    const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION;

    const { files } = await parseForm(req);

    const rawFile = files.file;

    const file = Array.isArray(rawFile) ? rawFile[0] : rawFile;

    if (!file?.filepath) {
      return res.status(400).json({
        success: false,
        message: "Không có file CSV",
      });
    }

    // =========================================
    // READ CSV
    // =========================================

    const rows = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(file.filepath)
        .pipe(
          parse({
            columns: true,
            trim: true,
          }),
        )
        .on("data", (row) => rows.push(row))
        .on("end", resolve)
        .on("error", reject);
    });

    const cleanedRows = rows.map((row) => {
      const newRow = {};

      for (const key in row) {
        newRow[cleanKey(key)] = row[key];
      }

      return newRow;
    });

    // =========================================
    // SHOPIFY FETCH
    // =========================================

    const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

    const shopifyFetch = async (query, variables = {}) => {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.errors) {
        throw {
          status: 500,
          message: "Lỗi Shopify API",
          errors: data.errors || data,
        };
      }

      return data;
    };

    // =========================================
    // GET TAXONOMY CATEGORY ID
    // =========================================

    const getTaxonomyCategoryId = async (fullName) => {
      if (!fullName) return null;

      const query = `
        query SearchCategory($search: String!) {
          taxonomy {
            categories(
              first: 1,
              search: $search
            ) {
              edges {
                node {
                  id
                  fullName
                }
              }
            }
          }
        }
      `;

      try {
        const result = await shopifyFetch(query, {
          search: fullName,
        });

        return result?.data?.taxonomy?.categories?.edges?.[0]?.node?.id || null;
      } catch (err) {
        console.log("CATEGORY SEARCH ERROR", err);

        return null;
      }
    };

    // =========================================
    // GET LOCATION
    // =========================================

    const locationQuery = `
      query {
        locations(first: 10) {
          edges {
            node {
              id
              name
              isActive
            }
          }
        }
      }
    `;

    const locationResult = await shopifyFetch(locationQuery);

    const locations =
      locationResult?.data?.locations?.edges?.map((e) => e.node) || [];

    const activeLocation = locations.find((x) => x.isActive) || locations[0];

    const locationId = activeLocation?.id;

    if (!locationId) {
      return res.status(400).json({
        success: false,
        message: "Không tìm thấy Shopify location",
      });
    }

    const results = [];

    const errors = [];

    // =========================================
    // LOOP PRODUCTS
    // =========================================

    for (const row of cleanedRows) {
      try {
        const title = row.title?.trim();

        const price = Number(row.price || 0);

        const stock = Number(row.stock || 0);

        const description = row.description || "";

        const image = row.image || "";

        const collectionHandle = row.collectionHandle || "";

        // IMPORTANT
        // dùng categoryName
        // KHÔNG dùng categoryId

        const categoryName = row.categoryName || "";

        let categoryId = null;

        if (categoryName) {
          categoryId = await getTaxonomyCategoryId(categoryName);

          console.log("CATEGORY NAME:", categoryName);

          console.log("CATEGORY ID:", categoryId);
        }

        if (!title) {
          errors.push({
            row,
            errors: [
              {
                message: "Thiếu title",
              },
            ],
          });

          continue;
        }

        // =========================================
        // CREATE PRODUCT
        // =========================================

        const createMutation = `
          mutation ProductCreate(
            $product: ProductCreateInput!,
            $media: [CreateMediaInput!]
          ) {
            productCreate(
              product: $product,
              media: $media
            ) {
              product {
                id
                title
                handle
                status
                descriptionHtml

                category {
                  id
                  name
                  fullName
                }

                featuredImage {
                  url
                  altText
                }

                variants(first: 10) {
                  edges {
                    node {
                      id
                      title
                      price

                      inventoryItem {
                        id
                        tracked
                      }
                    }
                  }
                }
              }

              userErrors {
                field
                message
              }
            }
          }
        `;

        const createResult = await shopifyFetch(createMutation, {
          product: {
            title,

            descriptionHtml: description,

            status: "ACTIVE",

            ...(categoryId && {
              category: categoryId,
            }),
          },

          media: image
            ? [
                {
                  originalSource: image,

                  mediaContentType: "IMAGE",

                  alt: title,
                },
              ]
            : [],
        });

        console.log("CREATE RESULT", JSON.stringify(createResult, null, 2));

        const payload = createResult?.data?.productCreate;

        if (payload?.userErrors?.length > 0) {
          errors.push({
            title,
            row,
            errors: payload.userErrors,
          });

          continue;
        }

        let product = payload.product;

        const variantNode = product.variants?.edges?.[0]?.node;

        const variantId = variantNode?.id;

        const inventoryItemId = variantNode?.inventoryItem?.id;

        // =========================================
        // UPDATE PRICE
        // =========================================

        if (variantId) {
          const updatePriceMutation = `
            mutation ProductVariantsBulkUpdate(
              $productId: ID!,
              $variants: [ProductVariantsBulkInput!]!
            ) {
              productVariantsBulkUpdate(
                productId: $productId,
                variants: $variants
              ) {
                userErrors {
                  field
                  message
                }
              }
            }
          `;

          const priceResult = await shopifyFetch(updatePriceMutation, {
            productId: product.id,

            variants: [
              {
                id: variantId,

                price: String(price),
              },
            ],
          });

          const priceErrors =
            priceResult?.data?.productVariantsBulkUpdate?.userErrors || [];

          if (priceErrors.length > 0) {
            errors.push({
              title,
              row,
              errors: priceErrors,
            });
          }
        }

        // =========================================
        // ENABLE INVENTORY TRACKING
        // =========================================

        if (inventoryItemId) {
          const trackingMutation = `
            mutation InventoryItemUpdate(
              $id: ID!,
              $input: InventoryItemInput!
            ) {
              inventoryItemUpdate(
                id: $id,
                input: $input
              ) {
                inventoryItem {
                  id
                  tracked
                }

                userErrors {
                  field
                  message
                }
              }
            }
          `;

          await shopifyFetch(trackingMutation, {
            id: inventoryItemId,

            input: {
              tracked: true,
            },
          });
        }

        // =========================================
        // UPDATE STOCK
        // =========================================

        if (inventoryItemId && stock > 0) {
          const inventoryMutation = `
            mutation inventoryAdjustQuantities(
              $input: InventoryAdjustQuantitiesInput!
            ) {
              inventoryAdjustQuantities(
                input: $input
              ) {
                userErrors {
                  field
                  message
                }
              }
            }
          `;

          const inventoryResult = await shopifyFetch(inventoryMutation, {
            input: {
              reason: "correction",

              name: "available",

              changes: [
                {
                  inventoryItemId,

                  locationId,

                  delta: stock,
                },
              ],
            },
          });

          const inventoryErrors =
            inventoryResult?.data?.inventoryAdjustQuantities?.userErrors || [];

          if (inventoryErrors.length > 0) {
            errors.push({
              title,
              row,
              errors: inventoryErrors,
            });
          }
        }

        // =========================================
        // ADD COLLECTION
        // =========================================

        let collection = null;

        if (collectionHandle) {
          const collectionQuery = `
            query GetCollection($handle: String!) {
              collectionByHandle(
                handle: $handle
              ) {
                id
                title
                handle
              }
            }
          `;

          const collectionResult = await shopifyFetch(collectionQuery, {
            handle: collectionHandle,
          });

          const collectionData = collectionResult?.data?.collectionByHandle;

          if (collectionData?.id) {
            const addCollectionMutation = `
              mutation CollectionAddProducts(
                $id: ID!,
                $productIds: [ID!]!
              ) {
                collectionAddProducts(
                  id: $id,
                  productIds: $productIds
                ) {
                  userErrors {
                    field
                    message
                  }
                }
              }
            `;

            await shopifyFetch(addCollectionMutation, {
              id: collectionData.id,

              productIds: [product.id],
            });

            collection = {
              id: collectionData.id,

              title: collectionData.title,

              handle: collectionData.handle,
            };
          }
        }

        // =========================================
        // RESULT
        // =========================================

        results.push({
          id: product.id,

          title: product.title,

          category: product.category || null,

          collection,
        });
      } catch (err) {
        console.log("IMPORT ERROR", err);

        errors.push({
          row,

          errors: err.errors || [
            {
              message: err.message,
            },
          ],
        });
      }
    }

    return res.status(200).json({
      success: true,

      message: "Import hoàn tất",

      successCount: results.length,

      errorCount: errors.length,

      products: results,

      errors,
    });
  } catch (error) {
    console.log(error);

    return res.status(error.status || 500).json({
      success: false,

      message: error.message || "Import lỗi",

      errors: error.errors,
    });
  }
}

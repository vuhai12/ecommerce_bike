import dotenv from "dotenv";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

const getFieldValue = (value) => {
  if (Array.isArray(value)) return value[0];
  return value;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
  const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
  const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION;

  try {
    const { fields, files } = await parseForm(req);

    const title = getFieldValue(fields.title);
    const price = getFieldValue(fields.price);
    const stock = getFieldValue(fields.stock) || 0;
    const description = getFieldValue(fields.description) || "";
    const collectionHandle = getFieldValue(fields.collectionHandle);

    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

    if (!title || price === undefined || price === "") {
      return res.status(400).json({
        success: false,
        message: "Thiếu title hoặc price",
      });
    }

    if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ADMIN_TOKEN) {
      return res.status(500).json({
        success: false,
        message: "Thiếu SHOPIFY_STORE_DOMAIN hoặc SHOPIFY_ADMIN_TOKEN",
      });
    }

    let imageUrl = "";

    if (imageFile?.filepath) {
      const uploadResult = await cloudinary.uploader.upload(
        imageFile.filepath,
        {
          folder: "shopify-products",
          resource_type: "image",
        },
      );

      imageUrl = uploadResult.secure_url;
    }

    const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

    const shopifyFetch = async (query, variables = {}) => {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
      });

      const data = await response.json();

      if (!response.ok || data.errors) {
        throw {
          status: 500,
          message: "Lỗi khi gọi Shopify Admin API",
          errors: data.errors || data,
        };
      }

      return data;
    };

    // 1. Lấy location
    const getLocationsQuery = `
      query GetLocations {
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

    const locationResult = await shopifyFetch(getLocationsQuery);

    const locations =
      locationResult?.data?.locations?.edges?.map((item) => ({
        id: item.node.id,
        name: item.node.name,
        isActive: item.node.isActive,
      })) || [];

    const activeLocation = locations.find((item) => item.isActive);
    const locationId = activeLocation?.id || locations[0]?.id;

    if (!locationId) {
      return res.status(400).json({
        success: false,
        message: "Không tìm thấy Shopify location để set stock",
      });
    }

    // 2. Tạo product
    const productCreateMutation = `
      mutation ProductCreate($input: ProductInput!, $media: [CreateMediaInput!]) {
        productCreate(input: $input, media: $media) {
          product {
            id
            title
            handle
            status
            descriptionHtml
            featuredImage {
              url
              altText
            }
            priceRangeV2 {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price
                  inventoryQuantity
                  inventoryItem {
                    id
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

    const mediaInput = imageUrl
      ? [
          {
            originalSource: imageUrl,
            mediaContentType: "IMAGE",
            alt: title,
          },
        ]
      : [];

    const createResult = await shopifyFetch(productCreateMutation, {
      input: {
        title,
        descriptionHtml: description,
        status: "ACTIVE",
      },
      media: mediaInput,
    });

    const createPayload = createResult?.data?.productCreate;

    if (createPayload?.userErrors?.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Shopify từ chối tạo sản phẩm",
        errors: createPayload.userErrors,
      });
    }

    let product = createPayload.product;

    const variantNode = product.variants?.edges?.[0]?.node;
    const variantId = variantNode?.id;

    const inventoryItemId = variantNode?.inventoryItem?.id;

    if (inventoryItemId) {
      const enableTrackingMutation = `
    mutation InventoryItemUpdate($id: ID!, $input: InventoryItemInput!) {
      inventoryItemUpdate(id: $id, input: $input) {
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

      const trackingResult = await shopifyFetch(enableTrackingMutation, {
        id: inventoryItemId,
        input: {
          tracked: true,
        },
      });
    }

    // 3. Update price
    if (variantId) {
      const updateVariantMutation = `
        mutation ProductVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
          productVariantsBulkUpdate(productId: $productId, variants: $variants) {
            product {
              id
              priceRangeV2 {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price
                    inventoryQuantity
                    inventoryItem {
                      id
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

      const variantResult = await shopifyFetch(updateVariantMutation, {
        productId: product.id,
        variants: [
          {
            id: variantId,
            price: String(price),
          },
        ],
      });

      const variantPayload = variantResult?.data?.productVariantsBulkUpdate;

      if (variantPayload?.userErrors?.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Shopify từ chối cập nhật giá sản phẩm",
          errors: variantPayload.userErrors,
        });
      }

      product = {
        ...product,
        priceRangeV2: variantPayload.product.priceRangeV2,
        variants: variantPayload.product.variants,
      };
    }

    // 4. Update stock thật
    const updatedVariantNode = product.variants?.edges?.[0]?.node;
    const updatedInventoryItemId = updatedVariantNode?.inventoryItem?.id;
    const currentInventory = updatedVariantNode?.inventoryQuantity || 0;
    const targetStock = Number(stock || 0);
    const delta = targetStock - currentInventory;

    const inventorySetMutation = `
  mutation InventorySetQuantities(
    $input: InventorySetQuantitiesInput!,
    $idempotencyKey: String!
  ) {
    inventorySetQuantities(input: $input)
      @idempotent(key: $idempotencyKey) {
      inventoryAdjustmentGroup {
        createdAt
        reason
        changes {
          name
          delta
          quantityAfterChange
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

    if (updatedInventoryItemId && delta !== 0) {
      const inventoryResult = await shopifyFetch(inventorySetMutation, {
        input: {
          name: "available",
          reason: "correction",
          quantities: [
            {
              inventoryItemId: updatedInventoryItemId, // 👈 dùng biến mới
              locationId,
              quantity: targetStock,
              changeFromQuantity: currentInventory,
            },
          ],
        },
        idempotencyKey: `set-stock-${updatedInventoryItemId}-${Date.now()}`,
      });
    }

    // 5. Add collection
    let category = null;

    if (collectionHandle) {
      const getCollectionQuery = `
        query GetCollection($handle: String!) {
          collectionByIdentifier(identifier: { handle: $handle }) {
            id
            title
            handle
          }
        }
      `;

      const collectionResult = await shopifyFetch(getCollectionQuery, {
        handle: collectionHandle,
      });

      const collection = collectionResult?.data?.collectionByIdentifier;

      if (collection?.id) {
        const addToCollectionMutation = `
          mutation CollectionAddProducts($id: ID!, $productIds: [ID!]!) {
            collectionAddProducts(id: $id, productIds: $productIds) {
              collection {
                id
                title
                handle
              }
              userErrors {
                field
                message
              }
            }
          }
        `;

        const addCollectionResult = await shopifyFetch(
          addToCollectionMutation,
          {
            id: collection.id,
            productIds: [product.id],
          },
        );

        const addCollectionPayload =
          addCollectionResult?.data?.collectionAddProducts;

        if (addCollectionPayload?.userErrors?.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Shopify từ chối thêm sản phẩm vào collection",
            errors: addCollectionPayload.userErrors,
          });
        }

        category = {
          id: collection.id,
          title: collection.title,
          handle: collection.handle,
        };
      }
    }

    console.log("inventoryItemId:", updatedInventoryItemId);
    console.log("locationId:", locationId);

    return res.status(200).json({
      success: true,
      message: "Tạo sản phẩm thành công",
      cloudinaryImageUrl: imageUrl,
      product: {
        id: product.id,
        title: product.title,
        handle: product.handle,
        status: product.status,
        descriptionHtml: product.descriptionHtml,
        category,
        image: product.featuredImage?.url || imageUrl || "",
        altText: product.featuredImage?.altText || "",
        price: Number(
          product.priceRangeV2?.minVariantPrice?.amount || price || 0,
        ),
        stock: targetStock,
        currencyCode: product.priceRangeV2?.minVariantPrice?.currencyCode || "",
        variants:
          product.variants?.edges?.map((item) => ({
            id: item.node.id,
            title: item.node.title,
            price: Number(item.node.price || 0),
            inventoryQuantity:
              item.node.id === variantId
                ? targetStock
                : item.node.inventoryQuantity,
            inventoryItemId: item.node.inventoryItem?.id,
          })) || [],
      },
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Server error",
      errors: error.errors,
    });
  }
}

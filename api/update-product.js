// /api/update-product.js
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

    const id = getFieldValue(fields.id);
    const title = getFieldValue(fields.title);
    const description = getFieldValue(fields.description) || "";
    const collectionHandle = getFieldValue(fields.collectionHandle);
    const price = getFieldValue(fields.price);
    const stock = getFieldValue(fields.stock) || 0;

    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Thiếu product id",
      });
    }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Thiếu title",
      });
    }

    if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ADMIN_TOKEN) {
      return res.status(500).json({
        success: false,
        message: "Thiếu SHOPIFY_STORE_DOMAIN hoặc SHOPIFY_ADMIN_TOKEN",
      });
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

    const productUpdateMutation = `
      mutation ProductUpdate($input: ProductInput!, $media: [CreateMediaInput!]) {
        productUpdate(input: $input, media: $media) {
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

    const productInput = {
      id,
      title,
      descriptionHtml: description,
      status: "ACTIVE",
    };

    const mediaInput = imageUrl
      ? [
          {
            originalSource: imageUrl,
            mediaContentType: "IMAGE",
            alt: title,
          },
        ]
      : [];

    const updateResult = await shopifyFetch(productUpdateMutation, {
      input: productInput,
      media: mediaInput,
    });

    const payload = updateResult?.data?.productUpdate;

    if (payload?.userErrors?.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Shopify từ chối cập nhật sản phẩm",
        errors: payload.userErrors,
      });
    }

    let product = payload.product;

    // Update price cho default variant nếu có price
    if (price !== undefined && price !== "") {
      const variantId = product.variants?.edges?.[0]?.node?.id;

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
    }

    // Nếu muốn đổi collection
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

        await shopifyFetch(addToCollectionMutation, {
          id: collection.id,
          productIds: [product.id],
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Cập nhật sản phẩm thành công",
      cloudinaryImageUrl: imageUrl,
      product: {
        id: product.id,
        title: product.title,
        handle: product.handle,
        status: product.status,
        descriptionHtml: product.descriptionHtml,
        image: product.featuredImage?.url || imageUrl || "",
        altText: product.featuredImage?.altText || "",
        price: Number(
          product.priceRangeV2?.minVariantPrice?.amount || price || 0,
        ),
        stock: Number(getFieldValue(fields.stock) || 0),
        currencyCode: product.priceRangeV2?.minVariantPrice?.currencyCode || "",
        variants:
          product.variants?.edges?.map((item) => ({
            id: item.node.id,
            title: item.node.title,
            price: Number(item.node.price || 0),
            inventoryQuantity: item.node.inventoryQuantity,
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

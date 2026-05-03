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
  cloud_name: "dlpzfjgbd",
  api_key: "843789176218748",
  api_secret: "UaoKqy2oSlSiw78I4rQiuSremCw",
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

  try {
    const { fields, files } = await parseForm(req);

    const title = getFieldValue(fields.title);
    const price = getFieldValue(fields.price);
    const stock = getFieldValue(fields.stock) || 0;
    const description = getFieldValue(fields.description) || "";
    const categoryHandle = getFieldValue(fields.categoryHandle);

    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

    if (!title || price === undefined || price === "") {
      return res.status(400).json({
        success: false,
        message: "Thiếu title hoặc price",
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

      const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
      const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
      const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION;
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
      title,
      descriptionHtml: description,
      status: "ACTIVE",
      variants: [
        {
          price: String(price),
          inventoryQuantities: [
            {
              availableQuantity: Number(stock || 0),
              locationId,
            },
          ],
        },
      ],
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

    const createResult = await shopifyFetch(productCreateMutation, {
      input: productInput,
      media: mediaInput,
    });

    const payload = createResult?.data?.productCreate;

    if (payload?.userErrors?.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Shopify từ chối tạo sản phẩm",
        errors: payload.userErrors,
      });
    }

    const product = payload.product;

    if (categoryHandle) {
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
        handle: categoryHandle,
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
      message: "Tạo sản phẩm thành công",
      cloudinaryImageUrl: imageUrl,
      product: {
        id: product.id,
        title: product.title,
        handle: product.handle,
        status: product.status,
        descriptionHtml: product.descriptionHtml,
        image: product.featuredImage?.url || imageUrl || "",
        altText: product.featuredImage?.altText || "",
        price: Number(product.priceRangeV2?.minVariantPrice?.amount || 0),
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

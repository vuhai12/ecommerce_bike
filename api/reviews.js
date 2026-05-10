import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
  const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
  const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION;

  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ADMIN_TOKEN) {
    return res.status(500).json({
      success: false,
      message: "Thiếu biến môi trường Shopify",
    });
  }

  async function shopifyGraphQL(query, variables = {}) {
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
      },
    );

    const json = await response.json();

    if (!response.ok || json.errors) {
      throw new Error(JSON.stringify(json.errors || json));
    }

    return json.data;
  }

  function normalizeReviewNode(node) {
    const getField = (key) =>
      node.fields?.find((f) => f.key === key)?.value || "";

    return {
      id: node.id,
      handle: node.handle,
      productHandle: getField("product_handle"),
      customerName: getField("customer_name"),
      customerEmail: getField("customer_email"),
      rating: Number(getField("rating") || 0),
      content: getField("content"),
      createdAt: getField("created_at"),
    };
  }

  async function debugMetaobjectDefinitions() {
    const query = `
      query GetMetaobjectDefinitions {
        metaobjectDefinitions(first: 50) {
          nodes {
            name
            type
            fieldDefinitions {
              key
              name
            }
          }
        }
      }
    `;

    const data = await shopifyGraphQL(query);

    return data?.metaobjectDefinitions?.nodes || [];
  }

  try {
    if (req.method === "POST") {
      const { productHandle, customerName, customerEmail, rating, content } =
        req.body || {};

      console.log("POST /api/reviews body:", {
        productHandle,
        customerName,
        customerEmail,
        rating,
        content,
      });

      if (!productHandle || !rating || !content?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Thiếu productHandle, rating hoặc content",
        });
      }

      const numericRating = Number(rating);

      if (
        !Number.isInteger(numericRating) ||
        numericRating < 1 ||
        numericRating > 5
      ) {
        return res.status(400).json({
          success: false,
          message: "rating phải là số nguyên từ 1 đến 5",
        });
      }

      const definitions = await debugMetaobjectDefinitions();

      const reviewDefinition = definitions.find(
        (item) => item.type === "custom_product_review",
      );

      if (!reviewDefinition) {
        return res.status(400).json({
          success: false,
          message:
            'API không tìm thấy metaobject definition type "custom_product_review"',
          availableDefinitions: definitions.map((item) => ({
            name: item.name,
            type: item.type,
          })),
        });
      }

      const reviewFieldKeys =
        reviewDefinition.fieldDefinitions?.map((f) => f.key) || [];

      const requiredFields = [
        "product_handle",
        "customer_name",
        "customer_email",
        "rating",
        "content",
        "created_at",
      ];

      const missingFields = requiredFields.filter(
        (key) => !reviewFieldKeys.includes(key),
      );

      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Metaobject definition thiếu field cần thiết",
          missingFields,
          existingFields: reviewFieldKeys,
        });
      }

      // Tìm product theo handle
      const getProductQuery = `
        query GetProducts($query: String!) {
          products(first: 1, query: $query) {
            nodes {
              id
              handle
              title
            }
          }
        }
      `;

      const productData = await shopifyGraphQL(getProductQuery, {
        query: `handle:${productHandle}`,
      });

      const product = productData?.products?.nodes?.[0];

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy sản phẩm theo handle",
        });
      }

      // Tạo review metaobject
      const createReviewMutation = `
        mutation CreateReview($metaobject: MetaobjectCreateInput!) {
          metaobjectCreate(metaobject: $metaobject) {
            metaobject {
              id
              handle
              type
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const createReviewVariables = {
        metaobject: {
          type: "custom_product_review",
          fields: [
            { key: "product_handle", value: productHandle },
            { key: "customer_name", value: customerName || "" },
            { key: "customer_email", value: customerEmail || "" },
            { key: "rating", value: String(numericRating) },
            { key: "content", value: content.trim() },
            { key: "created_at", value: new Date().toISOString() },
          ],
        },
      };

      const createReviewData = await shopifyGraphQL(
        createReviewMutation,
        createReviewVariables,
      );

      const createPayload = createReviewData.metaobjectCreate;

      if (createPayload.userErrors?.length) {
        return res.status(400).json({
          success: false,
          message: "Shopify từ chối tạo review metaobject",
          errors: createPayload.userErrors,
        });
      }

      // Lấy tất cả review để tính summary
      const getReviewsQuery = `
        query GetReviews($type: String!) {
          metaobjects(type: $type, first: 100) {
            nodes {
              id
              handle
              fields {
                key
                value
              }
            }
          }
        }
      `;

      const allReviewsData = await shopifyGraphQL(getReviewsQuery, {
        type: "custom_product_review",
      });

      const productReviews = (allReviewsData.metaobjects?.nodes || [])
        .map(normalizeReviewNode)
        .filter((item) => item.productHandle === productHandle);

      const reviewCount = productReviews.length;
      const averageRating =
        reviewCount > 0
          ? Number(
              (
                productReviews.reduce((sum, item) => sum + item.rating, 0) /
                reviewCount
              ).toFixed(1),
            )
          : 0;

      // Update product metafields summary
      const setMetafieldsMutation = `
        mutation SetReviewSummary($metafields: [MetafieldsSetInput!]!) {
          metafieldsSet(metafields: $metafields) {
            metafields {
              namespace
              key
              value
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const metafieldsVariables = {
        metafields: [
          {
            ownerId: product.id,
            namespace: "custom",
            key: "average_rating",
            type: "number_decimal",
            value: String(averageRating),
          },
          {
            ownerId: product.id,
            namespace: "custom",
            key: "review_count",
            type: "number_integer",
            value: String(reviewCount),
          },
        ],
      };

      const metafieldsData = await shopifyGraphQL(
        setMetafieldsMutation,
        metafieldsVariables,
      );

      const metafieldErrors = metafieldsData.metafieldsSet?.userErrors || [];

      if (metafieldErrors.length) {
        return res.status(400).json({
          success: false,
          message: "Shopify từ chối cập nhật metafield summary",
          errors: metafieldErrors,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Tạo review thành công",
        review: createPayload.metaobject,
        summary: {
          averageRating,
          reviewCount,
        },
      });
    }

    if (req.method === "GET") {
      const { productHandle } = req.query || {};

      if (!productHandle) {
        return res.status(400).json({
          success: false,
          message: "Thiếu productHandle",
        });
      }

      const getReviewsQuery = `
        query GetReviews($type: String!) {
          metaobjects(type: $type, first: 100) {
            nodes {
              id
              handle
              fields {
                key
                value
              }
            }
          }
        }
      `;

      const reviewsData = await shopifyGraphQL(getReviewsQuery, {
        type: "custom_product_review",
      });

      const reviews = (reviewsData.metaobjects?.nodes || [])
        .map(normalizeReviewNode)
        .filter((item) => item.productHandle === productHandle)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      const reviewCount = reviews.length;
      const averageRating =
        reviewCount > 0
          ? Number(
              (
                reviews.reduce((sum, item) => sum + item.rating, 0) /
                reviewCount
              ).toFixed(1),
            )
          : 0;

      return res.status(200).json({
        success: true,
        reviews,
        summary: {
          averageRating,
          reviewCount,
        },
      });
    }

    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  } catch (error) {
    console.error("reviews api error:", error);

    return res.status(500).json({
      success: false,
      message: "Lỗi server khi làm việc với Shopify review",
      error: error?.message || "Unknown error",
    });
  }
}

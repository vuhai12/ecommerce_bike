// /api/delete-product.js
import dotenv from "dotenv";

dotenv.config();

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
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Thiếu product id",
      });
    }

    if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ADMIN_TOKEN) {
      return res.status(500).json({
        success: false,
        message: "Thiếu SHOPIFY_STORE_DOMAIN hoặc SHOPIFY_ADMIN_TOKEN",
      });
    }

    const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

    const mutation = `
      mutation ProductDelete($input: ProductDeleteInput!) {
        productDelete(input: $input) {
          deletedProductId
          userErrors {
            field
            message
          }
        }
      }
    `;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          input: {
            id,
          },
        },
      }),
    });

    const data = await response.json();

    if (!response.ok || data.errors) {
      return res.status(500).json({
        success: false,
        message: "Lỗi khi gọi Shopify Admin API",
        errors: data.errors || data,
      });
    }

    const payload = data?.data?.productDelete;

    if (payload?.userErrors?.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Shopify từ chối xoá sản phẩm",
        errors: payload.userErrors,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Xoá sản phẩm thành công",
      deletedProductId: payload.deletedProductId,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
}

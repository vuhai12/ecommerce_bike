import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { cartId, lineIds } = req.body;

    if (
      !cartId ||
      !lineIds ||
      !Array.isArray(lineIds) ||
      lineIds.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Thiếu cartId hoặc lineIds",
      });
    }

    const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
    const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
    const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION;

    const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

    const mutation = `
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
            totalQuantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            lines(first: 100) {
              nodes {
                id
                quantity
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      handle
                      featuredImage {
                        url
                        altText
                      }
                    }
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

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          cartId,
          lineIds,
        },
      }),
    });

    const data = await response.json();

    const cart = data?.data?.cartLinesRemove?.cart;
    const errors = data?.data?.cartLinesRemove?.userErrors || [];
    const topErrors = data?.errors || [];

    if (topErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Lỗi khi gọi Shopify Storefront API",
        errors: topErrors,
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Xóa sản phẩm khỏi cart thất bại",
        errors,
      });
    }

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

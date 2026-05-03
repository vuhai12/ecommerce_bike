// /api/update-cart-lines.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { cartId, lines } = req.body;

    if (!cartId) {
      return res.status(400).json({
        success: false,
        message: "Thiếu cartId",
      });
    }

    if (!lines || !Array.isArray(lines) || lines.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Thiếu lines",
      });
    }

    const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
    const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
    const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION;

    const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

    const updateLinesQuery = `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            totalQuantity
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
                    product {
                      title
                      handle
                      featuredImage {
                        url
                        altText
                      }
                    }
                    price {
                      amount
                      currencyCode
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

    const updateResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: updateLinesQuery,
        variables: {
          cartId,
          lines,
        },
      }),
    });

    const updateData = await updateResponse.json();
    console.log("=== SHOPIFY RESPONSE ===");
    console.log(JSON.stringify(updateData, null, 2));

    console.log("=== REQUEST SEND ===");
    console.log("cartId:", cartId);
    console.log("lines:", JSON.stringify(lines, null, 2));

    const errors = updateData?.data?.cartLinesUpdate?.userErrors || [];

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Update cart thất bại",
        errors,
      });
    }

    return res.status(200).json({
      success: true,
      cart: updateData?.data?.cartLinesUpdate?.cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

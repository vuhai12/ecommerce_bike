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
    const { cartId, lines } = req.body;

    if (!lines || !Array.isArray(lines) || lines.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Thiếu lines",
      });
    }

    const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
    const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
    const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION;

    const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

    async function createNewCart() {
      const createCartQuery = `
    mutation cartCreate {
      cartCreate {
        cart {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

      const createCartResponse = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({
          query: createCartQuery,
        }),
      });

      const createCartData = await createCartResponse.json();

      const createdCart = createCartData?.data?.cartCreate?.cart;
      const createErrors = createCartData?.data?.cartCreate?.userErrors || [];

      if (!createdCart || createErrors.length > 0) {
        throw new Error(
          createErrors.map((e) => e.message).join(", ") || "Tạo cart thất bại",
        );
      }

      return createdCart.id;
    }

    let currentCartId = cartId;

    // =========================
    // BƯỚC 1: Nếu chưa có cartId thì tạo cart mới
    // =========================
    if (!currentCartId) {
      currentCartId = await createNewCart();
    }

    // =========================
    // BƯỚC 2: Lấy cart hiện tại
    // =========================
    // Mục đích:
    // - xem trong cart đã có sản phẩm nào rồi
    // - để biết món nào phải update, món nào phải add mới
    const getCartQuery = `
      query getCart($cartId: ID!) {
        cart(id: $cartId) {
          id
          checkoutUrl
          totalQuantity
          lines(first: 100) {
            nodes {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
    `;

    const getCartResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: getCartQuery,
        variables: {
          cartId: currentCartId,
        },
      }),
    });

    const getCartData = await getCartResponse.json();
    let currentCart = getCartData?.data?.cart;

    if (!currentCart) {
      currentCartId = await createNewCart();

      const retryGetCartResponse = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({
          query: getCartQuery,
          variables: {
            cartId: currentCartId,
          },
        }),
      });

      const retryGetCartData = await retryGetCartResponse.json();
      currentCart = retryGetCartData?.data?.cart;

      if (!currentCart) {
        return res.status(400).json({
          success: false,
          message: "Không thể tạo cart mới hợp lệ",
        });
      }
    }
    const existingLines = currentCart?.lines?.nodes || [];

    // =========================
    // BƯỚC 3: Chia lines thành 2 nhóm
    // =========================
    // - linesToUpdate: món đã có trong cart rồi -> tăng quantity
    // - linesToAdd: món chưa có -> add mới
    const linesToUpdate = [];
    const linesToAdd = [];

    for (const item of lines) {
      const existedLine = existingLines.find(
        (line) => line?.merchandise?.id === item.merchandiseId,
      );

      if (existedLine) {
        // Đã có trong cart rồi -> update bằng line.id
        linesToUpdate.push({
          id: existedLine.id,
          quantity: existedLine.quantity + item.quantity,
        });
      } else {
        // Chưa có trong cart -> add mới bằng merchandiseId
        linesToAdd.push({
          merchandiseId: item.merchandiseId,
          quantity: item.quantity,
        });
      }
    }

    // =========================
    // BƯỚC 4: Nếu có món cần update thì gọi cartLinesUpdate
    // =========================
    if (linesToUpdate.length > 0) {
      const updateLinesQuery = `
        mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
              id
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
            cartId: currentCartId,
            lines: linesToUpdate,
          },
        }),
      });

      const updateData = await updateResponse.json();
      const updateErrors = updateData?.data?.cartLinesUpdate?.userErrors || [];

      if (updateErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Update cart thất bại",
          errors: updateErrors,
        });
      }
    }

    // =========================
    // BƯỚC 5: Nếu có món cần add mới thì gọi cartLinesAdd
    // =========================
    if (linesToAdd.length > 0) {
      const addLinesQuery = `
        mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
              id
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const addResponse = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({
          query: addLinesQuery,
          variables: {
            cartId: currentCartId,
            lines: linesToAdd,
          },
        }),
      });

      const addData = await addResponse.json();
      const addErrors = addData?.data?.cartLinesAdd?.userErrors || [];

      if (addErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Add cart thất bại",
          errors: addErrors,
        });
      }
    }

    // =========================
    // BƯỚC 6: Lấy lại cart mới nhất để trả về frontend
    // =========================
    const finalCartResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: getCartQuery,
        variables: {
          cartId: currentCartId,
        },
      }),
    });

    const finalCartData = await finalCartResponse.json();
    const finalCart = finalCartData?.data?.cart;

    return res.status(200).json({
      success: true,
      cartId: currentCartId,
      cart: finalCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

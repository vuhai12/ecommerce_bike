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
    const {
      collectionHandle = "",
      tabKey = "best-seller",
      first = 8,
      minPrice,
      maxPrice,
    } = req.body || {};

    if (!tabKey) {
      return res.status(400).json({
        success: false,
        message: "Thiếu collectionHandle hoặc tabKey",
      });
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

    const tabMap = {
      "best-seller": {
        sortKey: "BEST_SELLING",
        reverse: false,
      },
      "price-asc": {
        sortKey: "PRICE",
        reverse: false,
      },
      "price-desc": {
        sortKey: "PRICE",
        reverse: true,
      },
      "new-arrival": {
        sortKey: "CREATED",
        reverse: true,
      },
    };

    const currentTab = tabMap[tabKey];

    if (!currentTab) {
      return res.status(400).json({
        success: false,
        message: "tabKey không hợp lệ",
      });
    }
    const isGetAllProducts = !collectionHandle;
    let query;
    let variables;

    if (isGetAllProducts) {
      query = `
    query GetAllProducts(
      $first: Int!,
      $sortKey: ProductSortKeys!,
      $reverse: Boolean!
    ) {
      products(first: $first, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            id
            title
            handle
            descriptionHtml
            collections(first: 5) {
              edges {
                node {
                  id
                  title
                  handle
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  inventoryQuantity
                }
              }
            }
            featuredImage {
              url
              altText
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRangeV2 {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            averageRating: metafield(namespace: "custom", key: "average_rating") {
              value
            }
            reviewCount: metafield(namespace: "custom", key: "review_count") {
              value
            }
          }
        }
      }
    }
  `;
      let sortKey = currentTab.sortKey;
      if (sortKey === "BEST_SELLING") {
        sortKey = "CREATED_AT"; // hoặc TITLE
      }

      variables = {
        first: Number(first),
        sortKey,
        reverse: currentTab.reverse,
      };
    } else {
      query = `
    query GetCollectionProducts(
      $handle: String!,
      $first: Int!,
      $sortKey: ProductCollectionSortKeys!,
      $reverse: Boolean!
    ) {
      collectionByIdentifier(identifier: { handle: $handle }) {
        id
        title
        handle
        products(first: $first, sortKey: $sortKey, reverse: $reverse) {
          edges {
            node {
              id
              title
              handle
              descriptionHtml
              collections(first: 5) {
                edges {
                  node {
                    id
                    title
                    handle
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    inventoryQuantity
                  }
                }
              }
              featuredImage {
                url
                altText
              }
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRangeV2 {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              averageRating: metafield(namespace: "custom", key: "average_rating") {
                value
              }
              reviewCount: metafield(namespace: "custom", key: "review_count") {
                value
              }
            }
          }
        }
      }
    }
  `;

      variables = {
        handle: collectionHandle,
        first: Number(first),
        sortKey: currentTab.sortKey,
        reverse: currentTab.reverse,
      };
    }

    // const query = `
    //       query GetCollectionProducts(
    //         $handle: String!,
    //         $first: Int!,
    //         $sortKey: ProductCollectionSortKeys!,
    //         $reverse: Boolean!
    //       ) {
    //         collectionByIdentifier(identifier: { handle: $handle }) {
    //           id
    //           title
    //           handle

    //           products(first: $first, sortKey: $sortKey, reverse: $reverse) {
    //             edges {
    //               node {
    //                 id
    //                 title
    //                 handle
    // descriptionHtml
    //                 collections(first: 5) {
    //     edges {
    //       node {
    //         id
    //         title
    //         handle
    //       }
    //     }
    //   }
    //                 variants(first: 1) {
    //     edges {
    //       node {
    //         inventoryQuantity
    //       }
    //     }
    //   }
    //                 featuredImage {
    //                   url
    //                   altText
    //                 }
    //                    images(first: 5) {
    //               edges {
    //                 node {
    //                   url
    //                   altText
    //                 }
    //               }
    //             }
    //                 priceRangeV2 {
    //                   minVariantPrice {
    //                     amount
    //                     currencyCode
    //                   }
    //                 }
    //                   averageRating: metafield(namespace: "custom", key: "average_rating") {
    //   value
    // }
    // reviewCount: metafield(namespace: "custom", key: "review_count") {
    //   value
    // }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     `;

    const shopifyRes = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      },
    );

    const result = await shopifyRes.json();

    if (!shopifyRes.ok || result.errors) {
      return res.status(500).json({
        success: false,
        message: "Lỗi khi gọi Shopify Admin API",
        errors: result.errors || result,
      });
    }

    // const collection = result?.data?.collectionByIdentifier;

    // if (!collection) {
    //   return res.status(404).json({
    //     success: false,
    //     message: `Không tìm thấy collection: ${collectionHandle}`,
    //   });
    // }
    let rawProducts = [];
    let collection = null;

    if (isGetAllProducts) {
      rawProducts = result?.data?.products?.edges || [];
    } else {
      collection = result?.data?.collectionByIdentifier;

      if (!collection) {
        return res.status(404).json({
          success: false,
          message: `Không tìm thấy collection: ${collectionHandle}`,
        });
      }

      rawProducts = collection?.products?.edges || [];
    }

    const products =
      rawProducts.map((item) => ({
        id: item.node.id,
        title: item.node.title,
        handle: item.node.handle,
        descriptionHtml: item.node.descriptionHtml || "",
        category: item.node.collections?.edges?.[0]
          ? {
              id: item.node.collections.edges[0].node.id,
              title: item.node.collections.edges[0].node.title,
              handle: item.node.collections.edges[0].node.handle,
            }
          : collection
            ? {
                id: collection.id,
                title: collection.title,
                handle: collection.handle,
              }
            : null,
        image: item.node.featuredImage?.url || "",
        altText: item.node.featuredImage?.altText || "",
        stock: item.node.variants?.edges?.[0]?.node?.inventoryQuantity || 0,
        images:
          item.node.images?.edges?.map((img) => ({
            url: img.node.url,
            altText: img.node.altText || "",
          })) || [],
        price: Number(item.node.priceRangeV2?.minVariantPrice?.amount || 0),
        currencyCode:
          item.node.priceRangeV2?.minVariantPrice?.currencyCode || "",
        averageRating: Number(item.node.averageRating?.value || 0),
        reviewCount: Number(item.node.reviewCount?.value || 0),
      })) || [];

    const hasPriceFilter =
      minPrice !== undefined &&
      minPrice !== null &&
      maxPrice !== undefined &&
      maxPrice !== null;

    const filteredProducts = hasPriceFilter
      ? products.filter((product) => {
          return (
            product.price >= Number(minPrice) &&
            product.price <= Number(maxPrice)
          );
        })
      : products;

    return res.status(200).json({
      success: true,
      collection: collection
        ? {
            id: collection.id,
            title: collection.title,
            handle: collection.handle,
          }
        : null,
      tabKey,
      products: filteredProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

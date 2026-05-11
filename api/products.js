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
      // SEARCH
      search = "",
      // SORT
      tabKey = "best-seller",
      // PAGINATION
      limit = 6,
      pageCurrent = 1,
      sortBy,
      sortOrder,
      // PRICE FILTER
      minPrice,
      maxPrice,
    } = req.body || {};

    const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;

    const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

    const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION;

    if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ADMIN_TOKEN) {
      return res.status(500).json({
        success: false,
        message: "Thiếu biến môi trường Shopify",
      });
    }

    // =========================================
    // SEARCH QUERY
    // =========================================

    let searchQuery = "";

    if (search?.trim()) {
      const keyword = search.trim();

      // Full Suspension -> full-suspension

      const handleKeyword = keyword.toLowerCase().replace(/\s+/g, "-");

      searchQuery = `
        title:*${keyword}*
        OR
        collection:${handleKeyword}
      `;
    }

    // =========================================
    // GRAPHQL
    // =========================================

    const query = `
      query GetProducts(
        $first: Int!,
        $query: String
      ) {
        products(
          first: $first,
          query: $query
        ) {
          edges {
            node {
              id
              title
              handle
              descriptionHtml

              createdAt

              collections(first: 5) {
                edges {
                  node {
                    id
                    title
                    handle
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

              variants(first: 1) {
                edges {
                  node {
                    id

                    inventoryItem {
                      id

                      inventoryLevels(first: 1) {
                        edges {
                          node {
                            quantities(names: ["available"]) {
                              name
                              quantity
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }

              priceRangeV2 {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }

              averageRating: metafield(
                namespace: "custom",
                key: "average_rating"
              ) {
                value
              }

              reviewCount: metafield(
                namespace: "custom",
                key: "review_count"
              ) {
                value
              }
            }
          }
        }
      }
    `;

    const variables = {
      first: 250,
      query: searchQuery || undefined,
    };

    // =========================================
    // SHOPIFY FETCH
    // =========================================

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
        message: "Lỗi Shopify API",
        errors: result.errors || result,
      });
    }

    // =========================================
    // RAW PRODUCTS
    // =========================================

    const rawProducts = result?.data?.products?.edges || [];

    // =========================================
    // FORMAT PRODUCTS
    // =========================================

    let products =
      rawProducts.map((item) => ({
        id: item.node.id,

        title: item.node.title,

        handle: item.node.handle,

        createdAt: item.node.createdAt,

        descriptionHtml: item.node.descriptionHtml || "",

        category: item.node.collections?.edges?.[0]
          ? {
              id: item.node.collections.edges[0].node.id,

              title: item.node.collections.edges[0].node.title,

              handle: item.node.collections.edges[0].node.handle,
            }
          : null,

        image: item.node.featuredImage?.url || "",

        altText: item.node.featuredImage?.altText || "",

        stock:
          item.node.variants?.edges?.[0]?.node?.inventoryItem?.inventoryLevels
            ?.edges?.[0]?.node?.quantities?.[0]?.quantity || 0,

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

    // =========================================
    // FILTER CATEGORY
    // =========================================

    if (collectionHandle?.trim()) {
      products = products.filter((product) => {
        return (
          product.category?.handle?.toLowerCase() ===
          collectionHandle.toLowerCase()
        );
      });
    }

    // =========================================
    // FILTER PRICE
    // =========================================

    const hasPriceFilter =
      minPrice !== undefined &&
      minPrice !== null &&
      maxPrice !== undefined &&
      maxPrice !== null;

    if (hasPriceFilter) {
      products = products.filter((product) => {
        return (
          product.price >= Number(minPrice) && product.price <= Number(maxPrice)
        );
      });
    }

    // =========================================
    // SORT
    // =========================================

    switch (tabKey) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;

      case "new-arrival":
        products.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;

      case "best-seller":
      default:
        // fake best seller theo reviewCount
        products.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    if (sortBy) {
      switch (sortBy) {
        // =========================
        // TITLE
        // =========================

        case "title":
          products.sort((a, b) => {
            return sortOrder === "asc"
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title);
          });

          break;

        // =========================
        // CATEGORY
        // =========================

        case "category":
          products.sort((a, b) => {
            const categoryA = a.category?.title || "";

            const categoryB = b.category?.title || "";

            return sortOrder === "asc"
              ? categoryA.localeCompare(categoryB)
              : categoryB.localeCompare(categoryA);
          });

          break;

        // =========================
        // PRICE
        // =========================

        case "price":
          products.sort((a, b) => {
            return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
          });

          break;

        // =========================
        // STOCK
        // =========================

        case "stock":
          products.sort((a, b) => {
            return sortOrder === "asc" ? a.stock - b.stock : b.stock - a.stock;
          });

          break;

        default:
          break;
      }
    }

    // =========================================
    // PAGINATION
    // =========================================

    const totalProducts = products.length;

    const totalPages = Math.ceil(totalProducts / Number(limit));

    const startIndex = (Number(pageCurrent) - 1) * Number(limit);

    const endIndex = startIndex + Number(limit);

    const paginatedProducts = products.slice(startIndex, endIndex);

    // =========================================
    // RESPONSE
    // =========================================

    return res.status(200).json({
      success: true,
      search,
      collectionHandle,
      totalProducts,
      totalPages,
      currentPage: Number(pageCurrent),
      limit: Number(limit),
      products: paginatedProducts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

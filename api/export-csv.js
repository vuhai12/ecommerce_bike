// /api/export-csv.js

import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  try {
    const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
    const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
    const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION;

    const query = `
      query GetProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              descriptionHtml

              category {
                id
                name
                fullName
              }

              featuredImage {
                url
              }

              collections(first: 1) {
                edges {
                  node {
                    title
                    handle
                  }
                }
              }

              variants(first: 1) {
                edges {
                  node {
                    inventoryQuantity
                    price
                  }
                }
              }
            }
          }
        }
      }
    `;

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
          variables: {
            first: 50,
          },
        }),
      },
    );

    const result = await shopifyRes.json();

    if (result.errors) {
      return res.status(500).json({
        success: false,
        message: "Shopify query error",
        errors: result.errors,
      });
    }

    const rawProducts = result?.data?.products?.edges || [];

    // =========================================
    // CSV HEADER
    // =========================================

    const header =
      "title,price,stock,description,image,collectionHandle,categoryId,categoryName\n";

    // =========================================
    // CSV ROWS
    // =========================================

    const rows = rawProducts.map((item) => {
      const p = item.node;

      const title = p.title || "";

      const price = p.variants?.edges?.[0]?.node?.price || 0;

      const stock = p.variants?.edges?.[0]?.node?.inventoryQuantity || 0;

      const description = p.descriptionHtml || "";

      const image = p.featuredImage?.url || "";

      const collectionHandle = p.collections?.edges?.[0]?.node?.handle || "";

      const categoryId = p.category?.id || "";

      const categoryName = p.category?.fullName || "";

      // escape "
      const safeTitle = `"${title.replace(/"/g, '""')}"`;

      const safeDescription = `"${description.replace(/"/g, '""')}"`;

      const safeImage = `"${image.replace(/"/g, '""')}"`;

      const safeCollection = `"${collectionHandle.replace(/"/g, '""')}"`;

      const safeCategoryId = `"${categoryId.replace(/"/g, '""')}"`;

      const safeCategoryName = `"${categoryName.replace(/"/g, '""')}"`;

      return [
        safeTitle,
        price,
        stock,
        safeDescription,
        safeImage,
        safeCollection,
        safeCategoryId,
        safeCategoryName,
      ].join(",");
    });

    // =========================================
    // BUILD CSV
    // =========================================

    const BOM = "\uFEFF";

    const csv = BOM + header + rows.join("\n");

    // =========================================
    // DOWNLOAD FILE
    // =========================================

    res.setHeader("Content-Type", "text/csv; charset=utf-8");

    res.setHeader("Content-Disposition", "attachment; filename=products.csv");

    return res.status(200).send(csv);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Export CSV error",
      error: error.message,
    });
  }
}

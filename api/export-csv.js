// /api/export-csv.js
export default async function handler(req, res) {
  try {
    const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
    const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
    const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION;

    // 🎯 query lấy product
    const query = `
      query GetProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              descriptionHtml
              featuredImage {
                url
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
          variables: { first: 50 }, // chỉnh số lượng tùy bạn
        }),
      },
    );

    const result = await shopifyRes.json();

    const rawProducts = result?.data?.products?.edges || [];

    // 🎯 convert sang CSV
    const header = "title,price,stock,description,image\n";

    const rows = rawProducts.map((item) => {
      const p = item.node;

      const title = p.title || "";
      const price = p.variants?.edges?.[0]?.node?.price || 0;
      const stock = p.variants?.edges?.[0]?.node?.inventoryQuantity || 0;
      const description = p.descriptionHtml || "";
      const image = p.featuredImage?.url || "";

      // ❗ escape dấu " và dấu ,
      const safeDescription = `"${description.replace(/"/g, '""')}"`;

      return `"${title}",${price},${stock},${safeDescription},"${image}"`;
    });
    const BOM = "\uFEFF";
    const csv = BOM + header + rows.join("\n");

    // 🎯 trả file
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", "attachment; filename=products.csv");

    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Export CSV error",
      error: error.message,
    });
  }
}

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
    const { handle } = req.body || {};

    if (!handle) {
      return res.status(400).json({
        success: false,
        message: "Thiếu handle",
      });
    }

    const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
    const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
    const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION;

    const query = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title

      fatTires: metafield(namespace: "custom", key: "fat_tires") {
  value
}

pedalAssist: metafield(namespace: "custom", key: "pedal_assist") {
  value
}

motor: metafield(namespace: "custom", key: "motor") {
  value
}

motorController: metafield(namespace: "custom", key: "motor_controller") {
  value
}
  battery: metafield(namespace: "custom", key: "battery") {
  value
}
      handle
      description
      descriptionHtml
      vendor
      productType
      tags

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

      averageRating: metafield(namespace: "custom", key: "average_rating") {
  value
}
reviewCount: metafield(namespace: "custom", key: "review_count") {
  value
}

      options {
        name
        optionValues {
          name
        }
      }

      variants(first: 20) {
        edges {
          node {
            id
            title
            price
            compareAtPrice
            inventoryQuantity
            selectedOptions {
              name
              value
            }
          }
        }
      }

      metafield(namespace: "custom", key: "related_accessories") {
        references(first: 10) {
          nodes {
            ... on Product {
              id
              title
              handle
              description
              descriptionHtml
              featuredImage {
                url
                altText
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    title
                    price
                    compareAtPrice
                    inventoryQuantity
                  }
                }
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
          variables: { handle },
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

    const product = result?.data?.productByHandle;

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Không tìm thấy sản phẩm với handle: ${handle}`,
      });
    }

    return res.status(200).json({
      success: true,
      product: {
        id: product.id,
        title: product.title,
        handle: product.handle,
        price: product.variants?.edges?.[0]?.node?.price || "0",
        description: product.description,
        descriptionHtml: product.descriptionHtml,
        vendor: product.vendor,
        productType: product.productType,
        tags: product.tags,
        featuredImage: product.featuredImage?.url || "",
        specifications: {
          motorController: product.motorController?.value || "",
          battery: product.battery?.value || "",
          motor: product.motor?.value || "",
          pedalAssist: product.pedalAssist?.value || "",
          fatTires: product.fatTires?.value || "",
        },
        images:
          product.images?.edges?.map((item) => ({
            url: item.node.url,
            altText: item.node.altText || "",
          })) || [],
        averageRating: Number(product.averageRating?.value || 0),
        reviewCount: Number(product.reviewCount?.value || 0),
        options: product.options || [],
        variants:
          product.variants?.edges?.map((item) => ({
            id: item.node.id,
            title: item.node.title,
            price: item.node.price,
            compareAtPrice: item.node.compareAtPrice,
            inventoryQuantity: item.node.inventoryQuantity,
            selectedOptions: item.node.selectedOptions,
          })) || [],

        accessories:
          product.metafield?.references?.nodes?.map((item) => ({
            id: item.id,
            title: item.title,
            handle: item.handle,
            description: item.description,
            descriptionHtml: item.descriptionHtml,
            featuredImage: item.featuredImage?.url || "",
            variant: item.variants?.edges?.[0]?.node
              ? {
                  id: item.variants.edges[0].node.id,
                  title: item.variants.edges[0].node.title,
                  price: item.variants.edges[0].node.price,
                  compareAtPrice: item.variants.edges[0].node.compareAtPrice,
                  inventoryQuantity:
                    item.variants.edges[0].node.inventoryQuantity,
                }
              : null,
          })) || [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

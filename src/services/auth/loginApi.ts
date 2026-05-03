import apiClient from "../apiClient";

export const loginApi = async () => {
  try {
    const res = await apiClient.get<{ url: string }>("/auth-login");

    console.log("Shopify login URL:", res);

    // redirect sang Shopify
    window.location.href = res.data.url;
  } catch (error) {
    console.error("Login error:", error);
  }
};

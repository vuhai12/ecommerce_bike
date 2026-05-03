import apiClient from "../apiClient";

export const updateCartApi = async (
  cartId: string | null,
  lines: { id: string; quantity: number }[],
) => {
  const res = await apiClient.post("/update-cart", {
    cartId,
    lines,
  });

  console.log("ress", res);

  return res.data;
};

export const addCartApi = async (
  cartId: string | null,
  lines: { merchandiseId: string; quantity: number }[],
) => {
  const res = await apiClient.post("/add-cart", {
    cartId,
    lines,
  });

  return res.data;
};

export const getCartApi = async (cartId: string) => {
  const res = await apiClient.get("/get-cart", {
    params: {
      cartId,
    },
  });

  return res.data;
};

export const removeCartLinesApi = async (cartId: string, lineIds: string[]) => {
  const res = await apiClient.post("/remove-cart-lines", {
    cartId,
    lineIds,
  });

  return res.data;
};

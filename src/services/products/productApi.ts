import apiClient from "../apiClient";
import {
  ProductResponse,
  GetProductDetailResponse,
} from "../../types/product.type";

export const getProductsApi = async (
  payload: any,
): Promise<ProductResponse> => {
  const response = await apiClient.post("/products", payload);
  return response.data;
};

export const getProductDetailApi = async (
  handle: string,
): Promise<GetProductDetailResponse> => {
  const response = await apiClient.post<GetProductDetailResponse>(
    "/product-detail",
    { handle },
  );

  console.log("response", response);

  return response.data;
};

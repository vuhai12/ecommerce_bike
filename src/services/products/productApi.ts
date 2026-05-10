import apiClient from "../apiClient";
import {
  ProductResponse,
  GetProductDetailResponse,
  ProductFormType,
  ProductUpateResponse,
} from "../../types/product.type";

export const getProductsApi = async (
  payload: any,
): Promise<ProductResponse> => {
  const response = await apiClient.post("/products", payload);
  console.log("response", response);
  return response.data;
};

export const addProductApi = async (
  payload: ProductFormType,
): Promise<ProductResponse> => {
  const formData = new FormData();
  if (payload.image) {
    formData.append("image", payload.image);
  }
  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("stock", String(payload.stock));
  formData.append("price", String(payload.price));
  formData.append("collectionHandle", payload.categoryHandle);

  const response = await apiClient.post("/add-product", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });
  return response.data;
};

export const getProductDetailApi = async (
  handle: string,
): Promise<GetProductDetailResponse> => {
  const response = await apiClient.post<GetProductDetailResponse>(
    "/product-detail",
    { handle },
  );
  return response.data;
};

export const deleteProductApi = async (id: string) => {
  const response = await apiClient.post("/delete-product", { id });
  return response.data;
};

export const updateProductApi = async (
  id: string,
  payload: ProductFormType,
): Promise<ProductUpateResponse> => {
  const formData = new FormData();
  console.log("id", id);
  console.log("payload", payload);

  formData.append("id", id);
  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("stock", String(payload.stock));
  formData.append("price", String(payload.price));
  formData.append("collectionHandle", payload.categoryHandle);

  if (payload.image) {
    formData.append("image", payload.image);
  }

  const response = await apiClient.post("/update-product", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });

  console.log("response33333333333", response);

  return response.data;
};

export const importCsvApi = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/import-csv", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });

  return response.data;
};

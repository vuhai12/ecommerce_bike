import apiClient from "../apiClient";

type Review = {
  id: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  content: string;
  createdAt: string;
};

type ReviewResponse = {
  success: boolean;
  reviews: Review[];
  summary: {
    averageRating: number;
    reviewCount: number;
  };
};

type CreateReviewPayload = {
  productHandle: string;
  customerName?: string;
  customerEmail?: string;
  rating: number;
  content: string;
};

export const getReviewsApi = async (
  productHandle: string,
): Promise<ReviewResponse> => {
  const response = await apiClient.get("/reviews", {
    params: { productHandle },
  });

  return response.data;
};

export const postReviewsApi = async (
  payload: CreateReviewPayload,
): Promise<{ success: boolean }> => {
  const response = await apiClient.post("/reviews", payload);

  return response.data;
};

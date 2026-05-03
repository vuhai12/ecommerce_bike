import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getReviewsApi,
  postReviewsApi,
} from "../../services/reviews/reviewsApi";

export type ReviewItem = {
  id: string;
  handle?: string;
  productHandle: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  content: string;
  createdAt: string;
};

export type ReviewSummary = {
  averageRating: number;
  reviewCount: number;
};

export type GetReviewsResponse = {
  success: boolean;
  reviews: ReviewItem[];
  summary: ReviewSummary;
};

export type PostReviewPayload = {
  productHandle: string;
  customerName?: string;
  customerEmail?: string;
  rating: number;
  content: string;
};

export type PostReviewResponse = {
  success: boolean;
  message?: string;
  review?: {
    id: string;
    handle?: string;
    type?: string;
  };
  summary?: ReviewSummary;
  errors?: { field?: string[]; message: string }[];
};

type ReviewsState = {
  reviews: ReviewItem[];
  summary: ReviewSummary;
  loadingGet: boolean;
  loadingPost: boolean;
  error: string | null;
};

const defaultSummary: ReviewSummary = {
  averageRating: 0,
  reviewCount: 0,
};

const initialState: ReviewsState = {
  reviews: [],
  summary: defaultSummary,
  loadingGet: false,
  loadingPost: false,
  error: null,
};

export const getReviewsThunk = createAsyncThunk(
  "reviews/getReviews",
  async (productHandle: string, thunkAPI: any) => {
    try {
      const data = await getReviewsApi(productHandle);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Lấy danh sách đánh giá thất bại",
      );
    }
  },
);

export const postReviewThunk = createAsyncThunk(
  "reviews/postReview",
  async (payload: PostReviewPayload, thunkAPI: any) => {
    try {
      const data = await postReviewsApi(payload);

      if (payload.productHandle) {
        thunkAPI.dispatch(getReviewsThunk(payload.productHandle));
      }

      return data;
    } catch (error: any) {
      const serverData = error?.response?.data;

      const errorMessage =
        serverData?.message ||
        serverData?.errors?.map((e: any) => e.message).join(", ") ||
        "Gửi đánh giá thất bại";

      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviewsError: (state) => {
      state.error = null;
    },
    resetReviewsState: () => ({
      ...initialState,
      summary: { ...defaultSummary },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsThunk.pending, (state) => {
        state.loadingGet = true;
        state.error = null;
      })
      .addCase(
        getReviewsThunk.fulfilled,
        (state, action: PayloadAction<GetReviewsResponse>) => {
          state.loadingGet = false;
          state.reviews = action.payload.reviews ?? [];
          state.summary = action.payload.summary ?? { ...defaultSummary };
        },
      )
      .addCase(getReviewsThunk.rejected, (state, action: any) => {
        state.loadingGet = false;
        state.error = action.payload || "Lấy đánh giá thất bại";
      })

      .addCase(postReviewThunk.pending, (state) => {
        state.loadingPost = true;
        state.error = null;
      })
      .addCase(
        postReviewThunk.fulfilled,
        (state, action: PayloadAction<PostReviewResponse>) => {
          state.loadingPost = false;

          if (action.payload.summary) {
            state.summary = action.payload.summary;
          }
        },
      )
      .addCase(postReviewThunk.rejected, (state, action: any) => {
        state.loadingPost = false;
        state.error = action.payload || "Gửi đánh giá thất bại";
      });
  },
});

export const { clearReviewsError, resetReviewsState } = reviewsSlice.actions;
export default reviewsSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getProductDetailApi,
  type ProductDetail,
} from "../../services/products/productApi";

interface ProductDetailState {
  data: ProductDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductDetailState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProductDetail = createAsyncThunk<
  ProductDetail,
  string,
  { rejectValue: string }
>("productDetail/fetchProductDetail", async (handle, thunkAPI) => {
  try {
    const data = await getProductDetailApi(handle);

    return data.product;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error?.response?.data?.message ||
        error?.message ||
        "Lấy chi tiết sản phẩm thất bại",
    );
  }
});

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    clearProductDetail: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductDetail.fulfilled,
        (state, action: PayloadAction<ProductDetail>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Có lỗi xảy ra";
      });
  },
});

export const { clearProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;

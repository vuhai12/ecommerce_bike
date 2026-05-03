import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getProductsApi,
  type Product,
} from "../../services/products/productApi";

interface ProductState {
  list: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  list: [],
  loading: false,
  error: null,
};

interface FetchProductsPayload {
  collectionHandle?: string;
  tabKey?: string;
  first?: number;
  minPrice?: number;
  maxPrice?: number;
}

export const fetchProducts = createAsyncThunk<
  Product[], // kiểu dữ liệu trả về khi success
  FetchProductsPayload, // kiểu tham số truyền vào thunk
  { rejectValue: string } // kiểu lỗi custom
>("products/fetchProducts", async (payload: FetchProductsPayload, thunkAPI) => {
  try {
    const data = await getProductsApi(payload);
    console.log("data =", data);
    return data.products;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error?.message || "Lấy danh sách sản phẩm thất bại",
    );
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          console.log("action.payload", action.payload);
          state.loading = false;
          state.list = action.payload;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Có lỗi xảy ra";
      });
  },
});

export default productSlice.reducer;

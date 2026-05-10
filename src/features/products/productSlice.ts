import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  addProductApi,
  deleteProductApi,
  getProductsApi,
  updateProductApi,
} from "../../services/products/productApi";
import { Product, ProductFormType } from "../../types/product.type";

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
  search?: string;
  sortBy?: string;
  sortOrder?: string;
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

export const deleteProduct = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("products/deleteProduct", async (id, thunkAPI) => {
  try {
    const data = await deleteProductApi(id);
    return data.deletedProductId;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.message || "Xoá sản phẩm thất bại");
  }
});

export const addProduct = createAsyncThunk<
  Product[], // kiểu dữ liệu trả về khi success
  ProductFormType, // kiểu tham số truyền vào thunk
  { rejectValue: string } // kiểu lỗi custom
>("products/addProduct", async (payload: ProductFormType, thunkAPI) => {
  try {
    const data = await addProductApi(payload);
    console.log("data", data);
    return data.products;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error?.message || "Lấy danh sách sản phẩm thất bại",
    );
  }
});

export const updateProduct = createAsyncThunk<
  Product,
  { id: string; payload: ProductFormType },
  { rejectValue: string }
>("products/updateProduct", async ({ id, payload }, thunkAPI) => {
  try {
    const data = await updateProductApi(id, payload);
    console.log("data2222222222222", data);
    return data.product;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error?.message || "Cập nhật sản phẩm thất bại",
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
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          console.log("action.payload", action.payload);
          state.loading = false;
          state.list = action.payload;
        },
      )
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Có lỗi xảy ra";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Có lỗi xảy ra";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Có lỗi xảy ra";
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export default productSlice.reducer;

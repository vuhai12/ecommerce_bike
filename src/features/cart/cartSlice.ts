import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addCartApi,
  getCartApi,
  removeCartLinesApi,
  updateCartApi,
} from "../../services/cart/cartApi";

type CartLine = {
  id: string;
  quantity: number;
  cost?: {
    totalAmount?: {
      amount: string;
      currencyCode: string;
    };
  };
  merchandise: {
    id: string;
    title: string;
    price?: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
      handle: string;
      featuredImage?: {
        url: string;
        altText?: string | null;
      };
    };
  };
};

type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost?: {
    totalAmount?: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    nodes: CartLine[];
  };
};

type CartState = {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
};

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

export const addCartThunk = createAsyncThunk(
  "cart/addCart",
  async (
    payload: {
      cartId: string | null;
      lines: { merchandiseId: string; quantity: number }[];
    },
    { rejectWithValue },
  ) => {
    try {
      const result = await addCartApi(payload.cartId, payload.lines);

      if (!result.success) {
        return rejectWithValue(result.message || "Add cart failed");
      }

      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || "Add cart failed");
    }
  },
);

export const getCartThunk = createAsyncThunk(
  "cart/getCart",
  async (cartId: string, { rejectWithValue }) => {
    try {
      const result = await getCartApi(cartId);

      if (!result.success) {
        return rejectWithValue(result.message || "Get cart failed");
      }

      return result.cart;
    } catch (error: any) {
      return rejectWithValue(error.message || "Get cart failed");
    }
  },
);

export const updateCartThunk = createAsyncThunk(
  "cart/updateCart",
  async (
    payload: {
      cartId: string | null;
      lines: { id: string; quantity: number }[];
    },
    { rejectWithValue },
  ) => {
    try {
      const result = await updateCartApi(payload.cartId, payload.lines);

      console.log("resultdddddddđ", result);

      if (!result.success) {
        return rejectWithValue(result.message || "update cart failed");
      }

      return result.cart;
    } catch (error: any) {
      return rejectWithValue(error.message || "update cart failed");
    }
  },
);

export const removeCartLinesThunk = createAsyncThunk(
  "cart/removeCartLines",
  async (
    payload: {
      cartId: string;
      lineIds: string[];
    },
    { rejectWithValue },
  ) => {
    try {
      const result = await removeCartLinesApi(payload.cartId, payload.lineIds);

      if (!result.success) {
        return rejectWithValue(result.message || "Remove cart lines failed");
      }

      return result.cart;
    } catch (error: any) {
      return rejectWithValue(error.message || "Remove cart lines failed");
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(removeCartLinesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartLinesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(removeCartLinesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateCartThunk.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(addCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.error = null;
      })
      .addCase(addCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;

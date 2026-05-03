import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/products/productSlice";
import reviewsReducer from "../features/reviews/reviewsSlice";
import productDetailReducer from "../features/productDetail/productDetailSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    products: productReducer,
    productDetail: productDetailReducer,
    reviews: reviewsReducer,
  },
});

// Type dùng cho TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

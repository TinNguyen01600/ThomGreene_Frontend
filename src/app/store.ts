import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../redux/product/productSlice";
import categorySlice from "../redux/category/categorySlice";
import userSlice from "../redux/user/userSlice";
import cartSlice from "../redux/cart/cartSlice";
export const store = configureStore({
	reducer: {
		products: productSlice,
		categories: categorySlice,
		users: userSlice,
		cart: cartSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

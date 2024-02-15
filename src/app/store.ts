import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../redux/product/productSlice";
import categorySlice from "../redux/product/categorySlice";
import userSlice from "../redux/user/userSlice";
export const store = configureStore({
	reducer: {
		products: productSlice,
		categories: categorySlice,
		users: userSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

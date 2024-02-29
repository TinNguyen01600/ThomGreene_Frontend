import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import categorySlice from "./slices/categorySlice";
import userSlice from "./slices/userSlice";
import cartSlice from "./slices/cartSlice";
import { CartItemType } from "../misc/types";

const preCartReducer: CartItemType[] = JSON.parse(
	localStorage.getItem("cart") || "[]"
);

export const store = configureStore({
	reducer: {
		products: productSlice,
		categories: categorySlice,
		users: userSlice,
		cart: cartSlice,
	},
	preloadedState: {
		cart: {
            cart: preCartReducer
        },
	},
});

store.subscribe(() => {
	const cartState = store.getState().cart.cart;
	localStorage.setItem("cart", JSON.stringify(cartState));
});

export const createNewStore = () => {
    return configureStore({
        reducer: {
            products: productSlice
        },
    })
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ProductType } from "../product/productSlice";

export type ArticleType = ProductType & {
	amount: number;
};

interface CartState {
	cart: ArticleType[];
}

const initialState: CartState = {
	cart: [],
};

/****************************************************** */

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		saveCart: (state, action: PayloadAction<any>) => {
            state.cart = action.payload
		},
		addArticle: (state, action: PayloadAction<ProductType>) => {
			const newArticle = action.payload;
			const exist = state.cart.find(
				(article) => article.id === newArticle.id
			);
			if (!exist) {
				state.cart.push({ ...newArticle, amount: 1 });
			} else {
				exist.amount += 1;
			}
			localStorage.setItem("cart", JSON.stringify(state.cart));
		},
	},
});

/****************************************************** */

export const getCartFromStorage = (dispatch: any) => {
	let cart = localStorage.getItem("cart");
	if (cart) {
		cart = JSON.parse(cart);
		dispatch(saveCart(cart))
	}
};

export const { saveCart, addArticle } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;

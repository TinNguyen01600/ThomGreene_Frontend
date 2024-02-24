import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ProductType } from "../../app/types";
import { CartItemType } from "../../app/types";

interface CartState {
	cart: CartItemType[];
}

const initialState: CartState = {
	cart: [],
};

/****************************************************** */

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addCartItem: (state, action: PayloadAction<ProductType>) => {
			const newCartItem = action.payload;
			const exist = state.cart.findIndex(
				(cartItem) => cartItem.id === newCartItem.id
			);
			if (exist < 0) {
				state.cart.push({ ...newCartItem, quantity: 1 });
			} else {
				state.cart[exist].quantity += 1;
			}
		},
        removeCartItem: (state, action: PayloadAction<CartItemType>) => {
            const remove = action.payload
            const exist = state.cart.findIndex(
				(cartItem) => cartItem.id === remove.id
			);
            state.cart[exist].quantity -= 1;
            if (state.cart[exist].quantity === 0) {
                state.cart.splice(exist, 1)
            }
        }
	},
});

/****************************************************** */

export const { addCartItem, removeCartItem } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cart;

const cartReducer = cartSlice.reducer;

export default cartReducer;

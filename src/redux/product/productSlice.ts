import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { CategoryType } from "./categorySlice";

export type ProductType = {
	id: number;
	title: string;
	price: number;
	description: string;
	images: string[];
	category: CategoryType;
};

interface ProductState {
	allProducts: ProductType[];
	loading: boolean;
	error: string | null;
}

const initialState: ProductState = {
	allProducts: [],
	loading: false,
	error: null,
};

const url = "https://api.escuelajs.co/api/v1/products";

export const fetchAllProductsAsync = createAsyncThunk(
	"fetchAllProductsAsync",
	async (_, { rejectWithValue }) => {
		try {
			const res = await axios(url);
			const data = res.data;
			return data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers(builder) {
		// fetch all products
		builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
			state.allProducts = action.payload;
			state.loading = false;
		});
		builder.addCase(fetchAllProductsAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message ?? "error";
		});
	},
});

export const {} = productSlice.actions;

export const selectProducts = (state: RootState) => state.products.allProducts;

export default productSlice.reducer;

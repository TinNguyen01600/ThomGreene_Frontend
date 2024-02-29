import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { ProductType } from "../../misc/types";

interface ProductState {
	allProducts: ProductType[];
	searchedProducts: ProductType[];
	loading: boolean;
	error: string | null;
}

const initialState: ProductState = {
	allProducts: [],
	searchedProducts: [],
	loading: false,
	error: null,
};

const url = "https://api.escuelajs.co/api/v1/products";

export const fetchAllProductsAsync = createAsyncThunk(
	"fetchAllProductsAsync",
	async (_, { rejectWithValue }) => {
		try {
			const res = await axios.get<ProductType[]>(url);
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
	reducers: {
		searchForProduct: (state, action) => {
			const query = action.payload.toLowerCase();
			if (!query) state.searchedProducts = [];
			else {
				state.searchedProducts = state.allProducts.filter((item) =>
					item.title
						.split(" ")
						.some((word) => word.toLowerCase().startsWith(query))
				);
			}
		},
		sortProducts: (state, action) => {
			let results = state.allProducts;
			if (action.payload === "ascending") {
				results = results.sort((a, b) => (a.price > b.price ? 1 : -1));
			} else if (action.payload === "descending") {
				results = results.sort((a, b) => (a.price < b.price ? 1 : -1));
			} else {
				results = results.sort((a, b) => (a.id > b.id ? 1 : -1));
			}
			state.allProducts = results;
		},
	},
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

export const { searchForProduct, sortProducts } = productSlice.actions;

export const selectProducts = (state: RootState) => state.products.allProducts;

const productReducer = productSlice.reducer;

export default productReducer;

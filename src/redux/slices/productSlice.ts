import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { ProductType } from "../../misc/types";

interface ProductState {
	allProducts: ProductType[];
	searchedProducts: ProductType[];
	sortedProducts: ProductType[];
	filteredProducts: ProductType[];
	loading: boolean;
	error: string | null;
}

const initialState: ProductState = {
	allProducts: [],
	searchedProducts: [],
	sortedProducts: [],
	filteredProducts: [],
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

export const fetchFilteredProductsAsync = createAsyncThunk(
	"fetchFilteredProductsAsync",
	async (range: number[], { rejectWithValue }) => {
		try {
			const res = await axios.get<ProductType[]>(
				`https://api.escuelajs.co/api/v1/products/?price_min=${range[0]}&price_max=${range[1]}`
			);
			return res.data;
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
			const allProducts: ProductType[] = [];
			state.allProducts.forEach((prod) => allProducts.push(prod));
			if (action.payload === "ascending") {
				state.sortedProducts = allProducts.sort((a, b) =>
					a.price > b.price ? 1 : -1
				);
			} else if (action.payload === "descending") {
				state.sortedProducts = allProducts.sort((a, b) =>
					a.price < b.price ? 1 : -1
				);
			}
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

		// fetch filtered products
		builder.addCase(
			fetchFilteredProductsAsync.fulfilled,
			(state, action) => {
				state.filteredProducts = action.payload;
				state.loading = false;
			}
		);
		builder.addCase(fetchFilteredProductsAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(
			fetchFilteredProductsAsync.rejected,
			(state, action) => {
				state.loading = false;
				state.error = action.error.message ?? "error";
			}
		);
	},
});

export const { searchForProduct, sortProducts } = productSlice.actions;

export const selectProducts = (state: RootState) => state.products.allProducts;

const productReducer = productSlice.reducer;

export default productReducer;

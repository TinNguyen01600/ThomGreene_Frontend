import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { ProductType } from "../../app/types";

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

export const { searchForProduct } = productSlice.actions;

export const selectProducts = (state: RootState) => state.products.allProducts;

const productReducer = productSlice.reducer;

export default productReducer;

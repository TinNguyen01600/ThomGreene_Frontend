import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../misc/types";
import { CategoryType } from "../../misc/types";

interface CategoryState {
	allCategories: CategoryType[];
	selectedCategory: CategoryType;
	selectedCategoryProducts: ProductType[];
	loading: boolean;
	error: string | null;
}

const initialState: CategoryState = {
	allCategories: [],
	selectedCategory: Object.create(null),
	selectedCategoryProducts: [],
	loading: false,
	error: null,
};

/*************************************************************** */

export const fetchAllCategoriesAsync = createAsyncThunk(
	"fetchAllCategoriesAsync",
	async (_, { rejectWithValue }) => {
		try {
			const res = await axios.get<CategoryType[]>(
				`${process.env.REACT_APP_API_URL}categories`
			);
			const data = res.data;
			return data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);

export const fetchSelectedCategoryAsync = createAsyncThunk(
	"fetchSelectedCategoryAsync",
	async (categoryId: string | undefined, { rejectWithValue }) => {
		try {
			const id = Number(categoryId);
			const res = await axios.get<CategoryType>(
				`${process.env.REACT_APP_API_URL}categories/${id}`
			);
			return res.data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);

export const fetchSelectedCategoryProductsAsync = createAsyncThunk(
	"fetchSelectedCategoryProductsAsync",
	async (categoryId: string | undefined, { rejectWithValue }) => {
		try {
			const id = (categoryId);
			const res = await axios.get<ProductType[]>(
				`${process.env.REACT_APP_API_URL}products/category/${id}`
			);
			return res.data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);

/*************************************************************** */

const categorySlice = createSlice({
	name: "categories",
	initialState,
	reducers: {},
	extraReducers(builder) {
		// fetch all categories
		builder.addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
			state.allCategories = action.payload;
			state.loading = false;
		});
		builder.addCase(fetchAllCategoriesAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message ?? "error";
		});

		// fetch single category
		builder.addCase(
			fetchSelectedCategoryAsync.fulfilled,
			(state, action) => {
				state.selectedCategory = action.payload;
				state.loading = false;
			}
		);
		builder.addCase(fetchSelectedCategoryAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(
			fetchSelectedCategoryAsync.rejected,
			(state, action) => {
				state.loading = false;
				state.error = action.error.message ?? "error";
			}
		);

		// fetch single category products
		builder.addCase(
			fetchSelectedCategoryProductsAsync.fulfilled,
			(state, action) => {
				state.selectedCategoryProducts = action.payload;
				state.loading = false;
			}
		);
		builder.addCase(fetchSelectedCategoryProductsAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(
			fetchSelectedCategoryProductsAsync.rejected,
			(state, action) => {
				state.loading = false;
				state.error = action.error.message ?? "error";
			}
		);
	},
});

/*************************************************************** */

// export const fetchSelectedCategoryProducts =
// 	(categoryId: string | undefined) => async (dispatch: any) => {
// 		const id = Number(categoryId);
// 		const res = await axios.get<ProductType[]>(
// 			`https://api.escuelajs.co/api/v1/categories/${id}/products`
// 		);
// 		dispatch(setSelectedCategoryProducts(res.data));
// 	};

/*************************************************************** */

export const {} = categorySlice.actions;

export const selectCategories = (state: RootState) =>
	state.products.allProducts;

const categoryReducer = categorySlice.reducer;

export default categoryReducer;

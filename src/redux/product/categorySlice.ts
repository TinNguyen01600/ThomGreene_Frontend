import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductType } from "./productSlice";

export type CategoryType = {
	id: number;
	name: string;
	image: string;
};

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
			const res = await axios(
				`https://api.escuelajs.co/api/v1/categories`
			);
			const data = res.data;
			return data;
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);

const categorySlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		setSelectedCategory: (state, action: PayloadAction<CategoryType>) => {
			state.selectedCategory = action.payload;
		},
		setSelectedCategoryProducts: (
			state,
			action: PayloadAction<ProductType[]>
		) => {
			state.selectedCategoryProducts = action.payload;
		},
	},
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
	},
});

/*************************************************************** */

export const fetchSelectedCategory =
	(categoryId: string | undefined) => async (dispatch: any) => {
		const id = Number(categoryId);
		const res = await axios(
			`https://api.escuelajs.co/api/v1/categories/${id}`
		);
		dispatch(setSelectedCategory(res.data));
	};

export const fetchSelectedCategoryProducts =
	(categoryId: string | undefined) => async (dispatch: any) => {
		const id = Number(categoryId);
		const res = await axios(
			`https://api.escuelajs.co/api/v1/categories/${id}/products`
		);
		dispatch(setSelectedCategoryProducts(res.data));
	};

/*************************************************************** */

export const { setSelectedCategory, setSelectedCategoryProducts } =
	categorySlice.actions;

export const selectCategories = (state: RootState) =>
	state.products.allProducts;

export default categorySlice.reducer;

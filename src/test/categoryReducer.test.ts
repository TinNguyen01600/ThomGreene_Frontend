import categoryReducer, {
	fetchAllCategoriesAsync,
	fetchSelectedCategoryAsync,
	fetchSelectedCategoryProductsAsync,
} from "../redux/category/categorySlice";
import { mockProducts } from "./productReducer.test";
import { CategoryType } from "../app/types";

describe("category reducer", () => {
	// initial state
	const initialState = {
		allCategories: [],
		selectedCategory: Object.create(null),
		selectedCategoryProducts: [],
		loading: false,
		error: null,
	};
	const mockCategories: CategoryType[] = [
		{
			id: 1,
			name: "category 1",
			image: "img1",
		},
		{
			id: 2,
			name: "category 2",
			image: "img2",
		},
	];
	const mockSelectedCategory: CategoryType = {
		id: 1,
		name: "category 1",
		image: "img1",
	};
	/*********************************************************************** */

	// test initial state
	test("should return initial state", () => {
		const received = categoryReducer(undefined, { type: "" });
		const expected = initialState;
		expect(received).toEqual(expected);
	});

	// test fulfilled
	test("should return a list of categories", () => {
		const received = categoryReducer(
			initialState,
			fetchAllCategoriesAsync.fulfilled(mockCategories, "fulfilled")
		);
		const expected = {
			allCategories: mockCategories,
			selectedCategory: Object.create(null),
			selectedCategoryProducts: [],
			loading: false,
			error: null,
		};
		expect(received).toEqual(expected);
	});

	// test pending
	test("should have loading truthy when fetch is pending", () => {
		const received = categoryReducer(
			initialState,
			fetchAllCategoriesAsync.pending("pending")
		);
		const expected = {
			allCategories: [],
			selectedCategory: Object.create(null),
			selectedCategoryProducts: [],
			loading: true,
			error: null,
		};
		expect(received).toEqual(expected);
	});

	// test rejected
	test("should have error", () => {
		const error = new Error("error");
		const received = categoryReducer(
			initialState,
			fetchAllCategoriesAsync.rejected(error, "error")
		);
		const expected = {
			allCategories: [],
			selectedCategory: Object.create(null),
			selectedCategoryProducts: [],
			loading: false,
			error: error.message,
		};
		expect(received).toEqual(expected);
	});

	/************************************************************************* */

	// test fetch single category
	test("should return 1 single selected category", () => {
		const received = categoryReducer(
			initialState,
			fetchSelectedCategoryAsync.fulfilled(
				mockSelectedCategory,
				"1",
				"fulfilled"
			)
		);
		const expected = {
			allCategories: [],
			selectedCategory: mockSelectedCategory,
			selectedCategoryProducts: [],
			loading: false,
			error: null,
		};
		expect(received).toEqual(expected);
	});

	/************************************************************************* */

	// test fetch single category products
	test("should return 1 single selected category", () => {
		const received = categoryReducer(
			categoryReducer(
				initialState,
				fetchSelectedCategoryAsync.fulfilled(
					mockSelectedCategory,
					"1",
					"fulfilled"
				)
			),
			fetchSelectedCategoryProductsAsync.fulfilled(
				mockProducts,
				"1",
				"fulfilled"
			)
		);
		const expected = {
			allCategories: [],
			selectedCategory: mockSelectedCategory,
			selectedCategoryProducts: mockProducts,
			loading: false,
			error: null,
		};
		expect(received).toEqual(expected);
	});
});

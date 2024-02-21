import productReducer, { fetchAllProductsAsync } from "../redux/product/productSlice";
import { ProductType } from "../app/types";

// mock data
export const mockProducts: ProductType[] = [
	{
		id: 1,
		title: "product1",
		price: 1,
		description: "product1",
		images: ["img1", "img2"],
		category: {
			id: 1,
			name: "category 1",
			image: "img1",
		},
	},
	{
		id: 2,
		title: "product2",
		price: 2,
		description: "product2",
		images: ["img1", "img2"],
		category: {
			id: 2,
			name: "category 2",
			image: "img2",
		},
	},
];

describe("product reducer", () => {
	// initial state
	const initialState = {
		allProducts: [],
		loading: false,
		error: null,
	};
	/*********************************************************************** */

	// test initial state
	test("should return initial state", () => {
		const expected = initialState;
		const received = productReducer(undefined, { type: "" });
		expect(received).toEqual(expected);
	});

	// test fulfilled
	test("should return a list of products", () => {
		const received = productReducer(
			initialState,
			fetchAllProductsAsync.fulfilled(mockProducts, "fulfilled")
		);
		const expected = {
			allProducts: mockProducts,
			loading: false,
			error: null,
		};
		expect(received).toEqual(expected);
	});

	// test pending
	test("should have loading truthy when fetch is pending", () => {
		const received = productReducer(
			initialState,
			fetchAllProductsAsync.pending("pending")
		);
		const expected = {
			allProducts: [],
			loading: true,
			error: null,
		};
		expect(received).toEqual(expected);
	});

	// test rejected
	test("should have error", () => {
		const error = new Error("error");
		const received = productReducer(
			initialState,
			fetchAllProductsAsync.rejected(error, "error")
		);
		const expected = {
			allProducts: [],
			loading: false,
			error: error.message,
		};
		expect(received).toEqual(expected);
	});
});

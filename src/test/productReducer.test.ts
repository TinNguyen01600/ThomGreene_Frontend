import reducer, {
	ProductType,
	fetchAllProductsAsync,
} from "../redux/product/productSlice";

describe("product reducer", () => {
	// mock data
	const mockProducts: ProductType[] = [
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
		const received = reducer(undefined, { type: "" });
		expect(received).toEqual(expected);
	});

	// test fulfull
	test("should return a list of products", () => {
		const received = reducer(
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
		const state = reducer(
			initialState,
			fetchAllProductsAsync.pending("pending")
		);
		expect(state).toEqual({
			allProducts: [],
			loading: true,
			error: null,
		});
	});

	// test reject

	test("should have error", () => {
		const error = new Error("error");
		const state = reducer(
			initialState,
			fetchAllProductsAsync.rejected(error, "error")
		);
		expect(state).toEqual({
			allProducts: [],
			loading: false,
			error: error.message,
		});
	});
});

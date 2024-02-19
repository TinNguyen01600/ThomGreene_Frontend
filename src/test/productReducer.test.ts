import reducer, { ProductType } from "../redux/product/productSlice";

describe("product reducer", () => {
	test("should return initial state", () => {
		const initialState = {
			allProducts: [],
			loading: false,
			error: null,
		};
		const state = reducer(undefined, { type: "" });
		expect(state).toEqual(initialState);
	});
});

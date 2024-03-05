import cartReducer, {
	addCartItem,
	removeCartItem,
} from "../redux/slices/cartSlice";
import { mockProducts } from "./productReducer.test";

describe("cart reducer", () => {
	// intial state
	const initialState = {
		cart: [],
	};

	/*********************************************************************** */

	// test initial state
	test("should return initial state", () => {
		const received = cartReducer(undefined, { type: "" });
		const expected = initialState;
		expect(received).toEqual(expected);
	});

	// test add new article to empty list
	test("should handle an article being added to an empty list", () => {
		const expected = { cart: [{ ...mockProducts[0], quantity: 1 }] };
		const received = cartReducer(
			initialState,
			addCartItem(mockProducts[0])
		);
		expect(received).toEqual(expected);
	});

	// test add a product to an existing article
	test("should add a product to an existing article in the list", () => {
		const expected = {
			cart: [{ ...mockProducts[0], quantity: 2 }],
		};
		const received = cartReducer(
			{
				cart: [{ ...mockProducts[0], quantity: 1 }],
			},
			addCartItem(mockProducts[0])
		);
		expect(received).toEqual(expected);
	});

	// test add new article to an existing list
	test("should add new article to an existing list", () => {
		const expected = {
			cart: [
				{ ...mockProducts[0], quantity: 2 },
				{ ...mockProducts[1], quantity: 1 },
			],
		};
		const received = cartReducer(
			{
				cart: [{ ...mockProducts[0], quantity: 2 }],
			},
			addCartItem(mockProducts[1])
		);
		expect(received).toEqual(expected);
	});
	/********************************************************************* */

	// test remove 1 item from product
	test("should remove 1 item from product", () => {
		const expected = {
			cart: [{ ...mockProducts[0], quantity: 2 }],
		};
		const received = cartReducer(
			{
				cart: [{ ...mockProducts[0], quantity: 3 }],
			},
			removeCartItem({ ...mockProducts[0], quantity: 3 })
		);
		expect(received).toEqual(expected);
	});

	// test remove last item of product (remove 1 product) from cart
	test("should last item of product", () => {
		const expected = {
			cart: [{ ...mockProducts[0], quantity: 2 }],
		};
		const received = cartReducer(
			{
				cart: [
					{ ...mockProducts[0], quantity: 2 },
					{ ...mockProducts[1], quantity: 1 },
				],
			},
			removeCartItem({ ...mockProducts[1], quantity: 1 })
		);
		expect(received).toEqual(expected);
	});
});

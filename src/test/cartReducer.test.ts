import reducer, { ArticleType, addArticle } from "../redux/cart/cartSlice";
import { mockProducts } from "./productReducer.test";

describe("cart reducer", () => {
	// intial state
	const initialState = {
		cart: [],
	};

	// mock cart
	const mockCart: ArticleType[] = [
		{ ...mockProducts[0], amount: 1 },
		{ ...mockProducts[1], amount: 1 },
	];
	/*********************************************************************** */

	// test initial state
	test("should return initial state", () => {
		const received = reducer(undefined, { type: "" });
		const expected = initialState;
		expect(received).toEqual(expected);
	});

	// test add new article to empty list
	test("should handle an article being added to an empty list", () => {
		const expected = { cart: [{ ...mockProducts[0], amount: 1 }] };
		const received = reducer(initialState, addArticle(mockProducts[0]));
		expect(received).toEqual(expected);
	});

	// test add a product to an existing article
	test("should add a product to an existing article in the list", () => {
		const expected = {
			cart: [{ ...mockProducts[0], amount: 2 }],
		};
		const received = reducer(
			{
				cart: [{ ...mockProducts[0], amount: 1 }],
			},
			addArticle(mockProducts[0])
		);
		expect(received).toEqual(expected);
	});

	// test add new article to an existing list
	test("should add new article to an existing list", () => {
		const expected = {
			cart: [
				{ ...mockProducts[0], amount: 2 },
				{ ...mockProducts[1], amount: 1 },
			],
		};
        const received = reducer(
            {
                cart: [{ ...mockProducts[0], amount: 2 }],
            },
            addArticle(mockProducts[1])
        );
        expect(received).toEqual(expected)
	});
});

import productReducer, {
	fetchAllProductsAsync,
	searchForProduct,
    sortProducts,
} from "../redux/slices/productSlice";
import { ProductType } from "../misc/types";
import { createNewStore } from "../redux/store";
import { productServer } from "./share/productServer";

// mock data
export const mockProducts: ProductType[] = [
	{
		id: "82f3ff19-5b41-42cc-b304-22dc1b969c7b",
		name: "product1",
		price: 1,
		description: "product1",
		images: [{url: "img1", id: "25396374-85a2-4546-82bf-0afd68de1495"}, {url: "img2", id: "8d9f1b3a-18a9-4ee5-9c67-88b34e24aea8"}],
		category: {
			id: "806a0ee7-5305-4f54-aa35-d1b4f2699762",
			name: "category 1",
			image: "img1",
		},
	},
	{
		id: "4f12b1dd-fca5-4a49-aa65-b5f8b431d146",
		name: "product2",
		price: 2,
		description: "product2",
		images: [{url: "img1", id: "25396374-85a2-4546-82bf-0afd68de1495"}, {url: "img2", id: "8d9f1b3a-18a9-4ee5-9c67-88b34e24aea8"}],
		category: {
			id: "211a4622-305d-497f-9355-4c36906bef0d",
			name: "category 2",
			image: "img2",
		},
	},
	{
		id: "64547a2a-9c1d-4b9a-bcfb-d57252a0fbad",
		name: "notProduct 1",
		price: 3,
		description: "not product 1",
		images: [{url: "img1", id: "25396374-85a2-4546-82bf-0afd68de1495"}, {url: "img2", id: "8d9f1b3a-18a9-4ee5-9c67-88b34e24aea8"}],
		category: {
			id: "7e620dd3-c47b-4c3a-a5fa-70f9646df116",
			name: "category 3",
			image: "img3",
		},
	},
];

let store = createNewStore();

beforeEach(() => {
	store = createNewStore();
});

beforeAll(() => {
	productServer.listen();
});

afterAll(() => {
	productServer.close();
});

/*********************************************************************** */

describe("product reducer", () => {
	// initial state
	const initialState = {
		allProducts: [],
		searchedProducts: [],
		sortedProducts: [],
		filteredProducts: [],
		singleProduct: null,
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
			searchedProducts: [],
			sortedProducts: [],
			filteredProducts: [],
			singleProduct: null,
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
			searchedProducts: [],
			sortedProducts: [],
			filteredProducts: [],
			singleProduct: null,
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
			searchedProducts: [],
			sortedProducts: [],
			filteredProducts: [],
			singleProduct: null,
			loading: false,
			error: error.message,
		};
		expect(received).toEqual(expected);
	});

	/*********************************************************************** */

	// test fetching asyncthunk with store dispatch
	// test("should fetch all products from api", async () => {
	// 	await store.dispatch(fetchAllProductsAsync());
	// 	console.log(store.getState().products.allProducts);
	// 	expect(store.getState().products.allProducts.length).toBe(2);
	// 	expect(store.getState().products.error).toBeNull();
	// });

	/*********************************************************************** */

	// test search for multiple products by title query
	test("should search for multiple products by title query", () => {
		const received = productReducer(
			{
				allProducts: mockProducts,
				searchedProducts: [],
				sortedProducts: [],
				filteredProducts: [],
				singleProduct: null,
				loading: false,
				error: null,
			},
			searchForProduct("pro")
		);
		const expected = {
			allProducts: mockProducts,
			searchedProducts: [mockProducts[0], mockProducts[1]],
			sortedProducts: [],
			filteredProducts: [],
			singleProduct: null,
			loading: false,
			error: null,
		};
        expect(received).toEqual(expected)
	});

    // test search for 1 product by title query
    test("should search for 1 product by title query", () => {
        const received = productReducer(
			{
				allProducts: mockProducts,
				searchedProducts: [],
				sortedProducts: [],
				filteredProducts: [],
				singleProduct: null,
				loading: false,
				error: null,
			},
			searchForProduct("product2")
		);
		const expected = {
			allProducts: mockProducts,
			searchedProducts: [mockProducts[1]],
			sortedProducts: [],
			filteredProducts: [],
			singleProduct: null,
			loading: false,
			error: null,
		};
        expect(received).toEqual(expected)
    })

    /*********************************************************************** */

    // test sort products ascending
    test("should sort products ascending", () => {
        const received = productReducer(
			{
				allProducts: mockProducts,
				searchedProducts: [],
				sortedProducts: [],
				filteredProducts: [],
				singleProduct: null,
				loading: false,
				error: null,
			},
			sortProducts("ascending")
		);
		const expected = {
			allProducts: mockProducts,
			searchedProducts: [],
			sortedProducts: [mockProducts[0], mockProducts[1], mockProducts[2]],
			filteredProducts: [],
			singleProduct: null,
			loading: false,
			error: null,
		};
        expect(received).toEqual(expected)
    })

    // test sort products descending
    test("should sort products descending", () => {
        const received = productReducer(
			{
				allProducts: mockProducts,
				searchedProducts: [],
				sortedProducts: [],
				filteredProducts: [],
				singleProduct: null,
				loading: false,
				error: null,
			},
			sortProducts("descending")
		);
		const expected = {
			allProducts: mockProducts,
			searchedProducts: [],
			sortedProducts: [mockProducts[2], mockProducts[1], mockProducts[0]],
			filteredProducts: [],
			singleProduct: null,
			loading: false,
			error: null,
		};
        expect(received).toEqual(expected)
    })
});

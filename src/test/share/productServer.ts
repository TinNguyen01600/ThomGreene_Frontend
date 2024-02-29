import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

import { ProductType } from "../../misc/types";

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

export const handler = [
	http.get("https://api.escuelajs.co/api/v1/products", () => {
        console.log("fetch numbers of items in mock products:", mockProducts.length)
		return HttpResponse.json(mockProducts, { status: 200 });
	}),
];

export const productServer = setupServer(...handler)

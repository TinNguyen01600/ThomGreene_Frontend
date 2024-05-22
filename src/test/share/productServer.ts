import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

import { ProductType } from "../../misc/types";

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
		images: [{url: "img1", id: ""}, {url: "img2", id: ""}],
		category: {
			id: "211a4622-305d-497f-9355-4c36906bef0d",
			name: "category 2",
			image: "img2",
		},
	},
];

export const handler = [
	http.get("https://api.escuelajs.co/api/v1/products", () => {
		console.log(
			"fetch numbers of items in mock products:",
			mockProducts.length
		);
		return HttpResponse.json(mockProducts, { status: 200 });
	}),
];

export const productServer = setupServer(...handler);

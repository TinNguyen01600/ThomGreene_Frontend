export type CategoryType = {
	id: string;
	name: string;
	image: string;
};

export type CartItemType = ProductType & {
	quantity: number;
};

export type ProductImagesType = {
    url: string;
    id: string;
};

export type ProductType = {
	id: string;
	name: string;
	price: number;
	description: string;
	images: ProductImagesType[];
	category: CategoryType;
};

// export type ProductCreateType = Omit<ProductType, 'id' | 'category'> & {
//     categoryId: string
// }
export type ProductCreateType = {
	name: string;
	price: number;
	description: string;
	images: string[];
    categoryId: string
};

export type ProductUpdateType = {
	name: string;
	price: number;
	description: string;
	images: string[];
    category: CategoryType;
};

export type UserRegister = {
	userName: string;
	email: string;
	password: string;
	avatar: string;
};

export type UserType = UserRegister & {
	role: 1 | 0;
	id: string;
};
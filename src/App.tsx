import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchAllProductsAsync } from "./redux/product/productSlice";
import { fetchAllCategoriesAsync } from "./redux/product/categorySlice";

export default function App() {
	const dispatch = useAppDispatch();
	const allCategories = useAppSelector((state) => state.categories.allCategories);

	useEffect(() => {
		dispatch(fetchAllCategoriesAsync());
	}, [dispatch]);
	return (
		<>
			{allCategories.map((category) => (
				<li key={category.id}>{category.name}</li>
			))}
		</>
	);
}

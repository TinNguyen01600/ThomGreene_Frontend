import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import CategoryProductsGrid from "../components/Category/CategoryProductsGrid";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import {
	fetchSelectedCategoryAsync,
	fetchSelectedCategoryProductsAsync,
} from "../redux/slices/categorySlice";

const CategoryPage: React.FC = () => {
	const { categoryId } = useParams();
	const dispatch = useAppDispatch();
	const selectedCategory = useAppSelector(
		(state) => state.categories.selectedCategory
	);
	const products = useAppSelector(
		(state) => state.categories.selectedCategoryProducts
	);

	useEffect(() => {
		dispatch(fetchSelectedCategoryAsync(categoryId));
		dispatch(fetchSelectedCategoryProductsAsync(categoryId));
	}, [dispatch, categoryId]);

	/***************************************************************************************** */

	return (
		<div className="category-page">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="main">
				<CategoryProductsGrid
					category={selectedCategory}
					products={products}
				/>
			</div>
			<Footer />
		</div>
	);
};

export default CategoryPage;

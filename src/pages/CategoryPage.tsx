import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import CategoryProductsGrid from "../components/Category/CategoryProductsGrid";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import {
	fetchSelectedCategoryAsync,
	fetchSelectedCategoryProductsAsync,
} from "../redux/slices/categorySlice";
import MyPagination from "../components/Pagination/MyPagination";
import SelectPerPage from "../components/Pagination/SelectPerPage";

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

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [prodsPerPage, setProdsPerPage] = useState<number>(14);
	const indexOfLastProd = currentPage * prodsPerPage;
	const indexOfFirstProd = indexOfLastProd - prodsPerPage;
	const displayProducts = products.slice(indexOfFirstProd, indexOfLastProd);

	/***************************************************************************************** */

	return (
		<div className="category-page">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="main">
				<p className="title">
					{selectedCategory.name} Seasonal Edit / {products.length}{" "}
					Products
				</p>
				<SelectPerPage
					numberPerPage={prodsPerPage}
					setNumberPerPage={setProdsPerPage}
				/>
				<CategoryProductsGrid
					category={selectedCategory}
					products={displayProducts}
				/>
				<MyPagination
					setPage={setCurrentPage}
					prodsPerPage={prodsPerPage}
					currentProducts={products}
				/>
			</div>
			<Footer />
		</div>
	);
};

export default CategoryPage;

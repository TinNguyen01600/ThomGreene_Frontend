import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllCategoriesAsync } from "../../redux/product/categorySlice";
import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const CategoriesList: React.FC = () => {
	const dispatch = useAppDispatch();
	const categories = useAppSelector(
		(state) => state.categories.allCategories
	);

	useEffect(() => {
		dispatch(fetchAllCategoriesAsync());
	}, [dispatch]);

	const categoriesGrid = [];
	if (categories.length > 0) {
		// get the first 5 categories, in case endpoint API polluted
		for (let i = 0; i < 5; i++) {
			categoriesGrid.push(
				<article className={`cate${i}`}>
					<CategoryCard category={categories[i]} />
				</article>
			);
		}
	}

	return (
		<section className="container">
			<article className="all-products">All products</article>
			{categoriesGrid.map((category) => category)}
		</section>
	);
};

export default CategoriesList;

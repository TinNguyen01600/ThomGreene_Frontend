import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CategoryType, fetchAllCategoriesAsync } from "../../redux/product/categorySlice";
import CategoryCard from "./CategoryCard";

const CategoriesGrid: React.FC = () => {
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

    /********************************************************* */
    const allProductsCategory: CategoryType = {
        id: 0,
        name: 'Fall 2024 Collection',
        image: 'https://media4.giphy.com/media/tfezbVD2V13a0/200.webp?cid=ecf05e478rjmx6t45h99zn33mi5ja0i2oyk0ojdmt2h8uuf0&ep=v1_gifs_search&rid=200.webp&ct=g'
    }

	return (
		<section className="container">
			<article className="all-products">
                <CategoryCard category={allProductsCategory} />
            </article>
			{categoriesGrid.map((category) => category)}
		</section>
	);
};

export default CategoriesGrid;

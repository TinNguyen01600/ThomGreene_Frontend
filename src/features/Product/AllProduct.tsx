import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllProductsAsync } from "../../redux/product/productSlice";
import ProductCard from "./ProductCard";

const AllProducts: React.FC = () => {
	const dispatch = useAppDispatch();
	const allProducts = useAppSelector((state) => state.products.allProducts);
	useEffect(() => {
		dispatch(fetchAllProductsAsync());
	}, [dispatch]);

	const specialLayout = [],
		normalLayout = [];
	if (allProducts.length > 0) {
		for (let i = 0; i < 10; i++) {
			specialLayout.push(
				<article key={i}>
					<ProductCard product={allProducts[i]} />
				</article>
			);
		}
		for (let i = 10; i < allProducts.length; i++) {
			normalLayout.push(
				<article key={i}>
					<ProductCard product={allProducts[i]} />
				</article>
			);
		}
	}

	return (
		<section className="all-products-container">
			<section className="special-layout-products">
				{specialLayout.map((product) => product)}
			</section>
			<section className="normal-layout-products">
				{normalLayout.map((product) => product)}
			</section>
		</section>
	);
};

export default AllProducts;

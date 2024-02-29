import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchAllProductsAsync } from "../redux/slices/productSlice";
import ProductCard from "../components/Product/ProductCard";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

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
				<article className={`product${i}`} key={i}>
					<ProductCard product={allProducts[i]} />
				</article>
			);
		}
		for (let i = 10; i < allProducts.length; i++) {
			normalLayout.push(
				<article className={`product${i}`} key={i}>
					<ProductCard product={allProducts[i]} />
				</article>
			);
		}
	}

	return (
		<div className="all-products-page">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="main">
				<section className="all-products-container">
					<section className="special-layout-products">
						{specialLayout.map((product) => product)}
					</section>
					<section className="normal-layout-products">
						{normalLayout.map((product) => product)}
					</section>
				</section>
			</div>
			<Footer />
		</div>
	);
};

export default AllProducts;

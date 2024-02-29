import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchAllProductsAsync } from "../redux/slices/productSlice";
import ProductCard from "../components/Product/ProductCard";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import FilterAndSort from "../components/Filter_&_Sort/FilterAndSort";

const AllProducts: React.FC = () => {
	const dispatch = useAppDispatch();
    const [display, setDisplay] = useState("All")
	const allProducts = useAppSelector((state) => state.products.allProducts);
	const filteredProducts = useAppSelector(
		(state) => state.products.filteredProducts
	);
    const sortedProducts = useAppSelector(state => state.products.sortedProducts)
	useEffect(() => {
		dispatch(fetchAllProductsAsync());
	}, [dispatch]);

    /*********************************************************************************** */
	let displayProducts = allProducts;

	if (display === "Filter" && filteredProducts.length > 0) {
		displayProducts = filteredProducts;
	}
    else if (display === "Sort" && sortedProducts.length > 0) {
        displayProducts = sortedProducts
    }
    /*********************************************************************************** */
    const specialLayout = [],
		normalLayout = [];
	if (displayProducts.length > 0) {
		for (let i = 0; i < 10; i++) {
			specialLayout.push(
				<article className={`product${i}`} key={i}>
					<ProductCard product={displayProducts[i]} />
				</article>
			);
		}
		for (let i = 10; i < displayProducts.length; i++) {
			normalLayout.push(
				<article className={`product${i}`} key={i}>
					<ProductCard product={displayProducts[i]} />
				</article>
			);
		}
	}

	return (
		<div className="all-products-page">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="filter-sort">
				<FilterAndSort setDisplay={setDisplay}/>
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

import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchAllProductsAsync } from "../redux/slices/productSlice";
import ProductCard from "../components/Product/ProductCard";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import FilterAndSort from "../components/Filter_&_Sort/FilterAndSort";
import MyPagination from "../components/Pagination/MyPagination";
import SelectPerPage from "../components/Pagination/SelectPerPage";

const AllProducts: React.FC = () => {
	const dispatch = useAppDispatch();
	const [display, setDisplay] = useState("All");
	const allProducts = useAppSelector((state) => state.products.allProducts);
	const filteredProducts = useAppSelector(
		(state) => state.products.filteredProducts
	);
	const sortedProducts = useAppSelector(
		(state) => state.products.sortedProducts
	);
	useEffect(() => {
		dispatch(fetchAllProductsAsync());
	}, [dispatch]);

	/*********************************************************************************** */
	let currentProducts = allProducts;

	if (display === "All") {
		currentProducts = allProducts;
	} else if (display === "Filter" && filteredProducts.length > 0) {
		currentProducts = filteredProducts;
	} else if (display === "Sort" && sortedProducts.length > 0) {
		currentProducts = sortedProducts;
	}

	/*********************************************************************************** */
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [prodsPerPage, setProdsPerPage] = useState<number>(14);
	const indexOfLastProd = currentPage * prodsPerPage;
	const indexOfFirstProd = indexOfLastProd - prodsPerPage;
	const displayProducts = currentProducts.slice(
		indexOfFirstProd,
		indexOfLastProd
	);

	/*********************************************************************************** */
	const specialLayout = [],
		normalLayout = [];
	if (displayProducts.length > 0) {
		if (displayProducts.length >= 10) {
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
		} else {
			for (let i = 0; i < displayProducts.length; i++) {
				normalLayout.push(
					<article className={`product${i}`} key={i}>
						<ProductCard product={displayProducts[i]} />
					</article>
				);
			}
		}
	}

	/*********************************************************************************** */
	return (
		<div className="all-products-page">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="filter-sort">
				<FilterAndSort setDisplay={setDisplay} />
			</div>
			<div className="main">
				<SelectPerPage
					numberPerPage={prodsPerPage}
					setNumberPerPage={setProdsPerPage}
				/>
				<section className="all-products-container">
					{displayProducts.length >= 10 && (
						<section className="special-layout-products">
							{specialLayout.map((product) => product)}
						</section>
					)}
					<section className="normal-layout-products">
						{normalLayout.map((product) => product)}
					</section>
				</section>
				<MyPagination
					setPage={setCurrentPage}
					prodsPerPage={prodsPerPage}
					currentProducts={currentProducts}
				/>
			</div>
			<Footer />
		</div>
	);
};

export default AllProducts;

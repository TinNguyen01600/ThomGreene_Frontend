import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
	fetchAllProductsAsync,
	searchForProduct,
} from "../../redux/slices/productSlice";

type Props = {
	setDropDown: (dropDown: string) => void;
};

const Search: React.FC<Props> = ({ setDropDown }) => {
	const [query, setQuery] = useState("");
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(fetchAllProductsAsync());
	}, []);
	const searchedProduct = useAppSelector(
		(state) => state.products.searchedProducts
	);
	const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		dispatch(searchForProduct(e.target.value));
	};

	return (
		<div className="navbar-search-dropdown">
			<form action="" onSubmit={() => navigate("/cart")}>
				<input
					type="text"
					className="form-control"
					placeholder="Enter Search"
					value={query}
					onChange={handleQueryChange}
					autoFocus
				/>
			</form>
			{searchedProduct.length > 0 && (
				<section className="search-results">
					{searchedProduct.map((product) => (
						<div onClick={() => {
                            navigate(`/product/${product.id}`)
                            dispatch(searchForProduct(" "));
                            }}>
							{product.title}
						</div>
					))}
				</section>
			)}
			<button onClick={() => setDropDown("")}>
				<span>Close</span>
			</button>
		</div>
	);
};

export default Search;

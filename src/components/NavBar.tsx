import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAllCategoriesAsync } from "../redux/category/categorySlice";

const NavBar: React.FC = () => {
	const categories = useAppSelector(
		(state) => state.categories.allCategories
	);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchAllCategoriesAsync());
	});

	const categoriesShort = [];
	if (categories.length > 0) {
		for (let i = 0; i < 4; i++) {
			categoriesShort.push(
				<Link to={`/category/${categories[i].id}`}>
					<span>{categories[i].name}</span>
				</Link>
			);
		}
	}

	return (
		<nav>
			<section className="navbar-left">
				{categoriesShort.map((category) => category)}
			</section>
			<section className="navbar-center">E-commerce</section>
			<section className="navbar-right">
				<span>Stores</span>
				<span>About</span>
				<span>Log in</span>
				<Link to={"./cart"}>
					<span>Cart</span>
				</Link>
			</section>
		</nav>
	);
};

export default NavBar;

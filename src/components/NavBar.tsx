import { useEffect } from "react";
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
	for (let i = 0; i < 4; i++) {
		categoriesShort.push(<span>{categories[i].name}</span>);
	}

	return (
		<nav>
			<section className="navbar-left">
				{categoriesShort.map((category) => category)}
			</section>
			<section className="navbar-center">
                E-commerce
            </section>
			<section className="navbar-right">
                <span>Stores</span>
                <span>About</span>
                <span>Log in</span>
                <span>Cart</span>
            </section>
		</nav>
	);
};

export default NavBar;

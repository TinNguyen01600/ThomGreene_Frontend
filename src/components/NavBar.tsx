import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAllCategoriesAsync } from "../redux/category/categorySlice";

const NavBar: React.FC = () => {
	const [dropDown, setDropDown] = useState("");
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
				<Link
					to={`/category/${categories[i].id}`}
					key={categories[i].id}
				>
					<div
						className="navbar-category"
						onMouseOver={() => setDropDown(categories[i].name)}
						onMouseLeave={() => setDropDown("")}
					>
						<span>{categories[i].name}</span>
					</div>
				</Link>
			);
		}
	}

	const dropDownClothes = (
		<table
			onMouseOver={() => setDropDown("Clothes")}
			onMouseLeave={() => setDropDown("")}
		>
			<tbody>
				<tr>
					<th>Highlights</th>
					<th>Gender</th>
					<th>Ready to wear</th>
				</tr>
				<tr>
					<td>New arrivals</td>
					<td>Men</td>
					<td>Coats and outerwear</td>
				</tr>
				<tr>
					<td>Classic uniform</td>
					<td>Women</td>
					<td>Sport coats and tailoring</td>
				</tr>
			</tbody>
		</table>
	);

	return (
		<>
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
			<section className="drop-down">
				{dropDown === "Clothes" ? dropDownClothes : null}
			</section>
		</>
	);
};

export default NavBar;

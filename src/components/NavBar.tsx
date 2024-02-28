import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAllCategoriesAsync } from "../redux/category/categorySlice";
import logo from "../img/logo.png";
import {
	DropDownCart,
	DropDownClothes,
	DropDownElectronics,
	DropDownFurniture,
	DropDownShoes,
} from "./NavBarDropDowns";

const NavBar: React.FC = () => {
	const [dropDown, setDropDown] = useState("");
	const categories = useAppSelector(
		(state) => state.categories.allCategories
	);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
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

	/*********************************************************************************************** */

	return (
		<>
			<nav>
				<section className="navbar-left">
					{categoriesShort.map((category) => category)}
				</section>
				<section
					className="navbar-center"
					onClick={() => navigate("/")}
				>
					<h3>Thom Greene</h3>
					<h5>Finland</h5>
					<img src={logo} alt="" />
				</section>
				<section className="navbar-right">
					<span>Stores</span>
					<span>About</span>
					<span>Log in</span>
					<Link to={"/cart"}>
						<div
							className="navbar-cart"
							onMouseOver={() => setDropDown("Cart")}
							onMouseLeave={() => setDropDown("")}
						>
							<span>Cart</span>
						</div>
					</Link>
				</section>
			</nav>
			<section className="drop-down">
				{dropDown === "Clothes" ? (
					<DropDownClothes setDropDown={setDropDown} />
				) : dropDown === "Electronics" ? (
					<DropDownElectronics setDropDown={setDropDown} />
				) : dropDown === "Furniture" ? (
					<DropDownFurniture setDropDown={setDropDown} />
				) : dropDown === "Shoes" ? (
					<DropDownShoes setDropDown={setDropDown} />
				) : dropDown === "Cart" ? (
					<DropDownCart setDropDown={setDropDown} />
				) : null}
			</section>
		</>
	);
};

export default NavBar;

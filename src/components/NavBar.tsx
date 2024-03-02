import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchAllCategoriesAsync } from "../redux/slices/categorySlice";
import logo from "../img/logo.png";
import search_icon from "../img/search_icon.svg";
import {
	DropDownCart,
	DropDownClothes,
	DropDownElectronics,
	DropDownFurniture,
	DropDownSearch,
	DropDownShoes,
} from "./NavBarDropDowns";
import { WrappedComponentProp } from "../hoc/withUserAuthenticate";
import withUserAuthentication from "../hoc/withUserAuthenticate";

function NavBar({ isUserAuthenticated }: WrappedComponentProp) {
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
					<span onClick={() => setDropDown("Search")}>
						<img
							src={search_icon}
							alt=""
							style={{ height: "3vh" }}
						/>
					</span>
					<span>Stores</span>
					<span>About</span>

					{isUserAuthenticated ? (
						<Link to={"/profile"}>
							<span>Profile</span>
						</Link>
					) : (
						<Link to={"/login"}>
							<span>Log in</span>
						</Link>
					)}

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
				) : dropDown === "Search" ? (
					<DropDownSearch setDropDown={setDropDown} />
				) : null}
			</section>
		</>
	);
}

export default withUserAuthentication(NavBar);

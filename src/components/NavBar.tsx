import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAllCategoriesAsync } from "../redux/category/categorySlice";
import logo from '../img/logo.png'

const NavBar: React.FC = () => {
	const [dropDown, setDropDown] = useState("");
	const categories = useAppSelector(
		(state) => state.categories.allCategories
	);
	const dispatch = useAppDispatch();
    const navigate = useNavigate()
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
	const dropDownElectronics = (
		<table
			onMouseOver={() => setDropDown("Electronics")}
			onMouseLeave={() => setDropDown("")}
		>
			<tbody>
				<tr>
					<th>Gaming</th>
					<th>Mobile Devices</th>
					<th>Computer and office supplies</th>
				</tr>
				<tr>
					<td>Gaming Laptops</td>
					<td>Tablets</td>
					<td>Printers</td>
				</tr>
				<tr>
					<td>Gaming Keyboards</td>
					<td>Smart watches and Sport watches</td>
					<td>Routers and network devices</td>
				</tr>
				<tr>
					<td>Consoles and Accessories</td>
					<td>E-book reading devices</td>
					<td></td>
				</tr>
			</tbody>
		</table>
	);
	const dropDownFurniture = (
		<table
			onMouseOver={() => setDropDown("Furniture")}
			onMouseLeave={() => setDropDown("")}
		>
			<tbody>
				<tr>
					<th>Furniture</th>
					<th>Textiles</th>
					<th>Cooking and dining</th>
                    <th>Decorations</th>
				</tr>
				<tr>
					<td>Armchairs and Divans</td>
					<td>Curtains and Roller blinds</td>
					<td>Plates and bowls</td>
					<td>Candles and Wicks</td>
				</tr>
				<tr>
					<td>Bookshelves</td>
					<td>Carpets</td>
					<td>Baking supplies</td>
					<td>Mirrors</td>
				</tr>
				<tr>
					<td>Sofas</td>
					<td>Blankets</td>
					<td></td>
					<td>Room scents</td>
				</tr>
                <tr>
					<td></td>
					<td>Seat cushions</td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
		</table>
	);
    const dropDownShoes = (
		<table
			onMouseOver={() => setDropDown("Shoes")}
			onMouseLeave={() => setDropDown("")}
		>
			<tbody>
				<tr>
					<td>Loafers</td>
					<td>Brogues</td>
					<td>Heels</td>
				</tr>
				<tr>
					<td>Boots</td>
					<td>Slippers and Sandals</td>
					<td>Sneakers</td>
				</tr>
                <tr>
					<td>Training and Gym</td>
					<td>Track and Field</td>
					<td></td>
				</tr>
			</tbody>
		</table>
	);

	/*********************************************************************************************** */

	return (
		<>
			<nav>
				<section className="navbar-left">
					{categoriesShort.map((category) => category)}
				</section>
				<section className="navbar-center" onClick={() => navigate('/')}>
                    <h3>Thom Greene</h3>
                    <h5>Finland</h5>
                    <img src={logo} alt="" />
                </section>
				<section className="navbar-right">
					<span>Stores</span>
					<span>About</span>
					<span>Log in</span>
					<Link to={"/cart"}>
						<span>Cart</span>
					</Link>
				</section>
			</nav>
			<section className="drop-down">
				{dropDown === "Clothes"
					? dropDownClothes
					: dropDown === "Electronics"
					? dropDownElectronics
					: dropDown === "Furniture"
					? dropDownFurniture
					: dropDown === "Shoes"
					? dropDownShoes
					: null}
			</section>
		</>
	);
};

export default NavBar;

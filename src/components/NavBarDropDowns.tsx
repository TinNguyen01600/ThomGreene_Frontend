import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { CartItemType } from "../misc/types";
import { removeCartItem } from "../redux/slices/cartSlice";

type Props = {
	setDropDown: (dropDown: string) => void;
};

export const DropDownClothes: React.FC<Props> = ({ setDropDown }) => {
	return (
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
};

export const DropDownElectronics: React.FC<Props> = ({ setDropDown }) => {
	return (
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
};

export const DropDownFurniture: React.FC<Props> = ({ setDropDown }) => {
	return (
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
};

export const DropDownShoes: React.FC<Props> = ({ setDropDown }) => {
	return (
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
};

/************************************************************************************** */

export const DropDownCart: React.FC<Props> = ({ setDropDown }) => {
	const cart = useAppSelector((state) => state.cart.cart);
	const dispatch = useAppDispatch();

	const allCartItems: any[] = [];
	cart.forEach((item: CartItemType) => {
		for (let i = 0; i < item.quantity; i++) {
			allCartItems.push(item);
		}
	});

	/*********************************************************************************************** */

	return (
		<table
			className="navbar-cart-dropdown"
			onMouseOver={() => setDropDown("Cart")}
			onMouseLeave={() => setDropDown("")}
		>
			<tbody>
				{cart.length === 0 ? (
					<tr>
						<td
							style={{
								padding: "0 2vw 3vh 2vw",
							}}
						>
							There are no items in your shopping cart.
						</td>
					</tr>
				) : (
					allCartItems.map((item) => (
						<tr key={item.id}>
							<td>
								<figure>
									<img
										src={item.images[0].url}
										alt=""
										onError={(e) => {
											e.currentTarget.src =
												"https://safesendsoftware.com/wp-content/uploads/2016/06/Human-Error.jpg";
										}}
									/>
									<figcaption>
										<p>{item.title}</p>
										<p>Qty: 1</p>
										<button
											onClick={() =>
												dispatch(removeCartItem(item))
											}
										>
											<span>Remove</span>
										</button>
									</figcaption>
								</figure>
								<p>{item.price} €</p>
							</td>
						</tr>
					))
				)}
				<tr>
					<td>
						<Link
							to={"/cart"}
							style={{
								color: "black",
								textDecoration: "none",
								width: "100%",
								display: "flex",
								justifyContent: "space-between",
								padding: "1.5vh 0",
							}}
						>
							<span>VIEW CART</span>
							<p> &gt;</p>
						</Link>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

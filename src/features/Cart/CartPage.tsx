import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { removeCartItem } from "../../redux/cart/cartSlice";

const CartPage: React.FC = () => {
	const cart = useAppSelector((state) => state.cart.cart);
	const dispatch = useAppDispatch();

	const allCartItems: any[] = [];
	cart.forEach((item) => {
		for (let i = 0; i < item.quantity; i++) {
			allCartItems.push(
				<li key={i}>
					<span>{item.title}</span>
					<button
						onClick={() => {
							dispatch(removeCartItem(item));
						}}
					>
						Remove
					</button>
				</li>
			);
		}
	});

	return (
		<div className="cart-page">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="main">
				{cart.length === 0 ? (
					<div style={{ textAlign: "center", margin: "10vh" }}>
						THERE ARE NO ITEMS IN YOUR SHOPPING BAG.
					</div>
				) : (
					<>
						<article className="shoppping-bag">
							{allCartItems.map((item) => item)}
						</article>
						<table className="order-summary">
							<tbody>
								<tr>
									<th>Order summary</th>
								</tr>
								<tr>
									<td>Subtotal</td>
								</tr>
								<tr>
									<td className="checkout-btn">
                                        <span>Proceed to checkout</span>
                                        <p>	&gt;</p>
                                    </td>
								</tr>
							</tbody>
						</table>
					</>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default CartPage;

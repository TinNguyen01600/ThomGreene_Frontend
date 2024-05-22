import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { removeCartItem } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
	const cart = useAppSelector((state) => state.cart.cart);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const allCartItems: any[] = [];
	let subTotal = 0;
	cart.forEach((item) => {
		subTotal += item.price * item.quantity;
		for (let i = 0; i < item.quantity; i++) {
			allCartItems.push(
				<article className="item" key={i}>
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
							<p>{item.name}</p>
							<p>Qty. 1</p>
						</figcaption>
					</figure>

					<div className="price">
						<p>{item.price} €</p>
						<button
							onClick={() => {
								dispatch(removeCartItem(item));
							}}
						>
							<span>Remove</span>
						</button>
					</div>
				</article>
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
							<div className="title">
								Shopping bag. {allCartItems.length} items.
							</div>
							<div className="items">
								{allCartItems.map((item) => item)}
							</div>
							<ul className="notes">
								<li>
									Free returns are available within 14 days of
									your online order delivery.
								</li>
								<li>
									Items must be in perfect condition, some
									exclusions apply.
								</li>
								<li>
									Fragrance items are non-refundable. See our
									returns page for our full policy.
								</li>
							</ul>
						</article>
						<div className="order-summary">
							<div className="summary">
								<p>Order summary</p>
							</div>
							<div className="subtotal">
								<p>Subtotal</p>
								<p>{subTotal}</p>
							</div>
							<button
								className="checkout-btn"
								onClick={() => navigate("/checkout")}
							>
								<span>Proceed to checkout</span>
								<p> &gt;</p>
							</button>
						</div>
					</>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default CartPage;

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
				<li>
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
		<>
			<NavBar />
			{cart.length === 0 ? (
				<div style={{textAlign: 'center', margin: '10vh'}}>THERE ARE NO ITEMS IN YOUR SHOPPING BAG.</div>
			) : (
				allCartItems.map((item) => item)
			)}
			<Footer />
		</>
	);
};

export default CartPage;

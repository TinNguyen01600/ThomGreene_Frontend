import { useAppDispatch, useAppSelector } from "../../app/hooks";
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
            {allCartItems.map(item => item)}
		</>
	);
};

export default CartPage;

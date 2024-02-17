import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchAllProductsAsync } from "./redux/product/productSlice";
import { fetchAllCategoriesAsync } from "./redux/product/categorySlice";
import UserRegisterForm from "./features/User/UserRegister";
import UserSignInForm from "./features/User/UserSignIn";
import UserProfile from "./features/User/UserProfile";
import { getUserFromToken } from "./redux/user/userSlice";
import { addArticle, getCartFromStorage } from "./redux/cart/cartSlice";

export default function App() {
	const dispatch = useAppDispatch();
	const allProducts = useAppSelector((state) => state.products.allProducts);
	useEffect(() => {
		dispatch(fetchAllProductsAsync());
        getCartFromStorage(dispatch)
	}, [dispatch]);

	return (
		<>
			{allProducts.map((product) => (
				<h3 key={product.id}>
					{product.title}
					<button
						onClick={() => {
							dispatch(addArticle(product));
						}}
					>
						Add to cart
					</button>
				</h3>
			))}
		</>
	);
}

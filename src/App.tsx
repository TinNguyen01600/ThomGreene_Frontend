import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { getUserFromToken } from "./redux/user/userSlice";
import { getCartFromStorage } from "./redux/cart/cartSlice";
import UserProfile from "./features/User/UserProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CategoryProducts from "./features/Category/CategoryProducts";
import AllProducts from "./features/Product/AllProduct";

export default function App() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		getCartFromStorage(dispatch);
		getUserFromToken(dispatch);
	}, [dispatch]);

	return (
		<div className="App" data-testid='app'>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<UserProfile />} />
					<Route path="/allproducts" element={<AllProducts />} />
					<Route
						path="/category/:categoryId"
						element={<CategoryProducts />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

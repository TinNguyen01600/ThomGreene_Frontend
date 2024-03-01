import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { saveUserInfo } from "./redux/slices/userSlice";
import UserProfile from "./pages/UserProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryProducts from "./components/Category/CategoryProducts";
import AllProducts from "./pages/AllProducts";
import CartPage from "./pages/CartPage";
import { UserType } from "./misc/types";
import CreateProduct from "./components/Product/CreateProduct";
import LoginPage from "./pages/LoginPage";
import axios from "axios";

export default function App() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const getUserFromToken = async () => {
			const token1 = localStorage.getItem("token");
			if (token1) {
				const user = await axios.get<UserType>(
					"https://api.escuelajs.co/api/v1/auth/profile",
					{
						headers: {
							Authorization: `Bearer ${token1}`,
						},
					}
				);
				dispatch(saveUserInfo(user.data));
			}
		};
		getUserFromToken();
	}, [dispatch]);
	return (
		<div className="App" data-testid="app">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<UserProfile />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/allproducts" element={<AllProducts />} />
					<Route
						path="/category/:categoryId"
						element={<CategoryProducts />}
					/>
					<Route path="/cart" element={<CartPage />} />
					<Route path="create-product" element={<CreateProduct />} />
				</Routes>
			</Router>
		</div>
	);
}

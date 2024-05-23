import UserProfilePage from "./pages/UserProfilePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import CreateProductPage from "./pages/CreateProductPage";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import axios from "axios";
import { UserType } from "./misc/types";
import { saveUserInfo } from "./redux/slices/userSlice";
import UpdateProductPage from "./pages/UpdateProductPage";
import SingleProductPage from "./pages/SingleProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import CategoryPage from "./pages/CategoryPage";
import OrderPage from "./pages/OrderPage";

export default function App() {
    const dispatch = useAppDispatch();
	useEffect(() => {
		const getUserFromToken = async () => {
			const token1 = localStorage.getItem("token");
			if (token1) {
				const user = await axios.get<UserType>(
					`${process.env.REACT_APP_API_URL}auth/profile`,
					{
						headers: {
							Authorization: `Bearer ${token1}`,
						},
					}
				);
				dispatch(saveUserInfo(user.data));
			}
            else {
                dispatch(saveUserInfo(null));
            }
		};
		getUserFromToken();
	}, [dispatch]);
	return (
		<div className="App" data-testid="app">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<UserProfilePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/allproducts" element={<AllProducts />} />
					<Route
						path="/category/:categoryId"
						element={<CategoryPage />}
					/>
                    <Route path="/product/:productId" element={<SingleProductPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/create-product" element={<CreateProductPage />} />
                    <Route path="/product/:productId/update-product" element={<UpdateProductPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/orders" element={<OrderPage />} />
				</Routes>
			</Router>
		</div>
	);
}

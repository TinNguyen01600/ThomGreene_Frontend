import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { getUserFromToken } from "./redux/slices/userSlice";
import { addCartItem } from "./redux/slices/cartSlice";
import UserProfile from "./pages/UserProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryProducts from "./components/Category/CategoryProducts";
import AllProducts from "./pages/AllProducts";
import { fetchAllProductsAsync } from "./redux/slices/productSlice";
import CartPage from "./pages/CartPage";
import { ProductType } from "./misc/types";
import CreateProduct from "./components/Product/CreateProduct";
import LoginPage from "./pages/LoginPage";

export default function App() {
	return (
		<div className="App" data-testid="app">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<UserProfile />} />
                    <Route path="/login" element={<LoginPage />}/>
					<Route path="/allproducts" element={<AllProducts />} />
					<Route
						path="/category/:categoryId"
						element={<CategoryProducts />}
					/>
                    <Route path="/cart" element={<CartPage />} />
                    <Route path='create-product' element={<CreateProduct />} />
				</Routes>
			</Router>
		</div>
	);
}

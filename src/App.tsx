import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getUserFromToken } from "./redux/user/userSlice";
import { addCartItem } from "./redux/cart/cartSlice";
import UserProfile from "./features/User/UserProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CategoryProducts from "./features/Category/CategoryProducts";
import AllProducts from "./features/Product/AllProduct";
import { fetchAllProductsAsync } from "./redux/product/productSlice";
import CartPage from "./features/Cart/CartPage";
import { ProductType } from "./app/types";
import CreateProduct from "./features/Product/CreateProduct";

export default function App() {
	return (
		<div className="App" data-testid="app">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<UserProfile />} />
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

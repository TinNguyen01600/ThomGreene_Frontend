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

export default function App() {
	// const dispatch = useAppDispatch();
	// const allproducts = useAppSelector((state) => state.products.allProducts);
	// useEffect(() => {
	// 	dispatch(fetchAllProductsAsync());
	// }, [dispatch]);

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
				</Routes>
			</Router>

			{/* {allproducts.map((prod) => (
				<div key={prod.id}>
					{prod.title}
					<button
						onClick={() => {
							dispatch(addCartItem(prod));
						}}
					>
						add to cart
					</button>
				</div>
			))} */}
		</div>
	);
}

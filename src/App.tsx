import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchAllProductsAsync } from "./redux/product/productSlice";
import { fetchAllCategoriesAsync } from "./redux/product/categorySlice";
import UserRegisterForm from "./features/User/UserRegister";

export default function App() {
	return (
		<>
			<UserRegisterForm />
		</>
	);
}

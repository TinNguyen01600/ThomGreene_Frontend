import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchAllProductsAsync } from "./redux/product/productSlice";
import { fetchAllCategoriesAsync } from "./redux/product/categorySlice";
import UserRegisterForm from "./features/User/UserRegister";
import UserSignInForm from "./features/User/UserSignIn";
import UserProfile from "./features/User/UserProfile";
import { getUserFromToken } from "./redux/user/userSlice";

export default function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            getUserFromToken(dispatch, token)
        }
    })

	return (
		<>
            <UserSignInForm />
            <UserProfile />
		</>
	);
}

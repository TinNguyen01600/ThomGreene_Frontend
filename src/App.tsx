import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { getUserFromToken } from "./redux/user/userSlice";
import { getCartFromStorage } from "./redux/cart/cartSlice";
import UserProfile from "./features/User/UserProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		getCartFromStorage(dispatch);
		getUserFromToken(dispatch);
	}, [dispatch]);

	return (
		<Router>
            <Routes>
                <Route path="/" element={<>Home</>}/>
                <Route path="/profile" element={<UserProfile />} />
            </Routes>
		</Router>
	);
}

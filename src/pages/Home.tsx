import { useEffect } from "react";
import axios from "axios";

import CategoriesGrid from "../components/Category/CategoriesGrid";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useAppDispatch } from "../redux/hooks";
import { saveUserInfo } from "../redux/slices/userSlice";
import { UserType } from "../misc/types";

const Home: React.FC = () => {
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
		<div className="home-page">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="main">
				<CategoriesGrid />
			</div>
			<div className="footer">
                <Footer />
			</div>
		</div>
	);
};

export default Home;

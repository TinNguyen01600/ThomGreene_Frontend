import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState } from "react";
import { saveUserInfo } from "../../redux/user/userSlice";

const UserProfile: React.FC = () => {
    const dispatch = useAppDispatch()
	const onClick = async () => {
		const token = localStorage.getItem("token");
		console.log(token);
		const user = await axios(
			"https://api.escuelajs.co/api/v1/auth/profile",
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		console.log(user.data);
        dispatch(saveUserInfo(user.data))
	};

	return (
		<>
			<h1>Personal Info</h1>
			{/* <button onClick={onClick}>Click me</button> */}
		</>
	);
};

export default UserProfile;

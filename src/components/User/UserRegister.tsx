import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { UserRegister } from "../../misc/types";
import { UserSignInType } from "./UserSignIn";
import { useState } from "react";

const UserRegisterForm: React.FC = () => {
	const navigate = useNavigate();
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<UserRegister>();
	const [isError, setIsError] = useState<boolean>(false);

	/*********************************************************************************** */

	const onSubmit: SubmitHandler<UserRegister> = (data) => {
		// axios
		// 	.post("https://api.escuelajs.co/api/v1/users/is-available", {
		// 		email: data.email,
		// 	})
		// 	.then((response) => {
		// 		if (response.status === 201)
		// 			if (response.data.isAvailable === true) {
		//                 setIsError(false)
		// 				const data1 = {
		// 					...data,
		// 					avatar: `https://robohash.org/${data.name}`,
		// 				};
		// 				axios
		// 					.post(
		// 						"https://api.escuelajs.co/api/v1/users/",
		// 						data1
		// 					)
		// 					.then((response) => {
		// 						if (response.status === 201) {
		// 							signin({
		// 								email: response.data.email,
		// 								password: response.data.password,
		// 							});
		// 						}
		// 					})
		// 					.catch((error) => console.log(error));
		// 			} else {
		// 				setIsError(true);
		// 			}
		// 	})
		// 	.catch((error) => console.log(error));

		/********************************************************************************************* */
		const data1 = {
			...data,
			avatar: `https://robohash.org/${data.userName}`,
		};
		axios
			.post("https://api.escuelajs.co/api/v1/users/", data1)
			.then((response) => {
				if (response.status === 201) {
					signin({
						email: response.data.email,
						password: response.data.password,
					});
				}
			})
			.catch((error) => console.log(error));
	};

	const signin = (data: UserSignInType) => {
		axios
			.post("https://api.escuelajs.co/api/v1/auth/login", data)
			.then((response) => {
				if (response.status === 201) {
					localStorage.setItem("token", response.data.access_token);
					console.log("Sign In success, Token saved");
					navigate("/");
				}
			})
			.catch((error) => console.log(error));
	};

	/*********************************************************************************** */

	return (
		<main className="register-form">
			<p>New Customer</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="name">Name*</label>
				<input
					id="name"
					type="text"
					placeholder="Name"
					{...register("userName")}
					required
				/>

				<label htmlFor="email1">Email*</label>
				<input
					id="email1"
					type="email"
					placeholder="Email"
					{...register("email")}
					required
				/>
				{isError && (
					<section className="error" style={{ color: "red" }}>
						The email is aleady registered.
					</section>
				)}

				<label htmlFor="password1">Password*</label>
				<input
					id="password1"
					type="password"
					placeholder="Password"
					{...register("password")}
					required
				/>

				<input type="submit" value="Register" className="submit-btn" />
			</form>
		</main>
	);
};

export default UserRegisterForm;

import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Console } from "console";

export type UserSignInType = {
	email: string;
	password: string;
};

const UserSignInForm: React.FC = () => {
	const navigate = useNavigate();
	const [isError, setIsError] = useState<boolean>(false);
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<UserSignInType>();
	const onSubmit: SubmitHandler<UserSignInType> = (data) => {
		axios
			.post(`${process.env.REACT_APP_API_URL}auth/login`, data)
			.then((response) => {
                console.log(response.status);
				if (response.status === 200) {
					setIsError(false);
                    console.log(response.data);
					localStorage.setItem("token", response.data);
					console.log("Sign In success, Token saved");
					navigate("/");
				}
			})
			.catch((error) => {
				setIsError(true);
				console.log(error);
			});
	};

	return (
		<main className="signin-form">
			<p>Returning Customer</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="email">Email*</label>
				<input
					id="email"
					type="email"
					placeholder="email"
					{...register("email")}
					required
				/>

				<label htmlFor="password">Password*</label>
				<input
					id="password"
					type="password"
					placeholder="password"
					{...register("password")}
					required
				/>

				{isError && (
					<section className="error">Invalid credentials</section>
				)}

				<input type="submit" value="Sign In" className="submit-btn" />
			</form>
		</main>
	);
};

export default UserSignInForm;

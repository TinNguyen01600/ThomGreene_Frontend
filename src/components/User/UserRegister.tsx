import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useAppDispatch } from "../../redux/hooks";
import { UserRegister } from "../../misc/types";
import { useNavigate } from "react-router-dom";
import { UserSignInType } from "./UserSignIn";

const UserRegisterForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<UserRegister>();

	/*********************************************************************************** */

	const onSubmit: SubmitHandler<UserRegister> = (data) => {
		const data1 = { ...data, avatar: `https://robohash.org/${data.name}` };
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
					{...register("name")}
					required
				/>

				<label htmlFor="email">Email*</label>
				<input
					id="email"
					type="email"
					placeholder="Email"
					{...register("email")}
					required
				/>

				<label htmlFor="password">Password*</label>
				<input
					id="password"
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

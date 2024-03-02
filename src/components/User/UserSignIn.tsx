import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type UserSignInType = {
	email: string;
	password: string;
};

const UserSignInForm: React.FC = () => {
	const navigate = useNavigate();
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<UserSignInType>();
	const onSubmit: SubmitHandler<UserSignInType> = (data) => {
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

	return (
		<main className="form">
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type="email"
					placeholder="email"
					{...register("email")}
					required
				/>
				<input
					type="password"
					placeholder="password"
					{...register("password")}
					required
				/>

				<input type="submit" value="Sign In" />
			</form>
		</main>
	);
};

export default UserSignInForm;

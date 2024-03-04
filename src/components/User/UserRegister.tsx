import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useAppDispatch } from "../../redux/hooks";
import { saveUserInfo } from "../../redux/slices/userSlice";
import { UserRegister } from "../../misc/types";

const UserRegisterForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<UserRegister>();

	const onSubmit: SubmitHandler<UserRegister> = (data) => {
		axios
			.post("https://api.escuelajs.co/api/v1/users/", data)
			.then((response) => {
				if (response.status === 201) {
					dispatch(saveUserInfo(response.data));
				}
			})
			.catch((error) => console.log(error));
	};

	return (
		<main className="register-form">
			<p>New Customer</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="name">Name*</label>
				<input
					type="text"
					placeholder="Name"
					{...register("name")}
					required
				/>

				<label htmlFor="email">Email*</label>
				<input
					type="email"
					placeholder="Email"
					{...register("email")}
					required
				/>

				<label htmlFor="password">Password*</label>
				<input
					type="password"
					placeholder="Password"
					{...register("password")}
					required
				/>

				<label htmlFor="avatar">Avatar*</label>
				<input
					type="avatar"
					placeholder="Avatar"
					{...register("avatar")}
					required
				/>

				<input type="submit" value="Register" className="submit-btn"/>
			</form>
		</main>
	);
};

export default UserRegisterForm;

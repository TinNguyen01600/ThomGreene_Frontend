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
		<main className="form">
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					placeholder="Name"
					{...register("name")}
					required
				/>
				<input
					type="email"
					placeholder="Email"
					{...register("email")}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					{...register("password")}
					required
				/>
				<input
					type="avatar"
					placeholder="Avatar"
					{...register("avatar")}
					required
				/>

				<input type="submit" value="Register" />
			</form>
		</main>
	);
};

export default UserRegisterForm;

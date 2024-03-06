import { UserType } from "../../misc/types";
import { useAppSelector } from "../../redux/hooks";

import { useState } from "react";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

export default function UserUpdate() {
	const user = useAppSelector((state) => state.users.user);
	const [name, setName] = useState(user?.name);
	const [email, setEmail] = useState(user?.email);
	const [passwd, setPasswd] = useState(user?.password);
	const [avatar, setAvatar] = useState(user?.avatar);

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<UserType>();
	const onSubmit: SubmitHandler<UserType> = (data) => {
		axios
			.put(`https://api.escuelajs.co/api/v1/users/${user?.id}`, data)
			.then((response) => {
				if (response.status === 200) {
					console.log("update success");
					window.location.reload();
				}
			})
			.catch((error) => console.log(error));
	};

	return (
		<main className="user-update-form">
			<p>Personal Info</p>
			<form action="" onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					value={name}
					placeholder="Name"
					{...register("name")}
					onChange={(e) => setName(e.target.value)}
				/>

				<label htmlFor="email">Email</label>
				<input
					type="email"
					value={email}
					placeholder="Email"
					{...register("email")}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label htmlFor="password">Password</label>
				<input
					type="password"
					value={passwd}
					placeholder="Password"
					{...register("password")}
					onChange={(e) => setPasswd(e.target.value)}
				/>

				<label htmlFor="avatar">Avatar</label>
				<input
					type="url"
					value={avatar}
					placeholder="Avatar"
					{...register("avatar")}
					onChange={(e) => setAvatar(e.target.value)}
				/>

				<label htmlFor="role">Role</label>
				<select id="role" {...register("role")}>
					<option value="customer">Customer</option>
					<option value="admin">Admin</option>
				</select>

				<input type="submit" value="Update" className="update-btn"/>
			</form>
		</main>
	);
}

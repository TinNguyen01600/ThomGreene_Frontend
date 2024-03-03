import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useState } from "react";
import UserUpdate from "../components/User/UserUpdate";
import NavBar from "../components/NavBar";
import withUserAuthentication, {
	WrappedComponentProp,
} from "../hoc/withUserAuthenticate";

function UserProfilePage({ isUserAuthenticated }: WrappedComponentProp) {
	const user = useAppSelector((state) => state.users.user);
	const [update, setUpdate] = useState<boolean>(false);
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem("token");
		navigate("/");
	};

	return (
		<div className="user-profile-page">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="main">
				{isUserAuthenticated ? (
					<>
						<h1>Personal Info</h1>
						{!update ? (
							<>
								<table>
									<tbody>
										<tr>
											<td>Name</td>
											<td>{user?.name}</td>
										</tr>
										<tr>
											<td>Email address</td>
											<td>{user?.email}</td>
										</tr>
										<tr>
											<td>Role</td>
											<td>{user?.role}</td>
										</tr>
									</tbody>
								</table>
								<img
									src={user?.avatar}
									alt=""
									onError={(e) => {
										e.currentTarget.src = `https://robohash.org/${user?.name}`;
									}}
								/>
								<button
									onClick={() => navigate("/create-product")}
								>
									Create new product
								</button>
								<button onClick={() => setUpdate(!update)}>
									Edit
								</button>
							</>
						) : (
							<>
								<UserUpdate />
								<button onClick={() => setUpdate(!update)}>
									Cancel
								</button>
							</>
						)}

						<button onClick={logout}>Log out</button>
					</>
				) : (
					<>
						<h3>You have not signed in yet.</h3>
						<button onClick={() => navigate("/login")}>
							Sign in
						</button>
					</>
				)}
			</div>
		</div>
	);
}

export default withUserAuthentication(UserProfilePage);

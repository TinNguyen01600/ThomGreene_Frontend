import { useAppSelector } from "../redux/hooks";
import { saveUserInfo } from "../redux/slices/userSlice";

const UserProfile: React.FC = () => {
	const user = useAppSelector((state) => state.users.user);
	const logout = () => {
		localStorage.removeItem("token");
		saveUserInfo(null);
		window.location.reload();
	};

	return (
		<>
			<h1>Personal Info</h1>
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
					e.currentTarget.src = `https://robohash.org/${user?.name}`}}
			/>
			<button onClick={logout}>Log out</button>
		</>
	);
};

export default UserProfile;

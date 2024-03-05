import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useState } from "react";
import UserUpdate from "../components/User/UserUpdate";
import NavBar from "../components/NavBar";
import withUserAuthentication, {
	WrappedComponentProp,
} from "../hoc/withUserAuthenticate";
import Footer from "../components/Footer";

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
					<article className="already-signin">
						<menu>
							<button>
								<span>Email Preferences</span>
							</button>
							<button>
								<span>Address Book</span>
							</button>
							<button onClick={logout}>
								<span>Log out</span>
							</button>
						</menu>

						<section className="info">
							{!update ? (
								<>
									<div className="container">
										<div className="head">
											Personal Info
										</div>
										<div className="body">
											<div className="row">
												<p>Name</p>
												<p>{user?.name}</p>
											</div>
											<div className="row">
												<p>Email address</p>
												<p>{user?.email}</p>
											</div>
											<div className="row">
												<p>Role</p>
												<p>{user?.role}</p>
											</div>
										</div>
										<div className="foot">
											<div className="btn-group">
												<button
													className="edit-btn"
													onClick={() =>
														setUpdate(!update)
													}
												>
													<span>Edit</span>
												</button>
												<button
													className="create-btn"
													onClick={() =>
														navigate(
															"/create-product"
														)
													}
												>
													<span>
														Create new product
													</span>
												</button>
											</div>
										</div>
									</div>
									<img
										src={user?.avatar}
										alt=""
										onError={(e) => {
											e.currentTarget.src = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxfsxKp3KErM3lZLqJc4wv0KECUCrMHhX0OA&usqp=CAU`;
										}}
									/>
								</>
							) : (
								<div>
									<UserUpdate />
									<button
										onClick={() => setUpdate(!update)}
										className="cancel-update-btn"
									>
										<span>Cancel</span>
									</button>
								</div>
							)}
						</section>
					</article>
				) : (
					<article className="not-signin">
						<h3>You have not signed in yet.</h3>
						<button onClick={() => navigate("/login")}>
							<span>Sign in</span>
						</button>
					</article>
				)}
			</div>
			<Footer />
		</div>
	);
}

export default withUserAuthentication(UserProfilePage);

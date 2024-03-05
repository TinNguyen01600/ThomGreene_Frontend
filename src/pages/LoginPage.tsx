import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import UserRegisterForm from "../components/User/UserRegister";
import UserSignInForm from "../components/User/UserSignIn";
import withUserAuthentication, {
	WrappedComponentProp,
} from "../hoc/withUserAuthenticate";
import Footer from "../components/Footer";

function LoginPage({ isUserAuthenticated }: WrappedComponentProp) {
	return (
		<div className="login-page">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="main">
				{isUserAuthenticated && (
					<div className="already-login">
						<h4>You're already logged in</h4>
						<Link to={"/profile"}>
							<p>Go to profile</p>
						</Link>
						<p>Or sign in with another account</p>
					</div>
				)}
				<div className="forms">
					<UserSignInForm />
					<UserRegisterForm />
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default withUserAuthentication(LoginPage);

import NavBar from "../../components/NavBar";
import UserRegisterForm from "./UserRegister";
import UserSignInForm from "./UserSignIn";
import withUserAuthentication, {
	WrappedComponentProp,
} from "../../hoc/withUserAuthenticate";
import UserProfile from "./UserProfile";

function LoginPage({ isUserAuthenticated }: WrappedComponentProp) {
	return (
		<div className="login-page">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="main">
				{isUserAuthenticated ? (
					<UserProfile />
				) : (
					<>
						<UserRegisterForm />
						<UserSignInForm />
					</>
				)}
			</div>
		</div>
	);
}

export default withUserAuthentication(LoginPage);

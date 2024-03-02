import NavBar from "../components/NavBar";
import CreateProduct from "../components/Product/CreateProduct";
import withUserAuthentication, {
	WrappedComponentProp,
} from "../hoc/withUserAuthenticate";

function CreateProductPage({ isUserAuthenticated }: WrappedComponentProp) {
	return (
		<div className="create-product-page">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="main">
				<CreateProduct />
			</div>
		</div>
	);
}

export default withUserAuthentication(CreateProductPage);

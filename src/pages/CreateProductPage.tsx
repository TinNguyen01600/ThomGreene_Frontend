import Footer from "../components/Footer";
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
				{isUserAuthenticated ? (
					<CreateProduct />
				) : (
					<h3>You are not authenticated to create new product</h3>
				)}
			</div>
			<Footer />
		</div>
	);
}

export default withUserAuthentication(CreateProductPage);

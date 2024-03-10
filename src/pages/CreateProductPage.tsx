import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import CreateProduct from "../components/Product/CreateProduct";
import withAdminAuthentication, {
	WrappedComponentProp,
} from "../hoc/withAdminAuthenticate";

function CreateProductPage({ isAdminAuthenticated }: WrappedComponentProp) {
	return (
		<div className="create-product-page">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="main">
				{isAdminAuthenticated ? (
					<CreateProduct />
				) : (
					<h3>You are not authenticated to create new product</h3>
				)}
			</div>
			<Footer />
		</div>
	);
}

export default withAdminAuthentication(CreateProductPage);

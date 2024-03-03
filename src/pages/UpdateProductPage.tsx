import NavBar from "../components/NavBar";
import withAdminAuthentication, {
	WrappedComponentProp,
} from "../hoc/withAdminAuthenticate";

function UpdateProductPage({ isAdminAuthenticated }: WrappedComponentProp) {
	return (
		<div className="update-product-page">
			<div className="nav">
                <NavBar />
            </div>
			<div className="main">
				{isAdminAuthenticated ? (
					<div className="form">
                        edit product here
                    </div>
				) : (
					<h3>You are not allowed to update product</h3>
				)}
			</div>
		</div>
	);
}

export default withAdminAuthentication(UpdateProductPage);

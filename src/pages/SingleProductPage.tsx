import { useNavigate, useParams } from "react-router-dom";
import withAdminAuthentication, {
	WrappedComponentProp,
} from "../hoc/withAdminAuthenticate";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { fetchSingleProductAsync } from "../redux/slices/productSlice";
import NavBar from "../components/NavBar";
import { addCartItem } from "../redux/slices/cartSlice";
import Footer from "../components/Footer";
import axios from "axios";

function SingleProductPage({ isAdminAuthenticated }: WrappedComponentProp) {
	const product = useAppSelector((state) => state.products.singleProduct);
	const { productId } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (productId) dispatch(fetchSingleProductAsync(productId));
	});
	const otherImgs: any = [];
	if (product?.images.length && product?.images.length > 1) {
		product?.images.forEach((img) =>
			otherImgs.push(
				<img
					key={img.id}
					src={img.url}
					alt=""
					onError={(e) => {
						e.currentTarget.src =
							"https://safesendsoftware.com/wp-content/uploads/2016/06/Human-Error.jpg";
					}}
				/>
			)
		);
	}

	/******************************************************************************************** */

	const deleteProduct = () => {
		axios
			.delete(`https://api.escuelajs.co/api/v1/products/${productId}`)
			.then((response) => {
				console.log(response);
				if (response.data === true) navigate("/allproducts");
			})
			.catch((error) => console.log(error));
	};

	/******************************************************************************************** */

	return (
		<div className="single-product-page">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="main">
				<figure>
					<img
						src={product?.images[0].url}
						alt=""
						onError={(e) => {
							e.currentTarget.src =
								"https://safesendsoftware.com/wp-content/uploads/2016/06/Human-Error.jpg";
						}}
					/>
					<figcaption>
						<h3>{product?.name}</h3>
						<p>{product?.price} €</p>
						<p>{product?.description}</p>
						<button
							onClick={() => {
								if (product) dispatch(addCartItem(product));
							}}
						>
							<span>Add to cart</span>
						</button>
						{isAdminAuthenticated && (
							<div className="btn-group">
								<button
									className="edit-btn"
									onClick={() =>
										navigate(
											`/product/${product?.id}/update-product`
										)
									}
								>
									<span>Edit</span>
								</button>
								<button
									className="delete-btn"
									onClick={deleteProduct}
								>
									<span>Delete product</span>
								</button>
							</div>
						)}
					</figcaption>
				</figure>
				<div className="other-imgs">
					{otherImgs.map((img: any) => img)}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default withAdminAuthentication(SingleProductPage);

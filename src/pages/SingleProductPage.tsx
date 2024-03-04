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

function SingleProductPage({ isAdminAuthenticated }: WrappedComponentProp) {
	const product = useAppSelector((state) => state.products.singleProduct);
	const { productId } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (productId) dispatch(fetchSingleProductAsync(parseInt(productId)));
	});
	const otherImgs: any = [];
	if (product?.images.length && product?.images.length > 1) {
		product?.images.forEach((img) =>
			otherImgs.push(
				<img
					src={img}
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

	return (
		<div className="single-product-page">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="main">
				<figure>
					<img
						src={product?.images[0]}
						alt=""
						onError={(e) => {
							e.currentTarget.src =
								"https://safesendsoftware.com/wp-content/uploads/2016/06/Human-Error.jpg";
						}}
					/>
					<figcaption>
						<h3>{product?.title}</h3>
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

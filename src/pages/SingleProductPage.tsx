import { useNavigate, useParams } from "react-router-dom";
import withAdminAuthentication, {
	WrappedComponentProp,
} from "../hoc/withAdminAuthenticate";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { fetchSingleProductAsync } from "../redux/slices/productSlice";
import NavBar from "../components/NavBar";
import { addCartItem } from "../redux/slices/cartSlice";

function SingleProductPage({ isAdminAuthenticated }: WrappedComponentProp) {
	const product = useAppSelector((state) => state.products.singleProduct);
	const { productId } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (productId) dispatch(fetchSingleProductAsync(parseInt(productId)));
	});

	return (
		<div className="single-product-page">
			<div className="nav">
				<NavBar />
			</div>
			<div className="main">
				{product?.title}
				{isAdminAuthenticated && (
					<button
						onClick={() =>
							navigate(`/product/${product?.id}/update-product`)
						}
					>
						Edit
					</button>
				)}
				<img
					src={product?.images[0]}
					alt=""
					onError={(e) => {
						e.currentTarget.src =
							"https://safesendsoftware.com/wp-content/uploads/2016/06/Human-Error.jpg";
					}}
				/>
				<button
					onClick={() => {
						if (product) dispatch(addCartItem(product));
					}}
				>
					Add to cart
				</button>
			</div>
		</div>
	);
}

export default withAdminAuthentication(SingleProductPage);

import { useAppDispatch } from "../../redux/hooks";
import { ProductType } from "../../misc/types";
import { addCartItem } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

type Props = {
	product: ProductType;
};

const ProductCard: React.FC<Props> = ({ product }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	return (
		<article className="product-card">
			<div className="product-card-inner">
				<figure className="product-card-front">
					<img
						src={product.images[0].url}
						alt=""
						onError={(e) => {
							e.currentTarget.src =
								"https://safesendsoftware.com/wp-content/uploads/2016/06/Human-Error.jpg";
						}}
					/>
				</figure>
				<figcaption className="product-card-back">
					<p>{product.name}</p>
					<p>{product.price} €</p>
					<button
						className="product-detail"
						onClick={() => {
							navigate(`/product/${product.id}`);
						}}
					>
						<span>view detail</span>
					</button>
					<button
						className="product-add"
						onClick={() => dispatch(addCartItem(product))}
					>
						<span>add to cart</span>
					</button>
				</figcaption>
			</div>
		</article>
	);
};

export default ProductCard;

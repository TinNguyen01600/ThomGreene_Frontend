import { useAppDispatch } from "../../redux/hooks";
import { ProductType } from "../../misc/types";
import { addCartItem } from "../../redux/slices/cartSlice";

type Props = {
	product: ProductType;
};

const ProductCard: React.FC<Props> = ({ product }) => {
	const dispatch = useAppDispatch();
	return (
		<article className="product-card">
			<div className="product-card-inner">
				<figure className="product-card-front">
					<img
						src={product.images[0]}
						alt=""
						onError={(e) => {
							e.currentTarget.src = "https://safesendsoftware.com/wp-content/uploads/2016/06/Human-Error.jpg";
						}}
					/>
				</figure>
				<figcaption className="product-card-back">
					<p>{product.title}</p>
					<p>{product.price * 100} €</p>
					<button className="product-detail">view detail</button>
					<button
						className="product-add"
						onClick={() => dispatch(addCartItem(product))}
					>
						add to cart
					</button>
				</figcaption>
			</div>
		</article>
	);
};

export default ProductCard;

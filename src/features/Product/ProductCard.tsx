import { useAppDispatch } from "../../app/hooks";
import { ProductType } from "../../app/types";
import { addCartItem } from "../../redux/cart/cartSlice";

type Props = {
	product: ProductType;
};

const ProductCard: React.FC<Props> = ({ product }) => {
    const dispatch = useAppDispatch()
	return (
		<article className="product-card">
			<div className="product-card-inner">
				<figure className="product-card-front">
					<img src={product.images[0]} alt="" />
				</figure>
				<figcaption className="product-card-back">
					<p>{product.title}</p>
					<p>{product.price * 100} €</p>
                    <button className="product-detail">view detail</button>
                    <button className="product-add" onClick={() => dispatch(addCartItem(product))}>add to cart</button>
				</figcaption>
			</div>
		</article>
	);
};

export default ProductCard;

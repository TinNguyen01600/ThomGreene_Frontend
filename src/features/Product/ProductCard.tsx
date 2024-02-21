import { ProductType } from "../../app/types";

type Props = {
	product: ProductType;
};

const ProductCard: React.FC<Props> = ({ product }) => {
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
                    <button className="product-add">add to cart</button>
				</figcaption>
			</div>
		</article>
	);
};

export default ProductCard;

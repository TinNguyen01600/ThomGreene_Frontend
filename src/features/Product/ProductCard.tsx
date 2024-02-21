import { ProductType } from "../../redux/product/productSlice";

type Props = {
	product: ProductType;
};

const ProductCard: React.FC<Props> = ({ product }) => {
	return (
		<>
			<article className="product-card">
				<div className="product-card-inner">
					<figure className="product-card-front">
						<img src={product.images[0]} alt="" />
					</figure>
					<figure className="product-card-back">
						<img src={product.images[1]} alt="" />
					</figure>
				</div>
				<figcaption>
					<p>{product.title}</p>
					<p>{product.price * 100} €</p>
				</figcaption>
			</article>
		</>
	);
};

export default ProductCard;

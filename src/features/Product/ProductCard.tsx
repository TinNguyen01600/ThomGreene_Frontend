import { ProductType } from "../../redux/product/productSlice";

type Props = {
	product: ProductType;
};

const ProductCard: React.FC<Props> = ({ product }) => {
	return (
		<article className="product-card">
			<div className="product-card-inner">
				<img src={product.images[0]} alt="" />
			</div>
			<div>
				<p>{product.title}</p>
				<p>{product.price * 100} €</p>
			</div>
		</article>
	);
};

export default ProductCard;

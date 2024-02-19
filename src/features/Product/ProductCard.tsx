import { ProductType } from "../../redux/product/productSlice"

type Props = {
    product: ProductType
}

const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <figure>
            <img src={product.images[0]} alt="" />
            <figcaption>{product.title}</figcaption>
        </figure>
    )
}

export default ProductCard
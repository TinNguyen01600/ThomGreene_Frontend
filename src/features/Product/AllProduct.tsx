import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchAllProductsAsync } from "../../redux/product/productSlice"
import ProductCard from "./ProductCard"

const AllProducts: React.FC = () => {
    const dispatch = useAppDispatch()
    const allProducts = useAppSelector(state => state.products.allProducts)
    useEffect(() => {
        dispatch(fetchAllProductsAsync())
    }, [dispatch])

    return (
        <section className="all-products-container">
            {allProducts.map(product => (
                <article key={product.id}>
                    <ProductCard product={product} />
                </article>
            ))}
        </section>
    )
}

export default AllProducts
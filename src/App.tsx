import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchAllProductsAsync } from "./redux/product/productSlice";

export default function App() {
	const dispatch = useAppDispatch();
	const allProducts = useAppSelector((state) => state.products.allProducts);

    useEffect(() => {
        dispatch(fetchAllProductsAsync())
    }, [dispatch])
	return (
        <>
            {allProducts.map(product => (
                <li key={product.id}>{product.title}</li>
            ))}
        </>
    )
}

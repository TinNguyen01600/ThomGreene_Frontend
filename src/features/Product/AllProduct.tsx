import { useEffect } from "react"
import { useAppDispatch } from "../../app/hooks"
import { fetchAllProductsAsync } from "../../redux/product/productSlice"

const AllProducts: React.FC = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchAllProductsAsync())
    }, [dispatch])

    return (
        <>
            All products
        </>
    )
}

export default AllProducts
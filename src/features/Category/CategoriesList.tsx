import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchAllCategoriesAsync } from "../../redux/product/categorySlice"

const CategoriesList: React.FC = () => {
    const dispatch = useAppDispatch()
    const categories = useAppSelector(state => state.categories.allCategories)
    useEffect(() => {
        dispatch(fetchAllCategoriesAsync())
    }, [dispatch])

    return (
        <>
            {categories.map(category => (
                <section>
                    {category.name}
                </section>
            ))}
        </>
    )
}

export default CategoriesList
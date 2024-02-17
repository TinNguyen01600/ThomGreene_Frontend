import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchAllCategoriesAsync } from "../../redux/product/categorySlice"
import { Link } from "react-router-dom"

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
                    {category.name} {category.id}
                    <Link to={`/category/${category.id}`}>
                        <button>Click me</button>
                    </Link>
                </section>
            ))}
        </>
    )
}

export default CategoriesList
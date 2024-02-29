import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchSelectedCategoryAsync, fetchSelectedCategoryProductsAsync } from "../../redux/slices/categorySlice";

const CategoryProducts: React.FC = () => {
	const { categoryId } = useParams();
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState<boolean>(false);
	const selectedCategory = useAppSelector(
		(state) => state.categories.selectedCategory
	);

	useEffect(() => {
		setLoading(true);
		dispatch(fetchSelectedCategoryAsync(categoryId));
        dispatch(fetchSelectedCategoryProductsAsync(categoryId))
		setLoading(false);
	}, [dispatch]);
	return (
		<>
			{loading ? (
				<>..One Moment Please..</>
			) : (
				<>
					{selectedCategory.name} Seasonal Edit
					<img src={selectedCategory.image} alt="" />
				</>
			)}
		</>
	);
};

export default CategoryProducts;

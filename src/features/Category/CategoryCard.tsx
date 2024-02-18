import { CategoryType } from "../../redux/product/categorySlice";

type Props = {
	category: CategoryType;
};

const CategoryCard: React.FC<Props> = ({ category }) => {
	return (
		<figure className="card">
			<img src={category.image} alt="" />
			<figcaption>{category.name}</figcaption>
		</figure>
	);
};

export default CategoryCard;

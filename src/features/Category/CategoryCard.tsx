import { Link } from "react-router-dom";
import { CategoryType } from "../../redux/product/categorySlice";

type Props = {
	category: CategoryType;
};

const CategoryCard: React.FC<Props> = ({ category }) => {
	return (
		<Link to={`/category/${category.id}`}>
			<figure className="card">
				<img src={category.image} alt="" />
				<figcaption>{category.name}</figcaption>
			</figure>
		</Link>
	);
};

export default CategoryCard;

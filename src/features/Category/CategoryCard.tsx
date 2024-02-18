import { Link } from "react-router-dom";
import { CategoryType } from "../../redux/product/categorySlice";
import { motion } from "framer-motion";

type Props = {
	category: CategoryType;
};

const CategoryCard: React.FC<Props> = ({ category }) => {
	return (
		<Link to={`/category/${category.id}`}>
			<motion.figure
				className="card"
                initial={{
                    filter: "grayscale(100%)",
                }}
				whileHover={{
					filter: "grayscale(0)",
                    transition: {duration: 1.8}
				}}
			>
				<img src={category.image} alt="" />
				<figcaption>{category.name}</figcaption>
			</motion.figure>
		</Link>
	);
};

export default CategoryCard;

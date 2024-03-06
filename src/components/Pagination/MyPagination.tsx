import { Stack, Pagination } from "@mui/material";
import { ProductType } from "../../misc/types";

type Props = {
	setPage: (pageNumber: number) => void;
	currentProducts: ProductType[];
	prodsPerPage: number;
};

const MyPagination: React.FC<Props> = ({
	setPage,
	currentProducts,
	prodsPerPage,
}) => {
	const numberOfPages = Math.ceil(currentProducts.length / prodsPerPage);
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<Stack
			sx={{
				alignItems: "center",
			}}
		>
			<Pagination count={numberOfPages} onChange={handleChange} />
		</Stack>
	);
};

export default MyPagination;

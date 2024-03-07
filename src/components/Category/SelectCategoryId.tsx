import { Box, FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppSelector } from "../../redux/hooks";

type Props = {
	categoryId: number;
	setCategoryId: (categoryId: number) => void;
};

const SelectCategoryId: React.FC<Props> = ({ categoryId, setCategoryId }) => {
	const allCategories = useAppSelector(
		(state) => state.categories.allCategories
	);
	const handleChange = (event: SelectChangeEvent) => {
		setCategoryId(parseInt(event.target.value));
	};

	/******************************************************************************* */
	return (
		<Box sx={{ width: 420,  color: 'gray' }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">
					Category ID
				</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={categoryId?.toString()}
					label="Category ID"
					onChange={handleChange}
				>
					{allCategories.map((cate) => (
						<MenuItem value={cate.id} key={cate.id}>
							{cate.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};

export default SelectCategoryId;

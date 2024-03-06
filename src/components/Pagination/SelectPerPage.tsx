import { Box, FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Props = {
	numberPerPage: number;
	setNumberPerPage: (numberPerPage: number) => void;
};

const SelectPerPage: React.FC<Props> = ({
	numberPerPage,
	setNumberPerPage,
}) => {
	const handleChange = (event: SelectChangeEvent) => {
		setNumberPerPage(parseInt(event.target.value));
	};
	return (
		<Box sx={{ width: 200, margin: "0 0 6vh 3vw" }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">
					Products per Page
				</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={numberPerPage.toString()}
					label="Products per Page"
					onChange={handleChange}
				>
					<MenuItem value={4}>4</MenuItem>
					<MenuItem value={8}>8</MenuItem>
					<MenuItem value={14}>14</MenuItem>
					<MenuItem value={18}>18</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};

export default SelectPerPage;

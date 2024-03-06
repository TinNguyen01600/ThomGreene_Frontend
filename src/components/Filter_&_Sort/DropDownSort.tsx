import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";

import { useAppDispatch } from "../../redux/hooks";
import { sortProducts } from "../../redux/slices/productSlice";

type Props = {
	setDropDown: (dropDown: string) => void;
	setDisplay: (display: string) => void;
	sortValue: string;
	setSortValue: (sortValue: string) => void;
};

const DropDownSort: React.FC<Props> = ({
	setDropDown,
	setDisplay,
	sortValue,
	setSortValue,
}) => {
	// const [value, setValue] = useState("");
	const dispatch = useAppDispatch();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSortValue((event.target as HTMLInputElement).value);
		dispatch(sortProducts((event.target as HTMLInputElement).value));
	};
	const resetSort = () => {
		setSortValue("");
		setDisplay("All");
	};
	return (
		<div className="dropdown-sort">
			<FormControl sx={{ margin: "0 2.5vw" }}>
				<RadioGroup
					aria-labelledby="demo-radio-buttons-group-label"
					name="radio-buttons-group"
					value={sortValue}
					onChange={handleChange}
				>
					<FormControlLabel
						value="ascending"
						control={<Radio color="default" />}
						label="Price (Low to High)"
					/>
					<FormControlLabel
						value="descending"
						control={<Radio color="default" />}
						label="Price (High to Low)"
					/>
				</RadioGroup>
			</FormControl>
			<section className="btn-group">
				<button onClick={resetSort}>
					<span>Clear all</span>
				</button>
				<button onClick={() => setDropDown("")} className="close-btn">
					<span>Close</span>
				</button>
			</section>
		</div>
	);
};

export default DropDownSort;

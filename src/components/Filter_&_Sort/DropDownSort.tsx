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
};

const DropDownSort: React.FC<Props> = ({ setDropDown, setDisplay }) => {
	const [value, setValue] = useState("");
	const dispatch = useAppDispatch();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
		dispatch(sortProducts((event.target as HTMLInputElement).value));
	};
	const resetSort = () => {
		setValue("");
        setDisplay("All")
	};
	return (
		<div className="dropdown-sort">
			<FormControl>
				<RadioGroup
					aria-labelledby="demo-radio-buttons-group-label"
					name="radio-buttons-group"
					value={value}
					onChange={handleChange}
				>
					<FormControlLabel
						value="ascending"
						control={<Radio />}
						label="Price (Low to High)"
					/>
					<FormControlLabel
						value="descending"
						control={<Radio />}
						label="Price (High to Low)"
					/>
				</RadioGroup>
			</FormControl>
			<button onClick={resetSort}>Clear all</button>
			<button onClick={() => setDropDown("")}>Close</button>
		</div>
	);
};

export default DropDownSort;

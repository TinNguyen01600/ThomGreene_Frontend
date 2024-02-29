import { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useAppDispatch } from "../../redux/hooks";
import { fetchFilteredProductsAsync } from "../../redux/slices/productSlice";

type Props = {
	setDropDown: (dropDown: string) => void;
};

const DropDownFilter: React.FC<Props> = ({ setDropDown }) => {
	const [range, setRange] = useState<number[]>([20, 37]);
	const dispatch = useAppDispatch();

	const handleChange = (event: Event, newRange: number | number[]) => {
		setRange(newRange as number[]);
		debouncedFilterPriceRange(newRange);
	};
	/***************************************************************************** */
	const _ = require("lodash");
	const fetchProductsByPriceRange = (range: number[]) => {
		console.log(range);
		dispatch(fetchFilteredProductsAsync(range));
	};
	const filterPriceRange = (range: number[]) => {
		fetchProductsByPriceRange(range);
	};
	const debouncedFilterPriceRange = useCallback(
		_.debounce(filterPriceRange, 3000),
		[]
	);
	/***************************************************************************** */

	return (
		<div className="dropdown-filter">
			<Box sx={{ width: 300 }}>
				<Slider
					getAriaLabel={() => "Temperature range"}
					value={range}
					onChange={handleChange}
					valueLabelDisplay="auto"
				/>
			</Box>
			<button onClick={() => setDropDown("")}>Close</button>
		</div>
	);
};

export default DropDownFilter;

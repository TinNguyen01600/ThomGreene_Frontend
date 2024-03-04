import { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import { useAppDispatch } from "../../redux/hooks";
import { fetchFilteredProductsAsync } from "../../redux/slices/productSlice";

type Props = {
	setDropDown: (dropDown: string) => void;
	setDisplay: (display: string) => void;
};

const DropDownFilter: React.FC<Props> = ({ setDropDown, setDisplay }) => {
	const [range, setRange] = useState<number[]>([0, 100]);
	const dispatch = useAppDispatch();

	const handleChange = (event: Event, newRange: number | number[]) => {
		setRange(newRange as number[]);
		debouncedFilterPriceRange(newRange);
	};
	/***************************************************************************** */
	const _ = require("lodash");
	const fetchProductsByPriceRange = (range: number[]) => {
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
	const resetFilter = () => {
        setRange([0, 100]);
		setDisplay("All");
	};

	return (
		<div className="dropdown-filter">
			<Box sx={{ width: 600, margin: "0 3vw", color: "grey" }}>
				<p>Price range</p>
				<Slider
					value={range}
					onChange={handleChange}
					valueLabelDisplay="auto"
				/>
			</Box>
			<div className="btn-group">
				<button onClick={resetFilter}>
					<span>Reset</span>
				</button>
                <button onClick={() => setDropDown("")} className="close-btn">
					<span>Close</span>
				</button>
			</div>
		</div>
	);
};

export default DropDownFilter;

import { useCallback } from "react";

import { useAppDispatch } from "../../redux/hooks";
import { fetchFilteredProductsAsync } from "../../redux/slices/productSlice";
import CustomizedSlider from "./CustomizedSlider";

type Props = {
	setDropDown: (dropDown: string) => void;
	setDisplay: (display: string) => void;
    range: number[];
    setRange: (range: number[]) => void
};

const DropDownFilter: React.FC<Props> = ({ setDropDown, setDisplay, range, setRange }) => {
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
			<CustomizedSlider range={range} handleChange={handleChange} />
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

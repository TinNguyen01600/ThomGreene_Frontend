import { useState } from "react";
import DropDownSort from "./DropDownSort";

const FilterAndSort: React.FC = () => {
	const [dropDown, setDropDown] = useState("");
	return (
		<>
			<div className="filter-and-sort">
				<section className="filter">
					<h3>Filter</h3>
				</section>
				<section className="sort">
					<h3
						onClick={() => {
							dropDown === "Sort"
								? setDropDown("")
								: setDropDown("Sort");
						}}
					>
						Sort
					</h3>
				</section>
			</div>
			<div className="dropdown-filter-sort">
				{dropDown === "Sort" ? (
					<DropDownSort setDropDown={setDropDown} />
				) : null}
			</div>
		</>
	);
};

export default FilterAndSort;

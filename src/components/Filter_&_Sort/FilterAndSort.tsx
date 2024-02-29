import { useState } from "react";

import DropDownSort from "./DropDownSort";
import DropDownFilter from "./DropDownFilter";

type Props = {
	setDisplay: (display: string) => void;
};

const FilterAndSort: React.FC<Props> = ({ setDisplay }) => {
	const [dropDown, setDropDown] = useState("");
	return (
		<>
			<div className="filter-and-sort">
				<section className="filter">
					<h3
						onClick={() => {
							setDisplay("Filter");
							dropDown === "Filter"
								? setDropDown("")
								: setDropDown("Filter");
						}}
					>
						Filter
					</h3>
				</section>
				<section className="sort">
					<h3
						onClick={() => {
							setDisplay("Sort");
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
				) : dropDown === "Filter" ? (
					<DropDownFilter setDropDown={setDropDown} />
				) : null}
			</div>
		</>
	);
};

export default FilterAndSort;

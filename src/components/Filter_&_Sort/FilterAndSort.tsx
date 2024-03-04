import { useState } from "react";

import DropDownSort from "./DropDownSort";
import DropDownFilter from "./DropDownFilter";
import chevron_down from "../../img/chevron-down.svg";
import chevron_up from "../../img/chevron-up.svg"

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
						<img
							src={dropDown === "Filter" ? chevron_up : chevron_down}
							alt=""
							style={{ height: "2vh", marginLeft: "1vw" }}
						/>
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
						<img
							src={dropDown === "Sort" ? chevron_up : chevron_down}
							alt=""
							style={{ height: "2vh", marginLeft: "1vw" }}
						/>
					</h3>
				</section>
			</div>
			<div className="dropdown-filter-sort">
				{dropDown === "Sort" ? (
					<DropDownSort
						setDropDown={setDropDown}
						setDisplay={setDisplay}
					/>
				) : dropDown === "Filter" ? (
					<DropDownFilter
						setDropDown={setDropDown}
						setDisplay={setDisplay}
					/>
				) : null}
			</div>
		</>
	);
};

export default FilterAndSort;

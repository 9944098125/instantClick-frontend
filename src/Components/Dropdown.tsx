import React from "react";

const Dropdown = ({ options }: any) => {
	return (
		<select className="country-selector">
			{options.map((option: any, index: number) => {
				return (
					<option key={index} value={option.value}>
						{option.displayValue}
					</option>
				);
			})}
		</select>
	);
};

export default Dropdown;

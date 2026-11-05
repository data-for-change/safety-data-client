import React from "react";
import { ModelFilterType } from "../../types";
import { MySelect } from '../common';

interface Option {
  value: string;
  text: string;
}

interface Props {
  value: ModelFilterType;
  onChange: (value: ModelFilterType) => void;
}

const OPTIONS: Option[] = [
  { value: ModelFilterType.All, text: "All" },
  { value: ModelFilterType.Segments, text: "Segments" },
  { value: ModelFilterType.Crossroads, text: "Crossroads" },
  { value: ModelFilterType.Streets, text: "Streets" },
];

export const ClusterFilterTypePicker: React.FC<Props> = ({ value, onChange }) => {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(e.target.value as ModelFilterType);
	};

	return (
		<MySelect<Option>
			id='cluster-filter-type-picker'
			data={OPTIONS}
			valProp='value'
			contentProp='text'
			value={value}
			onChange={handleChange}
		/>
	);
};

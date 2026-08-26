import React from 'react';
import { MySelect } from '../common';

interface Option {
	value: string;
	text: string;
}

interface Props {
	value: number;
	onChange: (value: number) => void;
}

const OPTIONS: Option[] = [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => ({
	value: String(v),
	text: String(v),
}));

export const MaxClustersPicker: React.FC<Props> = ({ value, onChange }) => {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(Number(e.target.value));
	};

	return (
		<div style={{ width: 100 }}>
			<MySelect<Option>
				id='max-clusters-picker'
				data={OPTIONS}
				valProp='value'
				contentProp='text'
				value={String(value)}
				onChange={handleChange}
			/>
		</div>
	);
};

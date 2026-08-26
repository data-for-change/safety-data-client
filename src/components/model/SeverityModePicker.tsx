import React from 'react';
import { ModelSeverityMode } from '../../types';
import { MySelect } from '../common';

interface Option {
	value: string;
	text: string;
}

interface Props {
	value: ModelSeverityMode;
	onChange: (value: ModelSeverityMode) => void;
}

const OPTIONS: Option[] = [
	{ value: '1', text: 'SeverityModeAllEqual' },
	{ value: '2', text: 'SeverityModePedestrian2' },
	{ value: '3', text: 'SeverityModePedestrianBike' },
	{ value: '4', text: 'SeverityModeFatal2' },
];

export const SeverityModePicker: React.FC<Props> = ({ value, onChange }) => {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(Number(e.target.value) as ModelSeverityMode);
	};

	return (
		<div style={{ width: 170 }}>
			<MySelect<Option>
				id='severity-mode-picker'
				data={OPTIONS}
				valProp='value'
				contentProp='text'
				value={String(value)}
				onChange={handleChange}
			/>
		</div>
	);
};

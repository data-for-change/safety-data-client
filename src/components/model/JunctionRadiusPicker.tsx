import React from 'react';
import { Form } from 'react-bootstrap';

type JunctionRadiusPickerProps = {
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
};

export const JunctionRadiusPicker: React.FC<JunctionRadiusPickerProps> = ({ value, onChange, min = 20, max = 150, step = 10 }) => {
	return (
		<div className='d-flex align-items-center gap-2'>
			<div className='d-flex' style={{ width: 100 }}>
				<Form.Range min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
			</div>
			<span className='fw-bold' style={{ fontSize: 14 }}>
				{value}m
			</span>
		</div>
	);
};

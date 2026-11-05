import React from 'react';
import { Form } from 'react-bootstrap';

type JunctionRadiusPickerProps = {
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
};

// The slider moves a local draft value (cheap re-render of this component only);
// the expensive model recomputation is triggered once, when the user releases the thumb.
export const JunctionRadiusPicker: React.FC<JunctionRadiusPickerProps> = React.memo(({ value, onChange, min = 20, max = 150, step = 10 }) => {
	const [draft, setDraft] = React.useState(value);

	// follow external changes of the committed value
	React.useEffect(() => setDraft(value), [value]);

	const commit = React.useCallback(() => {
		if (draft !== value) onChange(draft);
	}, [draft, value, onChange]);

	return (
		<div className='d-flex align-items-center gap-2'>
			<div className='d-flex' style={{ width: 100 }}>
				<Form.Range
					min={min}
					max={max}
					step={step}
					value={draft}
					onChange={(e) => setDraft(Number(e.target.value))}
					onPointerUp={commit}
					onKeyUp={commit}
					onBlur={commit}
				/>
			</div>
			<span className='fw-bold' style={{ fontSize: 14 }}>
				{draft}m
			</span>
		</div>
	);
});

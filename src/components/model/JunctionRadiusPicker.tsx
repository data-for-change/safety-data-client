import React from 'react';
import { Form } from 'react-bootstrap';

type JunctionRadiusPickerProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step? : number;
  text :string;
};

export const JunctionRadiusPicker: React.FC<JunctionRadiusPickerProps> = ({
  value,
  onChange,
  min = 20,
  max = 150,
  step = 10,
  text
}) => {
  return (
    <Form.Group className="d-flex align-items-center gap-2 mb-0">
      <Form.Label className="fw-semibold mb-0">
        {text}
      </Form.Label>

      <Form.Range
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />

      <span className="fw-bold">{value}m</span>
    </Form.Group>
  );
};
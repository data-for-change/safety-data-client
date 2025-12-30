import React from 'react';
import { Form } from 'react-bootstrap';

type JunctionRadiusPickerProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export const JunctionRadiusPicker: React.FC<JunctionRadiusPickerProps> = ({
  value,
  onChange,
  min = 20,
  max = 150,
}) => {
  return (
    <Form.Group className="d-flex align-items-center gap-2 mb-0">
      <Form.Label className="fw-semibold mb-0">
        Junction radius (meters):
      </Form.Label>

      <Form.Range
        min={min}
        max={max}
        step={10}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />

      <span className="fw-bold">{value}m</span>
    </Form.Group>
  );
};
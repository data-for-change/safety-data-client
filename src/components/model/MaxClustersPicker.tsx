import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const OPTIONS = [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export const MaxClustersPicker: React.FC<Props> = ({
  value,
  onChange,
}) => {
  return (
    <Form.Group>
      <Form.Label>Max clusters</Form.Label>
      <Form.Select
        size="sm"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      >
        {OPTIONS.map(v => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

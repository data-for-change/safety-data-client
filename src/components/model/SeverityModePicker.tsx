import React from 'react';
import { Form } from 'react-bootstrap';
import { ModelSeverityMode } from '../../types';

type SeverityModePickerProps = {
  value: ModelSeverityMode;
  onChange: (value: ModelSeverityMode) => void;
};

export const SeverityModePicker: React.FC<SeverityModePickerProps> = ({
  value,
  onChange,
}) => {
  return (
    <Form.Group className="d-flex align-items-center gap-2 mb-0">
      <Form.Label className="fw-semibold mb-0">
        Severity mode:
      </Form.Label>

      <Form.Select
        size="sm"
        style={{ width: 260 }}
        value={value}
        onChange={e =>
          onChange(Number(e.target.value) as ModelSeverityMode)
        }
      >
        <option value={1}>All accidents equal</option>
        <option value={2}>Pedestrian weighted</option>
        <option value={3}>Pedestrian + electric</option>
        <option value={4}>Fatal override</option>
      </Form.Select>
    </Form.Group>
  );
};

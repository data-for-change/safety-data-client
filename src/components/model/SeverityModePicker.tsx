import React from 'react';
import { ModelSeverityMode } from '../../types';

type SeverityModePickerProps = {
  value: ModelSeverityMode;
  onChange: (value: ModelSeverityMode) => void;
};

export const SeverityModePicker: React.FC<
  SeverityModePickerProps
> = ({ value, onChange }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <label className="fw-semibold">Severity mode:</label>

      <select
        className="form-select form-select-sm"
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
      </select>
    </div>
  );
};

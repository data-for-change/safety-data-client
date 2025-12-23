import React from 'react';
type JunctionRadiusPickerProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export const JunctionRadiusPicker: React.FC<
  JunctionRadiusPickerProps
> = ({
  value,
  onChange,
  min = 20,
  max = 150,
}) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <label className="fw-semibold">
        Junction radius (meters):
      </label>

      <input
        type="range"
        min={min}
        max={max}
        step={10}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />

      <span className="fw-bold">{value}m</span>
    </div>
  );
};

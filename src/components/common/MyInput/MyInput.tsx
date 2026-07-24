import React from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./my-input.css";

interface MyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: number | "";
  onChange: (value: number | "") => void;
  label?: string;
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  style?: React.CSSProperties;
}

const MyInput: React.FC<MyInputProps> = ({
  value,
  onChange,
  label="",
  id,
  min = 0,
  max = 100,
  step = 1,
  placeholder,
  style
}) => {
  const { t } = useTranslation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Allow clearing input
    if (val === "") {
      onChange("");
      return;
    }

    // Digits only
    if (!/^\d+$/.test(val)) return;

    const num = Number(val);

    // Range check
    if (num < min || num > max) return;

    onChange(num);
  };

  return (
     <Form.Group controlId={id} style={style} className={`mb-2`}>
        <Form.Label className="mb-0 small">{t(label)}:</Form.Label>
        <Form.Control
            type="number"
            className="my-input-sm"
            value={value}
            min={min}
            max={max}
            step={step}
            placeholder={placeholder}
            onChange={handleChange}
            />
    </Form.Group>    
  );
};

export default MyInput;

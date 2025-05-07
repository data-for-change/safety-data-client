import React from "react";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import "./my-select.css";

interface Props<T> {
  data: T[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  valProp?: keyof T;
  contentProp?: keyof T;
  value?: string;
  label?: string;
  id?: string;
  style?: React.CSSProperties;
  cssClass?: string;
}

const MySelect = <T,>({
  data,
  style,
  id,
  label,
  onChange,
  valProp,
  contentProp,
  value,
  cssClass = "",
}: Props<T>) => {
  const { t } = useTranslation();
  const controlId = id || (label ? `${label}-id` : undefined);

  return (
    <Form.Group controlId={controlId} style={style} className={`mb-2 ${cssClass}`}>
      {label && (
        <Form.Label className="mb-1" style={{ whiteSpace: "nowrap" }}>
          {t(label)}
        </Form.Label>
      )}
      <Form.Select
        size="sm"
        value={value}
        onChange={onChange}
      >
        {data.map((item) => {
          const val = valProp ? String(item[valProp]) : String(item);
          const content = contentProp ? String(item[contentProp]) : String(item);
          return (
            <option key={val} value={val}>
              {t(content)}
            </option>
          );
        })}
      </Form.Select>
    </Form.Group>
  );
};

export default MySelect;

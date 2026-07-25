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
  layout?: "row" | "column";
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
  layout = "row",
}: Props<T>) => {
  const { t } = useTranslation();
  const controlId = id || (label ? `${label}-id` : undefined);

  return (
    <Form.Group
      controlId={controlId}
      style={{
        ...style,
        display: "flex",
        flexDirection: layout,
        gap: "0.5rem",
        alignItems: layout === "row" ? "center" : "stretch",
      }}
      className={`mb-2 select-wrapper ${cssClass}`}
    >
      {label && (
        <Form.Label
          style={
            layout === "row"
              ? { whiteSpace: "nowrap", marginBottom: 0 }
              : {}
          }
        >
          {t(label)}:
        </Form.Label>
      )}

      <Form.Select
        className="my-select"
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

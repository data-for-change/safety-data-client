import React from "react";
import { useTranslation } from "react-i18next";
import "../../styles/my-select.css";

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
  const cssname = "form-select form-select-sm " + cssClass;
  const labelText = label && t(label);
  const labelId = id || (label ? `${label}-id` : undefined);

  const mappedData = data.map((item) => {
    const val = valProp ? String(item[valProp]) : String(item);
    const content = contentProp ? String(item[contentProp]) : String(item);
    return (
      <option key={val} value={val}>
        {t(content)}
      </option>
    );
  });

  return (
    <div className="select-wrapper" style={style}>
      {label && (
        <label htmlFor={labelId} style={{ whiteSpace: "nowrap" }}>
          {labelText}
        </label>
      )}
      <select id={labelId} className={cssname} onChange={onChange} value={value}>
        {mappedData}
      </select>
    </div>
  );
};

export default MySelect;

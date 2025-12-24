import React from "react";
import { ModelFilterType } from "../../types";
import { MySelect } from "../common";

interface Option {
  value: string;
  text: string;
}

interface Props {
  value: ModelFilterType;
  onChange: (value: ModelFilterType) => void;
}

const OPTIONS: Option[] = [
  { value: ModelFilterType.All, text: "All" },
  { value: ModelFilterType.Junctions, text: "Junctions" },
  { value: ModelFilterType.Streets, text: "Streets" },
];

export const ClusterFilterTypePicker: React.FC<Props> = ({ value, onChange }) => {
  // local handler: converts string from MySelect to ModelFilterType
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as ModelFilterType);
  };

  return (
    <MySelect<Option>
      id="cluster-filter-type-picker"
      label="Cluster type:"
      data={OPTIONS}
      valProp="value"
      contentProp="text"
      value={value}
      onChange={handleChange}
    
      cssClass="form-select-m"
    />
  );
};
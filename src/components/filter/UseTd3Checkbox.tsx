import React, { ChangeEvent } from "react";
import { observer } from "mobx-react";
import { useStore } from '../../stores/storeConfig';
import { Checkbox } from "../common";

const UseTd3Checkbox: React.FC = observer(() => {
    const { filterStore } = useStore();
    const { dataSource, updateDataSource } = filterStore;
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateDataSource(e.target.checked ? 3 : 1);
    };
  return (
    <Checkbox
      label="IncludeCommonFile"
      group="datasource"
      id={3}
      checked={dataSource === 3}
      onChange={onChange}
    />
  );
});

export default UseTd3Checkbox;

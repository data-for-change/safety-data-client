import React, { ChangeEvent, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { MyInput } from "../../common";
import { useStore } from '../../../stores/storeConfig';

interface IProps {
  id: string;
}

const LimitInput: React.FC<IProps> = observer(({ id }) => {
  const { filterStore } = useStore();
  const { GroupByLimit, SetGroupByLimit, submitOnGroupByAfterLimit } = filterStore;

 const onLimitChange = useCallback(
    (value: number | "") => {
      SetGroupByLimit(value === "" ? null : value);
      submitOnGroupByAfterLimit();
    },
    [SetGroupByLimit, submitOnGroupByAfterLimit]
  );

  return (
    <MyInput
      label="groups_limit"
      id={id} 
      max={1000}
      step={10}
      value={GroupByLimit ?? ""}
      onChange={onLimitChange}
      style={{ display: 'flex', height: '30px', gap: '0.5rem' }} 
    />
  );
});
export default LimitInput;
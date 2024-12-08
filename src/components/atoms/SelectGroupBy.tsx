import React, { ChangeEvent, useCallback } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/storeConfig';
import GroupBy from '../../stores/filter/GroupBy';
import MySelect from './MySelect';

interface IProps {
  id: string,
  labelText?: string,
}
const SelectGroupBy: React.FC<IProps> = observer(({ id, labelText = 'GroupBy' }) => {
  const { filterStore } = useStore();
  const { groupByDict, updateGroupby } = filterStore;

  const onSelectChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    updateGroupby(event.target.value);
  }, [updateGroupby]);

  const fixData = groupByDict.arrGroups;
  const val = (groupByDict.groupBy as GroupBy).value;
  return (
    <MySelect
      onChange={onSelectChange}
      label={'GroupBy'}
      data={fixData}
      valProp="value"
      contentProp="text"
      value={val}
      cssClass="form-select-m"
    />
  );
});
export default SelectGroupBy;

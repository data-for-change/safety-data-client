import React, { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
import { useStore } from '../../stores/storeConfig';
import GroupBy from '../../stores/GroupBy';
import MySelect from './MySelect';

interface IProps {
  id: string,
  labelText?: string,
}
const SelectGroupBy: React.FC<IProps> = observer(({ id, labelText = 'GroupBy' }) => {
  const { t } = useTranslation();
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
    />
  );
});
export default SelectGroupBy;

import React, { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
import { useStore } from '../../stores/storeConfig';
import MySelect from './MySelect';
// import Select from './Select';

interface IProps {
  id: string,
  labelText?: string,
}
const SelectGroupBy: React.FC<IProps> = observer(({ id, labelText = 'GroupBy' }) => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { groupByDict, groupBy, updateGroupby } = filterStore;

  const onSelectChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    updateGroupby(event.target.value);
  }, [updateGroupby]);

  const fixData = Object.entries(groupByDict).map(([key, item]: any) => {
    return {
      value: key,
      text: item.text
    }
  })
  return (
    <MySelect
      onChange={onSelectChange}
      label={t('GroupBy')}
      data={fixData}
      valProp="value"
      contentProp="text"
      deafaultVal={groupBy.text}
    />
  );
});
export default SelectGroupBy;

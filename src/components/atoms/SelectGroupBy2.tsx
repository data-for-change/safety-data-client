import React, { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
import { useStore } from '../../stores/storeConfig';
import MySelect from './MySelect';


interface IProps { id: string }

const SelectGroupBy2: React.FC<IProps> = observer(({ id }) => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { group2Dict, updateGroupBy2 } = filterStore;
  const onSelectChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    updateGroupBy2(event.target.value);
  }, [updateGroupBy2]);

  const fixData = group2Dict.arrGroups;

  return (
    <MySelect
      onChange={onSelectChange}
      data={fixData}
      // label={t('GroupBy')}
      valProp="value"
      contentProp="text"
      value={group2Dict.groupBy2.name}
    />
  );
});
export default SelectGroupBy2;

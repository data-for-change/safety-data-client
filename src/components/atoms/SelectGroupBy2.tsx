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
  const { group2Dict, groupBy2, updateGroupBy2 } = filterStore;
  const onSelectChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    updateGroupBy2(event.target.value);
  }, [updateGroupBy2]);

  const fixData = Object.entries(group2Dict).map(([key, item]: any) => {
    return {
      value: key,
      text: item.text
    }
  })

  return (
    <MySelect
      onChange={onSelectChange}
      data={fixData}
      // label={t('GroupBy')}
      valProp="value"
      contentProp="text"
      deafaultVal={groupBy2.text}
    />
  );
});
export default SelectGroupBy2;

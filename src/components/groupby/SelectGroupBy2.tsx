import React, { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';

import { useStore } from '../../stores/storeConfig';
import GroupBy2 from '../../stores/filter/GroupBy2';
import { MySelect } from '../common';

interface IProps { id: string }

const SelectGroupBy2: React.FC<IProps> = observer(({ id }) => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { group2Dict, updateGroupBy2, groupBy2Name } = filterStore;
  const onSelectChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    updateGroupBy2(event.target.value);
  }, [updateGroupBy2]);

  
  const fixData = group2Dict.arrGroups;
  const val = (group2Dict.groupBy as GroupBy2).name;

  return (
    <MySelect
      onChange={onSelectChange}
      data={fixData}
      // label={t('GroupBy')}
      valProp="value"
      contentProp="text"
      value={val}
    />
  );
});
export default SelectGroupBy2;

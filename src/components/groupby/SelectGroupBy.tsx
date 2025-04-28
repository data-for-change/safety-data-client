import React, { ChangeEvent, useCallback } from 'react';
import { observer } from 'mobx-react';
import { toJS, reaction } from 'mobx';
import { useStore } from '../../stores/storeConfig';
import GroupBy from '../../stores/filter/GroupBy';
import MySelect from '../atoms/MySelect';

interface IProps {
  id: string;
  labelText?: string;
}

const SelectGroupBy: React.FC<IProps> = observer(({ id, labelText = 'GroupBy' }) => {
  const { filterStore } = useStore();
  const { groupByDict, updateGroupby, groupByName } = filterStore;

  // Debug logging
  //console.log('Render: groupByDict', toJS(groupByDict));
  //console.log('Render: groupBy', toJS(groupByName));

  const onSelectChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    updateGroupby(event.target.value);
  }, [updateGroupby]);

  // Use optional chaining and provide a fallback
  const val = (groupByDict.groupBy as GroupBy)?.value || '';
  const fixData = groupByDict.arrGroups || [];

  return (
    <MySelect 
      onChange={onSelectChange} 
      label={'GroupBy'} 
      data={fixData} 
      id={id} 
      valProp="value" 
      contentProp="text" 
      value={val} 
      style={{ display: 'flex', height: '30px' }} 
      cssClass="form-select-m" 
    />
  );
});

export default SelectGroupBy;

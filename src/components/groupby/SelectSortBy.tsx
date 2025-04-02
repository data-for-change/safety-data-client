import React, { ChangeEvent, useCallback } from 'react';
import { observer } from 'mobx-react-lite'; 
import { useStore } from '../../stores/storeConfig';
import MySelect from '../atoms/MySelect';
import GroupBy from '../../stores/filter/GroupBy';

interface IProps {
  id: string;
  labelText?: string;
}

const SelectSortBy: React.FC<IProps> = observer(({ id, labelText = 'SortBy' }) => {
  const { filterStore } = useStore();
  const {GroupBySort, SetGroupBySort, submitOnGroupByAfterSort} = filterStore;
  
  const onSortChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    // Call action method directly on filterStore
    SetGroupBySort(event.target.value || null);
    submitOnGroupByAfterSort();
  }, [filterStore]); 

  const sortOptions = [
    { value: '', text: 'SortType.NoSort' },
    { value: 'a', text: 'SortType.Ascending' },
    { value: 'd', text: 'SortType.Descending' },
  ];

  return (
    <MySelect 
      onChange={onSortChange} 
      label={labelText} 
      data={sortOptions} 
      id={id} 
      valProp="value" 
      contentProp="text" 
      value={GroupBySort || ''} 
      style={{ display: 'flex', height: '30px' }} 
      cssClass="form-select-m" 
    />
  );
});

export default SelectSortBy;
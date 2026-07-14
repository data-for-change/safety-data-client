import { IColumnFilter } from '../stores/filter/ColumnFilterCheckBoxList';

export function setFilterOption(colFilter: IColumnFilter, aType: number, val: boolean) {
  colFilter.setFilter(aType, val);
}

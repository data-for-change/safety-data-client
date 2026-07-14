import { makeAutoObservable } from 'mobx';
import { IColumnFilter } from './ColumnFilterCheckBoxList';
import * as FC from './ColumnFilterCheckBoxList';
import { IFilterChecker } from './FilterChecker';
import { setFilterOption } from '../../utils/filterHelpers';

export default class SeverityFilterStore {
   injurySeverity: IColumnFilter;
   casualtiesNames: string = 'casualties';

   constructor() {
      makeAutoObservable(this);
      this.injurySeverity = FC.initInjurySeverity();
      this.setCasualtiesNames(this.injurySeverity);
   }

   updateInjurySeverity = (aType: number, val: boolean) => {
      setFilterOption(this.injurySeverity, aType, val);
   }

   get isValidSeverity() {
      return !this.injurySeverity.isAllValsFalse;
   }

   setCasualtiesNames = (injurySeverity: IColumnFilter) => {
      let res = 'casualties';
      const deadChecker: IFilterChecker = injurySeverity.arrTypes[0];
      const sevIngChecker: IFilterChecker = injurySeverity.arrTypes[1];
      if (deadChecker.checked && !sevIngChecker.checked) res = 'killed';
      else if (!deadChecker.checked && sevIngChecker.checked) res = 'severely-injured';
      this.casualtiesNames = res;
   }

   updateModerateDisabledState = (citiesArrValues: string[]) => {
      const moderateOption = this.injurySeverity.arrTypes[2]; // moderate is at index 2
      const hasCitySelected = citiesArrValues.length > 0 &&
         citiesArrValues.some(val => val && val.trim() !== '');
      moderateOption.disabled = !hasCitySelected;

      if (moderateOption.disabled && moderateOption.checked) {
         moderateOption.checked = false;
         this.injurySeverity.setQueryVals();
      }
   }

   // updateFilters logic moved to shared helper
}

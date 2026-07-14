import { makeAutoObservable } from 'mobx';
import { IColumnFilter } from './ColumnFilterCheckBoxList';
import { ColumnFilterCombo, initStartYear, initEndYear } from './columnFilterCombo';
import * as FC from './ColumnFilterCheckBoxList';

export default class TimeFilterStore {
   startYear: ColumnFilterCombo;
   endYear: ColumnFilterCombo;
   dayNight: IColumnFilter;

   constructor() {
      makeAutoObservable(this);
      this.startYear = initStartYear(2021);
      this.endYear = initEndYear(2025);
      this.dayNight = FC.initDayNight();
   }

   setStartYear = (year: string) => {
      this.startYear.setFilter(parseInt(year));
   }

   setEndYear = (year: string) => {
      this.endYear.setFilter(parseInt(year));
   }

   updateDayNight = (aType: number, val: boolean) => {
      this.dayNight.setFilter(aType, val);
   }

   get isValidWhen() {
      return !this.dayNight.isAllValsFalse;
   }

   setValuesByQuery = (params: URLSearchParams) => {
      this.startYear.setValuesByQuery(params);
      this.endYear.setValuesByQuery(params);
      this.dayNight.setValuesByQuery(params);
   }

   setBrowserQueryString = (params: URLSearchParams) => {
      this.startYear.setBrowserQueryString(params, false);
      this.endYear.setBrowserQueryString(params, false);
   }

   setText = () => {
      this.startYear.setText();
      this.endYear.setText();
   }
}

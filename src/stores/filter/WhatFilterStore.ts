import { makeAutoObservable } from 'mobx';
import { IColumnFilter } from './ColumnFilterCheckBoxList';
import * as FC from './ColumnFilterCheckBoxList';

export default class WhatFilterStore {
   accidentType: IColumnFilter;

   constructor() {
      makeAutoObservable(this);
      this.accidentType = FC.initAccidentType();
   }

   updateAccidentType = (aType: number, val: boolean) => {
      this.accidentType.setFilter(aType, val);
   }

   get isValidWhat() {
      return !this.accidentType.isAllValsFalse;
   }

   setValuesByQuery = (params: URLSearchParams) => {
      this.accidentType.setValuesByQuery(params);
   }

   setBrowserQueryString = (params: URLSearchParams) => {
      this.accidentType.setBrowserQueryString(params);
   }

   setText = (ignoreIfAll: boolean) => {
      this.accidentType.setText(ignoreIfAll);
   }
}

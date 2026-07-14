import { makeAutoObservable } from 'mobx';
import { IColumnFilter } from './ColumnFilterCheckBoxList';
import * as FC from './ColumnFilterCheckBoxList';
import { setFilterOption } from '../../utils/filterHelpers';

export default class WhoFilterStore {
   genderTypes: IColumnFilter;
   ageTypes: IColumnFilter;
   populationTypes: IColumnFilter;

   constructor() {
      makeAutoObservable(this);
      this.genderTypes = FC.initGenderTypes();
      this.ageTypes = FC.initAgeTypes();
      this.populationTypes = FC.initPopulationTypes();
   }

   updateGenderType = (aType: number, val: boolean) => {
      setFilterOption(this.genderTypes, aType, val);
   }

   updateAgeType = (aType: number, val: boolean) => {
      setFilterOption(this.ageTypes, aType, val);
   }

   updatePopulationType = (aType: number, val: boolean) => {
      setFilterOption(this.populationTypes, aType, val);
   }

   get isValidWho() {
      return !this.genderTypes.isAllValsFalse && !this.ageTypes.isAllValsFalse && !this.populationTypes.isAllValsFalse;
   }

   setValuesByQuery = (params: URLSearchParams) => {
      this.genderTypes.setValuesByQuery(params);
      this.ageTypes.setValuesByQuery(params);
      this.populationTypes.setValuesByQuery(params);
   }

   setBrowserQueryString = (params: URLSearchParams) => {
      this.genderTypes.setBrowserQueryString(params);
      this.ageTypes.setBrowserQueryString(params);
      this.populationTypes.setBrowserQueryString(params);
   }

   setText = (ignoreIfAll: boolean) => {
      this.genderTypes.setText(ignoreIfAll);
      this.ageTypes.setText(ignoreIfAll);
      this.populationTypes.setText(ignoreIfAll);
   }
}

import { makeAutoObservable } from 'mobx';
import { IColumnFilter } from './ColumnFilterCheckBoxList';
import * as FC from './ColumnFilterCheckBoxList';
import { setFilterOption } from '../../utils/filterHelpers';

export default class VehicleFilterStore {
   injTypes: IColumnFilter;
   vehicleType: IColumnFilter;
   involvedVehicle: IColumnFilter;

   constructor() {
      makeAutoObservable(this);
      this.injTypes = FC.initInjTypes();
      this.vehicleType = FC.initVehicleTypes();
      this.involvedVehicle = FC.initInvolvedVehicle();
   }

   updateInjuerdType = (aType: number, val: boolean) => {
      setFilterOption(this.injTypes, aType, val);
   }

   updateVehicleType = (aType: number, val: boolean) => {
      setFilterOption(this.vehicleType, aType, val);
   }

   setInvolvedVehicle = (aType: number, val: boolean) => {
      setFilterOption(this.involvedVehicle, aType, val);
   }

   get isValidWhatVehicle() {
      return !this.injTypes.isAllValsFalse && !this.vehicleType.isAllValsFalse && !this.involvedVehicle.isAllValsFalse;
   }

   setValuesByQuery = (params: URLSearchParams) => {
      this.injTypes.setValuesByQuery(params);
      this.vehicleType.setValuesByQuery(params);
      this.involvedVehicle.setValuesByQuery(params);
   }

   setBrowserQueryString = (params: URLSearchParams) => {
      this.injTypes.setBrowserQueryString(params);
      this.vehicleType.setBrowserQueryString(params);
      this.involvedVehicle.setBrowserQueryString(params);
   }

   setText = (ignoreIfAll: boolean) => {
      this.injTypes.setText(ignoreIfAll);
      this.vehicleType.setText(ignoreIfAll);
      this.involvedVehicle.setText(ignoreIfAll);
   }
}

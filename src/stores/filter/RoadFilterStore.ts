import { makeAutoObservable } from 'mobx';
import { IColumnFilter } from './ColumnFilterCheckBoxList';
import * as FC from './ColumnFilterCheckBoxList';
import { setFilterOption } from '../../utils/filterHelpers';

export default class RoadFilterStore {
  speedLimit: IColumnFilter;
  roadWidth: IColumnFilter;
  separator: IColumnFilter;
  oneLane: IColumnFilter;

  constructor() {
    makeAutoObservable(this);
    this.speedLimit = FC.initSpeedLimit();
    this.roadWidth = FC.initRoadWidth();
    this.separator = FC.initSeparator();
    this.oneLane = FC.initOneLane();
  }

  updateSpeedLimit = (aType: number, val: boolean) => {
    setFilterOption(this.speedLimit, aType, val);
  }

  updateRoadWidth = (aType: number, val: boolean) => {
    setFilterOption(this.roadWidth, aType, val);
  }

  updateSeparator = (aType: number, val: boolean) => {
    setFilterOption(this.separator, aType, val);
  }

  updateOneLane = (aType: number, val: boolean) => {
    setFilterOption(this.oneLane, aType, val);
  }

  get isValidWhatRoad() {
    return !this.speedLimit.isAllValsFalse && !this.roadWidth.isAllValsFalse
      && !this.separator.isAllValsFalse && !this.oneLane.isAllValsFalse;
  }

  setValuesByQuery = (params: URLSearchParams) => {
    this.speedLimit.setValuesByQuery(params);
    this.roadWidth.setValuesByQuery(params);
    this.separator.setValuesByQuery(params);
    this.oneLane.setValuesByQuery(params);
  }

  setBrowserQueryString = (params: URLSearchParams) => {
    this.speedLimit.setBrowserQueryString(params);
    this.roadWidth.setBrowserQueryString(params);
    this.separator.setBrowserQueryString(params);
    this.oneLane.setBrowserQueryString(params);
  }

  setText = (ignoreIfAll: boolean) => {
    this.speedLimit.setText(ignoreIfAll);
    this.roadWidth.setText(ignoreIfAll);
    this.separator.setText(ignoreIfAll);
    this.oneLane.setText(ignoreIfAll);
  }
}

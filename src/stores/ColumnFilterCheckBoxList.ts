import { observable, action, computed } from 'mobx';
import FilterChecker, { IFilterChecker } from './FilterChecker';
import dataYearsUnfilterdInit from '../assets/data-by-years.json';
import dataYearsfilterdInit from '../assets/data-by-years-filtred.json';
import dataGrpBy1Init from '../assets/data-by-grp1.json';
import dataGrp2Init from '../assets/data-by-grp2.json';
import i18n from '../i18n';

export interface IColumnFilter {
  name: string;
  queryColName: string;
  arrTypes: IFilterChecker[];
  //array of values to be sent as query to server
  arrValues: number[];
  isArrValuesEmptyOnAllCheck: boolean;
  setQueryVals: () => void;
  setFilter: (aType: number, checked: boolean) => void;
  getFilter: () => string;
  setBrowserQueryString: (param: URLSearchParams, delIfEmpthy?: boolean) => void;
  setValuesByQuery: (param: URLSearchParams) => void;
  // spaciel value, if checkd it will mark all options as true
  allTypesOption: number;
  isAllValsFalse: boolean;
  //text is updated after filter submit
  text: string;
  setText: (ignoreIfAll: boolean) => void;
}
/**  filter group of boolaen filters that are check-box in the gui
*  each group represnt one column in the database that can get
* several fixd values
*/
export class ColumnFilter implements IColumnFilter {
  name: string;

  queryColName: string;

  arrValues: number[];
  isArrValuesEmptyOnAllCheck: boolean;

  @observable
  arrTypes: IFilterChecker[];

  allTypesOption: number;

  @observable
  text: string;

  constructor(name: string, dbColName: string, allTypesOption: number = -1, isEmptyValsOnAllCheck: boolean = true) {
    this.name = name;
    this.queryColName = dbColName;
    this.arrTypes = [];
    this.arrValues = [];
    this.isArrValuesEmptyOnAllCheck = isEmptyValsOnAllCheck;
    // if this value > -1 , there is an option to set all values as true
    this.allTypesOption = allTypesOption;
    this.text = '';
  }

  /**
   * check if all the a values in the group are false
   */
  @computed get isAllValsFalse() {
    const res = this.arrTypes.reduce((counter, currentValue) => (currentValue.checked ? ++counter : counter), 0);
    return (res === 0);
  }

  @action
  setFilter = (aType: number, checked: boolean) => {
    // in case this filter group has no "select all" option - update the value
    if (this.allTypesOption === -1) this.arrTypes[aType].checked = checked;
    // in case this filter has opthion for "select all"
    else if (aType === this.allTypesOption) {
      this.arrTypes.forEach((x, index) => x.checked = (index === this.allTypesOption) ? checked : !checked);
    } else {
      this.arrTypes[this.allTypesOption].checked = false;
      this.arrTypes[aType].checked = checked;
    }
    this.setQueryVals();
  }

  /**
   * return sentence for query-string from Multiplefilter of booleans,
   * for example : &injt=4,5 
   * @param colFilter column filter with name and chekcd list of values
   */
  @action
  setQueryVals = () => {
    let allChecked: boolean = true;
    let arrfilter: number[] = [];
    if (this.allTypesOption > -1 && this.arrTypes[this.allTypesOption].checked) allChecked = true;
    else {
      // in case there is allTypesOption , it want be copied to arrfilter
      // as it is not checked
      const iterator = this.arrTypes.values();
      for (const filterCheck of iterator) {
        if (filterCheck.checked) {
          arrfilter = [...arrfilter, ...filterCheck.filters];
        } else {
          allChecked = false;
        }
      }
    }
    if (allChecked && this.isArrValuesEmptyOnAllCheck) arrfilter = [];
    this.arrValues = arrfilter;
  };

  /**
   * 
   * @returns query string for the server
   */
  getFilter = () => {
    const vals = this.arrValues.join(',');
    let res = (this.arrValues.length == 0) ? '' : `&${this.queryColName}=${vals}`;
    return res;
  }

  /**
  * set parmas of the browser QueryString
  * @param params 
  */
  setBrowserQueryString = (params: URLSearchParams, delIfEmpthy: boolean = true) => {
    if (this.arrValues.length === 0 && delIfEmpthy) {
      params.delete(this.queryColName);
    } else {
      const vals = this.arrValues.join(',');
      params.set(this.queryColName, vals);
    }
  }

  /**
   * set arrValues by url query parmas
   * @param params queryString from the browser
   */
  @action
  setValuesByQuery(params: URLSearchParams) {
    const vals = params.get(this.queryColName);
    if (vals !== null) {
      const valsArr = vals.split(',').map(Number);
      this.arrTypes.forEach(checker => {
        const found = checker.filters.some(r => valsArr.includes(r));
        checker.checked = found;
      });
    }
    this.setQueryVals();
  }

  @action
  setText = (ignoreIfAll: boolean) => {
    if (ignoreIfAll) {
      this.text = this.arrTypes.filter((x, index) => x.checked && index !== this.allTypesOption)
        .map(x => i18n.t(x.label)).join(', ');
      //in case all is cheked and no "allTypesOption" - text is ''
      if (this.allTypesOption === -1 && this.arrValues.length === 0) {
        this.text = '';
      }
    } else {
      this.text = this.arrTypes.filter(x => x.checked).map(x => i18n.t(x.label)).join(', ');
    }
  }
}

export const initInjurySeverity = () => {
  const col: IColumnFilter = new ColumnFilter('Severity', 'sev', -1, false);
  col.arrTypes.push(new FilterChecker('dead', true, [1]));
  col.arrTypes.push(new FilterChecker('severly-injured', false, [2]));
  col.setQueryVals();
  return col;
};

export const initDayNight = () => {
  const col: IColumnFilter = new ColumnFilter('DayNight', 'dn');
  col.arrTypes.push(new FilterChecker('day', true, [1]));
  col.arrTypes.push(new FilterChecker('night', true, [5]));
  return col;
};

export const initMonth = () => {
  const col: IColumnFilter = new ColumnFilter('Month', 'mn');
  col.arrTypes.push(new FilterChecker('1', true, [1]));
  col.arrTypes.push(new FilterChecker('2', true, [2]));
  col.arrTypes.push(new FilterChecker('3', true, [3]));
  col.arrTypes.push(new FilterChecker('4', true, [4]));
  col.arrTypes.push(new FilterChecker('5', true, [5]));
  col.arrTypes.push(new FilterChecker('6', true, [6]));
  col.arrTypes.push(new FilterChecker('7', true, [7]));
  col.arrTypes.push(new FilterChecker('8', true, [8]));
  col.arrTypes.push(new FilterChecker('9', true, [9]));
  col.arrTypes.push(new FilterChecker('10', true, [10]));
  col.arrTypes.push(new FilterChecker('11', true, [11]));
  col.arrTypes.push(new FilterChecker('12', true, [12]));
  return col;
};

export const initInjTypes = () => {
  const col: IColumnFilter = new ColumnFilter('TypeInjured', 'injt', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('pedestrian', false, [1]));
  col.arrTypes.push(new FilterChecker('cyclist', false, [6, 7]));
  col.arrTypes.push(new FilterChecker('other', false, [8, 9]));
  col.arrTypes.push(new FilterChecker('motorcycle', false, [4, 5]));
  col.arrTypes.push(new FilterChecker('wheels4+', false, [2, 3]));
  return col;
};

export const initVehicleTypes = () => {
  const col: IColumnFilter = new ColumnFilter('VehicleType', 'vcl', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('pedestrian', false, [0]));
  col.arrTypes.push(new FilterChecker('mobilityscooter', false, [22]));
  col.arrTypes.push(new FilterChecker('bicycle', false, [15]));
  col.arrTypes.push(new FilterChecker('e-scooter', false, [21]));
  col.arrTypes.push(new FilterChecker('e-bike', false, [23]));
  col.arrTypes.push(new FilterChecker('motorcycle', false,
    [8, 9, 10, 19]));
  col.arrTypes.push(new FilterChecker('car', false, [1]));
  col.arrTypes.push(new FilterChecker('taxi', false, [12]));
  col.arrTypes.push(new FilterChecker('tranzit', false, [2]));
  col.arrTypes.push(new FilterChecker('tender', false, [3]));
  col.arrTypes.push(new FilterChecker('bus', false, [11, 18]));
  col.arrTypes.push(new FilterChecker('truck', false,
    [24, 25, 5, 6, 7]));
  col.arrTypes.push(new FilterChecker('tractor', false, [14]));
  col.arrTypes.push(new FilterChecker('train', false, [16]));
  col.arrTypes.push(new FilterChecker('other', false, [17]));
  return col;
};

export const initVehicleTypesFull = () => {
  const col: IColumnFilter = new ColumnFilter('VehicleType', 'vcl', 0);
  col.arrTypes.push(new FilterChecker('vclType.all', true, []));
  col.arrTypes.push(new FilterChecker('vclType.pedestrian', false, [0]));
  col.arrTypes.push(new FilterChecker('vclType.mobilityscooter', false, [22]));
  col.arrTypes.push(new FilterChecker('vclType.bicycle', false, [15]));
  col.arrTypes.push(new FilterChecker('vclType.e-scooter', false, [21]));
  col.arrTypes.push(new FilterChecker('vclType.e-bike', false, [23]));
  col.arrTypes.push(new FilterChecker('vclType.motorcycle1', false, [8]));
  col.arrTypes.push(new FilterChecker('vclType.motorcycle2', false, [9]));
  col.arrTypes.push(new FilterChecker('vclType.motorcycle3', false, [10]));
  col.arrTypes.push(new FilterChecker('vclType.motorcycle4', false, [19]));
  col.arrTypes.push(new FilterChecker('vclType.car', false, [1]));
  col.arrTypes.push(new FilterChecker('vclType.taxi', false, [12]));
  col.arrTypes.push(new FilterChecker('vclType.tranzit', false, [2]));
  col.arrTypes.push(new FilterChecker('vclType.tender', false, [3]));
  col.arrTypes.push(new FilterChecker('vclType.minbuss', false, [18]));
  col.arrTypes.push(new FilterChecker('vclType.bus', false, [11]));
  col.arrTypes.push(new FilterChecker('vclType.truck1', false, [24]));
  col.arrTypes.push(new FilterChecker('vclType.truck2', false, [25]));
  col.arrTypes.push(new FilterChecker('vclType.truck3', false, [5]));
  col.arrTypes.push(new FilterChecker('vclType.truck4', false, [6]));
  col.arrTypes.push(new FilterChecker('vclType.truck5', false, [7]));
  col.arrTypes.push(new FilterChecker('vclType.tractor', false, [14]));
  col.arrTypes.push(new FilterChecker('vclType.train', false, [16]));
  col.arrTypes.push(new FilterChecker('vclType.other', false, [17]));
  return col;
};

export const initInvolvedVehicle = () => {
  const col: IColumnFilter = new ColumnFilter('Vehicles', 'vcli', 0);
  col.arrTypes.push(new FilterChecker('vclType.all', true, []));
  col.arrTypes.push(new FilterChecker('vclType.mobilityscooter', false, [22]));
  col.arrTypes.push(new FilterChecker('vclType.bicycle', false, [15]));
  col.arrTypes.push(new FilterChecker('vclType.e-scooter', false, [21]));
  col.arrTypes.push(new FilterChecker('vclType.e-bike', false, [23]));
  col.arrTypes.push(new FilterChecker('vclType.motorcycle', false, [8]));
  col.arrTypes.push(new FilterChecker('vclType.car', false, [1]));
  col.arrTypes.push(new FilterChecker('vclType.taxi', false, [12]));
  col.arrTypes.push(new FilterChecker('vclType.tranzit', false, [2]));
  col.arrTypes.push(new FilterChecker('vclType.tender', false, [3]));
  col.arrTypes.push(new FilterChecker('vclType.bus', false, [11]));
  col.arrTypes.push(new FilterChecker('vclType.truck', false, [5]));
  col.arrTypes.push(new FilterChecker('vclType.tractor', false, [14]));
  col.arrTypes.push(new FilterChecker('vclType.train', false, [16]));
  col.arrTypes.push(new FilterChecker('vclType.other', false, [17]));
  return col;
};


export const initGenderTypes = () => {
  const col: IColumnFilter = new ColumnFilter('Gender', 'sex');
  col.arrTypes.push(new FilterChecker('female', true, [2]));
  col.arrTypes.push(new FilterChecker('male', true, [1]));
  return col;
};

export const initAgeTypes = () => {
  const col: IColumnFilter = new ColumnFilter('Age', 'age', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('00-04', false, [1]));
  col.arrTypes.push(new FilterChecker('05-09', false, [2]));
  col.arrTypes.push(new FilterChecker('10-14', false, [3]));
  col.arrTypes.push(new FilterChecker('15-19', false, [4]));
  col.arrTypes.push(new FilterChecker('20-29', false, [5, 6]));
  col.arrTypes.push(new FilterChecker('30-39', false, [7, 8]));
  col.arrTypes.push(new FilterChecker('40-49', false, [9, 10]));
  col.arrTypes.push(new FilterChecker('50-59', false, [11, 12]));
  col.arrTypes.push(new FilterChecker('60-69', false, [13, 14]));
  col.arrTypes.push(new FilterChecker('70-79', false, [15, 16]));
  col.arrTypes.push(new FilterChecker('80+', false, [17, 18]));
  col.arrTypes.push(new FilterChecker('unknown', false, [99]));
  return col;
};
export const initPopulationTypes = () => {
  const col: IColumnFilter = new ColumnFilter('Population', 'pt');
  col.arrTypes.push(new FilterChecker('jews', true, [1]));
  col.arrTypes.push(new FilterChecker('arabs', true, [2]));
  col.arrTypes.push(new FilterChecker('immigrants', true, [4]));
  col.arrTypes.push(new FilterChecker('others', true, [3]));
  return col;
};

export const initLocationAccuracy = () => {
  const col: IColumnFilter = new ColumnFilter('LocationAccuracy', 'lca');
  col.arrTypes.push(new FilterChecker('accurate_location', true, [1]));
  col.arrTypes.push(new FilterChecker('city_center', true, [2]));
  col.arrTypes.push(new FilterChecker('road_center', true, [3]));
  col.arrTypes.push(new FilterChecker('km_cneter', true, [4]));
  col.arrTypes.push(new FilterChecker('no_location', true, [9]));
  return col;
};

export const initRoadTypes = () => {
  const col: IColumnFilter = new ColumnFilter('RoadType', 'rt');
  col.arrTypes.push(new FilterChecker('urban-junction', true, [1]));
  col.arrTypes.push(new FilterChecker('urban-road', true, [2]));
  col.arrTypes.push(new FilterChecker('non-urban-junction', true, [3]));
  col.arrTypes.push(new FilterChecker('non-urban-road', true, [4]));
  return col;
};
export const initSpeedLimit = () => {
  const col: IColumnFilter = new ColumnFilter('SpeedLimit', 'sp', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('speed50', false, [1]));
  col.arrTypes.push(new FilterChecker('speed60', false, [2]));
  col.arrTypes.push(new FilterChecker('speed70', false, [3]));
  col.arrTypes.push(new FilterChecker('speed80', false, [4]));
  col.arrTypes.push(new FilterChecker('speed90', false, [5]));
  col.arrTypes.push(new FilterChecker('speed100', false, [6]));
  col.arrTypes.push(new FilterChecker('speed110', false, [7]));
  col.arrTypes.push(new FilterChecker('speed120', false, [8]));
  col.arrTypes.push(new FilterChecker('speed-unknown', false, [0]));
  return col;
};
export const initRoadWidth = () => {
  const col: IColumnFilter = new ColumnFilter('RoadWidth', 'rw', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('road-width-5', false, [1]));
  col.arrTypes.push(new FilterChecker('road-width-7', false, [2]));
  col.arrTypes.push(new FilterChecker('road-width-10', false, [3]));
  col.arrTypes.push(new FilterChecker('road-width-14', false, [4]));
  col.arrTypes.push(new FilterChecker('road-width-14+', false, [5]));
  col.arrTypes.push(new FilterChecker('unknown', false, [0]));
  return col;
};
export const initSeparator = () => {
  const col: IColumnFilter = new ColumnFilter('Separator', 'ml', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('separator-fence', false, [2]));
  col.arrTypes.push(new FilterChecker('separator-built', false, [3]));
  col.arrTypes.push(new FilterChecker('separator-not-built', false, [4]));
  col.arrTypes.push(new FilterChecker('separator-paint', false, [1]));
  col.arrTypes.push(new FilterChecker('separator-ohter', false, [5]));
  // col.arrTypes.push(new FilterChecker('separator-not-relevant', false, [-1]));
  return col;
};
export const initOneLane = () => {
  const col: IColumnFilter = new ColumnFilter('OneLane', 'ol', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('onelane-oneway', false, [1]));
  col.arrTypes.push(new FilterChecker('onelane-twoway-line', false, [2]));
  col.arrTypes.push(new FilterChecker('onelane-twoway-noline', false, [3]));
  col.arrTypes.push(new FilterChecker('onelane-unknown', false, [9]));
  // col.arrTypes.push(new FilterChecker('onelane-not-relevant', false, [-1]));
  return col;
};
export const initAccidentType = () => {
  const col: IColumnFilter = new ColumnFilter('AccidentType', 'acc', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('accType.ped', false, [1]));
  col.arrTypes.push(new FilterChecker('accType.front-side', false, [2]));
  col.arrTypes.push(new FilterChecker('accType.front-front', false, [5]));
  col.arrTypes.push(new FilterChecker('accType.front-rear', false, [3]));
  col.arrTypes.push(new FilterChecker('accType.side-side', false, [4]));
  col.arrTypes.push(new FilterChecker('accType.obstacle', false, [8]));
  col.arrTypes.push(new FilterChecker('accType.turning-over', false, [10]));
  col.arrTypes.push(new FilterChecker('accType.slip', false, [11]));
  return col;
};

export const initDataYreasUnfilterd = () => dataYearsUnfilterdInit;

export const initDataYreasfilterd = () => dataYearsfilterdInit;

export const initDataGrpBy1 = () => dataGrpBy1Init;

export const initDataGrpBy2 = () => dataGrp2Init;
import { observable, action , makeObservable} from 'mobx';
import i18n from '../../../i18n';
import { CITY_POP_SIZE_ALL, CITY_POP_SIZE_OPTIONS, POLICE_STATIONS, YEARS } from './data';
import { IColumnFilterCombo } from './types';
/**  filter group of boolaen filters
*  each group represnt one column in the database that can get
* several fixd values
*/
export class ColumnFilterCombo implements IColumnFilterCombo {
  name: string;

  queryColName: string;

  arrTypes: any[];
  
  queryValue: string | number;

  text: string;

  allTypesOption: number;

  constructor(name: string,
    queryColName: string,
    allTypesOption: number = -1,
    data: any[],
    defaultVal: string | number) {
    this.name = name;
    this.queryColName = queryColName;
    this.arrTypes = data;
    this.queryValue = defaultVal;
    this.allTypesOption = allTypesOption;
    this.text = '';
    makeObservable(this, {
      queryValue: observable, 
      text: observable, 
      setFilter: action,
      // setText: action
    });
  }

  setFilter = (value: string | number) => {
    this.queryValue = value;
  }

  isEmpty = () => {
    return (this.allTypesOption >= 0 && this.queryValue === this.arrTypes[this.allTypesOption]);
  }

  setBrowserQueryString = (params: URLSearchParams, delIfEmpthy: boolean = true) => {
    if (!this.isEmpty()) {
      let vals = '';
      if (typeof (this.queryValue) === 'string') {
        vals += this.queryValue;
      } else {
        vals += this.queryValue.toString();
      }
      params.set(this.queryColName, vals);
    } else if (delIfEmpthy) {
      params.delete(this.queryColName);
    }
  }
  setValuesByQuery = (params: URLSearchParams) => {
    const vals = params.get(this.queryColName);
    if (vals !== null) {
      if (typeof (this.queryValue) === 'string') {
        this.setFilter(vals);
      } else {
        this.setFilter(parseInt(vals));
      }
    }
  }

  getFilter = () => {
    let filter: string = '';
    if (!this.isEmpty()) {
      filter += `&${this.queryColName}=`;
      if (typeof (this.queryValue) === 'string') {
        filter += this.queryValue;
      } else {
        filter += this.queryValue.toString();
      }
    }
    return filter;
  }

  setText = () => {
    if (typeof (this.queryValue) === 'string') {
      this.text = this.queryValue;
    } else {
      this.text = this.queryValue.toString();
    }
  }
}

export class ColumnFilterComboValText extends ColumnFilterCombo {
  isEmpty = () => {
    return (this.allTypesOption >= 0 && this.queryValue === this.arrTypes[this.allTypesOption].val);
  }
 
  setText = () => {
    let res = '';
    if (!this.isEmpty()) {
      const foundObject = this.arrTypes.find((obj: any) => { return obj.val === this.queryValue });
      if (foundObject) {
        res = `${i18n.t(foundObject.text)}`;
      }
      this.text = res;
    }
  }
}

const years: string[] = YEARS;
const cityPopSizeArr = CITY_POP_SIZE_OPTIONS;
const policeStations: string[] = POLICE_STATIONS;

export const initStartYear = (year :number) => {
  const col: ColumnFilterCombo = new ColumnFilterCombo('FromYear', 'sy', -1, years, year);
  return col;
};

export const initEndYear = (year :number) => {
  const col: ColumnFilterCombo = new ColumnFilterCombo('ToYear', 'ey', -1, years, year);
  return col;
};

export const initCityPopSize = () => {
  const col: ColumnFilterComboValText = new ColumnFilterComboValText('city_size', 'p1', 0, cityPopSizeArr, CITY_POP_SIZE_ALL);
  return col;
};

export const initPoilceStations = () => {
  const col: ColumnFilterCombo = new ColumnFilterCombo('PoliceStation', 'ey', -1, policeStations, "");
  return col;
}


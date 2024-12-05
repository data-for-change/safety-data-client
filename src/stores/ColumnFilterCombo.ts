import { observable, action } from 'mobx';
import i18n from '../i18n';

export interface IColumnFilterCombo {
  name: string;
  queryColName: string;
  //data for combo
  arrTypes: any[];
  //value to be sent as query to server
  queryValue: string | number;
  // spaciel value, if selected no filter is needed 
  allTypesOption: number;
  isEmpty: () => boolean;
  setBrowserQueryString: (param: URLSearchParams, delIfEmpthy?: boolean) => void;
  setValuesByQuery: (param: URLSearchParams) => void;
  setFilter: (value: string | number) => void;
  getFilter: () => string;
  //text is updated ofter filter submit
  text: string;
  setText: () => void;
}
/**  filter group of boolaen filters
*  each group represnt one column in the database that can get
* several fixd values
*/
export class ColumnFilterCombo implements IColumnFilterCombo {
  name: string;

  queryColName: string;

  arrTypes: any[];
  @observable
  queryValue: string | number;

  @observable
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
  }

  @action
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

  @action
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

const years: string[] = ['2015', '2016', '2017', '2018', '2019','2020','2021','2022','2023',];
const CITY_POP_SIZE_ALL = '{"min":-1,"max":-1}';
const cityPopSizeArr = [
  { val: '{"min":-1,"max":-1}', text: 'all' },
  { val: '{"min":200000,"max":1000000}', text: '200K-1000K' },
  { val: '{"min":100000,"max":200000}', text: '100K-200K' },
  { val: '{"min":50000,"max":100000}', text: '50K-100K' },
  { val: '{"min":20000,"max":50000}', text: '20K-50K' },
  { val: '{"min":10000,"max":20000}', text: '10K-20K' },
  { val: '{"min":0,"max":10000}', text: '0-10K' },
];

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

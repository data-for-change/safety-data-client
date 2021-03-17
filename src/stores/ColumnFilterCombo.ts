import { observable, action } from 'mobx';
// import i18n from '../i18n';

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

const years: string[] = ['2015', '2016', '2017', '2018', '2019'];

export const initStartYear = () => {
  const col: ColumnFilterCombo = new ColumnFilterCombo('FromYear', 'sy', -1, years, 2015);
  return col;
};

export const initEndYear = () => {
  const col: ColumnFilterCombo = new ColumnFilterCombo('ToYear', 'ey', -1, years, 2019);
  return col;
};
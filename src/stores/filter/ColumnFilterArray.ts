import { makeAutoObservable } from 'mobx';

export interface IColumnFilterArray {
  name: string;
  queryColName: string;
  //array of values to be sent as query to server
  arrValues: string[];
  isStringValues: boolean;
  setBrowserQueryString: (param: URLSearchParams) => void;
  setFilter: (values: string[]) => void;
  getFilter: () => string;
  //text is updated ofter filter submit
  text: string;
  setText: () => void;
  setTitle: (title: string) => void; 
}
/**  filter group of boolaen filters
*  each group represnt one column in the database that can get
* several fixd values
*/
export class ColumnFilterArray implements IColumnFilterArray {
  name: string;
  queryColName: string;
  arrValues: string[] = [];
  text: string = '';
  isStringValues: boolean;

  constructor(name: string, queryColName: string, isStringValues: boolean) {
    makeAutoObservable(this);
    
    this.name = name;
    this.queryColName = queryColName;
    this.isStringValues = isStringValues;
  }

  setFilter = (values: string[]) => {
    this.arrValues = values;
  }

  setBrowserQueryString = (params: URLSearchParams) => {
    if (this.arrValues.length > 0 && this.arrValues[0] !== '') {
      let vals = '';
      if (this.isStringValues) {
        vals += this.arrValues.map((x: string) => `${x.trim()}`).join(',');
      } else {
        vals += this.arrValues.map((x: string) => x).join(',');
      }
      params.set(this.queryColName, vals);
    } else {
      params.delete(this.queryColName);
    }
  }

  getFilter = () => {
    let filter: string = '';
    if (this.arrValues.length > 0 && this.arrValues[0] !== '') {
      filter += `&${this.queryColName}=`;
      if (this.isStringValues) {
        filter += this.arrValues.map((x: string) => `"${x.trim()}"`).join(',');
      } else {
        filter += this.arrValues.map((x: string) => x).join(',');
      }
    }
    return filter;
  }

  setText = () => {
    this.text = this.arrValues.join(', ');
  }
  
  setTitle = (title: string) => {
    this.text = title;
  }
}
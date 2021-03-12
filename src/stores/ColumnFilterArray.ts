import { observable, action } from 'mobx';
// import i18n from '../i18n';

export interface IColumnFilterArray {
  name: string;
  queryColName: string;
  arrValues: string[];
  setFilter: (values: string[]) => void;
  getFilter: () => string;
  //text is updated ofter filter submit
  text: string;
  setText: () => void;
}
/**  filter group of boolaen filters
*  each group represnt one column in the database that can get
* several fixd values
*/
export class ColumnFilterArray implements IColumnFilterArray {
  name: string;

  queryColName: string;

  @observable
  arrValues: string[];

  @observable
  text: string;

  constructor(name: string, queryColName: string) {
    this.name = name;
    this.queryColName = queryColName;
    this.arrValues = [];
    this.text = '';
  }

  @action
  setFilter = (values: string[]) => {
    this.arrValues = values;
  }

  getFilter = () => {
    let filter: string = '';
    if (this.arrValues.length > 0 && this.arrValues[0] !== '') {
       filter += `&${this.queryColName}=`;
       filter += this.arrValues.map((x: string) => x).join(',');
    }
    return filter;
  }

  @action
  setText = () => {
    this.text = this.arrValues.join(', ');
  }
}
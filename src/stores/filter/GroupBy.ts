import { observable } from 'mobx';
import {reGroupResultIsSelfAcc} from '../../utils/groupByUtils';
import { ItemCount } from '../../types';

export interface IGroupBy {
  text: string
  value: string;
  limit: number;
  sort: number;
  reGroupResultFunc? : ((data: ItemCount[]) => ItemCount[]);
}

export default class GroupBy implements IGroupBy {
  @observable
  text: string;
  value: string;
  limit: number;
  sort;
  reGroupResultFunc;

  // text - headleine for GUI, value - name of value for filter
  constructor(text: string, value: string, limit: number = 0, sort:number = 0, reGroupResultFunc?:((data: ItemCount[]) => ItemCount[])) {
    this.text = text;
    this.value = value;
    this.limit = limit;
    this.sort = sort;
    if(reGroupResultFunc) this.reGroupResultFunc = reGroupResultFunc;
  }

}
//init a group-by dictionary 
export const initGroupMap = () => {
  const map = new Map();
  map.set('sev', new GroupBy('Severity', 'sev'));
  map.set('injt', new GroupBy('TypeInjured', 'injt'));
  map.set('vcl', new GroupBy('Vehicle', 'vcl'));
  map.set('sex', new GroupBy('Gender', 'sex'));
  map.set('age', new GroupBy('Age', 'age'));
  map.set('pt', new GroupBy('Population', 'pt'));
  map.set('year', new GroupBy('Year', 'year'));
  map.set('mn', new GroupBy('Month', 'mn'));
  map.set('dn', new GroupBy('DayNight', 'dn'));
  map.set('wd', new GroupBy('WeekDay', 'wd'));
  map.set('rt', new GroupBy('RoadType', 'rt'));
  map.set('lca', new  GroupBy('LocationAccuracy', 'lca'))
  map.set('city', new GroupBy('City', 'city', 15, -1));
  map.set('cpop', new GroupBy('CityByPop', 'cpop'));
  map.set('st', new GroupBy('Street', 'st', 15, -1));
  map.set('rd', new GroupBy('Road', 'rd', 10, -1));
  map.set('acc', new GroupBy('AccidentType', 'acc'));
  map.set('selfacc', new GroupBy('SelfOrNotAcc', 'selfacc', 0, 0, reGroupResultIsSelfAcc));
  map.set('vcli', new GroupBy('Vehicles', 'vcli'));
  map.set('sp', new GroupBy('SpeedLimit', 'sp'));
  map.set('rw', new GroupBy('RoadWidth', 'rw'));
  map.set('ml', new GroupBy('Separator', 'ml'));
  map.set('ol', new GroupBy('OneLane', 'ol'));
  return map;
};


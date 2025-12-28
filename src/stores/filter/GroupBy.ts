import { makeAutoObservable } from 'mobx';
import { reGroupResultIsSelfAcc, changeInjuredTypeValues } from '../../utils/groupByUtils';
import { ItemCount, ItemCount2 } from '../../types';

export interface IGroupBy {
  text: string;
  value: string;
  limit: number;
  sort: string | null;
  transformFetchResult?: (data: ItemCount[]| ItemCount2[]) => ItemCount[]|ItemCount2[];
}

export default class GroupBy implements IGroupBy {
  text: string;
  value: string;
  limit: number;
  sort: string | null;
  transformFetchResult?: (data: ItemCount[]| ItemCount2[]) => ItemCount[]|ItemCount2[];

  constructor(
    text: string,
    value: string,
    limit: number = 0,
    sort: string | null = null,
    reGroupResultFunc?: (data: ItemCount[]| ItemCount2[]) => ItemCount[]|ItemCount2[]
  ) {
    this.text = text;
    this.value = value;
    this.limit = limit;
    this.sort = sort;
    this.transformFetchResult = reGroupResultFunc;

     // Make this class observable
    makeAutoObservable(this);
  }

  setLimit= (value: number) => {
    this.limit = value;
  }

  setSort =(value: string | null) => {
    this.sort = value;
    console.log('setSort', this.text, value)
  }
}

//init a group-by dictionary 
export const initGroupMap = () => {
  const map = new Map();
  map.set('sev', new GroupBy('Severity', 'sev'));
  map.set('injt', new GroupBy('TypeInjured', 'injt',0,null, changeInjuredTypeValues));
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
  map.set('city', new GroupBy('City', 'city', 20, 'd'));
  map.set('cpop', new GroupBy('CityByPop', 'cpop'));
  map.set('st', new GroupBy('Street', 'st', 40, 'd'));
  map.set('rd', new GroupBy('Road', 'rd', 20, 'd'));
  map.set('acc', new GroupBy('AccidentType', 'acc',0,'d'));
  map.set('selfacc', new GroupBy('SelfOrNotAcc', 'selfacc', 0, null, reGroupResultIsSelfAcc));
  map.set('vcli', new GroupBy('Vehicles', 'vcli', 0, 'd'));
  map.set('sp', new GroupBy('SpeedLimit', 'sp'));
  map.set('rw', new GroupBy('RoadWidth', 'rw'));
  map.set('ml', new GroupBy('Separator', 'ml'));
  map.set('ol', new GroupBy('OneLane', 'ol'));
  return map;
};


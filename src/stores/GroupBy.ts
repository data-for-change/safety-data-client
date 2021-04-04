import { observable } from 'mobx';

export interface IGroupBy {
  text: string;
  value: string;
  limit: number;
  sort: number;
}

export default class GroupBy implements IGroupBy {
  @observable
  text: string;

  value: string;

  limit: number;

  sort: number;

  // text - headleine for GUI, value - name of value for filter
  constructor(text: string, value: string, limit: number = 0, sort = 0) {
    this.text = text;
    this.value = value;
    this.limit = limit;
    this.sort = sort;
  }

}

export const initGroupMap = (useGetFetch: boolean) => {
  if (useGetFetch) return initGroupMapForGet();
  else return initGroupByDictForPost();
}

const initGroupMapForGet = () => {
  const map = new Map();
  map.set('sev', new GroupBy('Severity', 'sev'));
  map.set('injt', new GroupBy('TypeInjured', 'injt'));
  map.set('vcl', new GroupBy('Vehicle', 'vcl'));
  map.set('sex', new GroupBy('Gender', 'sex'));
  map.set('age', new GroupBy('Age', 'age'));
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
  map.set('vcli', new GroupBy('Vehicles', 'vcli'));
  map.set('sp', new GroupBy('SpeedLimit', 'sp'));
  map.set('rw', new GroupBy('RoadWidth', 'rw'));
  map.set('ml', new GroupBy('Separator', 'ml'));
  map.set('ol', new GroupBy('OneLane', 'ol'));
  return map;
};

const initGroupByDictForPost = () => {
  const dictGroupBy: any = {};
  dictGroupBy.Severity = new GroupBy('Severity', 'injury_severity_hebrew');
  dictGroupBy.TypeInjured = new GroupBy('TypeInjured', 'injured_type_hebrew');
  dictGroupBy.Vehicle = new GroupBy('Vehicle', 'vehicle_vehicle_type_hebrew');
  dictGroupBy.Gender = new GroupBy('Gender', 'sex_hebrew');
  dictGroupBy.Age = new GroupBy('Age', 'age_group_hebrew');
  dictGroupBy.Year = new GroupBy('Year', 'accident_year');
  dictGroupBy.Month = new GroupBy('Month', 'accident_month');
  dictGroupBy.DayNight = new GroupBy('DayNight', 'day_night_hebrew');
  dictGroupBy.WeekDay = new GroupBy('WeekDay', 'day_in_week_hebrew');
  dictGroupBy.RoadType = new GroupBy('RoadType', 'road_type_hebrew');
  dictGroupBy.City = new GroupBy('City', 'accident_yishuv_name', 10);
  dictGroupBy.CityByPop = new GroupBy('CityByPop', 'accident_yishuv_name');
  dictGroupBy.Street = new GroupBy('Street', 'street1_hebrew', 10);
  dictGroupBy.Road = new GroupBy('Road', 'road1', 10);
  dictGroupBy.AccidentType = new GroupBy('AccidentType', 'accident_type_hebrew');
  dictGroupBy.Vehicles = new GroupBy('Vehicles', 'vehicles');
  dictGroupBy.SpeedLimit = new GroupBy('SpeedLimit', 'speed_limit_hebrew');
  dictGroupBy.RoadWidth = new GroupBy('RoadWidth', 'road_width_hebrew');
  dictGroupBy.Separator = new GroupBy('Separator', 'multi_lane_hebrew');
  dictGroupBy.OneLane = new GroupBy('OneLane', 'one_lane_hebrew');
  return dictGroupBy;
};

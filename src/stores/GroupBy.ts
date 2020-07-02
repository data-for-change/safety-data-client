import { observable } from 'mobx';

export interface IGroupBy {
  text: string;
  value: string;
  limit: number;
}

export default class GroupBy implements IGroupBy {
  @observable
  text: string;

  value: string;

  limit: number;

  constructor(text: string, value: string, limit: number = 0) {
    this.text = text;
    this.value = value;
    this.limit = limit;
  }
}

export const initGroupByDict = (dictGroupBy: any) => {
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
  dictGroupBy.Street = new GroupBy('Street', 'street1_hebrew', 10);
  dictGroupBy.AccidentType = new GroupBy('AccidentType', 'accident_type_hebrew');
  dictGroupBy.Vehicles = new GroupBy('Vehicles', 'vehicles');
  dictGroupBy.SpeedLimit = new GroupBy('SpeedLimit', 'speed_limit_hebrew');
  dictGroupBy.RoadWidth = new GroupBy('RoadWidth', 'road_width_hebrew');
  dictGroupBy.Separator = new GroupBy('Separator', 'multi_lane_hebrew');
  dictGroupBy.OneLane = new GroupBy('OneLane', 'one_lane_hebrew');
};

export interface IGroupBy2 {
  text: string;
  name: string;
  vals: any;
}
export class GroupBy2 implements IGroupBy2 {
  @observable
  text:string;

  name: string;

  vals: any;

  constructor(text:string, name: string) {
    this.text = text;
    this.name = name;
    this.vals = {};
  }

  revTrnas = (key: string) => {
    if (key == '') return '';
    const res = this.vals[key].name;
    return res;
  }

  // input like {_id: 2015, count: Array(2)}
  // output like {_id: "2015", male: 264, female: 92}
  fixStrcutTable = (data: any[]) => {
    const res = data.map((x) => {
      const arr = x.count.map((y: any) => {
        const engVal = this.revTrnas(y.grp2);
        return (`"${engVal}":${y.count}`);
      }).join(',');
      let xId = x._id;
      if (xId !== null && xId !== undefined && typeof (xId) === 'string') xId = xId.replace('"', '\\"');
      let sObject = `{"_id":"${xId}",${arr}}`;
      sObject = JSON.parse(sObject);
      return (sObject);
    });
    // console.log(res)
    return res;
  }

  getBars = () => {
    // [{key:"male",color:"#8884d8"},{key:"female",color:"#82ca9d"}]
    const res = Object.entries(this.vals).map(([key, x]: any[]) => ({ key: x.name, color: x.color }));
    return res;
  }

  getColumns= () => {
    const res = Object.entries(this.vals).map(([key, x]: any[]) => (x.name));
    res.unshift('_id');
    return res;
  }
}


export class GroupBy2Val {
  name: string;

  color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }
}

export const initGroup2Dict = (dict: any) => {
  dict.Severity = new GroupBy2('Severity', 'injury_severity_hebrew');
  dict.Severity.vals['הרוג'] = new GroupBy2Val('dead', '#8884D8');
  dict.Severity.vals['פצוע קשה'] = new GroupBy2Val('severly-injured', '#82CA9D');

  dict.Gender = new GroupBy2('Gender', 'sex_hebrew');
  dict.Gender.vals['זכר'] = new GroupBy2Val('male', '#8884D8');
  dict.Gender.vals['נקבה'] = new GroupBy2Val('female', '#82CA9D');

  dict.RoadType = new GroupBy2('RoadType', 'road_type_hebrew');
  dict.RoadType.vals['עירונית בצומת'] = new GroupBy2Val('urban-junction', '#559E54');
  dict.RoadType.vals['עירונית לא בצומת'] = new GroupBy2Val('urban-road', '#305A30');
  dict.RoadType.vals['לא-עירונית בצומת'] = new GroupBy2Val('non-urban-junction', '#1258DC');
  dict.RoadType.vals['לא-עירונית לא בצומת'] = new GroupBy2Val('non-urban-road', '#0A337F');


  dict.TypeInjured = new GroupBy2('TypeInjured', 'injured_type_hebrew');
  dict.TypeInjured.vals['הולך רגל'] = new GroupBy2Val('pedestrian', '#82CA9D');
  dict.TypeInjured.vals['נהג - אופניים'] = new GroupBy2Val('cyclist-d', '#559E54');
  dict.TypeInjured.vals['נוסע - אופניים (לא נהג)'] = new GroupBy2Val('cyclist-p', '#559E54');
  dict.TypeInjured.vals['נהג - רכב לא ידוע'] = new GroupBy2Val('inj-unknown-d', '#305A30');
  dict.TypeInjured.vals['נוסע - רכב לא ידוע'] = new GroupBy2Val('inj-unknown-p', '#305A30');
  dict.TypeInjured.vals['נהג - אופנוע'] = new GroupBy2Val('motorcycle-d', '#1258DC');
  dict.TypeInjured.vals['נוסע - אופנוע (לא נהג)'] = new GroupBy2Val('motorcycle-p', '#1258DC');
  dict.TypeInjured.vals['נהג - רכב בעל 4 גלגלים ויותר'] = new GroupBy2Val('wheels4+-d', '#0A337F');
  dict.TypeInjured.vals['נוסע - רכב בעל 4 גלגלים ויותר'] = new GroupBy2Val('wheels4+-p', '#0A337F');
};

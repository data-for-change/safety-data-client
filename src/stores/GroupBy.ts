import { observable } from "mobx"

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
  dictGroupBy["Severity"] = new GroupBy('Severity', "injury_severity_hebrew")
  dictGroupBy["TypeInjured"] = new GroupBy('TypeInjured', "injured_type_hebrew");
  dictGroupBy["Vehicle"] = new GroupBy('Vehicle', "vehicle_vehicle_type_hebrew");
  dictGroupBy["Gender"] = new GroupBy('Gender', "sex_hebrew");
  dictGroupBy["Age"] = new GroupBy('Age', "age_group_hebrew");
  dictGroupBy["DayNight"] = new GroupBy('DayNight', "day_night_hebrew");
  dictGroupBy["WeekDay"] = new GroupBy('WeekDay', "day_in_week_hebrew");
  dictGroupBy["RoadType"] = new GroupBy('RoadType', "road_type_hebrew");
  dictGroupBy["City"] = new GroupBy('City', "accident_yishuv_name", 10);
  dictGroupBy["Street"] = new GroupBy('Street', "street1_hebrew", 10);
  dictGroupBy["AccidentType"] = new GroupBy('AccidentType', "accident_type_hebrew");
  dictGroupBy["SpeedLimit"] = new GroupBy('SpeedLimit', "speed_limit_hebrew");
  dictGroupBy["RoadWidth"] = new GroupBy('RoadWidth', "road_width_hebrew");
  dictGroupBy["Separator"] = new GroupBy('Separator', "multi_lane_hebrew");
  dictGroupBy["OneLane"] = new GroupBy('OneLane', "one_lane_hebrew");
}

export interface IGroupBy2 {
  text: string;
  name: string;
  vals: any;
}
export class GroupBy2  implements IGroupBy2 {
  @observable
  text:string;
  name: string;
  vals: any;
  constructor( text:string, name: string) {
    this.text =  text;
    this.name = name;
    this.vals = {};
  }
  revTrnas = (key: string) => {
    let res = this.vals[key].name;
    return res;
  }
  fixStrcutTable = (data: any[]) => {
    let res = data.map((x) => {
      let arr = x.count.map((y: any) => {
        let engVal = this.revTrnas(y.grp2)
        return ('"' + engVal + '":' + y.count)
      }).join(',')
      let xId = x._id;
      if (xId !== null && xId !== undefined)
        xId = xId.replace('"', '\\"')
      let sObject = `{"_id":"${xId}",${arr}}`
      sObject = JSON.parse(sObject)
      return (sObject)
    });
    //console.log(res)
    return res;
  }
  getBars = () => {
    //[{key:"male",color:"#8884d8"},{key:"female",color:"#82ca9d"}]
    let res = Object.entries(this.vals).map(([key, x]: any[]) => { return ({ key: x.name, color: x.color }) })
    return res;
  }
  getColumns= () => {
    let res = Object.entries(this.vals).map(([key, x]: any[]) => { return (x.name) })
    res.unshift('_id')
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
  dict["Severity"] = new GroupBy2("Severity","injury_severity_hebrew")
  dict["Severity"].vals["הרוג"] = new GroupBy2Val("dead", "#8884d8")
  dict["Severity"].vals["פצוע קשה"] = new GroupBy2Val("severly-injured", "#82ca9d")

  dict["Gender"] = new GroupBy2("Gender","sex_hebrew");
  dict["Gender"].vals["זכר"] = new GroupBy2Val("male", "#8884d8")
  dict["Gender"].vals["נקבה"] = new GroupBy2Val("female", "#82ca9d")

  dict["RoadType"] = new GroupBy2('RoadType', "road_type_hebrew");
  dict["RoadType"].vals["עירונית בצומת"] = new GroupBy2Val("urban-junction", "#559E54")
  dict["RoadType"].vals["עירונית לא בצומת"] = new GroupBy2Val("urban-road", "#305A30")
  dict["RoadType"].vals["לא-עירונית בצומת"] = new GroupBy2Val("non-urban-junction", "#1258DC")
  dict["RoadType"].vals["לא-עירונית לא בצומת"] = new GroupBy2Val("non-urban-road", "#0A337F")
}



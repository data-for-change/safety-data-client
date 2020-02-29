import { observable} from "mobx"

export interface IFilterChecker {
  checked: boolean;
  label:string;
  filters: string[];
}

export default class FilterChecker implements IFilterChecker {
  @observable
  checked: boolean;
  label:string;
  filters: string[];
  constructor(label:string, valid: boolean, filters: string[]) {
    this.label = label;
    this.checked = valid;
    this.filters = filters;
  }
}
export enum EnumVehiclePass {
  All,
  Ped,
  Cycle,
  Motorcycle,
  Car,
  Others
}

export const initInjTypes = (arr: any) => {
    arr.push(new FilterChecker('all',true, []));
    arr.push(new FilterChecker('pedestrian',false, ["הולך רגל"]));
    arr.push(new FilterChecker('cyclist',false, ["נהג - אופניים", "נוסע - אופניים (לא נהג)"]));
    arr.push(new FilterChecker('motorcycle', false, ["נהג - אופנוע", "נוסע - אופנוע (לא נהג)"]));
    arr.push(new FilterChecker('wheels4+',false, ["נהג - רכב בעל 4 גלגלים ויותר", "נוסע - רכב בעל 4 גלגלים ויותר"]));
    arr.push(new FilterChecker('other',false, ["נהג - רכב לא ידוע", "נוסע - רכב לא ידוע"]));
  }
  export const initGenderTypes = (arr: any) => {
    arr.push(new FilterChecker('female',true, ["נקבה"]));
    arr.push(new FilterChecker('male',true, ["זכר"]));
    //arr.push(new FilterChecker2(true, ["לא ידוע"]));
  }
  export const initAgeTypes = (arr: any) => {
    arr.push(new FilterChecker('00-04',true, ["00-04"]));
    arr.push(new FilterChecker('05-09',true, ["05-09"]));
    arr.push(new FilterChecker('10-14',true, ["10-14"]));
    arr.push(new FilterChecker('15-19',true, ["15-19"]));
    arr.push(new FilterChecker('20-29',true, ["20-24","25-29"]));
    arr.push(new FilterChecker('30-39',true, ["30-34","35-39"]));
    arr.push(new FilterChecker('40-49',true, ["40-44","45-49"]));
    arr.push(new FilterChecker('50-59',true, ["50-54","55-59"]));
    arr.push(new FilterChecker('60-69',true, ["60-64","65-69"]));
    arr.push(new FilterChecker('70-79',true, ["70-74","75-79"]));
    arr.push(new FilterChecker('80+',true, ["80-84","85+"]));
    arr.push(new FilterChecker('unknown',true, ["לא ידוע"]));
  }
  export const initPopulationTypes = (arr: any) => {
    arr.push(new FilterChecker('jews',true, ["יהודים"]));
    arr.push(new FilterChecker('arabs',true, ["ערבים"]));
    arr.push(new FilterChecker('immigrants',true, ["זרים"]));
    arr.push(new FilterChecker('unknown',true, ["לא ידוע"]));
  }

  export const initRoadTypes = (arr: any) => {
    arr.push(new FilterChecker('urban-junction',true, ["עירונית בצומת"]));
    arr.push(new FilterChecker('urban-road', true, ["עירונית לא בצומת"]));
    arr.push(new FilterChecker('non-urban-junction',true, ["לא-עירונית בצומת"]));
    arr.push(new FilterChecker('non-urban-road',true, ["לא-עירונית לא בצומת"]));
  }

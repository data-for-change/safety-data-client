import { observable, computed } from 'mobx';
import FilterChecker , {IFilterChecker} from './FilterChecker';

export interface IColumnFilter {
    name: string;
    dbColName: string;
    arrTypes: IFilterChecker[];
    allTypesOption : number;
    isAllValsFalse: boolean;
}
export class ColumnFilter implements IColumnFilter {
    name: string;

    dbColName: string;

    @observable
    arrTypes: IFilterChecker[];

    allTypesOption : number;

    constructor(name: string, dbColName: string, allTypesOption: number = -1) {
      this.name = name;
      this.dbColName = dbColName;
      this.arrTypes = [];
      this.allTypesOption = allTypesOption;
    }

    @computed get isAllValsFalse() {
      const res = this.arrTypes.reduce((counter, currentValue) => (currentValue.checked ? ++counter : counter), 0);
      return (res === 0);
    }
    // @computed get countTrueVals () {
    //     const res = this.arrTypes.reduce(function(counter,currentValue){
    //         return currentValue.checked? ++counter:counter;
    //       },0);
    //     return res;
    // }
}

export const initInjurySeverity = () => {
  const col : IColumnFilter = new ColumnFilter('Severity', 'injury_severity_hebrew');
  col.arrTypes.push(new FilterChecker('dead', true, ['הרוג']));
  col.arrTypes.push(new FilterChecker('severly-injured', false, ['פצוע קשה']));
  return col;
};

export const initDayNight = () => {
  const col : IColumnFilter = new ColumnFilter('DayNight', 'day_night_hebrew');
  col.arrTypes.push(new FilterChecker('day', true, ['יום']));
  col.arrTypes.push(new FilterChecker('night', true, ['לילה']));
  return col;
};

export const initMonth = (arr: IFilterChecker[]) => {
  arr.push(new FilterChecker('1', true, ['1']));
  arr.push(new FilterChecker('2', true, ['2']));
  arr.push(new FilterChecker('3', true, ['3']));
  arr.push(new FilterChecker('4', true, ['4']));
  arr.push(new FilterChecker('5', true, ['5']));
  arr.push(new FilterChecker('6', true, ['6']));
  arr.push(new FilterChecker('7', true, ['7']));
  arr.push(new FilterChecker('8', true, ['8']));
  arr.push(new FilterChecker('9', true, ['9']));
  arr.push(new FilterChecker('10', true, ['10']));
  arr.push(new FilterChecker('11', true, ['11']));
  arr.push(new FilterChecker('12', true, ['12']));
};

export const initInjTypes = () => {
  const col : IColumnFilter = new ColumnFilter('Vehicle', 'injured_type_hebrew', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('pedestrian', false, ['הולך רגל']));
  col.arrTypes.push(new FilterChecker('cyclist', false, ['נהג - אופניים', 'נוסע - אופניים (לא נהג)']));
  col.arrTypes.push(new FilterChecker('motorcycle', false, ['נהג - אופנוע', 'נוסע - אופנוע (לא נהג)']));
  col.arrTypes.push(new FilterChecker('wheels4+', false, ['נהג - רכב בעל 4 גלגלים ויותר', 'נוסע - רכב בעל 4 גלגלים ויותר']));
  col.arrTypes.push(new FilterChecker('other', false, ['נהג - רכב לא ידוע', 'נוסע - רכב לא ידוע']));
  return col;
};

export const initVehicleTypes = () => {
  const col : IColumnFilter = new ColumnFilter('VehicleType', 'vehicle_vehicle_type_hebrew', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('pedestrian', false, ['null']));
  col.arrTypes.push(new FilterChecker('mobilityscooter', false, ['קלנועית חשמלית']));
  col.arrTypes.push(new FilterChecker('bicycle', false, ['אופניים']));
  col.arrTypes.push(new FilterChecker('e-scooter', false, ['קורקינט חשמלי']));
  col.arrTypes.push(new FilterChecker('e-bike', false, ['אופניים חשמליים']));
  col.arrTypes.push(new FilterChecker('motorcycle', false, ['אופנוע 401+ סמ"ק', 'אופנוע 126 עד 400 סמ"ק', 'אופנוע 51 עד 125 סמ"ק']));
  col.arrTypes.push(new FilterChecker('car', false, ['רכב נוסעים פרטי']));
  col.arrTypes.push(new FilterChecker('taxi', false, ['מונית']));
  col.arrTypes.push(new FilterChecker('bus', false, ['אוטובוס זעיר', 'אוטובוס']));
  col.arrTypes.push(new FilterChecker('tranzit', false, ['משא עד 3.5 טון - אחוד (טרנזיט)']));
  col.arrTypes.push(new FilterChecker('tender', false, ['משא עד 3.5  טון - לא אחוד (טנדר)']));
  col.arrTypes.push(new FilterChecker('truck', false, ['משא 3.6 עד 9.9 טון', 'משא 10.0 עד 12.0 טון', 'משא 12.1 עד 15.9 טון', 'משא 16.0 עד 33.9 טון', 'משא 34.0+ טון']));
  col.arrTypes.push(new FilterChecker('tractor', false, ['טרקטור']));
  col.arrTypes.push(new FilterChecker('train', false, ['רכבת']));
  col.arrTypes.push(new FilterChecker('other', false, ['אחר ולא ידוע']));
  return col;
};

export const initGenderTypes = () => {
  const col : IColumnFilter = new ColumnFilter('Gender', 'sex_hebrew');
  col.arrTypes.push(new FilterChecker('female', true, ['נקבה']));
  col.arrTypes.push(new FilterChecker('male', true, ['זכר']));
  return col;
};

export const initAgeTypes = () => {
  const col : IColumnFilter = new ColumnFilter('Age', 'age_group_hebrew', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('00-04', false, ['00-04']));
  col.arrTypes.push(new FilterChecker('05-09', false, ['05-09']));
  col.arrTypes.push(new FilterChecker('10-14', false, ['10-14']));
  col.arrTypes.push(new FilterChecker('15-19', false, ['15-19']));
  col.arrTypes.push(new FilterChecker('20-29', false, ['20-24', '25-29']));
  col.arrTypes.push(new FilterChecker('30-39', false, ['30-34', '35-39']));
  col.arrTypes.push(new FilterChecker('40-49', false, ['40-44', '45-49']));
  col.arrTypes.push(new FilterChecker('50-59', false, ['50-54', '55-59']));
  col.arrTypes.push(new FilterChecker('60-69', false, ['60-64', '65-69']));
  col.arrTypes.push(new FilterChecker('70-79', false, ['70-74', '75-79']));
  col.arrTypes.push(new FilterChecker('80+', false, ['80-84', '85+']));
  col.arrTypes.push(new FilterChecker('unknown', false, ['לא ידוע']));
  return col;
};
export const initPopulationTypes = () => {
  const col : IColumnFilter = new ColumnFilter('Population', 'population_type_hebrew');
  col.arrTypes.push(new FilterChecker('jews', true, ['יהודים']));
  col.arrTypes.push(new FilterChecker('arabs', true, ['ערבים']));
  col.arrTypes.push(new FilterChecker('immigrants', true, ['זרים']));
  col.arrTypes.push(new FilterChecker('others', true, ['אחרים']));
  return col;
};

export const initRoadTypes = () => {
  const col : IColumnFilter = new ColumnFilter('RoadType', 'road_type_hebrew');
  col.arrTypes.push(new FilterChecker('urban-junction', true, ['עירונית בצומת']));
  col.arrTypes.push(new FilterChecker('urban-road', true, ['עירונית לא בצומת']));
  col.arrTypes.push(new FilterChecker('non-urban-junction', true, ['לא-עירונית בצומת']));
  col.arrTypes.push(new FilterChecker('non-urban-road', true, ['לא-עירונית לא בצומת']));
  return col;
};
export const initSpeedLimit = () => {
  const col : IColumnFilter = new ColumnFilter('SpeedLimit', 'speed_limit_hebrew', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('speed50', false, ['עד 50 קמ"ש']));
  col.arrTypes.push(new FilterChecker('speed60', false, ['60 קמ"ש']));
  col.arrTypes.push(new FilterChecker('speed70', false, ['70 קמ"ש']));
  col.arrTypes.push(new FilterChecker('speed80', false, ['80 קמ"ש']));
  col.arrTypes.push(new FilterChecker('speed90', false, ['90 קמ"ש']));
  col.arrTypes.push(new FilterChecker('speed100', false, ['100 קמ"ש']));
  col.arrTypes.push(new FilterChecker('speed110', false, ['110 קמ"ש']));
  col.arrTypes.push(new FilterChecker('speed120', false, ['120 קמ"ש']));
  col.arrTypes.push(new FilterChecker('speed-unknown', false, ['לא ידוע']));
  return col;
};
export const initRoadWidth = () => {
  const col : IColumnFilter = new ColumnFilter('RoadWidth', 'road_width_hebrew', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('road-width-5', false, ['עד 5 מטר']));
  col.arrTypes.push(new FilterChecker('road-width-7', false, ['5 עד 7 מטר']));
  col.arrTypes.push(new FilterChecker('road-width-10', false, ['7 עד 10.5 מטר']));
  col.arrTypes.push(new FilterChecker('road-width-14', false, ['10.5 עד 14 מטר']));
  col.arrTypes.push(new FilterChecker('road-width-14+', false, ['יותר מ- 14 מטר']));
  col.arrTypes.push(new FilterChecker('unknown', false, ['לא ידוע']));
  return col;
};
export const initSeparator = () => {
  const col : IColumnFilter = new ColumnFilter('Separator', 'multi_lane_hebrew', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('separator-fence', false, ['מיפרדה עם גדר בטיחות']));
  col.arrTypes.push(new FilterChecker('separator-built', false, ['מיפרדה בנויה ללא גדר בטיחות']));
  col.arrTypes.push(new FilterChecker('separator-not-built', false, ['מיפרדה לא בנויה']));
  col.arrTypes.push(new FilterChecker('separator-paint', false, ['מיפרדה מסומנת בצבע']));
  col.arrTypes.push(new FilterChecker('separator-ohter', false, ['אחר']));
  col.arrTypes.push(new FilterChecker('separator-not-relevant', false, ['null']));
  return col;
};
export const initOneLane = () => {
  const col : IColumnFilter = new ColumnFilter('OneLane', 'one_lane_hebrew', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('onelane-twoway-line', false, ['דו סיטרי + קו הפרדה רצוף']));
  col.arrTypes.push(new FilterChecker('onelane-twoway-noline', false, ['דו סיטרי אין קו הפרדה רצוף']));
  col.arrTypes.push(new FilterChecker('onelane-oneway', false, ['חד סיטרי']));
  col.arrTypes.push(new FilterChecker('onelane-unknown', false, ['לא ידוע מס מסלולים']));
  col.arrTypes.push(new FilterChecker('onelane-not-relevant', false, ['null']));
  return col;
};
export const initAccidentType = () => {
  const col : IColumnFilter = new ColumnFilter('AccidentType', 'accident_type_hebrew', 0);
  col.arrTypes.push(new FilterChecker('all', true, []));
  col.arrTypes.push(new FilterChecker('hit-ped', false, ['פגיעה בהולך רגל']));
  col.arrTypes.push(new FilterChecker('hit-front-side', false, ['התנגשות חזית בצד']));
  col.arrTypes.push(new FilterChecker('hit-front-front', false, ['התנגשות חזית בחזית']));
  col.arrTypes.push(new FilterChecker('hit-front-rear', false, ['התנגשות חזית באחור']));
  col.arrTypes.push(new FilterChecker('hit-side-side', false, ['התנגשות צד בצד']));
  col.arrTypes.push(new FilterChecker('hit-obstacle', false, ['התנגשות עם עצם דומם']));
  col.arrTypes.push(new FilterChecker('hit-turning-over', false, ['התהפכות']));
  col.arrTypes.push(new FilterChecker('hit-slip', false, ['החלקה']));
  return col;
};
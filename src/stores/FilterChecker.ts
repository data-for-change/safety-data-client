import { observable } from "mobx"

export interface IFilterChecker {
    checked: boolean;
    label: string;
    filters: string[];
}

export default class FilterChecker implements IFilterChecker {
    @observable
    checked: boolean;
    label: string;
    filters: string[];
    constructor(label: string, valid: boolean, filters: string[]) {
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

export const initInjurySeverity = (arr: IFilterChecker[]) => {
    arr.push(new FilterChecker('dead', true, ["הרוג"]));
    arr.push(new FilterChecker('severly-injured', false, ["פצוע קשה"]));
}

export const initDayNight = (arr: IFilterChecker[]) => {
    arr.push(new FilterChecker('day', true, ["יום"]));
    arr.push(new FilterChecker('night', true, ["לילה"]));
}

export const initInjTypes = (arr: IFilterChecker[]) => {
    arr.push(new FilterChecker('all', true, []));
    arr.push(new FilterChecker('pedestrian', false, ["הולך רגל"]));
    arr.push(new FilterChecker('cyclist', false, ["נהג - אופניים", "נוסע - אופניים (לא נהג)"]));
    arr.push(new FilterChecker('motorcycle', false, ["נהג - אופנוע", "נוסע - אופנוע (לא נהג)"]));
    arr.push(new FilterChecker('wheels4+', false, ["נהג - רכב בעל 4 גלגלים ויותר", "נוסע - רכב בעל 4 גלגלים ויותר"]));
    arr.push(new FilterChecker('other', false, ["נהג - רכב לא ידוע", "נוסע - רכב לא ידוע"]));
}

export const initVehicleTypes = (arr: IFilterChecker[]) => {
    //arr.push(new FilterChecker('all', true, []));
    arr.push(new FilterChecker('pedestrian', true, ["null"]));
    arr.push(new FilterChecker('mobilityscooter', true, ["קלנועית חשמלית"]));
    arr.push(new FilterChecker('bicycle', true, ["אופניים"]));
    arr.push(new FilterChecker('e-scooter', true, ["קורקינט חשמלי"]));
    arr.push(new FilterChecker('e-bike', true, ["אופניים חשמליים"]));
    arr.push(new FilterChecker('motorcycle', true, ['אופנוע 401+ סמ"ק','אופנוע 126 עד 400 סמ"ק','אופנוע 51 עד 125 סמ"ק',]));
    arr.push(new FilterChecker('car', true, ["רכב נוסעים פרטי"]));
    arr.push(new FilterChecker('taxi', true, ["מונית"]));
    arr.push(new FilterChecker('bus', true, ["אוטובוס זעיר","אוטובוס"]));
    arr.push(new FilterChecker('tranzit', true, ["משא עד 3.5 טון - אחוד (טרנזיט)"]));
    arr.push(new FilterChecker('tender', true, ["משא עד 3.5 טון - לא אחוד (טנדר)"]));
    arr.push(new FilterChecker('truck', true, ['משא 3.6 עד 9.9 טון','משא 10.0 עד 12.0 טון', 'משא 12.1 עד 15.9 טון', 'משא 16.0 עד 33.9 טון','משא 34.0+ טון',]));
    arr.push(new FilterChecker('tractor', true, ["טרקטור"]));
    arr.push(new FilterChecker('train', true, ["רכבת"]));
    arr.push(new FilterChecker('other', true, ["אחר ולא ידוע"]));
}

export const initGenderTypes = (arr: IFilterChecker[]) => {
    arr.push(new FilterChecker('female', true, ["נקבה"]));
    arr.push(new FilterChecker('male', true, ["זכר"]));
    //arr.push(new FilterChecker2(true, ["לא ידוע"]));
}
export const initAgeTypes = (arr: IFilterChecker[]) => {
    arr.push(new FilterChecker('00-04', true, ["00-04"]));
    arr.push(new FilterChecker('05-09', true, ["05-09"]));
    arr.push(new FilterChecker('10-14', true, ["10-14"]));
    arr.push(new FilterChecker('15-19', true, ["15-19"]));
    arr.push(new FilterChecker('20-29', true, ["20-24", "25-29"]));
    arr.push(new FilterChecker('30-39', true, ["30-34", "35-39"]));
    arr.push(new FilterChecker('40-49', true, ["40-44", "45-49"]));
    arr.push(new FilterChecker('50-59', true, ["50-54", "55-59"]));
    arr.push(new FilterChecker('60-69', true, ["60-64", "65-69"]));
    arr.push(new FilterChecker('70-79', true, ["70-74", "75-79"]));
    arr.push(new FilterChecker('80+', true, ["80-84", "85+"]));
    arr.push(new FilterChecker('unknown', true, ["לא ידוע"]));
}
export const initPopulationTypes = (arr: IFilterChecker[]) => {
    arr.push(new FilterChecker('jews', true, ["יהודים"]));
    arr.push(new FilterChecker('arabs', true, ["ערבים"]));
    arr.push(new FilterChecker('immigrants', true, ["זרים"]));
    arr.push(new FilterChecker('others', true, ["אחרים"]));
}

export const initRoadTypes = (arr: IFilterChecker[]) => {
    arr.push(new FilterChecker('urban-junction', true, ["עירונית בצומת"]));
    arr.push(new FilterChecker('urban-road', true, ["עירונית לא בצומת"]));
    arr.push(new FilterChecker('non-urban-junction', true, ["לא-עירונית בצומת"]));
    arr.push(new FilterChecker('non-urban-road', true, ["לא-עירונית לא בצומת"]));
}

export const initAccidentType = (arr: IFilterChecker[]) => {
    arr.push(new FilterChecker('hit-ped', true, ["פגיעה בהולך רגל"]));
    arr.push(new FilterChecker('hit-front-side', true, ["התנגשות חזית בצד"]));
    arr.push(new FilterChecker('hit-front-front', true, ["התנגשות חזית בחזית"]));
    arr.push(new FilterChecker('hit-front-rear', true, ["התנגשות חזית באחור"]));
    arr.push(new FilterChecker('hit-side-side', true, ["התנגשות צד בצד"]));
    arr.push(new FilterChecker('hit-obstacle', true, ["התנגשות עם עצם דומם"]));
    arr.push(new FilterChecker('hit-turning-over', true, ["התהפכות"]));
    arr.push(new FilterChecker('hit-slip', true, ["החלקה"]));
}



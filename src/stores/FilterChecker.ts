import { observable, action } from "mobx"

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
export interface IColumnFilter {
    name: string;
    dbColName: string;
    arrGruops: IFilterChecker[]
}
export class ColumnFilter implements IColumnFilter {
    name: string;
    dbColName: string;
    @observable
    arrGruops: IFilterChecker[];
    constructor(name: string, dbColName: string) {
        this.name = name;
        this.dbColName = dbColName;
        this.arrGruops = [];
    }
}

export const initInjurySeverity = () => {
    const col : IColumnFilter = new ColumnFilter('Severity','injury_severity_hebrew')
    col.arrGruops.push(new FilterChecker('dead', true, ["הרוג"]));
    col.arrGruops.push(new FilterChecker('severly-injured', false, ["פצוע קשה"]));
    return col;
}

export const initDayNight = () => {
    const col : IColumnFilter = new ColumnFilter('DayNight','day_night_hebrew')
    col.arrGruops.push(new FilterChecker('day', true, ["יום"]));
    col.arrGruops.push(new FilterChecker('night', true, ["לילה"]));
    return col;
}

export const initMonth = (arr: IFilterChecker[]) => {
    arr.push(new FilterChecker('1', true, ["1"]));
    arr.push(new FilterChecker('2', true, ["2"]));
    arr.push(new FilterChecker('3', true, ["3"]));
    arr.push(new FilterChecker('4', true, ["4"]));
    arr.push(new FilterChecker('5', true, ["5"]));
    arr.push(new FilterChecker('6', true, ["6"]));
    arr.push(new FilterChecker('7', true, ["7"]));
    arr.push(new FilterChecker('8', true, ["8"]));
    arr.push(new FilterChecker('9', true, ["9"]));
    arr.push(new FilterChecker('10', true, ["10"]));
    arr.push(new FilterChecker('11', true, ["11"]));
    arr.push(new FilterChecker('12', true, ["12"]));
}


export const initInjTypes = (arr: IFilterChecker[]) => {
    arr.push(new FilterChecker('all', true, []));
    arr.push(new FilterChecker('pedestrian', false, ["הולך רגל"]));
    arr.push(new FilterChecker('cyclist', false, ["נהג - אופניים", "נוסע - אופניים (לא נהג)"]));
    arr.push(new FilterChecker('motorcycle', false, ["נהג - אופנוע", "נוסע - אופנוע (לא נהג)"]));
    arr.push(new FilterChecker('wheels4+', false, ["נהג - רכב בעל 4 גלגלים ויותר", "נוסע - רכב בעל 4 גלגלים ויותר"]));
    arr.push(new FilterChecker('other', false, ["נהג - רכב לא ידוע", "נוסע - רכב לא ידוע"]));
}

export const initVehicleTypes = () => {
    const col : IColumnFilter = new ColumnFilter('VehicleType','vehicle_vehicle_type_hebrew')
    //arr.push(new FilterChecker('all', true, []));
    col.arrGruops.push(new FilterChecker('pedestrian', true, ["null"]));
    col.arrGruops.push(new FilterChecker('mobilityscooter', true, ["קלנועית חשמלית"]));
    col.arrGruops.push(new FilterChecker('bicycle', true, ["אופניים"]));
    col.arrGruops.push(new FilterChecker('e-scooter', true, ["קורקינט חשמלי"]));
    col.arrGruops.push(new FilterChecker('e-bike', true, ["אופניים חשמליים"]));
    col.arrGruops.push(new FilterChecker('motorcycle', true, ['אופנוע 401+ סמ"ק','אופנוע 126 עד 400 סמ"ק','אופנוע 51 עד 125 סמ"ק',]));
    col.arrGruops.push(new FilterChecker('car', true, ["רכב נוסעים פרטי"]));
    col.arrGruops.push(new FilterChecker('taxi', true, ["מונית"]));
    col.arrGruops.push(new FilterChecker('bus', true, ["אוטובוס זעיר","אוטובוס"]));
    col.arrGruops.push(new FilterChecker('tranzit', true, ["משא עד 3.5 טון - אחוד (טרנזיט)"]));
    col.arrGruops.push(new FilterChecker('tender', true, ["משא עד 3.5  טון - לא אחוד (טנדר)"]));
    col.arrGruops.push(new FilterChecker('truck', true, ['משא 3.6 עד 9.9 טון','משא 10.0 עד 12.0 טון', 'משא 12.1 עד 15.9 טון', 'משא 16.0 עד 33.9 טון','משא 34.0+ טון',]));
    col.arrGruops.push(new FilterChecker('tractor', true, ["טרקטור"]));
    col.arrGruops.push(new FilterChecker('train', true, ["רכבת"]));
    col.arrGruops.push(new FilterChecker('other', true, ["אחר ולא ידוע"]));
    return col;
}

export const initGenderTypes = () => {
    const col : IColumnFilter = new ColumnFilter('Gender','sex_hebrew')
    col.arrGruops.push(new FilterChecker('female', true, ["נקבה"]));
    col.arrGruops.push(new FilterChecker('male', true, ["זכר"]));
    return col;
}

export const initAgeTypes = () => {
    const col : IColumnFilter = new ColumnFilter('Age','age_group_hebrew')
    col.arrGruops.push(new FilterChecker('00-04', true, ["00-04"]));
    col.arrGruops.push(new FilterChecker('05-09', true, ["05-09"]));
    col.arrGruops.push(new FilterChecker('10-14', true, ["10-14"]));
    col.arrGruops.push(new FilterChecker('15-19', true, ["15-19"]));
    col.arrGruops.push(new FilterChecker('20-29', true, ["20-24", "25-29"]));
    col.arrGruops.push(new FilterChecker('30-39', true, ["30-34", "35-39"]));
    col.arrGruops.push(new FilterChecker('40-49', true, ["40-44", "45-49"]));
    col.arrGruops.push(new FilterChecker('50-59', true, ["50-54", "55-59"]));
    col.arrGruops.push(new FilterChecker('60-69', true, ["60-64", "65-69"]));
    col.arrGruops.push(new FilterChecker('70-79', true, ["70-74", "75-79"]));
    col.arrGruops.push(new FilterChecker('80+', true, ["80-84", "85+"]));
    col.arrGruops.push(new FilterChecker('unknown', true, ["לא ידוע"]));
    return col;
}
export const initPopulationTypes = () => {
    const col : IColumnFilter = new ColumnFilter('Population','population_type_hebrew')
    col.arrGruops.push(new FilterChecker('jews', true, ["יהודים"]));
    col.arrGruops.push(new FilterChecker('arabs', true, ["ערבים"]));
    col.arrGruops.push(new FilterChecker('immigrants', true, ["זרים"]));
    col.arrGruops.push(new FilterChecker('others', true, ["אחרים"]));
    return col;
}

export const initRoadTypes = (arr: IFilterChecker[]) => {
    arr.push(new FilterChecker('urban-junction', true, ["עירונית בצומת"]));
    arr.push(new FilterChecker('urban-road', true, ["עירונית לא בצומת"]));
    arr.push(new FilterChecker('non-urban-junction', true, ["לא-עירונית בצומת"]));
    arr.push(new FilterChecker('non-urban-road', true, ["לא-עירונית לא בצומת"]));
}
export const initSpeedLimit = (arr: IFilterChecker[]) =>{
    arr.push(new FilterChecker('speed50', true, ['עד 50 קמ"ש']));
    arr.push(new FilterChecker('speed60', true, ['60 קמ"ש']));
    arr.push(new FilterChecker('speed70', true, ['70 קמ"ש']));
    arr.push(new FilterChecker('speed80', true, ['80 קמ"ש']));
    arr.push(new FilterChecker('speed90', true, ['90 קמ"ש']));
    arr.push(new FilterChecker('speed100', true, ['100 קמ"ש']));
    arr.push(new FilterChecker('speed110', true, ['110 קמ"ש']));
    arr.push(new FilterChecker('speed120', true, ['120 קמ"ש']));
    arr.push(new FilterChecker('speed-unknown', true, ['לא ידוע']));
}
export const initRoadWidth = (arr: IFilterChecker[]) =>{
    arr.push(new FilterChecker('road-width-5', true, ['עד 5 מטר']));
    arr.push(new FilterChecker('road-width-7', true, ['5 עד 7 מטר']));
    arr.push(new FilterChecker('road-width-10', true, ['7 עד 10.5 מטר']));
    arr.push(new FilterChecker('road-width-14', true, ['10.5 עד 14 מטר']));
    arr.push(new FilterChecker('road-width-14+', true, ['יותר מ- 14 מטר']));
    arr.push(new FilterChecker('unknown', true, ['לא ידוע']));
}
export const initSeparator = (arr: IFilterChecker[]) =>{
    arr.push(new FilterChecker('separator-fence', true, ['מיפרדה עם גדר בטיחות']));
    arr.push(new FilterChecker('separator-built', true, ['מיפרדה בנויה ללא גדר בטיחות']));
    arr.push(new FilterChecker('separator-not-built', true, ['מיפרדה לא בנויה']));
    arr.push(new FilterChecker('separator-paint', true, ['מיפרדה מסומנת בצבע']));
    arr.push(new FilterChecker('separator-ohter', true, ['אחר']));
    arr.push(new FilterChecker('separator-not-relevant', true, ['null']));
}

export const initOneLane = (arr: IFilterChecker[]) =>{
    arr.push(new FilterChecker('onelane-twoway-line', true, ['דו סיטרי + קו הפרדה רצוף']));
    arr.push(new FilterChecker('onelane-twoway-noline', true, ['דו סיטרי אין קו הפרדה רצוף']));
    arr.push(new FilterChecker('onelane-oneway', true, ['חד סיטרי']));
    arr.push(new FilterChecker('onelane-unknown', true, ['לא ידוע מס מסלולים']));
    arr.push(new FilterChecker('onelane-not-relevant', true, ['null']));
}


export const initAccidentType = () => {
    const col : IColumnFilter = new ColumnFilter('AccidentType','accident_type_hebrew')
    col.arrGruops.push(new FilterChecker('hit-ped', true, ["פגיעה בהולך רגל"]));
    col.arrGruops.push(new FilterChecker('hit-front-side', true, ["התנגשות חזית בצד"]));
    col.arrGruops.push(new FilterChecker('hit-front-front', true, ["התנגשות חזית בחזית"]));
    col.arrGruops.push(new FilterChecker('hit-front-rear', true, ["התנגשות חזית באחור"]));
    col.arrGruops.push(new FilterChecker('hit-side-side', true, ["התנגשות צד בצד"]));
    col.arrGruops.push(new FilterChecker('hit-obstacle', true, ["התנגשות עם עצם דומם"]));
    col.arrGruops.push(new FilterChecker('hit-turning-over', true, ["התהפכות"]));
    col.arrGruops.push(new FilterChecker('hit-slip', true, ["החלקה"]));
    return col
}



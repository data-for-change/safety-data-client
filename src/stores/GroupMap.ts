import { observable, action, makeAutoObservable} from 'mobx';
import GroupBy from './filter/GroupBy';
import GroupBy2 from './filter/GroupBy2';
import GroupBy2Val from './GroupBy2Val';

export interface IGroupMap{
    groupBy: GroupBy2|GroupBy;
    arrGroups: any[];
}
export default class GroupMap implements IGroupMap {
    
    constructor(map: Map<string,any>, colName: string,  defautVal: string) {
        this.dict = map;
        makeAutoObservable(this,{
            groupBy: observable,
            arrGroups: observable
        })
        this.queryColName = colName;
        this.groupBy = this.dict.get(defautVal);
        this.setArrGroups();
    }

    dict: Map<string,any>;
    queryColName: string;

    groupBy: GroupBy2|GroupBy;

    @action
    setFilter = (key: string) => {
        this.groupBy = this.dict.get(key);
    }

    arrGroups: any[] = [];

    @action
    setArrGroups = () => {
        this.arrGroups = Array.from(this.dict, ([key, item]) => ({ value: key, text: item.text }));
    }

    setBrowserQueryString = () => {
        const params = new URLSearchParams(window.location.search);
        if (this.groupBy instanceof GroupBy){
            params.set(this.queryColName, (this.groupBy as GroupBy).value);
        } else if (this.groupBy instanceof GroupBy2) {
            params.set(this.queryColName, (this.groupBy as GroupBy2).name);
        }
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }

    @action
    setValuesByQuery = (params: URLSearchParams) => {
        const val = params.get(this.queryColName);
        if (val !== null) {
             this.setFilter(val);
        }
    }
}

export const initGroup2Map = (useGetFetch: boolean) => {
    if (useGetFetch) return initGroup2DictForGet();
    else return initGroup2DictForPost();
  };

  /**
   * init a map of GroupBy2 objects, 
   * each GroupBy2 object has values, to be used in charts, 
   * keys are axpected values from server maped to lang values 
   * @returns 
   */
const initGroup2DictForGet = () => {
    const dict = new Map()
    const sev = new GroupBy2('Severity', 'sev');
    sev.vals['הרוג'] = new GroupBy2Val('dead', '#8884D8');
    sev.vals['פצוע קשה'] = new GroupBy2Val('severly-injured', '#82CA9D');
    dict.set(sev.name, sev);

    const gen = new GroupBy2('Gender', 'sex');
    gen.vals['זכר'] = new GroupBy2Val('male', '#8884D8');
    gen.vals['נקבה'] = new GroupBy2Val('female', '#82CA9D');
    dict.set(gen.name, gen);

    const roadt = new GroupBy2('RoadType', 'rt');
    roadt.vals['עירונית בצומת'] = new GroupBy2Val('urban-junction', '#559E54');
    roadt.vals['עירונית לא בצומת'] = new GroupBy2Val('urban-road', '#305A30');
    roadt.vals['לא-עירונית בצומת'] = new GroupBy2Val('non-urban-junction', '#1258DC');
    roadt.vals['לא-עירונית לא בצומת'] = new GroupBy2Val('non-urban-road', '#0A337F');
    dict.set(roadt.name, roadt);

    const year = new GroupBy2('Year', 'year');
    year.vals[2015] = new GroupBy2Val('2015', '#82CA9D');
    year.vals[2016] = new GroupBy2Val('2016', '#559E54');
    year.vals[2017] = new GroupBy2Val('2017', '#559E54');
    year.vals[2018] = new GroupBy2Val('2018', '#305A30');
    year.vals[2019] = new GroupBy2Val('2019', '#305A30');
    year.vals[2020] = new GroupBy2Val('2020', '#1258DC');
    year.vals[2021] = new GroupBy2Val('2021', '#1258DC');
    year.vals[2021] = new GroupBy2Val('2022', '#1258DC');
    year.vals[2021] = new GroupBy2Val('2023', '#1258DC');
    year.vals[2021] = new GroupBy2Val('2024', '#1258DC');
    dict.set(year.name, year);

    const dayNight = new GroupBy2('DayNight', 'dn');
    dayNight.vals['יום'] = new GroupBy2Val('day', '#82CA9D');
    dayNight.vals['לילה'] = new GroupBy2Val('night', '#559E54');
    dict.set(dayNight.name, dayNight);


    const injt = new GroupBy2('TypeInjured', 'injt');
    injt.vals['הולך רגל'] = new GroupBy2Val('pedestrian', '#82CA9D');
    injt.vals['נהג - אופניים'] = new GroupBy2Val('cyclist-d', '#559E54');
    injt.vals['נוסע - אופניים (לא נהג)'] = new GroupBy2Val('cyclist-p', '#559E54');
    injt.vals['נהג - רכב לא ידוע'] = new GroupBy2Val('inj-unknown-d', '#305A30');
    injt.vals['נוסע - רכב לא ידוע'] = new GroupBy2Val('inj-unknown-p', '#305A30');
    injt.vals['נהג - אופנוע'] = new GroupBy2Val('motorcycle-d', '#1258DC');
    injt.vals['נוסע - אופנוע (לא נהג)'] = new GroupBy2Val('motorcycle-p', '#1258DC');
    injt.vals['נהג - רכב בעל 4 גלגלים ויותר'] = new GroupBy2Val('wheels4+-d', '#0A337F');
    injt.vals['נוסע - רכב בעל 4 גלגלים ויותר'] = new GroupBy2Val('wheels4+-p', '#0A337F');
    dict.set(injt.name, injt);

    const acc=  new GroupBy2('AccidentType', 'acc');
    acc.vals['פגיעה בהולך רגל'] = new GroupBy2Val('accType.ped', '#e3eaa7');
    acc.vals['התנגשות חזית בצד'] = new GroupBy2Val('accType.front-side', '#03045E');
    acc.vals['התנגשות חזית בחזית'] = new GroupBy2Val('accType.front-front', '#4673FA');
    acc.vals['התנגשות חזית באחור'] = new GroupBy2Val('accType.front-rear', '#00b4d8');
    acc.vals['התנגשות צד בצד'] = new GroupBy2Val('accType.side-side', '#90e0ef');
    acc.vals['התנגשות עם עצם דומם'] = new GroupBy2Val('accType.obstacle3', '#ef6351');
    acc.vals['התנגשות עם רכב חונה'] = new GroupBy2Val('accType.obstacle2', '#f38375');
    acc.vals['התנגשות עם רכב שנעצר ללא חניה'] = new GroupBy2Val('accType.obstacle1', '#f7a399');
    acc.vals['ירידה מהכביש או עלייה למדרכה'] = new GroupBy2Val('accType.offroad', '#fbc3bc');
    acc.vals['התהפכות'] = new GroupBy2Val('accType.turning-over', '#FA6E2D');
    acc.vals['החלקה'] = new GroupBy2Val('accType.slip', '#BD5422');
    acc.vals['אחר'] = new GroupBy2Val('accType.other', '#a53860');
    acc.vals['פגיעה בנוסע בתוך כלי הרכב'] = new GroupBy2Val('accType.passenger', '#31572c');
    acc.vals['נפילה מרכב נע'] = new GroupBy2Val('accType.falloff', '#4f772d');
    acc.vals['התנגשות אחור בחזית'] = new GroupBy2Val('accType.rear-front', '#CAF0F8');
    acc.vals['התנגשות אחור אל צד'] = new GroupBy2Val('accType.rear-side', '#CAF0F8');
    acc.vals['התנגשות עם בעל חיים'] = new GroupBy2Val('accType.animal', '#ecf39e');
    acc.vals['פגיעה ממטען של רכב'] = new GroupBy2Val('accType.cargo', '#0A337F');
    dict.set(acc.name, acc);

    return dict;
}

const initGroup2DictForPost = () => {

    const dict = {} as any;
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

    dict.Year = new GroupBy2('Year', 'accident_year');
    dict.Year.vals[2015] = new GroupBy2Val('2015', '#82CA9D');
    dict.Year.vals[2016] = new GroupBy2Val('2016', '#559E54');
    dict.Year.vals[2017] = new GroupBy2Val('2017', '#559E54');
    dict.Year.vals[2018] = new GroupBy2Val('2018', '#305A30');
    dict.Year.vals[2019] = new GroupBy2Val('2019', '#305A30');

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

    return dict;
}
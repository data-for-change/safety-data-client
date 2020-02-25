import { observable, action ,reaction} from "mobx"
import i18n from "../i18n";
import L from 'leaflet'
import AccidentService from "../services/Accident.Service"
import CityService from '../services/City.Service'
//import autorun  from "mobx"

interface IFilterChecker {
  checked: boolean;
  filters: string[];
}

class FilterChecker implements IFilterChecker {
  @observable
  checked: boolean;
  filters: string[];
  constructor(valid: boolean, filters: string[]) {
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

export default class FilterStore {
  appInitialized = false
  constructor() {
    // init app data
    this.initInjTypes(this.injTypes);
    this.initRoadTypes(this.roadTypes);
    this.initGenderTypes(this.genderTypes);
    //this.initCitis();
    this.appInitialized = false;

  }
  initInjTypes = (arr: any) => {
    arr.push(new FilterChecker(true, []));
    arr.push(new FilterChecker(false, ["הולך רגל"]));
    arr.push(new FilterChecker(false, ["נהג - אופניים", "נוסע - אופניים (לא נהג)"]));
    arr.push(new FilterChecker(false, ["נהג - אופנוע", "נוסע - אופנוע (לא נהג)"]));
    arr.push(new FilterChecker(false, ["נהג - רכב בעל 4 גלגלים ויותר", "נוסע - רכב בעל 4 גלגלים ויותר"]));
    arr.push(new FilterChecker(false, ["נהג - רכב לא ידוע", "נוסע - רכב לא ידוע"]));
  }
  initRoadTypes = (arr: any) => {
    arr.push(new FilterChecker(true, ["עירונית בצומת"]));
    arr.push(new FilterChecker(true, ["עירונית לא בצומת"]));
    arr.push(new FilterChecker(true, ["לא-עירונית בצומת"]));
    arr.push(new FilterChecker(true, ["לא-עירונית לא בצומת"]));
  }
  initGenderTypes = (arr: any) => {
    arr.push(new FilterChecker(true, ["נקבה"]));
    arr.push(new FilterChecker(true, ["זכר"]));
    //arr.push(new FilterChecker(true, ["לא ידוע"]));
  }

  @observable
  city: string = "";
  //@observable
  // citiesNames: string[] = ["חיפה","גבעתיים"]
  // initCitis = () =>{
  //   var srvCity  = new CityService();
  //   srvCity.getCitiesNames("he",this.updateCitisNames);
  // }
  // @action 
  // updateCitisNames = (res:any[]) => {
  //   console.log("updateCitisNames")
  //   if (res !== null && res.length >0 ) {
  //     this.citiesNames  = res.map((x:any)=>x.name_he).filter(x => !!x);
  //   }
  // }
 
// this belong to root store
  @observable
  language : string = "he" 
  @action
  updateLanguage = (lang: string) => {
    this.language = lang; 
  }
  reactionChangeLang = reaction(
    () => this.language,
    locale => {
      i18n.changeLanguage(locale);
    }
  )


  //this belong to mapstore! need to move
  @observable
  mapCenter: L.LatLng = new L.LatLng(32.09, 34.7818)


  @observable
  startYear: number = 2015;
  @observable
  endYear: number = 2019;



  @observable
  roadTypes: Array<IFilterChecker> = [];
  @action
  updateRoadType = (aType: number, val: boolean) => {
    this.roadTypes[aType].checked = val;
  }

  @observable
  genderTypes: Array<IFilterChecker> = [];
  @action
  updateGenderType = (aType: number, val: boolean) => {
    this.genderTypes[aType].checked = val;
  }

  //injTypes
  @observable
  injTypes: Array<IFilterChecker> = [];
  @action
  updateInjuerdType = (aType: number, val: boolean) => {
    if (aType === 0) {
      this.injTypes[0].checked = val;
      this.injTypes[1].checked = !val;
      this.injTypes[2].checked = !val;
      this.injTypes[3].checked = !val;
      this.injTypes[4].checked = !val;
      this.injTypes[5].checked = !val;
    }
    else {
      this.injTypes[0].checked = false;
      this.injTypes[aType].checked = val;
    }
  }

  @observable
  markers: any[] = []

  @action
  submitFilter = () => {
    //this.city = trimCity.toString().trim();
    let filter = this.getFilter();
    let trimCity: string = this.city;
    trimCity = trimCity.toString().trim();
    if (trimCity !== ""){
      var srvCity  = new CityService();
      srvCity.getCityByNameHe(this.city,this.updateLocation);
    }
    var service = new AccidentService();
    service.getFilter(filter, this.updateMarkers);
  }

  getFilter = () => {
    let filter = `{"$and" : [`
    filter += `{"accident_year":  { "$gte" : ${this.startYear},"$lte": ${this.endYear}}}`;
    let trimCity: string = this.city;
    trimCity = trimCity.toString().trim();
    if (trimCity !== "") filter += `, {"accident_yishuv_name": "${trimCity}"}`;
    filter += this.getMultiplefilter("road_type_hebrew",this.roadTypes);
    filter += this.getfilterInjured();
    filter += this.getMultiplefilter("sex_hebrew",this.genderTypes);
    filter += `]}`
    console.log(filter)
    return filter;
  }
  getMultiplefilter = (filterKey: string, arr: Array<IFilterChecker>) => {
    let filter: string = '';
    let allChecked: boolean = true;
    let arrfilter: string[] = [];
    const iterator = arr.values();
    for (const filterCheck of iterator) {
      if (filterCheck.checked) {
        arrfilter = [...arrfilter, ...filterCheck.filters]
      }
      else {
        allChecked = false;
      }
    }
    if (allChecked)
      filter = '';
    else {
      filter += `,{"$or": [`
      filter += arrfilter.map((x: string) => `{"${filterKey}" : "${x}"}`).join(',')
      filter += `]}`
    }
    console.log(filter)
    return filter;
  }

  getfilterInjured = () => {
    let filter: string = '';
    if (this.injTypes[0].checked)
      filter = '';
    else {
      let arrfilter: string[] = [];
      const iterator = this.injTypes.values();
      for (const injType of iterator) {
        if (injType.checked) {
          arrfilter = [...arrfilter, ...injType.filters]
        }
      }
      filter += `,{"$or": [`
      filter += arrfilter.map((x: string) => `{"injured_type_hebrew" : "${x}"}`).join(',')
      filter += `]}`
    }
    return filter;
  }

  @action
  updateMarkers = (arrPoints: any[]) => {
    if (arrPoints !== null) {
      this.markers = arrPoints;
    }
  }
  @action 
  updateLocation = (res:any[]) => {
    if (res !== null && res.length >0 ) {
      let city = res[0]; 
      if (city.lat !== null && city.lon !== null)
        this.mapCenter = new L.LatLng(city.lat,city.lon) ;
    }
  }

}




// autorun(() =>{
//     console.log(store.todos[0])
//     console.log(store.filter)
// })

//export default store
import { observable, action, reaction } from "mobx"
import i18n from "../i18n";
import L from 'leaflet'
import IFilterChecker from './FilterChecker'
import * as FC from './FilterChecker'
import { fetchFilter, fetchGroupBy } from "../services/Accident.Service"
import CityService from '../services/City.Service'
//import autorun  from "mobx"

export default class FilterStore {
  appInitialized = false
  constructor() {
    // init app data
    FC.initDayNight(this.dayNight)
    FC.initInjTypes(this.injTypes);
    FC.initGenderTypes(this.genderTypes);
    FC.initAgeTypes(this.ageTypes)
    FC.initPopulationTypes(this.populationTypes)
    FC.initRoadTypes(this.roadTypes);
    this.appInitialized = false;
  }


  @observable
  city: string = "";
  @action
  updateCity = (name: string) => {
    this.city = name;
  }
  @observable
  cityResult: string = "";

  // this belong to root store
  @observable
  language: string = "he"
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
  mapCenter: L.LatLng = new L.LatLng(32.08, 34.83)
  //when
  @observable
  startYear: number = 2015;
  @observable
  endYear: number = 2019;
  @observable
  dayNight: Array<IFilterChecker> = [];
  @action
  updateDayNight = (aType: number, val: boolean) => {
    this.dayNight[aType].checked = val;
  }

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

  @observable
  ageTypes: Array<IFilterChecker> = [];
  @action
  updateAgeType = (aType: number, val: boolean) => {
    this.ageTypes[aType].checked = val;
  }
  @observable
  populationTypes: Array<IFilterChecker> = [];
  @action
  updatePopulationType = (aType: number, val: boolean) => {
    this.populationTypes[aType].checked = val;
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
  @observable
  dataByYears: any[] = []
  @observable
  dataFilterdByYears: any[] = []
  @observable 
  groupeBy:string = "injured_type_hebrew"
  @action
  updateGroupby = (val: string) => {
    this.groupeBy = val;
    this.submitfilterdGroup(this.groupeBy);
  }

  @observable 
  dataFilterd :any [] = []

  @observable
  isLoading: boolean = false;

  @action
  submitFilter = () => {
    this.isLoading = true;
    let filter = this.getFilter();
    let trimCity: string = this.city;
    trimCity = trimCity.toString().trim();
    if (trimCity !== "") {
      var srvCity = new CityService();
      srvCity.getCityByNameHe(this.city, this.updateLocation);
    }
    fetchFilter(filter)
      .then((data: any[] | undefined) => {
        if (data !== null && data !== undefined) {
          this.markers = data;
        }
        this.isLoading = false;
        this.cityResult = this.city;
      })
    this.submitGroupByYears();
    this.submitfilterdGroupByYears();
    this.submitfilterdGroup(this.groupeBy);
  }

  @action
  submitGroupByYears = () => {
    let filtermatch = this.getfilterForCityOnly();
    let filter = this.getFilterGroupBy(filtermatch, "accident_year");
    fetchGroupBy(filter)
      .then((data: any[] | undefined) => {
        if (data !== undefined)
          this.dataByYears = data;
      })
  }
  @action
  submitfilterdGroupByYears = () => {
    let filtermatch = this.getFilter();
    let filter = this.getFilterGroupBy(filtermatch, "accident_year");
    fetchGroupBy(filter)
      .then((data: any[] | undefined) => {
        if (data !== undefined)
          this.dataFilterdByYears = data;
      })
  }
  @action
  submitfilterdGroup = (groupName :string ) => {
    let filtermatch = this.getFilter();
    let filter = this.getFilterGroupBy(filtermatch, groupName);
    fetchGroupBy(filter)
      .then((data: any[] | undefined) => {
        if (data !== undefined)
          this.dataFilterd= data;
      })
  }

  getFilterGroupBy = (filterMatch: string, groupName: string) => {
    let filter = "["
      + '{"$match": ' + filterMatch + '}'
      + ',{"$group": { "_id": "$' + groupName + '", "count": { "$sum": 1 }}}'
      + ',{"$sort": {"_id": 1}}'
      + ']'
    return filter;
  }

  getFilter = () => {
    let filter = `{"$and" : [`
    filter += `{"accident_year":  { "$gte" : "${this.startYear}","$lte": "${this.endYear}"}}`;
    filter += this.getMultiplefilter("day_night_hebrew", this.dayNight);
    filter += this.getfilterCity();
    filter += this.getMultiplefilter("road_type_hebrew", this.roadTypes);
    filter += this.getfilterInjured();
    filter += this.getMultiplefilter("sex_hebrew", this.genderTypes);
    filter += this.getMultiplefilter("age_group_hebrew", this.ageTypes);
    filter += this.getMultiplefilter("population_type_hebrew", this.populationTypes);
    filter += `]}`
    console.log(filter)
    return filter;
  }

  getfilterForCityOnly = () => {
    let filter = `{"$and" : [`
    filter += `{"accident_year":{"$gte":"2015"}}`;
    filter += this.getfilterCity();
    filter += `]}`
    return filter;
  }
  getfilterCity = () => {
    let filter: string = '';
    let trimCity: string = this.city;
    trimCity = trimCity.toString().trim();
    if (trimCity !== "") filter += `, {"accident_yishuv_name": "${trimCity}"}`;
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
  updateLocation = (res: any[]) => {
    if (res !== null && res.length > 0) {
      let city = res[0];
      if (city.lat !== null && city.lon !== null)
        this.mapCenter = new L.LatLng(city.lat, city.lon);
    }
  }

}




// autorun(() =>{
//     console.log(store.todos[0])
//     console.log(store.filter)
// })

//export default store
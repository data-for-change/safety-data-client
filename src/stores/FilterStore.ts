import { observable, action, reaction } from "mobx"
import i18n from "../i18n";
import L from 'leaflet'
import IFilterChecker from './FilterChecker'
import * as FC from './FilterChecker'
import * as GroupBy from './GroupBy'
import { fetchFilter, fetchGroupBy } from "../services/Accident.Service"
import CityService from '../services/City.Service'
//import { idbSetMulti, idbFetchFilter } from '../services/Injured.idb.Service'
import {insertToDexie ,getFromDexie } from '../services/Dexie.Injured.Service'
//import autorun  from "mobx"

export default class FilterStore {
  appInitialized = false
  constructor() {
    // init app data
    FC.initInjurySeverity(this.injurySeverity)
    FC.initDayNight(this.dayNight)
    FC.initInjTypes(this.injTypes);
    FC.initGenderTypes(this.genderTypes);
    FC.initAgeTypes(this.ageTypes)
    FC.initPopulationTypes(this.populationTypes)
    FC.initAccidentType(this.accidentType)
    FC.initVehicleTypes(this.vehicleType)
    FC.initRoadTypes(this.roadTypes);
    FC.initSpeedLimit(this.speedLimit)
    FC.initRoadWidth(this.roadWidth);
    FC.initSeparator(this.separator);
    FC.initOneLane(this.oneLane);
    GroupBy.initGroupByDict(this.groupByDict);
    GroupBy.initGroup2Dict(this.group2Dict)
    this.groupBy = this.groupByDict["TypeInjured"];
    this.groupBy2 = this.group2Dict["Gender"];
    this.appInitialized = false;
  }
  @observable
  injurySeverity: Array<IFilterChecker> = [];
  @action
  updateInjurySeverity = (aType: number, val: boolean) => {
    this.injurySeverity[aType].checked = val;
  }
  //////////////////////////////////////////////


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
  @observable
  isReadyToRenderMap: boolean = false;

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  //where
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  isMultipleCities: boolean = false;
  @observable
  cities: string[] = [];
  @action
  updateCities = (names: string[]) => {
    this.cities = names;
    if (this.cities.length === 0) {
      this.streets = [];
    }
  }
  @observable
  cityResult: string = "";

  @observable
  streets: string[] = [];
  @action
  updateStreets = (names: string) => {
    this.streets = names.split(',');
  }
  @observable
  roadSegment: string[] = [];
  @action
  updateRoadSegment = (names: string) => {
    this.roadSegment = names.split(',');
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  //when
  ///////////////////////////////////////////////////////////////////////////////////////////////////
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // who
  ///////////////////////////////////////////////////////////////////////////////////////////////////

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
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // What
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  @observable
  accidentType: Array<IFilterChecker> = [];
  @action
  updateAccidentType = (aType: number, val: boolean) => {
    this.accidentType[aType].checked = val;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // What Vehicle
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  vehicleType: Array<IFilterChecker> = [];
  @action
  updateVehicleType = (aType: number, val: boolean) => {
    this.vehicleType[aType].checked = val;
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // What Road
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  roadTypes: Array<IFilterChecker> = [];
  @action
  updateRoadType = (aType: number, val: boolean) => {
    this.roadTypes[aType].checked = val;
  }

  @observable
  speedLimit: Array<IFilterChecker> = [];
  @action
  updateSpeedLimit = (aType: number, val: boolean) => {
    this.speedLimit[aType].checked = val;
  }

  @observable
  roadWidth: Array<IFilterChecker> = [];
  @action
  updateRoadWidth = (aType: number, val: boolean) => {
    this.roadWidth[aType].checked = val;
  }

  @observable
  separator: Array<IFilterChecker> = [];
  @action
  updateSeparator = (aType: number, val: boolean) => {
    this.separator[aType].checked = val;
  }

  @observable
  oneLane: Array<IFilterChecker> = [];
  @action
  updateOneLane = (aType: number, val: boolean) => {
    this.oneLane[aType].checked = val;
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // data
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  markers: any[] = []
  @observable
  dataByYears: any[] = []
  @observable
  dataFilterdByYears: any[] = []
  @observable
  dataFilterd: any[] = []
  @observable
  dataGroupby2: any[] = []

  @observable
  isLoading: boolean = false;

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // group by
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  groupBy: GroupBy.default;
  @action
  updateGroupby = (key: string) => {
    this.groupBy = this.groupByDict[key];
    this.submitfilterdGroup(this.groupBy)
    this.submitfilterdGroup2(this.groupBy, this.groupBy2.name);
  }
  @observable
  groupByDict: any = {}

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
  submitfilterdGroup = (aGroupBy: GroupBy.default) => {
    let filtermatch = this.getFilter();
    let filter = this.getFilterGroupBy(filtermatch, aGroupBy.value, "", aGroupBy.limit);
    console.log(filter)
    fetchGroupBy(filter)
      .then((data: any[] | undefined) => {
        if (data !== undefined)
          this.dataFilterd = data;
      })
  }
  @action
  submitfilterdGroup2 = (aGroupBy: GroupBy.default, groupName2: string) => {
    let filtermatch = this.getFilter();
    let filter = this.getFilterGroupBy(filtermatch, aGroupBy.value, groupName2, aGroupBy.limit);
    //console.log(filter)
    fetchGroupBy(filter)
      .then((data: any[] | undefined) => {
        if (data !== undefined && data.length > 0)  {
          let fixData = this.groupBy2.fixStrcutTable(data)
          this.dataGroupby2 = fixData;
        }
      })
  }
  @observable
  groupBy2: GroupBy.GroupBy2;
  @action
  updateGroupBy2 = (key: string) => {
    this.groupBy2 = this.group2Dict[key]
    this.submitfilterdGroup2(this.groupBy, this.groupBy2.name);
  }
  @observable
  group2Dict: any = {}


  getFilterGroupBy = (filterMatch: string, groupName: string, groupName2: string = "", limit: number = 0) => {
    let filter = "["
      + '{"$match": ' + filterMatch + '}';
    if (groupName2 === "")
      filter += ',{"$group": { "_id": "$' + groupName + '", "count": { "$sum": 1 }}}';
    else {
      filter += ', { "$match" : { "' + groupName2 + '" : { "$exists" : true, "$ne" : null}}}'
      let grpids = '{ "grp1": "$' + groupName + '", "grp2": "$' + groupName2 + '"}'
      filter += ',{"$group": { "_id":' + grpids + ', "count": { "$sum": 1 }}}';
      filter += ',{"$group": { "_id": "$_id.grp1" , "count": { "$push": {"grp2" : "$_id.grp2","count" : "$count" } }}}';
    }
    if (limit === 0)
      filter += ',{"$sort": {"_id": 1}}'
    else {
      filter += ',{"$sort": {"count": -1}}'
        + ',{"$limit": ' + limit + '}'
    }
    filter += ']'
    return filter;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // filter actions
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  useLocalDb = 2;

  @action
  submitFilter = () => {
    if (this.useLocalDb ===2 )
      this.submitMainDataFilterLocalDb();
    else
      this.submintMainDataFilter();

    this.submitCityNameAndLocation();
    this.submitGroupByYears();
    this.submitfilterdGroupByYears();
    this.submitfilterdGroup(this.groupBy);
    this.submitfilterdGroup2(this.groupBy, this.groupBy2.name);
  }
  submitMainDataFilterLocalDb = () => {
    this.isLoading = true;
    let arrFilters = this.getFilterIDB();
    console.log(arrFilters)
    getFromDexie (arrFilters)
      .then((data: any[] | undefined) => {
        if (data !== null && data !== undefined) {
          this.markers = data;
        }
        this.isLoading = false;
      })
  }
  submintMainDataFilter = () => {
    this.isLoading = true;
    let filter = this.getFilter();
    //console.log(filter)
    fetchFilter(filter)
      .then((data: any[] | undefined) => {
        if (data !== null && data !== undefined) {
          this.markers = data;
          //write Data to local db
          if (this.useLocalDb === 1 )
            insertToDexie(data);
             //idbSetMulti(data);
        }
        this.isLoading = false;
      })
  }
  submitCityNameAndLocation = () => {
    if (this.cities.length >= 1) {
      let city = this.cities[0];
      var srvCity = new CityService();
      srvCity.getCityByNameHe(city, this.updateLocation);
      this.cityResult = this.cities[0];
    }
    else
      this.cityResult = "";
  }
  getFilterIDB = () => {
    let arrFilters:any[] = []
    let years = {filterName: 'accident_year', startYear: this.startYear.toString(), endYear: this.endYear.toString()}
    arrFilters.push (years)
    this.getMultiplefilterIDB(arrFilters, "sex_hebrew", this.genderTypes);
    this.getMultiplefilterIDB(arrFilters,"road_type_hebrew", this.roadTypes);
    return arrFilters;
  }

  getFilter = () => {
    let filter = `{"$and" : [`
    filter += `{"accident_year":  { "$gte" : "${this.startYear}","$lte": "${this.endYear}"}}`;
    filter += this.getMultiplefilter("injury_severity_hebrew", this.injurySeverity);
    filter += this.getfilterCity();
    filter += this.getMultiplefilter("day_night_hebrew", this.dayNight);
    filter += this.getFilterStreets();
    filter += this.getFilterFromArray(this.roadSegment, "road_segment_name");
    filter += this.getfilterInjured();
    filter += this.getMultiplefilter("sex_hebrew", this.genderTypes);
    filter += this.getMultiplefilter("age_group_hebrew", this.ageTypes);
    filter += this.getMultiplefilter("population_type_hebrew", this.populationTypes);
    filter += this.getMultiplefilter("accident_type_hebrew", this.accidentType);
    filter += this.getMultiplefilter("vehicle_vehicle_type_hebrew", this.vehicleType);
    filter += this.getMultiplefilter("road_type_hebrew", this.roadTypes);
    filter += this.getMultiplefilter("speed_limit_hebrew", this.speedLimit);
    filter += this.getMultiplefilter("road_width_hebrew", this.roadWidth);
    filter += this.getMultiplefilter("multi_lane_hebrew", this.separator);
    filter += this.getMultiplefilter("one_lane_hebrew", this.oneLane);
    filter += `]}`
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
    if (this.cities.length > 0) {
      filter += `,{"$or": [`
      filter += this.cities.map((x: string) => `{"accident_yishuv_name" : "${x}"}`).join(',')
      filter += `]}`
    }
    return filter;
  }
  getFilterStreets = () => {
    let filter: string = '';
    if (this.streets.length > 0 && this.streets[0] !== "") {
      filter += `,{"$or": [`
      filter += this.streets.map((x: string) => `{"street1_hebrew" : "${x.trim()}"}`).join(',')
      filter += `,`
      filter += this.streets.map((x: string) => `{"street2_hebrew" : "${x.trim()}"}`).join(',')
      filter += `]}`
    }
    return filter;
  }
  getFilterFromArray = (arr: string[], filterName: string) => {
    let filter: string = '';
    if (arr.length > 0 && arr[0] !== "") {
      filter += `,{"$or": [`
      filter += arr.map((x: string) => `{"${filterName}" : "${x.trim()}"}`).join(',')
      filter += `]}`
    }
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
      filter += arrfilter.map((x: string) => {
        if (x === "null")
          return `{"${filterKey}":` + null + '}'
        else {
          let xSafe = x.replace('"', '\\"')
          return `{"${filterKey}" : "${xSafe}"}`
        }

      }
      ).join(',')
      filter += `]}`
    }
    return filter;
  }
  getMultiplefilterIDB = (arrFilters:any[], filterKey: string, arr: Array<IFilterChecker>) => {
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
    if (!allChecked)
    { 
      let filterVals = arrfilter.map((x: string) => {
          return x.replace('"', '\\"')
        })
      let filter = {filterName:filterKey, values:filterVals}
      arrFilters.push(filter)
    }
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
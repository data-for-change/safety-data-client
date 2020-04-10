import { observable, action, reaction, computed } from "mobx"
import i18n from "../i18n";
import L from 'leaflet'
import { IColumnFilter } from './FilterChecker'
import * as FC from './FilterChecker'
import * as GroupBy from './GroupBy'
import { fetchFilter, fetchGroupBy } from "../services/Accident.Service"
import CityService from '../services/City.Service'
//import { idbSetMulti, idbFetchFilter } from '../services/Injured.idb.Service'
import { insertToDexie, getFromDexie } from '../services/Dexie.Injured.Service'
//import autorun  from "mobx"

export default class FilterStore {
  appInitialized = false
  constructor() {
    // init app data
    this.injurySeverity = FC.initInjurySeverity()
    this.dayNight = FC.initDayNight()
    this.injTypes = FC.initInjTypes();
    this.genderTypes = FC.initGenderTypes()
    this.ageTypes = FC.initAgeTypes()
    this.populationTypes = FC.initPopulationTypes()
    this.accidentType = FC.initAccidentType()
    this.vehicleType = FC.initVehicleTypes()
    this.roadTypes = FC.initRoadTypes();
    this.speedLimit = FC.initSpeedLimit()
    this.roadWidth = FC.initRoadWidth();
    this.separator = FC.initSeparator();
    this.oneLane = FC.initOneLane();
    GroupBy.initGroupByDict(this.groupByDict);
    GroupBy.initGroup2Dict(this.group2Dict)
    this.groupBy = this.groupByDict["TypeInjured"];
    this.groupBy2 = this.group2Dict["Gender"];
    this.appInitialized = false;
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  //Severity
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  injurySeverity: IColumnFilter
  @action
  updateInjurySeverity = (aType: number, val: boolean) => {
    this.updateFilters(this.injurySeverity, aType, val)
  }
  @computed get isValidSeverity() {
    const res = !this.injurySeverity.isAllValsFalse;
    return res;
  }
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
  @observable
  roadTypes: IColumnFilter;
  @action
  updateRoadType = (aType: number, val: boolean) => {
    this.updateFilters(this.roadTypes, aType, val)
  }
  @computed get isValidWhere() {
    const res = !this.roadTypes.isAllValsFalse;
    return res;
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  //when
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  startYear: number = 2015;
  @observable
  endYear: number = 2019;
  @observable
  dayNight: IColumnFilter;
  @action
  updateDayNight = (aType: number, val: boolean) => {
    this.updateFilters(this.dayNight, aType, val)
  }
  @computed get isValidWhen() {
    const res = !this.dayNight.isAllValsFalse;
    return res;
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // who
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  genderTypes: IColumnFilter
  @action
  updateGenderType = (aType: number, val: boolean) => {
    this.updateFilters(this.genderTypes, aType, val)
  }
  @observable
  ageTypes: IColumnFilter;
  @action
  updateAgeType = (aType: number, val: boolean) => {
    this.updateFilters(this.ageTypes, aType, val)
  }
  @observable
  populationTypes: IColumnFilter;
  @action
  updatePopulationType = (aType: number, val: boolean) => {
    this.updateFilters(this.populationTypes, aType, val)
  }

  //injTypes
  @observable
  injTypes: IColumnFilter;
  @action
  updateInjuerdType = (aType: number, val: boolean) => {
    this.updateFilters(this.injTypes, aType, val)
  }
  @computed get isValidWho() {
    const res = !this.injTypes.isAllValsFalse && !this.genderTypes.isAllValsFalse && !this.ageTypes.isAllValsFalse && !this.populationTypes.isAllValsFalse;
    return res;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // What
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  @observable
  accidentType: IColumnFilter;
  @action
  updateAccidentType = (aType: number, val: boolean) => {
    this.updateFilters(this.accidentType, aType, val)
  }
  @computed get isValidWhat() {
    const res = !this.accidentType.isAllValsFalse;
    return res;
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // What Vehicle
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  vehicleType: IColumnFilter;
  @action
  updateVehicleType = (aType: number, val: boolean) => {
    this.updateFilters(this.vehicleType, aType, val)
  }
  @computed get isValidWhatVehicle() {
    const res = !this.vehicleType.isAllValsFalse;
    return res;
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // What Road
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  @observable
  speedLimit: IColumnFilter;
  updateSpeedLimit = (aType: number, val: boolean) => {
    this.updateFilters(this.speedLimit, aType, val)
  }

  @observable
  roadWidth: IColumnFilter;
  @action
  updateRoadWidth = (aType: number, val: boolean) => {
    this.updateFilters(this.roadWidth, aType, val)
  }

  @observable
  separator: IColumnFilter;
  @action
  updateSeparator = (aType: number, val: boolean) => {
    this.updateFilters(this.separator, aType, val)
  }

  @observable
  oneLane: IColumnFilter;
  @action
  updateOneLane = (aType: number, val: boolean) => {
    this.updateFilters(this.oneLane, aType, val)
  }
  @computed get isValidWhatRoad() {
    const res = !this.speedLimit.isAllValsFalse && !this.roadWidth.isAllValsFalse && !this.separator.isAllValsFalse && !this.oneLane.isAllValsFalse;
    return res;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // data
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  dataAllInjuries: any[] = []
  @action
  updateAllInjuries = (data: any[]) => {
    //console.log("updateAllInjuries ",data.length)
    this.setMarkersLoadStep(2);
    this.dataAllInjuries = data;
    this.setBounds(data, this.cities);
  }

  @observable
  dataMarkersLean: any[] = []
  @action
  updateDataMarkersLean = (data: any[]) => {
    //console.log("updateDataMarkersLean ",data.length)
    this.setMarkersLoadStep(1);
    this.dataMarkersLean = data;
  }
  @observable
  dataMarkersInBounds: any[] = []
  @action
  updateDataMarkersInBounds = (data: any[]) => {
    this.dataMarkersInBounds = data;
  }

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

  @computed get isValidAllFilters() {
    const res = this.isValidSeverity && this.isValidWhen && this.isValidWho && this.isValidWhere && this.isValidWhat && this.isValidWhatVehicle && this.isValidWhatRoad;
    return res;
  }

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
    let filtermatch = this.getFilter(null);
    let filter = this.getFilterGroupBy(filtermatch, "accident_year");
    fetchGroupBy(filter)
      .then((data: any[] | undefined) => {
        if (data !== undefined)
          this.dataFilterdByYears = data;
      })
  }
  @action
  submitfilterdGroup = (aGroupBy: GroupBy.default) => {
    let filtermatch = this.getFilter(null);
    let filter = this.getFilterGroupBy(filtermatch, aGroupBy.value, "", aGroupBy.limit);
    //console.log(filter)
    fetchGroupBy(filter)
      .then((data: any[] | undefined) => {
        if (data !== undefined)
          this.dataFilterd = data;
      })
  }
  @action
  submitfilterdGroup2 = (aGroupBy: GroupBy.default, groupName2: string) => {
    let filtermatch = this.getFilter(null);
    let filter = this.getFilterGroupBy(filtermatch, aGroupBy.value, groupName2, aGroupBy.limit);
    //console.log(filter)
    fetchGroupBy(filter)
      .then((data: any[] | undefined) => {
        if (data !== undefined && data.length > 0) {
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
  // filters actions
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  @action
  submitFilter = () => {
    //this.setMarkersLoadStep(0);
    if (this.useLocalDb === 2) {
      this.submitMainDataFilterLocalDb();
    }
    else {
      if (this.isDynamicMarkers)
        this.submintGetMarkersBBox(this.mapBounds);
      if (this.isUse2StepsMarkers)
        this.submintGetMarkerFirstStep();
      this.submintMainDataFilter();
    }
    this.submitCityNameAndLocation();
    this.submitGroupByYears();
    this.submitfilterdGroupByYears();
    this.submitfilterdGroup(this.groupBy);
    this.submitfilterdGroup2(this.groupBy, this.groupBy2.name);
  }

  submintMainDataFilter = () => {
    this.isLoading = true;
    let filter = this.getFilter(null);
    this.updateIsSetBounds(this.cities, this.roadSegment);
    //console.log(filter)
    fetchFilter(filter, "main")
      .then((data: any[] | undefined) => {
        if (data !== null && data !== undefined) {
          this.updateAllInjuries(data);
          //write Data to local db
          if (this.useLocalDb === 1)
            insertToDexie(data);
        }
        this.isLoading = false;
      })
  }
  submintGetMarkerFirstStep = () => {
    let filter = this.getFilter(null)
    fetchFilter(filter, 'latlon')
      .then((data: any[] | undefined) => {
        if (data !== null && data !== undefined) {
          this.updateDataMarkersLean(data);
        }
      })
  }
  submintGetMarkersBBox = (mapBounds: L.LatLngBounds) => {
    let filter = this.getFilter(mapBounds, true)
    fetchFilter(filter, 'latlon')
      .then((data: any[] | undefined) => {
        if (data !== null && data !== undefined) {
          this.updateDataMarkersInBounds(data);
        }
      })
  }
  submitCityNameAndLocation = () => {
    if (this.cities.length >= 1) {
      let city = this.cities[0];
      var srvCity = new CityService();
      srvCity.getCityByNameHe(city, this.updateMapCenter);
      this.cityResult = this.cities[0];
    }
    else
      this.cityResult = "";
  }

  getFilter = (bounds: any, useBounds: boolean = false) => {
    let filter = `{"$and" : [`
    filter += `{"accident_year":  { "$gte" : "${this.startYear}","$lte": "${this.endYear}"}}`;
    filter += this.getMultiplefilter(this.injurySeverity)
    filter += this.getfilterCity();
    if (useBounds && bounds != null)
      filter += this.getfilterBounds(bounds);
    filter += this.getMultiplefilter(this.dayNight);
    filter += this.getFilterStreets();
    filter += this.getFilterFromArray(this.roadSegment, "road_segment_name");
    filter += this.getMultiplefilter(this.injTypes)
    filter += this.getMultiplefilter(this.genderTypes)
    filter += this.getMultiplefilter(this.ageTypes)
    filter += this.getMultiplefilter(this.populationTypes)
    filter += this.getMultiplefilter(this.accidentType);
    filter += this.getMultiplefilter(this.vehicleType);
    filter += this.getMultiplefilter(this.roadTypes);
    filter += this.getMultiplefilter(this.speedLimit);
    filter += this.getMultiplefilter(this.roadWidth);
    filter += this.getMultiplefilter(this.separator);
    filter += this.getMultiplefilter(this.oneLane);
    filter += `]}`
    return filter;
  }

  @action
  updateFilters = (colFilter: IColumnFilter, aType: number, val: boolean) => {
    if (colFilter.allTypesOption === -1)
      colFilter.arrTypes[aType].checked = val;
    else {
      if (aType === colFilter.allTypesOption) {
        colFilter.arrTypes.forEach((x, index) => {
          return x.checked = (index === colFilter.allTypesOption) ? val : !val;
        })
      }
      else {
        colFilter.arrTypes[colFilter.allTypesOption].checked = false;
        colFilter.arrTypes[aType].checked = val;
      }
    }
  }
  getfilterBounds = (mapBounds: L.LatLngBounds) => {
    let filter: string = '';
    filter += `,{"latitude":  { "$gte" : "${mapBounds.getSouth()}","$lte": "${mapBounds.getNorth()}"}}`;
    filter += `,{"longitude":  { "$gte" : "${mapBounds.getWest()}","$lte": "${mapBounds.getEast()}"}}`;
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

  getMultiplefilter = (colFilter: IColumnFilter) => {
    let filter: string = '';
    let allChecked: boolean = true;
    let arrfilter: string[] = [];
    if (colFilter.allTypesOption > -1 && colFilter.arrTypes[colFilter.allTypesOption].checked)
      allChecked = true;
    else {
      //in case there is allTypesOption , it want be copied to arrfilter
      //as it is not checked
      const iterator = colFilter.arrTypes.values();
      for (const filterCheck of iterator) {
        if (filterCheck.checked) {
          arrfilter = [...arrfilter, ...filterCheck.filters]
        }
        else {
          allChecked = false;
        }
      }
    }

    if (allChecked)
      filter = '';
    else {
      filter += `,{"$or": [`
      filter += arrfilter.map((x: string) => {
        if (x === "null")
          return `{"${colFilter.dbColName}":` + null + '}'
        else {
          let xSafe = x.replace('"', '\\"')
          return `{"${colFilter.dbColName}" : "${xSafe}"}`
        }

      }
      ).join(',')
      filter += `]}`
    }
    return filter;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // local db filters - idb using Dexie.js
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  useLocalDb = 0;

  submitMainDataFilterLocalDb = () => {
    this.isLoading = true;
    let arrFilters = this.getFilterIDB();
    this.updateIsSetBounds(this.cities, this.roadSegment);
    console.log(arrFilters)
    getFromDexie(arrFilters)
      .then((data: any[] | undefined) => {
        if (data !== null && data !== undefined) {
          this.updateAllInjuries(data);
        }
        this.isLoading = false;
      })
  }
  submintGetMarkersBBoxIdb = (mapBounds: L.LatLngBounds) => {
    let arrFilters = this.getFilterBboxIDB(mapBounds)
    getFromDexie(arrFilters)
      .then((data: any[] | undefined) => {
        if (data !== null && data !== undefined) {
          this.updateDataMarkersInBounds(data);
        }
      })
  }


  getFilterIDB = () => {
    let arrFilters: any[] = []
    let years = { filterName: 'accident_year', startYear: this.startYear.toString(), endYear: this.endYear.toString() }
    arrFilters.push(years)
    this.getfilterCityIDB(arrFilters);
    this.getFilterStreetsIDB(arrFilters);
    this.getMultiplefilterIDB(arrFilters, this.dayNight);
    this.getFilterFromArrayIDb(arrFilters, "road_segment_name", this.roadSegment)
    this.getMultiplefilterIDB(arrFilters, this.roadTypes);
    this.getMultiplefilterIDB(arrFilters, this.injTypes);
    this.getMultiplefilterIDB(arrFilters, this.genderTypes)
    this.getMultiplefilterIDB(arrFilters, this.ageTypes);
    this.getMultiplefilterIDB(arrFilters, this.populationTypes);
    this.getMultiplefilterIDB(arrFilters, this.accidentType);
    this.getMultiplefilterIDB(arrFilters, this.vehicleType);
    this.getMultiplefilterIDB(arrFilters, this.roadTypes);
    this.getMultiplefilterIDB(arrFilters, this.speedLimit);
    this.getMultiplefilterIDB(arrFilters, this.roadWidth);
    this.getMultiplefilterIDB(arrFilters, this.separator);
    this.getMultiplefilterIDB(arrFilters, this.oneLane);
    return arrFilters;
  }
  getFilterBboxIDB = (bounds: L.LatLngBounds) => {
    let arrFilters: any[] = []
    let bbox = { filterName: 'bbox', p1: bounds.getSouthWest, p2: bounds.getNorthEast }
    arrFilters.push(bbox)
    let years = { filterName: 'accident_year', startYear: this.startYear.toString(), endYear: this.endYear.toString() }
    arrFilters.push(years)
    this.getfilterCityIDB(arrFilters);
    this.getFilterStreetsIDB(arrFilters);
    this.getMultiplefilterIDB(arrFilters, this.dayNight);
    this.getFilterFromArrayIDb(arrFilters, "road_segment_name", this.roadSegment)
    this.getMultiplefilterIDB(arrFilters, this.roadTypes);
    this.getMultiplefilterIDB(arrFilters, this.injTypes);
    this.getMultiplefilterIDB(arrFilters, this.genderTypes)
    this.getMultiplefilterIDB(arrFilters, this.ageTypes);
    this.getMultiplefilterIDB(arrFilters, this.populationTypes);
    this.getMultiplefilterIDB(arrFilters, this.accidentType);
    this.getMultiplefilterIDB(arrFilters, this.vehicleType);
    this.getMultiplefilterIDB(arrFilters, this.roadTypes);
    this.getMultiplefilterIDB(arrFilters, this.speedLimit);
    this.getMultiplefilterIDB(arrFilters, this.roadWidth);
    this.getMultiplefilterIDB(arrFilters, this.separator);
    this.getMultiplefilterIDB(arrFilters, this.oneLane);
    return arrFilters;
  }

  getMultiplefilterIDB = (arrFilters: any[], colFilter: IColumnFilter) => {
    if (colFilter.allTypesOption > -1 && colFilter.arrTypes[colFilter.allTypesOption].checked) //all
      return;
    let allChecked: boolean = true;
    let arrfilter: string[] = [];
    const iterator = colFilter.arrTypes.values();
    for (const filterCheck of iterator) {
      if (filterCheck.checked) {
        arrfilter = [...arrfilter, ...filterCheck.filters]
      }
      else {
        allChecked = false;
      }
    }
    if (!allChecked) {
      let filterVals = arrfilter.map((x: string) => {
        if (x === "null")
          return null;
        return x;
      })
      let filter = { filterName: colFilter.dbColName, values: filterVals }
      arrFilters.push(filter)
    }
  }

  getfilterCityIDB = (arrFilters: any[]) => {
    if (this.cities.length > 0) {
      let filter = { filterName: "accident_yishuv_name", values: this.cities }
      arrFilters.push(filter)
    }
  }
  getFilterStreetsIDB = (arrFilters: any[]) => {
    if (this.streets.length > 0 && this.streets[0] !== "") {
      const filter1 = { filterName: "street1_hebrew", values: this.streets.map((x: string) => { return x.trim() }) }
      arrFilters.push(filter1)
      //const filter2 = { filterName: "street2_hebrew", values: this.streets.map((x: string) => {x.trim()}) } 
      //arrFilters.push(filter2)
    }
  }
  getFilterFromArrayIDb = (arrFilters: any[], filterName: string, arr: string[]) => {
    if (arr.length > 0 && arr[0] !== "") {
      let filter = { filterName: filterName, values: arr.map((x: string) => { return x.trim() }) }
      arrFilters.push(filter)
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // map store
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  //this belong to mapstore! need to move
  @observable
  isReadyToRenderMap: boolean = false;
  @observable
  isDynamicMarkers: boolean = false;
  @observable
  isUse2StepsMarkers: boolean = false;
  @observable
  markersLoadStep: number = 1;
  @action
  setMarkersLoadStep = (step: number) => {
    if (this.isUse2StepsMarkers)
      this.markersLoadStep = step;
  }


  @observable
  mapCenter: L.LatLng = new L.LatLng(32.08, 34.83)
  @action
  updateMapCenter = (res: any[]) => {
    if (res !== null && res.length > 0) {
      let city = res[0];
      if (city.lat !== null && city.lon !== null)
        this.mapCenter = new L.LatLng(city.lat, city.lon);
    }
  }

  @observable
  mapBounds: L.LatLngBounds = L.latLngBounds(INIT_BOUNDS);
  @action
  initBounds = () => {
    this.mapBounds = L.latLngBounds(INIT_BOUNDS)
    
  }
  @action 
  setBounds = (data: any[], citisArr: string[]) =>{
    if (this.isSetBounds) {
      const bunds = this.getBounds(data);
      if (citisArr.length > 0 && citisArr[0] !== "")
      {
        //this.mapBounds = bunds;
        if (bunds.contains(this.mapCenter))
          this.mapBounds = bunds;
        else
         console.log("worng bounds: ", bunds, this.mapCenter)
      }
      else
        this.mapBounds = bunds;
      this.isSetBounds = false;
    }
  }
  
  @observable
  useSetBounds: boolean = false;

  @observable
  isSetBounds: boolean = false;
  @action
  updateIsSetBounds = (citisArr: string[], roadSegArr: any[]) => {
    if (this.useSetBounds)
    {
      if (citisArr.length > 0 && citisArr[0] !== "")
      this.isSetBounds = true;
    else if (roadSegArr.length > 0 && roadSegArr[0] !== "")
      this.isSetBounds = true;
    }
  }


 

  @observable
  heatLayerHidden: boolean = true;
  @action
  toggleHeatLayer = () => {
    this.heatLayerHidden = !this.heatLayerHidden;
  }


  getBounds = (data: any[]) => {
    console.log("setBounds!")
    let arr: L.LatLng[] = [];
    let lastPoint: L.LatLng = L.latLng(0, 0);
    data.forEach(x => {
      if (x.latitude !== null && x.longitude !== null) {
        let p = new L.LatLng(x.latitude, x.longitude);
        if ((lastPoint.lat === 0 && lastPoint.lng === 0) || x.latitude !== lastPoint.lat || x.longitude !== lastPoint.lng) {
          arr.push(p)
          //prevent insertion of duplicate same point
          lastPoint = p;
        }
      }
    });
    //bounds for single point
    if (arr.length === 1) {
      arr.length = 0; //clean tha array
      arr.push(L.latLng(lastPoint.lat + 0.01, lastPoint.lng + 0.01))
      arr.push(L.latLng(lastPoint.lat - 0.01, lastPoint.lng - 0.01))
    }
    //in case no lat/lon info 
    if (arr.length < 2)
      arr = DEFAULT_BOUNDS;
    const bounds = L.latLngBounds(arr)
    return bounds;
  }

}
const INIT_BOUNDS = [L.latLng(32.032, 34.739), L.latLng(32.115, 34.949)];
const DEFAULT_BOUNDS = [
  L.latLng(29.50, 34.22),     // most possible south-west point
  L.latLng(33.271, 35.946),   // most possible north-east point
];






// autorun(() =>{
//     console.log(store.todos[0])
//     console.log(store.filter)
// })

//export default store
import {
  observable, action, computed,
} from 'mobx';
import { IColumnFilter } from './ColumnFilter';
import * as FC from './ColumnFilter';
import { IFilterChecker } from './FilterChecker';
import * as GroupBy from './GroupBy';
import RootStore from './RootStore';
import { fetchFilter, fetchGroupBy } from '../services/AccidentService';
import CityService from '../services/CityService';
import { insertToDexie, getFromDexie } from '../services/DexieInjuredService';
import { BBoxType } from './MapStore';
import Casualty from './Casualty';
// import autorun  from "mobx"

export default class FilterStore {
  appInitialized = false

  constructor(rootStore: RootStore) {
    // init app data
    this.rootStore = rootStore;
    this.injurySeverity = FC.initInjurySeverity();
    this.setCasualtiesNames(this.injurySeverity);
    this.dayNight = FC.initDayNight();
    this.injTypes = FC.initInjTypes();
    this.genderTypes = FC.initGenderTypes();
    this.ageTypes = FC.initAgeTypes();
    this.populationTypes = FC.initPopulationTypes();
    this.accidentType = FC.initAccidentType();
    this.vehicleType = FC.initVehicleTypes();
    this.roadTypes = FC.initRoadTypes();
    this.speedLimit = FC.initSpeedLimit();
    this.roadWidth = FC.initRoadWidth();
    this.separator = FC.initSeparator();
    this.oneLane = FC.initOneLane();
    GroupBy.initGroupByDict(this.groupByDict);
    GroupBy.initGroup2Dict(this.group2Dict);
    this.groupBy = this.groupByDict.TypeInjured;
    this.groupBy2 = this.group2Dict.Gender;
    // init data (on home page)
    this.dataByYears = FC.initDataYreasUnfilterd();
    this.dataFilterdByYears = FC.initDataYreasfilterd();
    this.dataFilterd = FC.initDataGrpBy1();
    this.dataGroupby2 = FC.initDataGrpBy2();
    this.appInitialized = false;
  }

  rootStore: RootStore;

  @observable
  currentPage: string ='home';

  @action
  setCurrentPage = (pageType: string) => {
    this.currentPage = pageType;
  }

  // ///////////////////////////////////////////////////////////////////////////////////////////////
  // Config Filter
  // ///////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  showAllVehicleTypes: boolean = false;

  @action
  updateShowAllVehicleTypes= (val: boolean) => {
    this.showAllVehicleTypes = val;
    if (this.showAllVehicleTypes) this.vehicleType = FC.initVehicleTypesFull();
    else this.vehicleType = FC.initVehicleTypes();
  }


  // ///////////////////////////////////////////////////////////////////////////////////////////////
  // Severity
  // ///////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  injurySeverity: IColumnFilter

  @action
  updateInjurySeverity = (aType: number, val: boolean) => {
    this.updateFilters(this.injurySeverity, aType, val);
  }

  @computed get isValidSeverity() {
    const res = !this.injurySeverity.isAllValsFalse;
    return res;
  }

  @observable
  casualtiesNames:string = 'casualties';

  @action
  setCasualtiesNames = (injurySeverity:IColumnFilter) => {
    let res = 'casualties';
    const deadChecker : IFilterChecker = injurySeverity.arrTypes[0];
    const sevIngChecker : IFilterChecker = injurySeverity.arrTypes[1];
    if (deadChecker.checked && !sevIngChecker.checked) res = 'killed';
    else if (!deadChecker.checked && sevIngChecker.checked) res = 'severely-injured';
    this.casualtiesNames = res;
  }

  // ///////////////////////////////////////////////////////////////////////////////////////////////
  // where
  // ///////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  isMultipleCities: boolean = false;

  @action
  setIsMultipleCities = (isMulti :boolean) => {
    this.isMultipleCities = isMulti;
  }


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
  cityResult: string = '';

  // @computed get cityResult() {
  //   let res = (this.cities.length >= 1) ? this.cities[0] : '';
  //   if (window.location.pathname === '/city' && this.onInitCityPage && res === '')
  //   {
  //     res = 'תל אביב -יפו';
  //     this.onInitCityPage = false;
  //   }
  //   return res;
  // };

  // @observable
  // onInitCityPage = true;

  // setAddressBar = autorun(() => {
  //   if (window.history.pushState && window.location.pathname === '/city') {
  //     const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?name=${this.cityResult}`;
  //     window.history.pushState({ path: newurl }, '', newurl);
  //   }
  // });

  // submitCityFilter = autorun(() => {
  //   if (window.location.pathname === '/city' && this.cityResult !== '') {
  //     this.submitFilter();
  //   }
  // });

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
    this.updateFilters(this.roadTypes, aType, val);
  }

  @computed get isValidWhere() {
    const res = !this.roadTypes.isAllValsFalse;
    return res;
  }

  // ///////////////////////////////////////////////////////////////////////////////////////////////
  // when
  // ///////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  startYear: number = 2015;

  @action
  setStartYear = (year:string) => {
    this.startYear = parseInt(year);
  }

  @observable
  endYear: number = 2019;

  @action
  setEndYear = (year:string) => {
    this.endYear = parseInt(year);
  }

  @observable
  dayNight: IColumnFilter;

  @action
  updateDayNight = (aType: number, val: boolean) => {
    this.updateFilters(this.dayNight, aType, val);
  }

  @computed get isValidWhen() {
    const res = !this.dayNight.isAllValsFalse;
    return res;
  }

  // ///////////////////////////////////////////////////////////////////////////////////////////////
  // who
  // ///////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  genderTypes: IColumnFilter

  @action
  updateGenderType = (aType: number, val: boolean) => {
    this.updateFilters(this.genderTypes, aType, val);
  }

  @observable
  ageTypes: IColumnFilter;

  @action
  updateAgeType = (aType: number, val: boolean) => {
    this.updateFilters(this.ageTypes, aType, val);
  }

  @observable
  populationTypes: IColumnFilter;

  @action
  updatePopulationType = (aType: number, val: boolean) => {
    this.updateFilters(this.populationTypes, aType, val);
  }

  // injTypes
  @observable
  injTypes: IColumnFilter;

  @action
  updateInjuerdType = (aType: number, val: boolean) => {
    this.updateFilters(this.injTypes, aType, val);
  }

  @computed get isValidWho() {
    const res = !this.injTypes.isAllValsFalse && !this.genderTypes.isAllValsFalse
    && !this.ageTypes.isAllValsFalse && !this.populationTypes.isAllValsFalse;
    return res;
  }

  // ///////////////////////////////////////////////////////////////////////////////////////////////
  // What
  // ///////////////////////////////////////////////////////////////////////////////////////////////

  @observable
  accidentType: IColumnFilter;

  @action
  updateAccidentType = (aType: number, val: boolean) => {
    this.updateFilters(this.accidentType, aType, val);
  }

  @computed get isValidWhat() {
    const res = !this.accidentType.isAllValsFalse;
    return res;
  }

  // ///////////////////////////////////////////////////////////////////////////////////////////////
  // What Vehicle
  // ///////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  vehicleType: IColumnFilter;

  @action
  updateVehicleType = (aType: number, val: boolean) => {
    this.updateFilters(this.vehicleType, aType, val);
  }

  @computed get isValidWhatVehicle() {
    const res = !this.vehicleType.isAllValsFalse;
    return res;
  }
  // ///////////////////////////////////////////////////////////////////////////////////////////////
  // What Road
  // ///////////////////////////////////////////////////////////////////////////////////////////////

  @observable
  speedLimit: IColumnFilter;

  updateSpeedLimit = (aType: number, val: boolean) => {
    this.updateFilters(this.speedLimit, aType, val);
  }

  @observable
  roadWidth: IColumnFilter;

  @action
  updateRoadWidth = (aType: number, val: boolean) => {
    this.updateFilters(this.roadWidth, aType, val);
  }

  @observable
  separator: IColumnFilter;

  @action
  updateSeparator = (aType: number, val: boolean) => {
    this.updateFilters(this.separator, aType, val);
  }

  @observable
  oneLane: IColumnFilter;

  @action
  updateOneLane = (aType: number, val: boolean) => {
    this.updateFilters(this.oneLane, aType, val);
  }

  @computed get isValidWhatRoad() {
    const res = !this.speedLimit.isAllValsFalse && !this.roadWidth.isAllValsFalse
    && !this.separator.isAllValsFalse && !this.oneLane.isAllValsFalse;
    return res;
  }

  // ////////////////////////////////////////////////////////////////////////////////////////////
  // data
  // ////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  dataAllInjuries: Casualty[] = [];

  @action
  updateAllInjuries = (data: Casualty[]) => {
    // console.log("updateAllInjuries ",data.length)
    this.setMarkersLoadStep(2);
    this.dataAllInjuries = data;
    this.rootStore.mapStore.setBounds(data, this.cities);
    if (this.rootStore.mapStore.bboxType === BBoxType.LOCAL_BBOX) {
      this.rootStore.mapStore.getMarkersInLocalBBox(0.1);
    }
  }

  @observable
  dataMarkersLean: Casualty[] = []

  @action
  updateDataMarkersLean = (data: Casualty[]) => {
    // console.log("updateDataMarkersLean ",data.length)
    this.setMarkersLoadStep(1);
    this.dataMarkersLean = data;
  }

  // casualties groupd by yeras, filterd only by injurySeverity
  @observable
  dataByYears: any[] = []

  // casualties groupd by yeras, filterd on main filter
  @observable
  dataFilterdByYears: any[] = []

  // casualties groupd by some group, filterd on main filter
  @observable
  dataFilterd: any[] = []

  // casualties groupd by 2 groups, filterd on main filter
  @observable
  dataGroupby2: any[] = []

  @observable
  isLoading: boolean = false;

  @computed get isValidAllFilters() {
    const res = this.isValidSeverity && this.isValidWhen && this.isValidWho
    && this.isValidWhere && this.isValidWhat && this.isValidWhatVehicle && this.isValidWhatRoad;
    return res;
  }

  // //////////////////////////////////////////////////////////////////////////////////////////////
  // group by
  // //////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  groupBy: GroupBy.default;

  @action
  updateGroupby = (key: string) => {
    this.groupBy = this.groupByDict[key];
    this.submitfilterdGroup(this.groupBy);
    this.submitfilterdGroup2(this.groupBy, this.groupBy2.name);
  }

  @observable
  groupByDict: any = {}

  @action
  submitGroupByYears = () => {
    const filtermatch = this.getfilterBySeverityAndCity();
    const filter = this.getFilterGroupBy(filtermatch, 'accident_year');
    fetchGroupBy(filter)
      .then((data: any[] | undefined) => {
        if (data !== undefined) this.dataByYears = data;
      });
  }

  @action
  submitfilterdGroupByYears = () => {
    const filtermatch = this.getFilter(null);
    const filter = this.getFilterGroupBy(filtermatch, 'accident_year');
    fetchGroupBy(filter)
      .then((data: any[] | undefined) => {
        if (data !== undefined) this.dataFilterdByYears = data;
      });
  }

  @action
  submitfilterdGroup = (aGroupBy: GroupBy.default) => {
    const filtermatch = this.getFilter(null);
    const filter = this.getFilterGroupBy(filtermatch, aGroupBy.value, '', aGroupBy.limit);
    // console.log(filter)
    fetchGroupBy(filter)
      .then((data: any[] | undefined) => {
        if (data !== undefined) this.dataFilterd = data;
      });
  }

  @action
  submitfilterdGroup2 = (aGroupBy: GroupBy.default, groupName2: string) => {
    const filtermatch = this.getFilter(null);
    const filter = this.getFilterGroupBy(filtermatch, aGroupBy.value, groupName2, aGroupBy.limit);
    // console.log(filter)
    fetchGroupBy(filter)
      .then((data: any[] | undefined) => {
        if (data !== undefined && data.length > 0) {
          const fixData = this.groupBy2.fixStrcutTable(data);
          this.dataGroupby2 = fixData;
        }
      });
  }

  @observable
  groupBy2: GroupBy.GroupBy2;

  @action
  updateGroupBy2 = (key: string) => {
    this.groupBy2 = this.group2Dict[key];
    this.submitfilterdGroup2(this.groupBy, this.groupBy2.name);
  }

  @observable
  group2Dict: any = {}


  getFilterGroupBy = (filterMatch: string, groupName: string, groupName2: string = '', limit: number = 0) => {
    let filter = `${'['
      + '{"$match": '}${filterMatch}}`;
    if (groupName2 === '') filter += `,{"$group": { "_id": "$${groupName}", "count": { "$sum": 1 }}}`;
    else {
      filter += `, { "$match" : { "${groupName2}" : { "$exists" : true, "$ne" : null}}}`;
      const grpids = `{ "grp1": "$${groupName}", "grp2": "$${groupName2}"}`;
      filter += `,{"$group": { "_id":${grpids}, "count": { "$sum": 1 }}}`;
      filter += ',{"$group": { "_id": "$_id.grp1" , "count": { "$push": {"grp2" : "$_id.grp2","count" : "$count" } }}}';
    }
    if (limit === 0) filter += ',{"$sort": {"_id": 1}}';
    else {
      filter += `${',{"$sort": {"count": -1}}'
        + ',{"$limit": '}${limit}}`;
    }
    filter += ']';
    return filter;
  }

  // //////////////////////////////////////////////////////////////////////////////////////////////
  // filters actions
  // //////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  isUse2StepsMarkers: boolean = false;

  @observable
  markersLoadStep: number = 1;

  @action
  setMarkersLoadStep = (step: number) => {
    if (this.isUse2StepsMarkers) this.markersLoadStep = step;
  }

  @action
  submitFilter = () => {
    // this.setMarkersLoadStep(0);
    if (this.useLocalDb === 2) {
      this.submitMainDataFilterLocalDb();
    } else {
      if (this.rootStore.mapStore.bboxType === BBoxType.SERVER_BBOX) {
        this.rootStore.mapStore.submintGetMarkersBBox();
      }
      if (this.isUse2StepsMarkers) this.submintGetMarkerFirstStep();
      this.submintMainDataFilter();
    }
    this.submitCityNameAndLocation();
    this.submitGroupByYears();
    this.submitfilterdGroupByYears();
    this.submitfilterdGroup(this.groupBy);
    this.submitfilterdGroup2(this.groupBy, this.groupBy2.name);
    this.setCasualtiesNames(this.injurySeverity);
    const lang = this.rootStore.uiStore.language;
    if (this.currentPage === 'city') this.rootStore.imageStore.getImagesByPlace(this.cityResult, lang);
  }

  submintMainDataFilter = () => {
    this.isLoading = true;
    const filter = this.getFilter(null);
    this.rootStore.mapStore.updateIsSetBounds(this.cities, this.roadSegment);
    // console.log(filter)
    fetchFilter(filter, 'main')
      .then((data: any[] | undefined) => {
        if (data !== null && data !== undefined) {
          this.updateAllInjuries(data);
          // write Data to local db
          if (this.useLocalDb === 1) insertToDexie(data);
        }
        this.isLoading = false;
      });
  }

  submintGetMarkerFirstStep = () => {
    const filter = this.getFilter(null);
    fetchFilter(filter, 'latlon')
      .then((data: any[] | undefined) => {
        if (data !== null && data !== undefined) {
          this.updateDataMarkersLean(data);
        }
      });
  }

  submitCityNameAndLocation = () => {
    if (this.cities.length >= 1) {
      const city = this.cities[0];
      const srvCity = new CityService();
      srvCity.getCityByNameHe(city, this.rootStore.mapStore.updateMapCenterByCity);
      const index = 0;
      this.cityResult = this.cities[index];
    } else this.cityResult = '';
  }

  getFilter = (bounds: any, useBounds: boolean = false) => {
    let filter = '{"$and" : [';
    filter += `{"accident_year":  { "$gte" : ${this.startYear},"$lte": ${this.endYear}}}`;
    filter += this.getMultiplefilter(this.injurySeverity);
    filter += this.getfilterCity();
    if (useBounds && bounds != null) filter += this.getfilterBounds(bounds);
    filter += this.getMultiplefilter(this.dayNight);
    filter += this.getFilterStreets();
    filter += this.getFilterFromArray(this.roadSegment, 'road_segment_name');
    filter += this.getMultiplefilter(this.injTypes);
    filter += this.getMultiplefilter(this.genderTypes);
    filter += this.getMultiplefilter(this.ageTypes);
    filter += this.getMultiplefilter(this.populationTypes);
    filter += this.getMultiplefilter(this.accidentType);
    filter += this.getMultiplefilter(this.vehicleType);
    filter += this.getMultiplefilter(this.roadTypes);
    filter += this.getMultiplefilter(this.speedLimit);
    filter += this.getMultiplefilter(this.roadWidth);
    filter += this.getMultiplefilter(this.separator);
    filter += this.getMultiplefilter(this.oneLane);
    filter += ']}';
    return filter;
  }

  @action
  updateFilters = (colFilter: IColumnFilter, aType: number, val: boolean) => {
    colFilter.updateFilter(aType, val);
    // if (colFilter.allTypesOption === -1) colFilter.arrTypes[aType].checked = val;
    // else if (aType === colFilter.allTypesOption) {
    //   colFilter.arrTypes
    //     .forEach((x, index) => x.checked = (index === colFilter.allTypesOption) ? val : !val);
    // } else {
    //   colFilter.arrTypes[colFilter.allTypesOption].checked = false;
    //   colFilter.arrTypes[aType].checked = val;
    // }
  }

  getfilterBounds = (mapBounds: L.LatLngBounds) => {
    let filter: string = '';
    filter += `,{"latitude":  { "$gte" : "${mapBounds.getSouth()}","$lte": "${mapBounds.getNorth()}"}}`;
    filter += `,{"longitude":  { "$gte" : "${mapBounds.getWest()}","$lte": "${mapBounds.getEast()}"}}`;
    return filter;
  }

  getfilterBySeverityAndCity = () => {
    let filter = '{"$and" : [';
    filter += '{"accident_year":{"$gte":2015}}';
    filter += this.getMultiplefilter(this.injurySeverity);
    filter += this.getfilterCity();
    filter += ']}';
    return filter;
  }

  getfilterCity = () => {
    let filter: string = '';
    if (this.cities.length > 0) {
      filter += ',{"$or": [';
      filter += this.cities.map((x: string) => `{"accident_yishuv_name" : "${x}"}`).join(',');
      filter += ']}';
    }
    return filter;
  }

  getFilterStreets = () => {
    let filter: string = '';
    if (this.streets.length > 0 && this.streets[0] !== '') {
      filter += ',{"$or": [';
      filter += this.streets.map((x: string) => `{"street1_hebrew" : "${x.trim()}"}`).join(',');
      filter += ',';
      filter += this.streets.map((x: string) => `{"street2_hebrew" : "${x.trim()}"}`).join(',');
      filter += ']}';
    }
    return filter;
  }

  getFilterFromArray = (arr: string[], filterName: string) => {
    let filter: string = '';
    if (arr.length > 0 && arr[0] !== '') {
      filter += ',{"$or": [';
      filter += arr.map((x: string) => `{"${filterName}" : "${x.trim()}"}`).join(',');
      filter += ']}';
    }
    return filter;
  }

  getMultiplefilter = (colFilter: IColumnFilter) => {
    let filter: string = '';
    let allChecked: boolean = true;
    let arrfilter: string[] = [];
    if (colFilter.allTypesOption > -1 && colFilter.arrTypes[colFilter.allTypesOption].checked) allChecked = true;
    else {
      // in case there is allTypesOption , it want be copied to arrfilter
      // as it is not checked
      const iterator = colFilter.arrTypes.values();
      for (const filterCheck of iterator) {
        if (filterCheck.checked) {
          arrfilter = [...arrfilter, ...filterCheck.filters];
        } else {
          allChecked = false;
        }
      }
    }

    if (allChecked) filter = '';
    else {
      filter += ',{"$or": [';
      filter += arrfilter.map((x: string) => {
        if (x === 'null') return `{"${colFilter.dbColName}":${null}}`;

        const xSafe = x.replace('"', '\\"');
        return `{"${colFilter.dbColName}" : "${xSafe}"}`;
      }).join(',');
      filter += ']}';
    }
    return filter;
  }

  // ///////////////////////////////////////////////////////////////////////////////////////////////
  // local db filters - idb using Dexie.js
  // ///////////////////////////////////////////////////////////////////////////////////////////////
  @observable
  useLocalDb = 0;

  submitMainDataFilterLocalDb = () => {
    this.isLoading = true;
    const arrFilters = this.getFilterIDB();
    this.rootStore.mapStore.updateIsSetBounds(this.cities, this.roadSegment);
    // console.log(arrFilters);
    getFromDexie(arrFilters)
      .then((data: any[] | undefined) => {
        if (data !== null && data !== undefined) {
          this.updateAllInjuries(data);
        }
        this.isLoading = false;
      });
  }

  submintGetMarkersBBoxIdb = (mapBounds: L.LatLngBounds) => {
    const arrFilters = this.getFilterBboxIDB(mapBounds);
    getFromDexie(arrFilters)
      .then((data: any[] | undefined) => {
        if (data !== null && data !== undefined) {
          this.rootStore.mapStore.updateDataMarkersInBounds(data);
        }
      });
  }

  getFilterIDB = () => {
    const arrFilters: any[] = [];
    const years = { filterName: 'accident_year', startYear: this.startYear.toString(), endYear: this.endYear.toString() };
    arrFilters.push(years);
    this.getfilterCityIDB(arrFilters);
    this.getFilterStreetsIDB(arrFilters);
    this.getMultiplefilterIDB(arrFilters, this.dayNight);
    this.getFilterFromArrayIDb(arrFilters, 'road_segment_name', this.roadSegment);
    this.getMultiplefilterIDB(arrFilters, this.roadTypes);
    this.getMultiplefilterIDB(arrFilters, this.injTypes);
    this.getMultiplefilterIDB(arrFilters, this.genderTypes);
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
    const arrFilters: any[] = [];
    const bbox = { filterName: 'bbox', p1: bounds.getSouthWest, p2: bounds.getNorthEast };
    arrFilters.push(bbox);
    const years = { filterName: 'accident_year', startYear: this.startYear.toString(), endYear: this.endYear.toString() };
    arrFilters.push(years);
    this.getfilterCityIDB(arrFilters);
    this.getFilterStreetsIDB(arrFilters);
    this.getMultiplefilterIDB(arrFilters, this.dayNight);
    this.getFilterFromArrayIDb(arrFilters, 'road_segment_name', this.roadSegment);
    this.getMultiplefilterIDB(arrFilters, this.roadTypes);
    this.getMultiplefilterIDB(arrFilters, this.injTypes);
    this.getMultiplefilterIDB(arrFilters, this.genderTypes);
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
    if (colFilter.allTypesOption > -1 && colFilter.arrTypes[colFilter.allTypesOption].checked) {
      return;
    }
    let allChecked: boolean = true;
    let arrfilter: string[] = [];
    const iterator = colFilter.arrTypes.values();
    for (const filterCheck of iterator) {
      if (filterCheck.checked) {
        arrfilter = [...arrfilter, ...filterCheck.filters];
      } else {
        allChecked = false;
      }
    }
    if (!allChecked) {
      const filterVals = arrfilter.map((x: string) => {
        if (x === 'null') return null;
        return x;
      });
      const filter = { filterName: colFilter.dbColName, values: filterVals };
      arrFilters.push(filter);
    }
  }

  getfilterCityIDB = (arrFilters: any[]) => {
    if (this.cities.length > 0) {
      const filter = { filterName: 'accident_yishuv_name', values: this.cities };
      arrFilters.push(filter);
    }
  }

  getFilterStreetsIDB = (arrFilters: any[]) => {
    if (this.streets.length > 0 && this.streets[0] !== '') {
      const filter1 = { filterName: 'street1_hebrew', values: this.streets.map((x: string) => x.trim()) };
      arrFilters.push(filter1);
      // const filter2 = { filterName: "street2_hebrew", values: this.streets.map((x: string) => {x.trim()}) }
      // arrFilters.push(filter2)
    }
  }

  getFilterFromArrayIDb = (arrFilters: any[], filterName: string, arr: string[]) => {
    if (arr.length > 0 && arr[0] !== '') {
      const filter = { filterName, values: arr.map((x: string) => x.trim()) };
      arrFilters.push(filter);
    }
  }
}

// autorun(() =>{
//     console.log(store.todos[0])
//     console.log(store.filter)
// })

// export default store

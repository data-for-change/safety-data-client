import {
   observable, action, computed, makeAutoObservable
} from 'mobx';
import { IColumnFilter } from './ColumnFilterCheckBoxList';
import * as FC from './ColumnFilterCheckBoxList';
import * as FilterUtils from '../../utils/FilterUtils';
import { ColumnFilterArray } from './ColumnFilterArray';
import { ColumnFilterCombo, initStartYear, initEndYear, initCityPopSize } from './ColumnFilterCombo';
import { IFilterChecker } from './FilterChecker';
import GroupBy, { initGroupMap } from './GroupBy';
import GroupBy2 from './GroupBy2';
import GroupMap, { initGroup2Map } from '../GroupMap';
import RootStore from '../RootStore';
import AccidentService from '../../services/AccidentService';
import CityService from '../../services/CityService';
import { insertToDexie, getFromDexie } from '../../services/DexieInjuredService';
import logger from '../../services/logger';
import { BBoxType } from '../MapStore';
import Casualty from '../Casualty';
import { FilterLocalStorage, LocalStorageService } from '../../services/Localstorage.Service';
import citisNamesHeb from '../../assets/json/cities_names_heb.json';
// import autorun  from "mobx"

export interface IFilterStore {
   isLoading: boolean;
   setIsLoading: (value:boolean) => void;
   startYear: ColumnFilterCombo;
   endYear: ColumnFilterCombo;
   cities: ColumnFilterArray;
   streets: ColumnFilterArray;
   roads: ColumnFilterArray;
}
class FilterStore implements IFilterStore  {
   appInitialized = false

   useGetFetch = true;

   localStorageService: LocalStorageService<FilterLocalStorage>

   constructor(rootStore: RootStore) {
      // init app data
      this.rootStore = rootStore;
      makeAutoObservable(this, { rootStore: false,
         startYear: observable,
         cities: observable,
         endYear: observable,
         streets: observable,
      });
      this.injurySeverity = FC.initInjurySeverity();
      this.setCasualtiesNames(this.injurySeverity);
      // when
      this.startYear = initStartYear(2019);
      this.endYear = initEndYear(2023);
      this.dayNight = FC.initDayNight();
      // where
      this.locationAccuracy = FC.initLocationAccuracy();
      this.roadTypes = FC.initRoadTypes();
      this.roads = new ColumnFilterArray('Road', 'rd', false);
      this.roadSegment = new ColumnFilterArray('RoadSegment', 'rds', true);
      this.cities = new ColumnFilterArray('City', 'city', true);
      this.streets = new ColumnFilterArray('Street', 'st', true);
      this.cityPopSizeRange = initCityPopSize();
      // who
      this.genderTypes = FC.initGenderTypes();
      this.ageTypes = FC.initAgeTypes();
      this.populationTypes = FC.initPopulationTypes();
      // What
      this.accidentType = FC.initAccidentType();
      // what vehicle
      this.injTypes = FC.initInjTypes();
      this.vehicleType = FC.initVehicleTypesFull();
      this.involvedVehicle = FC.initInvolvedVehicle();
      // What Road
      this.speedLimit = FC.initSpeedLimit();
      this.roadWidth = FC.initRoadWidth();
      this.separator = FC.initSeparator();
      this.oneLane = FC.initOneLane();
      //init Group-by dictionary
      const map: Map<string, any> = initGroupMap(this.useGetFetch);
      this.groupByDict = new GroupMap(map, 'gb', 'injt');
      const mapGroupBy2 = initGroup2Map(this.useGetFetch);
      this.group2Dict = new GroupMap(mapGroupBy2, 'gb2', 'sex');

      // init data (on home page)
      this.dataByYears = FC.initDataYreasUnfilterd();
      this.dataFilterdByYears = FC.initDataYreasfilterd();
      this.dataFilterd = FC.initDataGrpBy1();
      this.dataGroupby2 = FC.initDataGrpBy2();
      this.appInitialized = false;
      this.localStorageService = new LocalStorageService();
   }

   rootStore: RootStore;

   // ///////////////////////////////////////////////////////////////////////////////////////////////
   // Config Filter
   // ///////////////////////////////////////////////////////////////////////////////////////////////
   @observable
   filtersArrayLocalStorage: FilterLocalStorage[] = []

   @action
   setCurrentFiltersArrayLocalStorage = () => {
      this.filtersArrayLocalStorage = this.localStorageService.getLoaclStorage('my-filters')
   }
   @action
   updateFilterArrayLocalStorage = (data: FilterLocalStorage) => {
      this.filtersArrayLocalStorage = this.localStorageService.getLoaclStorage('my-filters')
      this.filtersArrayLocalStorage.push(data)
      this.localStorageService.setLocalStorage('my-filters', this.filtersArrayLocalStorage)
   }

   @observable
   showAllVehicleTypes: boolean = false;

   @action
   updateShowAllVehicleTypes = (val: boolean) => {
      this.showAllVehicleTypes = val;
      if (this.showAllVehicleTypes) this.vehicleType = FC.initVehicleTypesFull();
      else this.vehicleType = FC.initVehicleTypes();
   }

   @observable isUpdateFromUrl: boolean = true;

   @action setIsUpdateFromUrl = (value: boolean) => {
      this.isUpdateFromUrl = value;
   }

   @observable formCardKey: number = 0;
   @action setFormCardKey = (value: number) => {
      this.formCardKey = value;
   }

   // ///////////////////////////////////////////////////////////////////////////////////////////////
   // Severity
   // ///////////////////////////////////////////////////////////////////////////////////////////////
   @observable
   injurySeverity: IColumnFilter

   @action
   updateInjurySeverity = (aType: number, val: boolean) => {
      this.updateFilters(this.injurySeverity, aType, val);
      console.log ("updateInjurySeverity", this.injurySeverity.arrTypes)
   }

   @computed get isValidSeverity() {
      const res = !this.injurySeverity.isAllValsFalse;
      return res;
   }

   @observable
   casualtiesNames: string = 'casualties';

   @action
   setCasualtiesNames = (injurySeverity: IColumnFilter) => {
      let res = 'casualties';
      const deadChecker: IFilterChecker = injurySeverity.arrTypes[0];
      const sevIngChecker: IFilterChecker = injurySeverity.arrTypes[1];
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
   setIsMultipleCities = (isMulti: boolean) => {
      this.isMultipleCities = isMulti;
   }


   @observable
   cities: ColumnFilterArray;

   @action
   updateCities = (names: string[], updateCityResult: boolean) => {
      this.cities.setFilter(names);
      if (this.cities.arrValues.length === 0) {
         this.streets.arrValues = [];
      } else if (updateCityResult) {
         [this.cityResult] = this.cities.arrValues;
      }
   }

   // get city name by url query parmas
   getCityNameFromQuery(query: URLSearchParams, defVal: string | undefined) {
      let res = (defVal) ? [defVal] : [];
      const name = query.get('city');
      let found = false;
      if (name !== null) {
         const arr = name.split(',');
         if (arr.length > 1 && this.isMultipleCities) {
            res = arr;
         } else {
            found = citisNamesHeb.includes(name);
            if (found) {
               res = [citisNamesHeb.find((element) => element === name!)!];
            }
         }
      }
      return res;
   }

   @observable
   cityResult: string = '';

   @observable
   streets: ColumnFilterArray;

   @action
   updateStreets = (names: string) => {
      this.streets.setFilter(names.split(','));
   }

   @observable
   roads: ColumnFilterArray;

   @action
   setRoads = (names: string[]) => {
      this.roads.setFilter(names);
   }

   @observable
   cityPopSizeRange: ColumnFilterCombo;

   @action
   setCityPopSizeRange = (range: string) => {
      this.cityPopSizeRange.setFilter(range);
   }


   @observable
   roadSegment: ColumnFilterArray;

   @action
   updateRoadSegment = (names: string) => {
      this.roadSegment.setFilter(names.split(','));
   }

   @observable
   roadTypes: IColumnFilter;

   @action
   updateRoadType = (aType: number, val: boolean) => {
      this.updateFilters(this.roadTypes, aType, val);
   }

   @observable
   locationAccuracy: IColumnFilter;

   @action
   updateLocationAccuracy = (aType: number, val: boolean) => {
      this.updateFilters(this.locationAccuracy, aType, val);
   }

   @computed get isValidWhere() {
      const res = !this.roadTypes.isAllValsFalse && !this.locationAccuracy.isAllValsFalse;
      return res;
   }

   // ///////////////////////////////////////////////////////////////////////////////////////////////
   // when
   // ///////////////////////////////////////////////////////////////////////////////////////////////
   startYear: ColumnFilterCombo;

   @action
   setStartYear = (year: string) => {
      console.log("set start year in store",year );
      this.startYear.setFilter(parseInt(year));
   }

   endYear: ColumnFilterCombo;

   @action
   setEndYear = (year: string) => {
      this.endYear.setFilter(parseInt(year));
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

   @computed get isValidWho() {
      const res = !this.genderTypes.isAllValsFalse
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

   /**
   * injuerd type - for example pedestrian bycicle, car driver etc,
   */
   @observable
   injTypes: IColumnFilter;

   @action
   updateInjuerdType = (aType: number, val: boolean) => {
      this.updateFilters(this.injTypes, aType, val);
   }

   // vehicle Type of the killed / injured 
   @observable
   vehicleType: IColumnFilter;

   @action
   updateVehicleType = (aType: number, val: boolean) => {
      this.updateFilters(this.vehicleType, aType, val);
   }

   // vehicle that were in the accident
   @observable
   involvedVehicle: IColumnFilter;

   @action
   setInvolvedVehicle = (aType: number, val: boolean) => {
      this.updateFilters(this.involvedVehicle, aType, val);
   }

   @computed get isValidWhatVehicle() {
      const res = !this.injTypes.isAllValsFalse && !this.vehicleType.isAllValsFalse && !this.involvedVehicle.isAllValsFalse;
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
   injuriesCount: number = 0;

   @action
   setInjuriesCount = (val: number) => {
      this.injuriesCount = val;
      this.isLoadingInjuriesCount = false;
   }

   @observable
   isLoadingInjuriesCount: boolean = false;

   @observable
   dataAllInjuries: Casualty[] = [];

   @action
   updateAllInjuries = (data: Casualty[]) => {
      // looger.log("updateAllInjuries ",data.length)
      this.setMarkersLoadStep(2);
      this.dataAllInjuries = data;
      this.rootStore.mapStore.setBounds(data, this.cities.arrValues);
      if (this.rootStore.mapStore.bboxType === BBoxType.LOCAL_BBOX) {
         this.rootStore.mapStore.getMarkersInLocalBBox(0.1);
      }
   }

   @observable
   dataMarkersLean: Casualty[] = []

   @action
   updateDataMarkersLean = (data: Casualty[]) => {
      // logger.log("updateDataMarkersLean ",data.length)
      this.setMarkersLoadStep(1);
      this.dataMarkersLean = data;
   }

   // casualties groupd by yeras, filterd only by injurySeverity
   @observable
   dataByYears: any[] = []

   // casualties groupd by yeras, filterd on main filter
   @observable
   dataFilterdByYears: any[] = []

   @action
   setDataFilterdByYears = (data: any[]) => {
      this.dataFilterdByYears = data;
   }

   // casualties groupd by some group, filterd on main filter
   @observable
   dataFilterd: any[] = []

   // casualties groupd by 2 groups, filterd on main filter
   @observable
   dataGroupby2: any[] = []

   @observable
   isLoading: boolean = false;
   @action
   setIsLoading( value:boolean)
   {
      this.isLoading = value;
   }

   @computed get isValidAllFilters() {
      const res = this.isValidSeverity && this.isValidWhen && this.isValidWho
         && this.isValidWhere && this.isValidWhat && this.isValidWhatVehicle && this.isValidWhatRoad;
      return res;
   }

   // //////////////////////////////////////////////////////////////////////////////////////////////
   // group by
   // //////////////////////////////////////////////////////////////////////////////////////////////
   // @observable
   // groupBy: GroupBy;

   @action
   updateGroupby = (key: string) => {
      this.groupByDict.setFilter(key);
      this.groupByDict.setBrowserQueryString();
      if (!this.useGetFetch && this.groupByDict.groupBy.text === 'CityByPop') this.submitfilterdGroupByPop();
      else this.submitfilterdGroup(this.groupByDict.groupBy as GroupBy);
      if (this.groupByDict.groupBy.text !== 'CityByPop') {
         const gb2 = (this.group2Dict.groupBy as GroupBy2).name
         this.submitfilterdGroup2(this.groupByDict.groupBy as GroupBy, gb2);
      }
   }

   /**
    * Dictionary with key-value list of the group-by  
    */
   @observable
   groupByDict: GroupMap;

   @action
   submitGroupByYears = () => {
      if (this.useGetFetch) {
         const filtermatch = this.getfilterBySeverityAndCity();
         const filter = FilterUtils.getFilterGroupBy(filtermatch, 'year');
         AccidentService.fetchGetGroupBy(filter)
            .then((data: any[] | undefined) => {
               if (data !== undefined) {
                  const dataPadded = this.padDataYearsWith0(data);
                  this.dataByYears = dataPadded;
               }
            });
      }
      else {
         const filtermatch = this.getfilterBySeverityAndCity();
         const filter = FilterUtils.getFilterGroupBy(filtermatch, 'accident_year');
         AccidentService.fetchAggregate(filter)
            .then((data: any[] | undefined) => {
               if (data !== undefined) {
                  const dataPadded = this.padDataYearsWith0(data);
                  this.dataByYears = dataPadded;
               }
            });
      }

   }

   /**
    * convert parital array of years and count to full array
    * if year is missing, add year and count = 0
    * @param data array of years and counts, some of the years might be missing
    */
   padDataYearsWith0 = (data: any) => {
      const yearsList = [];
      for (let i = Number(this.startYear.queryValue); i <= Number(this.endYear.queryValue); i += 1) {
         yearsList.push(i);
      }
      const data2 = yearsList.map((year) => {
         const objDAta = data.find((x: any) => x._id === year);
         const val = (objDAta) ? objDAta.count : 0;
         return { _id: year, count: val };
      });
      return data2;
   }

   getCountFromGroupByRes = (data: any[]) => {
      const res = data.reduce((b: number, x: any) => b + x.count, 0);
      return res;
   }

   @action
   submitfilterdGroupByYears = () => {
      this.isLoadingInjuriesCount = true;
      const range = JSON.parse(this.cityPopSizeRange.queryValue.toString());
      if (this.useGetFetch) {
         const filtermatch = this.getFilterQueryString(null);
         const filter = FilterUtils.getFilterGroupBy(filtermatch, 'year', range.min, range.max);
         AccidentService.fetchGetGroupBy(filter)
            .then((data: any[] | undefined) => {
               if (data !== undefined) {
                  const dataPadded = this.padDataYearsWith0(data);
                  this.setDataFilterdByYears(dataPadded);
                  const count = this.getCountFromGroupByRes(data);
                  this.setInjuriesCount(count);
               }
            });
      } else {
         const filtermatch = this.getFilterForPost(null);
         const filter = FilterUtils.getFilterGroupBy(filtermatch, 'accident_year', range.min, range.max);
         AccidentService.fetchAggregate(filter)
            .then((data: any[] | undefined) => {
               if (data !== undefined) {
                  const dataPadded = this.padDataYearsWith0(data);
                  this.setDataFilterdByYears(dataPadded);
                  const count = this.getCountFromGroupByRes(data);
                  this.setInjuriesCount(count);
               }
            });
      }
   }


   @action
   submitfilterdGroup = (aGroupBy: GroupBy) => {
      const range = JSON.parse(this.cityPopSizeRange.queryValue.toString());
      if (this.useGetFetch) {
         const filtermatch = this.getFilterQueryString(null);
         const filter = FilterUtils.getFilterGroupBy(filtermatch, aGroupBy.value, range.min, range.max, '', aGroupBy.limit, aGroupBy.sort);
         // logger.log(filter);
         AccidentService.fetchGetGroupBy(filter)
            .then((data: any | undefined) => {
               if(aGroupBy.reGroupResultFunc) {
                  data = aGroupBy.reGroupResultFunc(data);
               }
               if (data !== undefined) this.dataFilterd = data;
            });
      } else {
         const filtermatch = this.getFilterForPost(null);
         const filter = FilterUtils.getFilterGroupBy(filtermatch, aGroupBy.value, range.min, range.max, '', aGroupBy.limit);
         // logger.log(filter);
         AccidentService.fetchAggregate(filter)
            .then((data: any[] | undefined) => {
               if (data !== undefined) this.dataFilterd = data;
            });
      }

   }

    
   /**
    * deprecated function
    */
   @action
   submitfilterdGroupByPop = () => {
      const range = JSON.parse(this.cityPopSizeRange.queryValue.toString());
      const filtermatch = this.getFilterForPost(null);
      const filter = FilterUtils.getFilterGroupByPop(filtermatch, range.min, range.max, -1, 15);
      // logger.log(filter);
      AccidentService.fetchAggregate(filter)
         .then((data: any[] | undefined) => {
            if (data !== undefined) {
               this.dataFilterd = data;
            }
         });
   }

   @action
   submitfilterdGroup2 = (aGroupBy: GroupBy, groupName2: string) => {
      if (this.useGetFetch) {
         const range = JSON.parse(this.cityPopSizeRange.queryValue.toString());
         const filtermatch = this.getFilterQueryString(null);
         const filter = FilterUtils.getFilterGroupBy(filtermatch, aGroupBy.value, range.min, range.max, groupName2, aGroupBy.limit);
         // logger.log(filter)
         AccidentService.fetchGetGroupBy(filter)
            .then((data: any[] | undefined) => {
               if (data !== undefined && data.length > 0) {
                  try {
                     const fixData = (this.group2Dict.groupBy as GroupBy2).fixStrcutTable(data);
                     this.dataGroupby2 = fixData;
                  } catch (error) {
                     logger.log(error);
                     this.dataGroupby2 = [];
                  }
               } else {
                  this.dataGroupby2 = [];
               }
            });
      } else {
         const range = JSON.parse(this.cityPopSizeRange.queryValue.toString());
         const filtermatch = this.getFilterForPost(null);
         const filter = FilterUtils.getFilterGroupBy(filtermatch, aGroupBy.value, range.min, range.max, groupName2, aGroupBy.limit);
         // logger.log(filter)
         AccidentService.fetchAggregate(filter)
            .then((data: any[] | undefined) => {
               if (data !== undefined && data.length > 0) {
                  try {
                     const fixData = (this.group2Dict.groupBy as GroupBy2).fixStrcutTable(data);
                     this.dataGroupby2 = fixData;
                  } catch (error) {
                     logger.log(error);
                     this.dataGroupby2 = [];
                  }
               } else {
                  this.dataGroupby2 = [];
               }
            });
      }

   }

   // @observable
   // groupBy2: GroupBy2;

   @action
   updateGroupBy2 = (key: string) => {
      this.group2Dict.setFilter(key);
      this.group2Dict.setBrowserQueryString();
      const gb2name = (this.group2Dict.groupBy as GroupBy2).name
      this.submitfilterdGroup2(this.groupByDict.groupBy as GroupBy, gb2name);
   }

   @observable
   group2Dict: GroupMap;

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
      // console.log((this.groupByDict.groupBy as GroupBy).text);
      if (!this.useGetFetch && this.groupByDict.groupBy.text === 'CityByPop') this.submitfilterdGroupByPop();
      else this.submitfilterdGroup(this.groupByDict.groupBy as GroupBy);
      this.submitfilterdGroup2(this.groupByDict.groupBy as GroupBy, (this.group2Dict.groupBy as GroupBy2).name);
      this.setCasualtiesNames(this.injurySeverity);
      const lang = this.rootStore.uiStore.language;
      if (this.rootStore.uiStore.currentPage === 'city') this.rootStore.imageStore.getImagesByPlace(this.cityResult, lang);
   }

   submintMainDataFilter = () => {
      this.setIsLoading(true);
      if (this.useGetFetch) {
         const filter = this.getFilterQueryString(null);
         this.setFiltersText(true);
         this.setBrowserQueryString();
         // logger.log(filter);
         this.rootStore.mapStore.updateIsSetBounds(this.cities.arrValues, this.roadSegment.arrValues);
         AccidentService.fetchGetList(filter, 'main')
            .then((data: any[] | undefined) => {
               if (data !== null && data !== undefined) {
                  this.updateAllInjuries(data);
                  // write Data to local db
                  if (this.useLocalDb === 1) insertToDexie(data);
               }
               console.log("setISLoading =false in store")
               this.setIsLoading(false);
            });
      } else {
         const range = JSON.parse(this.cityPopSizeRange.queryValue.toString());
         const filter = this.getFilterForPost(null);
         // logger.log(filter);
         // const filter = FiterUtils.getFilterByCityPop(filterMatch, range.min, range.max);
         this.rootStore.mapStore.updateIsSetBounds(this.cities.arrValues, this.roadSegment.arrValues);
         AccidentService.fetchAggregatFilter(filter, 'main')
            .then((data: any[] | undefined) => {
               if (data !== null && data !== undefined) {
                  this.updateAllInjuries(data);
                  // write Data to local db
                  if (this.useLocalDb === 1) insertToDexie(data);
               }
               this.setIsLoading(false);
            });
      }

   }

   submintGetMarkerFirstStep = () => {
      const range = JSON.parse(this.cityPopSizeRange.queryValue.toString());
      const filter = this.getFilterForPost(null);
      // const filter = FiterUtils.getFilterByCityPop(filterMatch, range.min, range.max);
      AccidentService.fetchAggregatFilter(filter, 'latlon')
         .then((data: any[] | undefined) => {
            if (data !== null && data !== undefined) {
               this.updateDataMarkersLean(data);
            }
         });
   }

   submitCityNameAndLocation = () => {
      if (this.cities.arrValues.length >= 1) {
         const city = this.cities.arrValues[0];
         const srvCity = new CityService();
         //this.rootStore.mapStore.delQueryStrMapCenter();
         var noop = function () { }; // do nothing.
         const CenterByCityCallBack = (this.rootStore.mapStore.isCenterMapByCity()) ?
            this.rootStore.mapStore.updateMapCenterByCity :
            noop;
         srvCity.getCityByNameHe(city, CenterByCityCallBack);
         const index = 0;
         this.cityResult = this.cities.arrValues[index];
      } else this.cityResult = '';
   }
   /**
    * get filter query string for the server request. 
    * @param bounds gis bound (rect) to filter
    * @param useBounds if true will use gis bound to filter reqest
    * @returns query string , for example ?sy=2017&sev=1&city="תל אביב -יפו","חיפה"
    */
   getFilterQueryString = (bounds: any, useBounds: boolean = false) => {
      //the oreder of the fileds is importnet for indexing in server
      let filter = '?';
      filter += this.startYear.getFilter();
      filter += this.endYear.getFilter();
      filter += this.injurySeverity.getFilter();
      filter += this.cities.getFilter();
      if (useBounds && bounds != null) filter += FilterUtils.getfilterBounds(bounds);
      filter += this.dayNight.getFilter();
      filter += this.streets.getFilter();
      filter += this.roads.getFilter();
      filter += this.roadSegment.getFilter();
      filter += this.injTypes.getFilter();
      filter += this.genderTypes.getFilter();
      filter += this.ageTypes.getFilter();
      filter += this.populationTypes.getFilter();
      filter += this.accidentType.getFilter();
      filter += this.vehicleType.getFilter();
      filter += this.involvedVehicle.getFilter();
      filter += this.locationAccuracy.getFilter();
      filter += this.roadTypes.getFilter();
      filter += this.speedLimit.getFilter();
      filter += this.roadWidth.getFilter();
      filter += this.separator.getFilter();
      filter += this.oneLane.getFilter();
      const range = JSON.parse(this.cityPopSizeRange.queryValue.toString());
      filter += FilterUtils.getFilterByCityPop(range.min, range.max)
      return filter;
   }


   /**
    * set filters text - used in info-panel to show current filter
    * @param ignoreIfAll - if true and if all option is cheked return blank
    */
   setFiltersText = (ignoreIfAll: boolean) => {
      this.startYear.setText();
      this.endYear.setText();
      this.injTypes.setText(ignoreIfAll);
      this.dayNight.setText(ignoreIfAll);
      this.genderTypes.setText(ignoreIfAll);
      this.ageTypes.setText(ignoreIfAll);
      this.populationTypes.setText(ignoreIfAll);
      this.locationAccuracy.setText(ignoreIfAll);
      this.roadTypes.setText(ignoreIfAll);
      this.cities.setText();
      this.roads.setText();
      this.cityPopSizeRange.setText();
      this.accidentType.setText(ignoreIfAll);
      this.vehicleType.setText(ignoreIfAll);
      this.involvedVehicle.setText(ignoreIfAll);
   }

   /**
    * set the QueryString of the browser by current filter
    */
   @action
   setBrowserQueryString = () => {
      const params = new URLSearchParams(window.location.search);
      params.set('tab', this.rootStore.uiStore.currentTab);
      this.startYear.setBrowserQueryString(params, false);
      this.endYear.setBrowserQueryString(params, false);
      this.injurySeverity.setBrowserQueryString(params, false);
      this.roadTypes.setBrowserQueryString(params);
      this.injTypes.setBrowserQueryString(params);
      this.genderTypes.setBrowserQueryString(params);
      this.ageTypes.setBrowserQueryString(params);
      this.populationTypes.setBrowserQueryString(params);
      this.cities.setBrowserQueryString(params);
      this.roads.setBrowserQueryString(params);
      this.locationAccuracy.setBrowserQueryString(params);
      this.accidentType.setBrowserQueryString(params);
      this.vehicleType.setBrowserQueryString(params);
      this.involvedVehicle.setBrowserQueryString(params);
      this.speedLimit.setBrowserQueryString(params);
      this.roadWidth.setBrowserQueryString(params);
      this.separator.setBrowserQueryString(params);
      this.oneLane.setBrowserQueryString(params);
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);

      this.groupByDict.setBrowserQueryString();
   }

   /**
    * udpate the store (and gui) using given qurey from the browser (on load time)
    * @param defTab default tab to dispaly
    * @param defCity default city to choose. (can be null)
    */
   @action
   setStoreByQuery = (params: URLSearchParams, defCity?: string) => {
      this.startYear.setValuesByQuery(params);
      this.endYear.setValuesByQuery(params);
      this.injurySeverity.setValuesByQuery(params);
      this.dayNight.setValuesByQuery(params);
      const citis = this.getCityNameFromQuery(params, defCity);
      if (citis) this.updateCities(citis, true);
      this.locationAccuracy.setValuesByQuery(params);
      this.roadTypes.setValuesByQuery(params);
      this.injTypes.setValuesByQuery(params);
      this.genderTypes.setValuesByQuery(params);
      this.ageTypes.setValuesByQuery(params);
      this.populationTypes.setValuesByQuery(params);
      this.accidentType.setValuesByQuery(params);
      this.vehicleType.setValuesByQuery(params);
      this.involvedVehicle.setValuesByQuery(params);
      this.speedLimit.setValuesByQuery(params);
      this.roadWidth.setValuesByQuery(params);
      this.separator.setValuesByQuery(params);
      this.oneLane.setValuesByQuery(params);
      //update groupby
      this.groupByDict.setValuesByQuery(params);
      this.group2Dict.setValuesByQuery(params);

   }



   // old code - backup for post req
   getFilterForPost = (bounds: any, useBounds: boolean = false) => {
      let filter = '{"$and" : [';
      filter += `{"accident_year":  { "$gte" : ${this.startYear},"$lte": ${this.endYear}}}`;
      // filter += FiterUtils.getMultiplefilter(this.injurySeverity);
      // filter += FiterUtils.getfilterCity(this.cities);
      if (useBounds && bounds != null) filter += FilterUtils.getfilterBounds(bounds);
      //filter += FiterUtils.getMultiplefilter(this.dayNight);
      // filter += FiterUtils.getFilterStreets(this.streets);
      // filter += this.getFilterFromNumArray(this.roads, 'road1');
      // filter += this.getFilterFromArray(this.roadSegment, 'road_segment_name');
      // filter += FiterUtils.getMultiplefilter(this.injTypes);
      // filter += FiterUtils.getMultiplefilter(this.genderTypes);
      // filter += FiterUtils.getMultiplefilter(this.ageTypes);
      // filter += FiterUtils.getMultiplefilter(this.populationTypes);
      // filter += FiterUtils.getMultiplefilter(this.accidentType);
      // filter += FiterUtils.getMultiplefilter(this.vehicleType);
      // filter += FiterUtils.getMultiplefilter(this.roadTypes);
      // filter += FiterUtils.getMultiplefilter(this.speedLimit);
      // filter += FiterUtils.getMultiplefilter(this.roadWidth);
      // filter += FiterUtils.getMultiplefilter(this.separator);
      // filter += FiterUtils.getMultiplefilter(this.oneLane);
      filter += ']}';
      return filter;
   }

   @action
   updateFilters = (colFilter: IColumnFilter, aType: number, val: boolean) => {
      colFilter.setFilter(aType, val);
      if (colFilter.allTypesOption === -1) colFilter.arrTypes[aType].checked = val;
      else if (aType === colFilter.allTypesOption) {
         colFilter.arrTypes
            .forEach((x, index) => x.checked = (index === colFilter.allTypesOption) ? val : !val);
      } else {
         colFilter.arrTypes[colFilter.allTypesOption].checked = false;
         colFilter.arrTypes[aType].checked = val;
      }
   }

   getfilterBySeverityAndCity = () => {
      let filter = '?';
      filter += this.startYear.getFilter();
      filter += this.injurySeverity.getFilter();
      filter += this.cities.getFilter();
      // filter += FiterUtils.getFilterFromArray('city', this.cities.arrValues);
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
   getFilterFromNumArray = (arr: string[], filterName: string) => {
      let filter: string = '';
      if (arr.length > 0) {
         filter += ',{"$or": [';
         filter += arr.map((x: string) => `{"${filterName}" : ${parseInt(x, 10)}}`).join(',');
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
      this.setIsLoading(true);
      const arrFilters = this.getFilterIDB();
      this.rootStore.mapStore.updateIsSetBounds(this.cities.arrValues, this.roadSegment.arrValues);
      // logger.log(arrFilters);
      getFromDexie(arrFilters)
         .then((data: any[] | undefined) => {
            if (data !== null && data !== undefined) {
               this.updateAllInjuries(data);
            }
            this.setIsLoading(false);
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
      const years = { filterName: 'accident_year', startYear: this.startYear.queryValue.toString(), endYear: this.endYear.queryValue.toString() };
      arrFilters.push(years);
      this.getfilterCityIDB(arrFilters);
      this.getFilterStreetsIDB(arrFilters);
      this.getMultiplefilterIDB(arrFilters, this.dayNight);
      this.getFilterFromArrayIDb(arrFilters, 'road_segment_name', this.roadSegment.arrValues);
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
      const years = { filterName: 'accident_year', startYear: this.startYear.queryValue.toString(), endYear: this.endYear.queryValue.toString() };
      arrFilters.push(years);
      this.getfilterCityIDB(arrFilters);
      this.getFilterStreetsIDB(arrFilters);
      this.getMultiplefilterIDB(arrFilters, this.dayNight);
      this.getFilterFromArrayIDb(arrFilters, 'road_segment_name', this.roadSegment.arrValues);
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
      let arrfilter: number[] = [];
      const iterator = colFilter.arrTypes.values();
      for (const filterCheck of iterator) {
         if (filterCheck.checked) {
            arrfilter = [...arrfilter, ...filterCheck.filters];
         } else {
            allChecked = false;
         }
      }
      if (!allChecked) {
         const filterVals = arrfilter.map((x: number) => {
            if (x === -1) return null;
            return x;
         });
         const filter = { filterName: colFilter.queryColName, values: filterVals };
         arrFilters.push(filter);
      }
   }

   getfilterCityIDB = (arrFilters: any[]) => {
      if (this.cities.arrValues.length > 0) {
         const filter = { filterName: 'accident_yishuv_name', values: this.cities.arrValues };
         arrFilters.push(filter);
      }
   }

   getFilterStreetsIDB = (arrFilters: any[]) => {
      if (this.streets.arrValues.length > 0 && this.streets.arrValues[0] !== '') {
         const filter1 = { filterName: 'street1_hebrew', values: this.streets.arrValues.map((x: string) => x.trim()) };
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

export default FilterStore;

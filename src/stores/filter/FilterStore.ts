import {
   observable, action, computed, makeAutoObservable,
   runInAction
} from 'mobx';
import { IColumnFilter } from './ColumnFilterCheckBoxList';
import { ColumnFilterArray } from './ColumnFilterArray';
import { ColumnFilterCombo, initStartYear, initEndYear, initCityPopSize } from './ColumnFilterCombo';
import * as FC from './ColumnFilterCheckBoxList';
import { IFilterChecker } from './FilterChecker';
import GroupBy, { initGroupMap } from './GroupBy';
import GroupBy2 from './GroupBy2';
import GroupMap, { initGroup2Map } from './GroupMap';
import { getCitiesNames, padDataYearsWith0, createFilterQureyByGroup, getfilterBounds, createFilterQureyByCityPop } from '../../utils/FilterUtils';
import { getQueryParamValues } from '../../utils/queryStringUtils';
import AccidentService from '../../services/AccidentService';
import CityService from '../../services/CityService';
import logger from '../../services/logger';
import { BBoxType, Street, Casualty } from '../../types';
import RootStore from '../RootStore';
import { store as reduxStore } from '../store';
import { setIsLoading, setFiltersText } from './filterSlice';
import { fetchFilterData } from './filterThunks'; 
//import { observer } from 'mobx-react-lite';
// import autorun  from "mobx"

export interface IFilterStore {
   isLoading: boolean;
   setIsLoading: (value:boolean) => void;
   startYear: ColumnFilterCombo;
   endYear: ColumnFilterCombo;
   cities: ColumnFilterArray;
   streets: ColumnFilterArray;
   roads: ColumnFilterArray;
   groupByDict: GroupMap;
}
class FilterStore implements IFilterStore  {
   appInitialized = false

   constructor(rootStore: RootStore) {
      // init app data
      this.rootStore = rootStore;
      makeAutoObservable(this, { rootStore: false,
         startYear: observable,
         cities: observable,
         endYear: observable,
         streets: observable,
         groupByDict: observable,
         dataByYears: observable
      });
      this.injurySeverity = FC.initInjurySeverity();
      this.setCasualtiesNames(this.injurySeverity);
      // when
      this.startYear = initStartYear(2020);
      this.endYear = initEndYear(2024);
      this.dayNight = FC.initDayNight();
      // where
      this.locationAccuracy = FC.initLocationAccuracy();
      this.roadTypes = FC.initRoadTypes();
      this.roads = new ColumnFilterArray('Road', 'rd', false);
      this.roadSegment = new ColumnFilterArray('RoadSegment', 'rds', true);
      this.cities = new ColumnFilterArray('City', 'city', false);
      this.streets = new ColumnFilterArray('Street', 'st', false);
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
      const map: Map<string, any> = initGroupMap();
      this.groupByDict = new GroupMap(map, 'gb', 'injt');
      const mapGroupBy2 = initGroup2Map();
      this.group2Dict = new GroupMap(mapGroupBy2, 'gb2', 'sex');

      // init data (on home page)
      this.dataByYears = FC.initDataYreasUnfilterd();
      this.dataFilterdByYears = FC.initDataYreasfilterd();
      this.setDataFilterd(FC.initDataGrpBy1());
      this.dataGroupby2 = FC.initDataGrpBy2();
      this.appInitialized = false;    
   }

   rootStore: RootStore;

   // ///////////////////////////////////////////////////////////////////////////////////////////////
   // Config Filter
   // ///////////////////////////////////////////////////////////////////////////////////////////////

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
   updateCities = async (values: string[], updateCityResult: boolean) => {
      this.cities.setFilter(values);
      if (this.cities.arrValues.length === 0) {
         this.streets.arrValues = [];
      } else {
         if(this.cities.arrValues.length ===1){
            const cityId = this.cities.arrValues[0];
            const srvCity = new CityService();
            const streets = await srvCity.getStreetsByCity(cityId);
            this.SetCityStreets(streets);           
         }         
         if (updateCityResult) {
            //[this.cityResult] = this.cities.arrValues;
         }
      }
   }

   @observable
   cityResult: string = '';
   @action 
   updateCityResult = (value:string) => {
      this.previousCity = this.cityResult;
      this.cityResult = value;
   }

   @observable
   previousCity: string | null = null;
   
   @observable
   cityStreets: Street [] |null = null;
   @action
   SetCityStreets =(streets: Street[])=>{
      this.cityStreets = streets;
   }

   @observable
   streets: ColumnFilterArray;
   @action
   updateStreets = (values: string[]) => {
      this.streets.setFilter(values);
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
   @action
   setDataByYears = (data: any[]) => {
      this.dataByYears = data;
   }

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
   @action
   setDataFilterd(data:any[]){
      this.dataFilterd = data;
   }

   // casualties groupd by 2 groups, filterd on main filter
   @observable
   dataGroupby2: any[] = [];
   @action
   setDataGroupBy2(data: any[]){
      this.dataGroupby2 = data;
   }

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

   // observable for group by name
   @observable
   groupByName: string = '';

   // Action to set group by name
   @action
   setGroupByName = (name: string) => {
      this.groupByName = name;
   }

   @observable
   GroupBySort: string|null = null;
   
   @action 
   SetGroupBySort = (value:string|null) =>{
      this.GroupBySort = value;
   }
   @action 
   submitOnGroupByAfterSort =() =>{
      this.submitfilterdGroup(this.groupByDict.groupBy as GroupBy);
   }

   @observable
   GroupByLimit: number|null = null;
   
   @action 
   SetGroupByLimit = (value:number|null) =>{
      this.GroupByLimit = value;
   }
   @action 
   submitOnGroupByAfterLimit =() =>{
      this.submitfilterdGroup(this.groupByDict.groupBy as GroupBy);
   }



   @action
   updateGroupby = (key: string) => {      
      this.groupByDict.setFilter(key);
      this.setGroupByName((this.groupByDict.groupBy as GroupBy).value)
      
       // Add additional logic after state update
      runInAction(() => {
         this.groupByDict.setBrowserQueryString();     
         this.submitfilterdGroup(this.groupByDict.groupBy as GroupBy);
         if (this.groupByDict.groupBy.text !== 'CityByPop') {
            const gb2 = (this.group2Dict.groupBy as GroupBy2).name;
            this.submitfilterdGroup2(this.groupByDict.groupBy as GroupBy, gb2);
         }
      });
    
   }

   /**
    * Dictionary with key-value list of the group-by  
    */
   @observable
   groupByDict: GroupMap;

   @action
   submitGroupByYears = () => {
      const filtermatch = this.getfilterBySeverityAndCity();
      const filter = createFilterQureyByGroup(filtermatch, 'year');
      AccidentService.fetchGetGroupBy(filter)
         .then((data: any[] | undefined) => {
            if (data !== undefined) {
               const dataPadded = padDataYearsWith0(data, this.startYear.queryValue, this.endYear.queryValue);
               this.setDataByYears(dataPadded);                  
            }
         });
   }

  

   getCountFromGroupByRes = (data: any[]) => {
      const res = data.reduce((b: number, x: any) => b + x.count, 0);
      return res;
   }

   @action
   submitfilterdGroupByYears = () => {
      this.isLoadingInjuriesCount = true;
      const range = JSON.parse(this.cityPopSizeRange.queryValue.toString());     
      const filtermatch = this.getFilterQueryString(null);
      const filter = createFilterQureyByGroup(filtermatch, 'year', range.min, range.max);
      AccidentService.fetchGetGroupBy(filter)
         .then((data: any[] | undefined) => {
            if (data !== undefined) {
               const dataPadded =  padDataYearsWith0(data, this.startYear.queryValue, this.endYear.queryValue);
               this.setDataFilterdByYears(dataPadded);
               const count = this.getCountFromGroupByRes(data);
               this.setInjuriesCount(count);
            }
         });
      
   }


   @action
   submitfilterdGroup = (aGroupBy: GroupBy) => {
      const range = JSON.parse(this.cityPopSizeRange.queryValue.toString());     
      const filtermatch = this.getFilterQueryString(null);
      const filter = createFilterQureyByGroup(filtermatch, aGroupBy.value, range.min, range.max, '', aGroupBy.limit, this.GroupBySort);
      // logger.log(filter);
      AccidentService.fetchGetGroupBy(filter)
         .then((data: any | undefined) => {
            if(aGroupBy.reGroupResultFunc) {
               data = aGroupBy.reGroupResultFunc(data);
            }
            if (data !== undefined) this.setDataFilterd(data);
         });
   }

   // observable for group by name
   @observable
   groupBy2Name: string = '';

   // Action to set group by name
   @action
   setGroupBy2Name = (name: string) => {
      this.groupBy2Name = name;
   }

   @action
   submitfilterdGroup2 = (aGroupBy: GroupBy, groupName2: string) => {  
         const range = JSON.parse(this.cityPopSizeRange.queryValue.toString());
         const filtermatch = this.getFilterQueryString(null);
         const filter = createFilterQureyByGroup(filtermatch, aGroupBy.value, range.min, range.max, groupName2, aGroupBy.limit);
         // logger.log(filter)
         AccidentService.fetchGetGroupBy(filter)
            .then((data: any[] | undefined) => {
               if (data !== undefined && data.length > 0) {
                  try {
                     const fixData = (this.group2Dict.groupBy as GroupBy2).normalizeGroupedCounts(data);
                     this.setDataGroupBy2(fixData);
                  } catch (error) {
                     logger.log(error);
                     this.setDataGroupBy2([]);
                  }
               } else {
                  this.setDataGroupBy2([]);
               }
            });
   }

   // @observable
   // groupBy2: GroupBy2;

   @action
   updateGroupBy2 = (key: string) => {
      this.group2Dict.setFilter(key);
      this.setGroupBy2Name((this.group2Dict.groupBy as GroupBy2).name);
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
      if (this.rootStore.localDbFilterStroe.useLocalDb === 2) {
         //this.submitMainDataFilterLocalDb();
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
      this.submitfilterdGroup(this.groupByDict.groupBy as GroupBy);
      this.submitfilterdGroup2(this.groupByDict.groupBy as GroupBy, (this.group2Dict.groupBy as GroupBy2).name);
      this.setCasualtiesNames(this.injurySeverity);
      const {currentPage, language}  = reduxStore.getState().appUi;
      if (currentPage === 'city') this.rootStore.imageStore.getImagesByPlace(this.cityResult, language);
   }

   submintMainDataFilter = () => {
      reduxStore.dispatch(setIsLoading(true));
    
      const filter = this.getFilterQueryString(null);
      reduxStore.dispatch(setFiltersText(true));
      this.setBrowserQueryString();
    
      this.rootStore.mapStore.updateIsSetBounds(this.cities.arrValues, this.roadSegment.arrValues);
      
      reduxStore.dispatch(fetchFilterData());
    };

   submintMainDataFilter_old = () => {
      this.setIsLoading(true);    
      const filter = this.getFilterQueryString(null);
      this.setFiltersText(true);
      this.setBrowserQueryString();
      // logger.log(filter);
      this.rootStore.mapStore.updateIsSetBounds(this.cities.arrValues, this.roadSegment.arrValues);
      AccidentService.fetchGetList(filter, 'main')
         .then((res: any | undefined) => {
            if (res && res.data !== null && res.data !== undefined) {
               // this.updateAllInjuries(res.data);
               // write Data to local db
               if (this.rootStore.localDbFilterStroe.useLocalDb === 1) this.rootStore.localDbFilterStroe.writeToLocalDB(res.data);
            }               
            this.setIsLoading(false);
         });
   
   }

   submintGetMarkerFirstStep = () => {
      // const range = JSON.parse(this.cityPopSizeRange.queryValue.toString());
      // const filter = this.getFilterForPost(null);
      // const filter = FiterUtils.getFilterByCityPop(filterMatch, range.min, range.max);
      // AccidentService.fetchAggregatFilter(filter, 'latlon')
      //    .then((data: any[] | undefined) => {
      //       if (data !== null && data !== undefined) {
      //          this.updateDataMarkersLean(data);
      //       }
      //    });
   }
   async submitCityNameAndLocation() {
      const cityId = this.cities.arrValues[0] || "";
      this.updateCityResult(cityId);    
      if (!cityId || !this.rootStore.mapStore.isCenterMapByCity()) return;    
      try {
        const srvCity = new CityService();
        const cityData = await srvCity.getCityByid(cityId);
        this.rootStore.mapStore.updateMapCenterByCity(cityData);
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    }

   /**
    * get filter query string for the server request. 
    * @param bounds gis bound (rect) to filter
    * @param useBounds if true will use gis bound to filter reqest
    * @returns query string , for example ?sy=2017&sev=1&city="תל אביב -יפו","חיפה"
    */
   getFilterQueryString = (bounds: any, useBounds: boolean = false) => {
      //the oreder of the fileds is importnet for indexing in server
      let query = '?';
      query += this.startYear.getFilter();
      query += this.endYear.getFilter();
      query += this.injurySeverity.getFilter();
      query += this.cities.getFilter();
      if (useBounds && bounds != null) query += getfilterBounds(bounds);
      query += this.dayNight.getFilter();
      query += this.streets.getFilter();
      query += this.roads.getFilter();
      query += this.roadSegment.getFilter();
      query += this.injTypes.getFilter();
      query += this.genderTypes.getFilter();
      query += this.ageTypes.getFilter();
      query += this.populationTypes.getFilter();
      query += this.accidentType.getFilter();
      query += this.vehicleType.getFilter();
      query += this.involvedVehicle.getFilter();
      query += this.locationAccuracy.getFilter();
      query += this.roadTypes.getFilter();
      query += this.speedLimit.getFilter();
      query += this.roadWidth.getFilter();
      query += this.separator.getFilter();
      query += this.oneLane.getFilter();
      const range = JSON.parse(this.cityPopSizeRange.queryValue.toString());
      query += createFilterQureyByCityPop(range.min, range.max)
      return query;
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
      const cityNamesArr = getCitiesNames(this.cities.arrValues);
      const cityNames = cityNamesArr.join(', ');
      this.cities.setTitle(cityNames);
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
      const currentTab  = reduxStore.getState().appUi.currentTab;
      const params = new URLSearchParams(window.location.search);
      params.set('tab', currentTab);
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
      //const citis = this.getCityIdFromQuery(params, defCity);
      const cities = getQueryParamValues(params, 'city', defCity, this.isMultipleCities);
      if (cities) this.updateCities(cities, true);
      const roads = getQueryParamValues(params, 'rd', undefined, true);
      if (roads) this.updateCities(cities, true);
      this.setRoads(roads);
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
      filter += this.endYear.getFilter();
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

}

export default FilterStore;
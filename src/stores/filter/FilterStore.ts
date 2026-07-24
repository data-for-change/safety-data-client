import {
   observable, action, computed, makeAutoObservable,
   runInAction,
   reaction
} from 'mobx';
import { IColumnFilter } from './ColumnFilterCheckBoxList';
import { ColumnFilterArray } from './ColumnFilterArray';
import { ColumnFilterCombo, initStartYear, initEndYear, initCityPopSize, initPoilceStations } from './columnFilterCombo';
import * as FC from './ColumnFilterCheckBoxList';
import { IFilterChecker } from './FilterChecker';
import GroupBy, { initGroupMap } from './GroupBy';
import GroupBy2 from './GroupBy2';
import GroupMap, { initGroup2Map } from './GroupMap';
import SeverityFilterStore from './SeverityFilterStore';
import LocationFilterStore from './LocationFilterStore';
import TimeFilterStore from './TimeFilterStore';
import WhoFilterStore from './WhoFilterStore';
import WhatFilterStore from './WhatFilterStore';
import VehicleFilterStore from './VehicleFilterStore';
import RoadFilterStore from './RoadFilterStore';
import { getCitiesNames, padDataYearsWith0, createFilterQureyByGroup, getfilterBounds,
    createFilterQureyByCityPop, getfilterDatasource, 
    loadAreaPolygon} from '../../utils';
import { getQueryParamValues } from '../../utils/queryStringUtils';
import AccidentService from '../../services/AccidentService';
import CityService from '../../services/CityService';
import logger from '../../services/logger';
import { BBoxType, Street, Casualty, ItemCount, ItemCount2, GeoFilter } from '../../types';
import RootStore from '../RootStore';
import { store as reduxStore } from '../store';
import { setIsLoading, setFiltersText } from './filterSlice';
import { fetchFilterData } from './filterThunks';
import { sliceDataWithAggregation, formatDataPrecision } from '../../utils/chartDataUtils';
import { EchartId } from '../../components/types';
//import { observer } from 'mobx-react-lite';
// import autorun  from "mobx"

export interface IFilterStore {
   isLoading: boolean;
   setIsLoading: (value:boolean) => void;
   cities: ColumnFilterArray;
   streets: ColumnFilterArray;
   roads: ColumnFilterArray;
   groupByDict: GroupMap;
}
class FilterStore implements IFilterStore  {
   appInitialized = false
   timeStore: TimeFilterStore;
   whoStore: WhoFilterStore;
   whatStore?: WhatFilterStore;
   vehicleStore: VehicleFilterStore;
   roadStore: RoadFilterStore;

      private getWhatStore(): WhatFilterStore {
         if (!(this as any).whatStore) (this as any).whatStore = new WhatFilterStore();
         return (this as any).whatStore as WhatFilterStore;
      }

   constructor(rootStore: RootStore) {
      // init app data
      this.rootStore = rootStore;
      this.severityStore = new SeverityFilterStore();
      this.locationStore = new LocationFilterStore();
      this.timeStore = new TimeFilterStore();
      this.whoStore = new WhoFilterStore();
      this.vehicleStore = new VehicleFilterStore();
      this.roadStore = new RoadFilterStore();
      // whatStore will be lazily created when first accessed
      makeAutoObservable(this, { rootStore: false,
         severityStore: false,
         locationStore: false,
         timeStore: false,
         whoStore: false,
         whatStore: false,
         vehicleStore: false,
         roadStore: false,
         groupByDict: observable,
         dataByYears: observable,
         chartDataRanges: observable,
         chartHideOutOfRange: observable,
         chartOutOfRangeCounts: observable,
         dataSource: observable
      });
      // where
      // location state is now managed by LocationFilterStore
      // What state is managed by WhatFilterStore
      // Road filters are managed by RoadFilterStore
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
      // Reaction to city changes (severity store handles moderate-option disabling)
      this.severityStore.updateModerateDisabledState(this.cities.arrValues);
      reaction(
         () => this.cities.arrValues,
         () => this.severityStore.updateModerateDisabledState(this.cities.arrValues)
      );
   }

   rootStore: RootStore;
   severityStore: SeverityFilterStore;
   locationStore: LocationFilterStore;

   get casualtiesNames() {
      return this.severityStore.casualtiesNames;
   }

   setCasualtiesNames = (injurySeverity: IColumnFilter) => {
      this.severityStore.setCasualtiesNames(injurySeverity);
   }

   get isMultipleCities() {
      return this.locationStore.isMultipleCities;
   }

   setIsMultipleCities = (isMulti: boolean) => {
      this.locationStore.setIsMultipleCities(isMulti);
   }

   get cities() {
      return this.locationStore.cities;
   }

   updateCities = async (values: string[], updateCityResult: boolean) => {
      return this.locationStore.updateCities(values, updateCityResult);
   }

   get zoneName() {
      return this.locationStore.zoneName;
   }

   setZonesName = async (value: string) => {
      await this.locationStore.setZonesName(value);
   }

   // severity-related moderate-option logic moved to `SeverityFilterStore`

   get cityResult() {
      return this.locationStore.cityResult;
   }

   get previousCity() {
      return this.locationStore.previousCity;
   }

   get cityStreets() {
      return this.locationStore.cityStreets;
   }

   updateCityResult = (value: string) => {
      this.locationStore.setCityResult(value);
   }

   get streets() {
      return this.locationStore.streets;
   }

   updateStreets = (values: string[]) => {
      this.locationStore.updateStreets(values);
   }

   get roads() {
      return this.locationStore.roads;
   }

   setRoads = (names: string[]) => {
      this.locationStore.setRoads(names);
   }

   get cityPopSizeRange() {
      return this.locationStore.cityPopSizeRange;
   }

   setCityPopSizeRange = (range: string) => {
      this.locationStore.setCityPopSizeRange(range);
   }

   get roadSegment() {
      return this.locationStore.roadSegment;
   }

   updateRoadSegment = (names: number[]) => {
      this.locationStore.updateRoadSegment(names);
   }

   get roadTypes() {
      return this.locationStore.roadTypes;
   }

   updateRoadType = (aType: number, val: boolean) => {
      this.locationStore.updateRoadType(aType, val);
   }

   get locationAccuracy() {
      return this.locationStore.locationAccuracy;
   }

   updateLocationAccuracy = (aType: number, val: boolean) => {
      this.locationStore.updateLocationAccuracy(aType, val);
   }

   get isValidWhere() {
      return this.locationStore.isValidWhere;
   }

   get geoFilter() {
      return this.locationStore.geoFilter;
   }

   // ///////////////////////////////////////////////////////////////////////////////////////////////
   // Config Filter
   // ///////////////////////////////////////////////////////////////////////////////////////////////

   @observable
   showAllVehicleTypes: boolean = false;

   @action
   updateShowAllVehicleTypes = (val: boolean) => {
      this.showAllVehicleTypes = val;
      const vt = this.vehicleStore.vehicleType;
      const newCol = this.showAllVehicleTypes ? FC.initVehicleTypesFull() : FC.initVehicleTypes();
      vt.arrTypes = newCol.arrTypes;
      vt.setQueryVals();
   }

   @observable isUpdateFromUrl: boolean = true;

   @action setIsUpdateFromUrl = (value: boolean) => {
      this.isUpdateFromUrl = value;
   }

   @observable formCardKey: number = 0;
   @action setFormCardKey = (value: number) => {
      this.formCardKey = value;
   }

   //datasource of acciednt - 1 police, 3 common file (tik claly), 4 - Offense repot (shomay haderch)
   @observable
   dataSource: number = 1;

   @action
   updateDataSource = (sourceVal: number) => {
     this.dataSource = sourceVal;
   }

   // who (delegated to WhoFilterStore)
   // ///////////////////////////////////////////////////////////////////////////////////////////////

   get genderTypes() {
      return this.whoStore.genderTypes;
   }

   updateGenderType = (aType: number, val: boolean) => {
      this.whoStore.updateGenderType(aType, val);
   }

   get ageTypes() {
      return this.whoStore.ageTypes;
   }

   updateAgeType = (aType: number, val: boolean) => {
      this.whoStore.updateAgeType(aType, val);
   }

   get populationTypes() {
      return this.whoStore.populationTypes;
   }

   updatePopulationType = (aType: number, val: boolean) => {
      this.whoStore.updatePopulationType(aType, val);
   }

   @computed get isValidWho() {
      return this.whoStore.isValidWho;
   }

   // ///////////////////////////////////////////////////////////////////////////////////////////////
   // What (delegated to WhatFilterStore)
   // ///////////////////////////////////////////////////////////////////////////////////////////////

   get accidentType() {
      return this.getWhatStore().accidentType;
   }

   updateAccidentType = (aType: number, val: boolean) => {
      this.getWhatStore().updateAccidentType(aType, val);
   }

   @computed get isValidWhat() {
      return this.getWhatStore().isValidWhat;
   }
   
   // ///////////////////////////////////////////////////////////////////////////////////////////////
   // What Road (delegated to RoadFilterStore)
   // ///////////////////////////////////////////////////////////////////////////////////////////////

   get speedLimit() {
      return this.roadStore.speedLimit;
   }

   updateSpeedLimit = (aType: number, val: boolean) => {
      this.roadStore.updateSpeedLimit(aType, val);
   }

   get roadWidth() {
      return this.roadStore.roadWidth;
   }

   updateRoadWidth = (aType: number, val: boolean) => {
      this.roadStore.updateRoadWidth(aType, val);
   }

   get separator() {
      return this.roadStore.separator;
   }

   updateSeparator = (aType: number, val: boolean) => {
      this.roadStore.updateSeparator(aType, val);
   }

   get oneLane() {
      return this.roadStore.oneLane;
   }

   updateOneLane = (aType: number, val: boolean) => {
      this.roadStore.updateOneLane(aType, val);
   }

   @computed get isValidWhatRoad() {
      return this.roadStore.isValidWhatRoad;
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
   dataFilterd: ItemCount[] = []
   @action
   setDataFilterd(data:ItemCount[]){
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
      const res = this.severityStore.isValidSeverity && this.timeStore.isValidWhen && this.isValidWho
         && this.isValidWhere && this.isValidWhat && this.vehicleStore.isValidWhatVehicle && this.isValidWhatRoad;
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
      console.log('🚀 ~ FilterStore ~ name:', name)
      this.groupByName = name;
   }

   // GroupBySort
   @observable
   GroupBySort: string|null = 'd';

   @action
   SetGroupBySort = (value:string|null) =>{
      this.GroupBySort = value;
      this.resetChartRanges();
   }
   @action
   submitOnGroupByAfterSort =() =>{
      this.submitfilterdGroup(this.groupByDict.groupBy as GroupBy);
   }
 
   // GroupByLimit - the max number of groups in "groupby"
   @observable
   GroupByLimit: number|null = 1000;
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
      const groupBy = this.groupByDict.groupBy as GroupBy;
      this.setGroupByName(groupBy.value)
      this.GroupBySort=  groupBy.sort;
       // Add additional logic after state update
      runInAction(() => {
         this.groupByDict.setBrowserQueryString();
         this.resetChartRanges();
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
      AccidentService.fetchGroupBy(filter, this.geoFilter)
         .then((data: ItemCount[] | undefined) => {
            if (data !== undefined) {
               const dataPadded = padDataYearsWith0(data, this.timeStore.startYear.queryValue, this.timeStore.endYear.queryValue);
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
      AccidentService.fetchGroupBy(filter, this.geoFilter)
         .then((data: ItemCount2[] | undefined) => {
            if (data !== undefined) {
               const dataPadded =  padDataYearsWith0(data, this.timeStore.startYear.queryValue, this.timeStore.endYear.queryValue);
               this.setDataFilterdByYears(dataPadded);
               const count = this.getCountFromGroupByRes(data);
               this.setInjuriesCount(count);
            }
         });

   }


   @action
   submitfilterdGroup = (aGroupBy: GroupBy) => {
      const range = JSON.parse(this.cityPopSizeRange.queryValue.toString());
      const limit = this.GroupByLimit as number;
      const filtermatch = this.getFilterQueryString(null);
      const filter = createFilterQureyByGroup(filtermatch, aGroupBy.value, range.min, range.max, '', limit, this.GroupBySort);
      // logger.log(filter);
      AccidentService.fetchGroupBy(filter, this.geoFilter)
         .then((data: any | undefined) => {
            if(aGroupBy.transformFetchResult) {
               data = aGroupBy.transformFetchResult(data);
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
         AccidentService.fetchGroupBy(filter, this.geoFilter)
            .then((data: ItemCount2[] | undefined) => {
               if (data !== undefined && data.length > 0) {
                  try {
                     if(aGroupBy.transformFetchResult) {
                        data = aGroupBy.transformFetchResult(data) as ItemCount2[];
                     }
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
      this.resetChartRanges();
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
      this.setCasualtiesNames(this.severityStore.injurySeverity);
      this.resetChartRanges();
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
      AccidentService.fetchInvolvedList(filter, null)
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
      query += this.timeStore.startYear.getFilter();
      query += this.timeStore.endYear.getFilter();
      query += this.severityStore.injurySeverity.getFilter();
      query += getfilterDatasource(this.dataSource);
      query += this.cities.getFilter();
      if (useBounds && bounds != null) query += getfilterBounds(bounds);
      query += this.timeStore.dayNight.getFilter();
      query += this.streets.getFilter();
      query += this.roads.getFilter();
      query += this.roadSegment.getFilter();
      query += this.vehicleStore.injTypes.getFilter();
      query += this.genderTypes.getFilter();
      query += this.ageTypes.getFilter();
      query += this.populationTypes.getFilter();
      query += this.accidentType.getFilter();
      query += this.vehicleStore.vehicleType.getFilter();
      query += this.vehicleStore.involvedVehicle.getFilter();
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
      this.timeStore.startYear.setText();
      this.timeStore.endYear.setText();
      this.vehicleStore.injTypes.setText(ignoreIfAll);
      this.timeStore.dayNight.setText(ignoreIfAll);
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
      this.vehicleStore.vehicleType.setText(ignoreIfAll);
      this.vehicleStore.involvedVehicle.setText(ignoreIfAll);
   }

   /**
    * set the QueryString of the browser by current filter
    */
   @action
   setBrowserQueryString = () => {
      const currentTab  = reduxStore.getState().appUi.currentTab;
      const params = new URLSearchParams(window.location.search);
      params.set('tab', currentTab);
      this.timeStore.startYear.setBrowserQueryString(params, false);
      this.timeStore.endYear.setBrowserQueryString(params, false);
      this.severityStore.injurySeverity.setBrowserQueryString(params, false);
      this.roadTypes.setBrowserQueryString(params);
      this.vehicleStore.injTypes.setBrowserQueryString(params);
      this.genderTypes.setBrowserQueryString(params);
      this.ageTypes.setBrowserQueryString(params);
      this.populationTypes.setBrowserQueryString(params);
      this.cities.setBrowserQueryString(params);
      this.streets.setBrowserQueryString(params);
      this.roads.setBrowserQueryString(params);
      this.locationAccuracy.setBrowserQueryString(params);
      this.accidentType.setBrowserQueryString(params);
      this.vehicleStore.vehicleType.setBrowserQueryString(params);
      this.vehicleStore.involvedVehicle.setBrowserQueryString(params);
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
      this.timeStore.startYear.setValuesByQuery(params);
      this.timeStore.endYear.setValuesByQuery(params);
      this.severityStore.injurySeverity.setValuesByQuery(params);
      this.timeStore.dayNight.setValuesByQuery(params);
      //const citis = this.getCityIdFromQuery(params, defCity);
      const cities = getQueryParamValues(params, 'city', defCity, this.isMultipleCities);
      if (cities) this.updateCities(cities, true);
      const streets = getQueryParamValues(params, 'st', undefined, true);
      if (streets) this.updateStreets(streets);
      const roads = getQueryParamValues(params, 'rd', undefined, true);
      if (roads) this.updateCities(cities, true);
      this.setRoads(roads);
      this.locationAccuracy.setValuesByQuery(params);
      this.roadTypes.setValuesByQuery(params);
      this.vehicleStore.injTypes.setValuesByQuery(params);
      this.genderTypes.setValuesByQuery(params);
      this.ageTypes.setValuesByQuery(params);
      this.populationTypes.setValuesByQuery(params);
      this.accidentType.setValuesByQuery(params);
      this.vehicleStore.vehicleType.setValuesByQuery(params);
      this.vehicleStore.involvedVehicle.setValuesByQuery(params);
      this.speedLimit.setValuesByQuery(params);
      this.roadWidth.setValuesByQuery(params);
      this.separator.setValuesByQuery(params);
      this.oneLane.setValuesByQuery(params);
      //update groupby
      this.groupByDict.setValuesByQuery(params);
      this.group2Dict.setValuesByQuery(params);
      const groupBy = this.groupByDict.groupBy as GroupBy;
      if (groupBy.value !== 'age') {
         this.GroupBySort = 'd';
      } else {
         this.GroupBySort = null;
      }
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
      filter += this.timeStore.startYear.getFilter();
      filter += this.timeStore.endYear.getFilter();
      filter += this.severityStore.injurySeverity.getFilter();
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

   @observable
   chartDataRanges: Map<string, { start: number, end: number }> = new Map();

   @observable
   chartHideOutOfRange: Map<string, boolean> = new Map();

   @observable
   chartOutOfRangeCounts: Map<string, number> = new Map();

   @action
   setChartDataRange = (id: string, start: number, end: number) => {
      this.chartDataRanges.set(id, { start, end });
   }

   @action
   setChartHideOutOfRange = (id: string, value: boolean) => {
      this.chartHideOutOfRange.set(id, value);
   }

   getChartDataRange = (id: string) => {
      return this.chartDataRanges.get(id) || { start: 0, end: 100 };
   }

   @action
   resetChartRanges = () => {
      this.chartDataRanges.clear();
      this.chartHideOutOfRange.clear();
      this.chartOutOfRangeCounts.clear();
   }

   getChartData = (id: EchartId) => {
      let data: any[] = [];
      let metaData: any[] | undefined = undefined;
      let usePrecision = true;

      switch (id) {
         case EchartId.Group_1:
            data = this.dataFilterd;
            break;
         case EchartId.Group_2:
            data = this.dataGroupby2;
            metaData = (this.group2Dict.groupBy as GroupBy2).getBars();
            usePrecision = false; // Group 2 metadata handles its own display
            break;
         case EchartId.Years:
            data = this.dataFilterdByYears;
            break;
         default:
            return [];
      }

      const getItemValue = (item: any) => {
        if (item.count !== undefined) return Number(item.count);
        if (metaData) {
          return Math.max(...metaData.map(m => Number(item[m.key]) || 0));
        }
        return 0;
      };

      const maxVal = data.reduce((max, item) => Math.max(max, getItemValue(item)), 0);
      const range = this.chartDataRanges.get(id) || { start: 0, end: maxVal };
      let sliced = sliceDataWithAggregation(data, range, metaData);
      const outsideItem = sliced.find((item: any) => item._id === 'outside_range');
      const outOfRangeCount = outsideItem
         ? (metaData
            ? metaData.reduce((sum, m) => sum + (Number(outsideItem[m.key]) || 0), 0)
            : Number(outsideItem.count) || 0)
         : 0;
      runInAction(() => {
         this.chartOutOfRangeCounts.set(id, outOfRangeCount);
      });
      if (this.chartHideOutOfRange.get(id)) {
         sliced = sliced.filter((item: any) => item._id !== 'outside_range');
      }
      return usePrecision ? formatDataPrecision(sliced) : sliced;
   }
}

export default FilterStore;

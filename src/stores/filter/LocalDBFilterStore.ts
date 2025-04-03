import { makeAutoObservable } from "mobx";
import { insertToDexie, getFromDexie } from '../../services/DexieInjuredService';
import { IColumnFilter } from "./ColumnFilterCheckBoxList";
import { FilterLocalStorage, LocalStorageService } from '../../services/Localstorage.Service';

class LocalDBFilterStore {
  rootStore;
 

  constructor(rootStore: any) {
    this.rootStore = rootStore;
    this.localStorageService = new LocalStorageService();
    makeAutoObservable(this);
  }

  useLocalDb = 0;
  localStorageService: LocalStorageService<FilterLocalStorage>;
  filtersArrayLocalStorage: FilterLocalStorage[] = []

  setCurrentFiltersArrayLocalStorage = () => {
      this.filtersArrayLocalStorage = this.localStorageService.getLoaclStorage('my-filters')
  }
  
  updateFilterArrayLocalStorage = (data: FilterLocalStorage) => {
      this.filtersArrayLocalStorage = this.localStorageService.getLoaclStorage('my-filters')
      this.filtersArrayLocalStorage.push(data)
      this.localStorageService.setLocalStorage('my-filters', this.filtersArrayLocalStorage)
  }

  writeToLocalDB=(data: any) =>{
    insertToDexie(data);
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
    const years = { 
      filterName: "accident_year", 
      startYear: this.rootStore.filterStore.startYear.queryValue.toString(), 
      endYear: this.rootStore.filterStore.endYear.queryValue.toString() 
    };
    
    arrFilters.push(years);
    this.getfilterCityIDB(arrFilters);
    this.getFilterStreetsIDB(arrFilters);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.dayNight);
    this.getFilterFromArrayIDb(arrFilters, "road_segment_name", this.rootStore.filterStore.roadSegment.arrValues);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.roadTypes);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.injTypes);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.genderTypes);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.ageTypes);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.populationTypes);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.accidentType);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.vehicleType);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.speedLimit);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.roadWidth);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.separator);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.oneLane);

    return arrFilters;
  }

  getFilterBboxIDB = (bounds: L.LatLngBounds) => {
    const arrFilters: any[] = [];
    const bbox = { filterName: "bbox", p1: bounds.getSouthWest(), p2: bounds.getNorthEast() };
    arrFilters.push(bbox);
    
    const years = { 
      filterName: "accident_year", 
      startYear: this.rootStore.filterStore.startYear.queryValue.toString(), 
      endYear: this.rootStore.filterStore.endYear.queryValue.toString() 
    };
    arrFilters.push(years);
    
    this.getfilterCityIDB(arrFilters);
    this.getFilterStreetsIDB(arrFilters);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.dayNight);
    this.getFilterFromArrayIDb(arrFilters, "road_segment_name", this.rootStore.filterStore.roadSegment.arrValues);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.roadTypes);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.injTypes);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.genderTypes);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.ageTypes);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.populationTypes);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.accidentType);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.vehicleType);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.speedLimit);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.roadWidth);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.separator);
    this.getMultiplefilterIDB(arrFilters, this.rootStore.filterStore.oneLane);

    return arrFilters;
  }

  getMultiplefilterIDB = (arrFilters: any[], colFilter: IColumnFilter) => {
    if (colFilter.allTypesOption > -1 && colFilter.arrTypes[colFilter.allTypesOption].checked) {
      return;
    }
    
    let allChecked: boolean = true;
    let arrfilter: number[] = [];
    
    for (const filterCheck of colFilter.arrTypes) {
      if (filterCheck.checked) {
        arrfilter = [...arrfilter, ...filterCheck.filters];
      } else {
        allChecked = false;
      }
    }
    
    if (!allChecked) {
      const filterVals = arrfilter.map((x: number) => (x === -1 ? null : x));
      arrFilters.push({ filterName: colFilter.queryColName, values: filterVals });
    }
  }

  getfilterCityIDB = (arrFilters: any[]) => {
    if (this.rootStore.filterStore.cities.arrValues.length > 0) {
      arrFilters.push({
        filterName: "accident_yishuv_name", 
        values: this.rootStore.filterStore.cities.arrValues
      });
    }
  }

  getFilterStreetsIDB = (arrFilters: any[]) => {
    if (this.rootStore.filterStore.streets.arrValues.length > 0 && this.rootStore.filterStore.streets.arrValues[0] !== "") {
      arrFilters.push({
        filterName: "street1_hebrew", 
        values: this.rootStore.filterStore.streets.arrValues.map((x: string) => x.trim())
      });
    }
  }

  getFilterFromArrayIDb = (arrFilters: any[], filterName: string, arr: string[]) => {
    if (arr.length > 0 && arr[0] !== "") {
      arrFilters.push({ 
        filterName, 
        values: arr.map((x: string) => x.trim()) 
      });
    }
  }
}

export default LocalDBFilterStore;

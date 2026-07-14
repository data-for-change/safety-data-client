import { makeAutoObservable } from 'mobx';
import { IColumnFilter } from './ColumnFilterCheckBoxList';
import { ColumnFilterArray } from './ColumnFilterArray';
import { ColumnFilterCombo, initCityPopSize, initPoilceStations } from './columnFilterCombo';
import * as FC from './ColumnFilterCheckBoxList';
import { GeoFilter, Street } from '../../types';
import CityService from '../../services/CityService';
import { loadAreaPolygon } from '../../utils';

export default class LocationFilterStore {
   isMultipleCities: boolean = false;
   cities: ColumnFilterArray;
   streets: ColumnFilterArray;
   roads: ColumnFilterArray;
   roadSegment: ColumnFilterArray;
   cityPopSizeRange: ColumnFilterCombo;
   zoneName: ColumnFilterCombo;
   roadTypes: IColumnFilter;
   locationAccuracy: IColumnFilter;
   cityResult: string = '';
   previousCity: string | null = null;
   cityStreets: Street[] | null = null;
   geoFilter: GeoFilter | null = null;

   constructor() {
      makeAutoObservable(this);
      this.locationAccuracy = FC.initLocationAccuracy();
      this.roadTypes = FC.initRoadTypes();
      this.roads = new ColumnFilterArray('Road', 'rd', false);
      this.roadSegment = new ColumnFilterArray('RoadSegment', 'rds', false);
      this.cities = new ColumnFilterArray('City', 'city', false);
      this.streets = new ColumnFilterArray('Street', 'st', false);
      this.cityPopSizeRange = initCityPopSize();
      this.zoneName = initPoilceStations();
   }

   setIsMultipleCities = (isMulti: boolean) => {
      this.isMultipleCities = isMulti;
   }

   updateCities = async (values: string[], updateCityResult: boolean) => {
      this.cities.setFilter(values);
      if (this.cities.arrValues.length === 0) {
         this.streets.arrValues = [];
      } else {
         if (this.cities.arrValues.length === 1) {
            const cityId = this.cities.arrValues[0];
            const srvCity = new CityService();
            const streets = await srvCity.getStreetsByCity(cityId);
            this.SetCityStreets(streets);
         }
      }
   }

   setZonesName = async (value: string) => {
      this.zoneName.setFilter(value);
      this.geoFilter = await this.getGeoFilter();
   }

   setCityResult = (value: string) => {
      this.previousCity = this.cityResult;
      this.cityResult = value;
   }

   SetCityStreets = (streets: Street[]) => {
      this.cityStreets = streets;
   }

   updateStreets = (values: string[]) => {
      this.streets.setFilter(values);
   }

   setRoads = (names: string[]) => {
      this.roads.setFilter(names);
   }

   setCityPopSizeRange = (range: string) => {
      this.cityPopSizeRange.setFilter(range);
   }

   updateRoadSegment = (names: number[]) => {
      this.roadSegment.setFilter(names.map(String));
   }

   updateRoadType = (aType: number, val: boolean) => {
      this.roadTypes.setFilter(aType, val);
   }

   updateLocationAccuracy = (aType: number, val: boolean) => {
      this.locationAccuracy.setFilter(aType, val);
   }

   get isValidWhere() {
      return !this.roadTypes.isAllValsFalse && !this.locationAccuracy.isAllValsFalse;
   }

   private getGeoFilter = async () => {
      const policeStationName = this.zoneName.queryValue as string;
      if (!policeStationName || policeStationName.trim() === '') {
         return null;
      }
      const geoPolygon = await loadAreaPolygon(policeStationName);
      return { geo: geoPolygon };
   }
}

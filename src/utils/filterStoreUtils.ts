import { store as reduxStore } from '../stores/store';
import { getCitiesNames, createFilterQureyByCityPop, getfilterBounds, getfilterDatasource } from '.';
import { getQueryParamValues } from './queryStringUtils';

export function updateFilters(colFilter: any, aType: number, val: boolean) {
  colFilter.setFilter(aType, val);
}

export function getFilterFromArray(arr: string[], filterName: string) {
  let filter: string = '';
  if (arr.length > 0 && arr[0] !== '') {
    filter += ',{"$or": [';
    filter += arr.map((x: string) => `{"${filterName}" : "${x.trim()}"}`).join(',');
    filter += ']}';
  }
  return filter;
}

export function getfilterBySeverityAndCity(fs: any) {
  let filter = '?';
  filter += fs.startYear.getFilter();
  filter += fs.endYear.getFilter();
  filter += fs.injurySeverity.getFilter();
  filter += fs.cities.getFilter();
  return filter;
}

export function getFilterQueryString(fs: any, bounds: any, useBounds: boolean = false) {
  let query = '?';
  query += fs.startYear.getFilter();
  query += fs.endYear.getFilter();
  query += fs.injurySeverity.getFilter();
  query += getfilterDatasource(fs.dataSource);
  query += fs.cities.getFilter();
  if (useBounds && bounds != null) query += getfilterBounds(bounds);
  query += fs.dayNight.getFilter();
  query += fs.streets.getFilter();
  query += fs.roads.getFilter();
  query += fs.roadSegment.getFilter();
  query += fs.injTypes.getFilter();
  query += fs.whoStore.genderTypes.getFilter();
  query += fs.whoStore.ageTypes.getFilter();
  query += fs.whoStore.populationTypes.getFilter();
  query += fs.accidentType.getFilter();
  query += fs.vehicleType.getFilter();
  query += fs.involvedVehicle.getFilter();
  query += fs.locationAccuracy.getFilter();
  query += fs.roadTypes.getFilter();
  query += fs.speedLimit.getFilter();
  query += fs.roadWidth.getFilter();
  query += fs.separator.getFilter();
  query += fs.oneLane.getFilter();
  const range = JSON.parse(fs.cityPopSizeRange.queryValue.toString());
  query += createFilterQureyByCityPop(range.min, range.max);
  return query;
}

export function setFiltersText(fs: any, ignoreIfAll: boolean) {
  fs.startYear.setText();
  fs.endYear.setText();
  fs.injTypes.setText(ignoreIfAll);
  fs.dayNight.setText(ignoreIfAll);
  fs.whoStore.setText(ignoreIfAll);
  fs.locationAccuracy.setText(ignoreIfAll);
  fs.roadTypes.setText(ignoreIfAll);
  const cityNamesArr = getCitiesNames(fs.cities.arrValues);
  const cityNames = cityNamesArr.join(', ');
  fs.cities.setTitle(cityNames);
  fs.roads.setText();
  fs.cityPopSizeRange.setText();
  fs.accidentType.setText(ignoreIfAll);
  fs.vehicleType.setText(ignoreIfAll);
  fs.involvedVehicle.setText(ignoreIfAll);
}

export function setBrowserQueryString(fs: any) {
  const currentTab = reduxStore.getState().appUi.currentTab;
  const params = new URLSearchParams(window.location.search);
  params.set('tab', currentTab);
  fs.startYear.setBrowserQueryString(params, false);
  fs.endYear.setBrowserQueryString(params, false);
  fs.injurySeverity.setBrowserQueryString(params, false);
  fs.roadTypes.setBrowserQueryString(params);
  fs.injTypes.setBrowserQueryString(params);
  fs.whoStore.setBrowserQueryString(params);
  fs.cities.setBrowserQueryString(params);
  fs.streets.setBrowserQueryString(params);
  fs.roads.setBrowserQueryString(params);
  fs.locationAccuracy.setBrowserQueryString(params);
  fs.accidentType.setBrowserQueryString(params);
  fs.vehicleType.setBrowserQueryString(params);
  fs.involvedVehicle.setBrowserQueryString(params);
  fs.speedLimit.setBrowserQueryString(params);
  fs.roadWidth.setBrowserQueryString(params);
  fs.separator.setBrowserQueryString(params);
  fs.oneLane.setBrowserQueryString(params);
  window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  fs.groupByDict.setBrowserQueryString();
}

export function setStoreByQuery(fs: any, params: URLSearchParams, defCity?: string) {
  fs.startYear.setValuesByQuery(params);
  fs.endYear.setValuesByQuery(params);
  fs.injurySeverity.setValuesByQuery(params);
  fs.dayNight.setValuesByQuery(params);
  const cities = getQueryParamValues(params, 'city', defCity, fs.isMultipleCities);
  if (cities) fs.updateCities(cities, true);
  const streets = getQueryParamValues(params, 'st', undefined, true);
  if (streets) fs.updateStreets(streets);
  const roads = getQueryParamValues(params, 'rd', undefined, true);
  if (roads) fs.updateCities(cities, true);
  fs.setRoads(roads);
  fs.locationAccuracy.setValuesByQuery(params);
  fs.roadTypes.setValuesByQuery(params);
  fs.injTypes.setValuesByQuery(params);
  fs.whoStore.setValuesByQuery(params);
  fs.accidentType.setValuesByQuery(params);
  fs.vehicleType.setValuesByQuery(params);
  fs.involvedVehicle.setValuesByQuery(params);
  fs.speedLimit.setValuesByQuery(params);
  fs.roadWidth.setValuesByQuery(params);
  fs.separator.setValuesByQuery(params);
  fs.oneLane.setValuesByQuery(params);
  fs.groupByDict.setValuesByQuery(params);
  fs.group2Dict.setValuesByQuery(params);
  const groupBy = fs.groupByDict.groupBy as any;
  if (groupBy.value !== 'age') {
    fs.GroupBySort = 'd';
  } else {
    fs.GroupBySort = null;
  }
}

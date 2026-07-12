import { ColumnFilterCombo, ColumnFilterComboValText } from './ColumnFilterCombo';
import { CITY_POP_SIZE_ALL, CITY_POP_SIZE_OPTIONS, POLICE_STATIONS, YEARS } from './data';

export const initStartYear = (year: number) => {
  return new ColumnFilterCombo('FromYear', 'sy', -1, YEARS, year);
};

export const initEndYear = (year: number) => {
  return new ColumnFilterCombo('ToYear', 'ey', -1, YEARS, year);
};

export const initCityPopSize = () => {
  return new ColumnFilterComboValText('city_size', 'p1', 0, CITY_POP_SIZE_OPTIONS, CITY_POP_SIZE_ALL);
};

export const initPoilceStations = () => {
  return new ColumnFilterCombo('PoliceStation', 'ey', -1, POLICE_STATIONS, '');
};

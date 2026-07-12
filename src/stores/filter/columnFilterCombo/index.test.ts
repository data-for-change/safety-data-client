import { describe, expect, it } from 'vitest';
import {
  ColumnFilterCombo,
  ColumnFilterComboValText,
  initStartYear,
  initEndYear,
  initCityPopSize,
  initPoilceStations,
} from './index';

describe('columnFilterCombo barrel exports', () => {
  it('exposes the filter combo classes and factory helpers', () => {
    const startYear = initStartYear(2021);
    const endYear = initEndYear(2025);
    const citySize = initCityPopSize();
    const policeStations = initPoilceStations();

    expect(startYear).toBeInstanceOf(ColumnFilterCombo);
    expect(endYear).toBeInstanceOf(ColumnFilterCombo);
    expect(citySize).toBeInstanceOf(ColumnFilterComboValText);
    expect(policeStations).toBeInstanceOf(ColumnFilterCombo);
    expect(startYear.queryValue).toBe(2021);
    expect(endYear.queryValue).toBe(2025);
    expect(citySize.queryValue).toBe('{"min":-1,"max":-1}');
    expect(policeStations.arrTypes[0]).toBe('תחנת השכונות');
  });
});

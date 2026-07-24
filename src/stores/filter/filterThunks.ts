import { createAsyncThunk } from '@reduxjs/toolkit';
import AccidentService from '../../services/AccidentService';
import { syncInjuriesAndMobx } from '../casualty/casualtyThunks';
import { loadAreaPolygon } from "../../utils"
import { setIsLoading } from './filterSlice';
import { store as mobxStore } from '../storeConfig';

export const fetchFilterData = createAsyncThunk(
  'filter/fetchFilterData',
  async (_, { dispatch }) => {
    dispatch(setIsLoading(true));

    const filter = mobxStore.filterStore.getFilterQueryString(null); // still using MobX
    const geoFilter = mobxStore.filterStore.locationStore.geoFilter;
    //const geoFilter = undefined;
    try {
      const res = await AccidentService.fetchInvolvedList(filter, geoFilter);
      if (res?.data) {
        dispatch(syncInjuriesAndMobx(res.data)); // dispatch the thunk instead of action
      }
    } catch (error) {
      console.error('Failed to fetch filter data:', error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
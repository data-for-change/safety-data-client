// casualtyThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateAllInjuries } from './casualtySlice';
import { store as mobxStore } from '../storeConfig';
import { Casualty } from '../../types/Casualty';

export const syncInjuriesAndMobx = createAsyncThunk(
  'casualty/syncInjuriesAndMobx',
  async (data: Casualty[], { dispatch }) => {
    dispatch(updateAllInjuries(data));

    // MobX sync (temporary)
    mobxStore.filterStore.setMarkersLoadStep(2);
    mobxStore.mapStore.setBounds(data, mobxStore.filterStore.cities.arrValues);
  }
);

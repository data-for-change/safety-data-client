import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../types';
import { store as mobxStore } from '../storeConfig';

interface FilterState {
  isLoading: boolean;
  filtersText: boolean;
}

const initialState: FilterState = {
  isLoading: false,
  filtersText: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      // Sync with MobX store (temporary)
      mobxStore.filterStore.setIsLoading(action.payload);
    },
    setFiltersText: (state, action: PayloadAction<boolean>) => {
      state.filtersText = action.payload;
      // Sync with MobX store (temporary)
      mobxStore.filterStore.setFiltersText(action.payload);    },
  },
});

export const { setIsLoading, setFiltersText } = filterSlice.actions;
export const selectIsLoading = (state: RootState): boolean => state.filter.isLoading;
export default filterSlice.reducer;
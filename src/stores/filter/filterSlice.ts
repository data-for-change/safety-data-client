import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { store as mobxStore } from '../storeConfig';
import AccidentService from '../../services/AccidentService';
import { store as reduxStore } from '../store';
import { updateAllInjuries } from '../casualty/casualtySlice';

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
      mobxStore.filterStore.setFiltersText(action.payload);
    },
    fetchFilterData: (state) => {
      state.isLoading = true;
      const filter = mobxStore.filterStore.getFilterQueryString(null); // Using MobX method
      // Call API (you can migrate this logic later)
      AccidentService.fetchGetList(filter, 'main').then((res: any) => {
        if (res?.data) {
          //mobxStore.filterStore.updateAllInjuries(res.data);
          reduxStore.dispatch(updateAllInjuries(res.data));         
        }
        //state.isLoading = false;
        mobxStore.filterStore.setIsLoading(false);
      });
    },
  },
});

export const { setIsLoading, setFiltersText, fetchFilterData } = filterSlice.actions;
export const selectIsLoading = (state: RootState): boolean => state.filter.isLoading;
export default filterSlice.reducer;

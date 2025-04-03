/* import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import AccidentService from "../../services/AccidentService";
//import { insertToDexie } from "../../services/localDb";
import FilterStore from "../filter/FilterStore"; // Import MobX store

interface InvolvedState {
  isLoading: boolean;
  filtersText: boolean;
  injuriesData: any[]; // Adjust type accordingly
}

const initialState: InvolvedState = {
  isLoading: false,
  filtersText: false,
  injuriesData: [],
};

// Async thunk to fetch filtered accident data
export const fetchInvolvedData = createAsyncThunk(
  "involved/fetchInvolvedData",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const filterStore = state.mobxFilter as FilterStore; // Access MobX store

    const filter = filterStore.getFilterQueryString(null);
    filterStore.setBrowserQueryString();
    filterStore.rootStore.mapStore.updateIsSetBounds(
      filterStore.cities.arrValues,
      filterStore.roadSegment.arrValues
    );

    const res = await AccidentService.fetchGetList(filter, "main");
    if (res?.data) {
      //if (filterStore.useLocalDb === 1) insertToDexie(res.data);
      return res.data;
    }
    return [];
  }
);

const involvedSlice = createSlice({
  name: "involved",
  initialState,
  reducers: {
    setFiltersText(state, action: PayloadAction<boolean>) {
      state.filtersText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvolvedData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInvolvedData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.injuriesData = action.payload;
      })
      .addCase(fetchInvolvedData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setFiltersText } = involvedSlice.actions;
export default involvedSlice.reducer;
 */
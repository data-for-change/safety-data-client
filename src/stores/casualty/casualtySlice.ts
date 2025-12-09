import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "../types";
import type { Casualty } from '../../types/Casualty'; 

interface CasualtyState {
  dataAllInjuries: Casualty[];
}

const initialState: CasualtyState = {
  dataAllInjuries: [],
};

const casualtySlice = createSlice({
  name: 'casualty',
  initialState,
  reducers: {
    updateAllInjuries: (state, action: PayloadAction<Casualty[]>) => {
      state.dataAllInjuries = action.payload;
    },
  },
});

export const { updateAllInjuries } = casualtySlice.actions;
export const selectDataAllInjuries = (state: RootState) => state.casualty.dataAllInjuries;
export default casualtySlice.reducer;

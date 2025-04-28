import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Casualty, Accident} from '../../types'; 
import { store as mobxStore } from '../storeConfig';

interface CasualtyState {
  dataAllInjuries: Casualty[] |Accident[];
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

      // Temporary sync with MobX (until migration is complete)
      mobxStore.filterStore.setMarkersLoadStep(2);
      mobxStore.mapStore.setBounds(action.payload, mobxStore.filterStore.cities.arrValues);

      //if (mobxStore.mapStore.bboxType === 'LOCAL_BBOX') {
        //mobxStore.mapStore.getMarkersInLocalBBox(0.1);
      //}
    },
  },
});

export const { updateAllInjuries } = casualtySlice.actions;
export const selectDataAllInjuries = (state: RootState) => state.casualty.dataAllInjuries;
export default casualtySlice.reducer;

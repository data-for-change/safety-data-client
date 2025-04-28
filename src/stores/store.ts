import { configureStore, createAsyncThunk} from '@reduxjs/toolkit';
import filterReducer from './filter/filterSlice';
import casualtyReducer from './casualty/casualtySlice';
import appUiSliceReducer, { fetchLatestCbsUpdate } from './ui/appUiSlice';
import { initLang } from './ui/appUiSlice';

export const initializeStore = createAsyncThunk(
  'sore/initializeStore', 
  async (_, { dispatch }) => {
    // Dispatch initialization actions for different slices on app start
    // Load language 
    await dispatch(initLang());
    // Get CBS data date 
    await dispatch(fetchLatestCbsUpdate());    
  }
);

export const store = configureStore({
  reducer: {
    appUi: appUiSliceReducer,
    filter: filterReducer,
    casualty: casualtyReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
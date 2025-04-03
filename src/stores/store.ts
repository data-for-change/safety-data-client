import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filter/filterSlice';
import casualtyReducer from './casualty/casualtySlice';
import appUiSliceReducer from './ui/appUiSlice';

export const store = configureStore({
  reducer: {
    appUi: appUiSliceReducer,
    filter: filterReducer,
    casualty: casualtyReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
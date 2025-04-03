import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filter/filterSlice';
import casualtyReducer from './casualty/casualtySlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    casualty: casualtyReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
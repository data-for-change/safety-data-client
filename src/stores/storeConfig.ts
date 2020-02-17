// https://mobx-react.js.org/recipes-context

import React from 'react'
import FilterStore from './FilterStore';

export const store = new FilterStore();
export const StoreContext = React.createContext(store);

export const useStore = (): FilterStore => {
  const store = React.useContext(StoreContext);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('You have forgot to use StoreProvider, shame on you.')
  }
  return store
};

/* // see: https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables
if(process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  window['store'] = store;
} */

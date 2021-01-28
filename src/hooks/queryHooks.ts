// import { useLocation } from 'react-router-dom';
import citisNamesHeb from '../assets/cities_names_heb.json';

// A custom hook that builds on useLocation to parse
// the query string for you.
export function useQuery(location: any) {
  // const location = useLocation();
  return new URLSearchParams(location.search);
}

// get tab name by url query parmas
export function useTabFromQuery(query: URLSearchParams, defVal: string) {
  let res = defVal;
  const name = query.get('tab');
  if (name !== null) {
    res = name;
  }
  return res;
}

// get injuerd type by query parmas
export function useInjTypeByQuery(query: URLSearchParams) {
  let res = null;
  const qText = query.get('inj');
  if (qText) {
    res = parseInt(qText);
  }
  return res;
}

// get city name by url query parmas
export function useCityNameFromQuery(query: URLSearchParams, defaultName: string) {
  let res = [defaultName];
  const name = query.get('name');
  let found = false;
  if (name !== null) found = citisNamesHeb.includes(name);
  if (found) {
    res = [citisNamesHeb.find((element) => element === name!)!];
  }
  return res;
}

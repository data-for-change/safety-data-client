import React from 'react'
import { useLocation} from 'react-router-dom'
import MapAccidents from './MapAccidents'
import { FilterPanel } from './FilterPanel'
import { AccidentsTable } from './AccidentsTable'
import Card from 'react-bootstrap/Card';
import citisNamesHeb from "../assets/cities_names_heb.json";
import { useStore } from '../stores/storeConfig'

interface IProps { }

export const CityPage: React.FC<IProps> = () => {
  const store = useStore();
  let cityName  = useCityNamefromQuery();
  let ipage = 1;
  store.updateCity(cityName);
  store.submitFilter();
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <h4>{cityName}</h4>
        </div>
        <div className="row ">
          <div className="p-3 col-md-3"><FilterPanel activeCardKey={ipage}/></div>
          <div className="col-md-9"><Card><MapAccidents name={cityName} /></Card></div>
        </div>
        <div className="row">
          <div className="col-auto"><AccidentsTable /></div>
        </div>
      </div>
    </div>
  )
}
//get city name by query by url
function useCityNamefromQuery(){
  let query = useQuery();
  let res = "תל אביב -יפו";  
  let name = query.get("name")
  let found = false;
  if (name !== null)
     found = citisNamesHeb.includes(name);
  if(found)
  {
    res = citisNamesHeb.find(element => element === name!)!;
  }
  return res;
}
// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}



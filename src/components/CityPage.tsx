import React from 'react'
import { useLocation} from 'react-router-dom'
import { observer } from "mobx-react"
import MapAccidents from './MapAccidents'
import { FilterPanel } from './FilterPanel'
import { AccidentsTable } from './AccidentsTable'
import {GroupByTable} from './GroupByTable'
import Card from 'react-bootstrap/Card';
import citisNamesHeb from "../assets/cities_names_heb.json";

import { useStore } from '../stores/storeConfig'

interface IProps { }

export const CityPage: React.FC<IProps> = observer(() => {
  const store = useStore();
  const {cityResult} = store;
  if(cityResult === ""){
    let cityName  = useCityNamefromQuery();
    store.updateCity(cityName);
    store.submitFilter();
  }
  console.log("cityResult:", cityResult)
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <h4>{cityResult}</h4>
        </div>
        <div className="row ">
          <div className="p-3 col-md-3"><FilterPanel activeCardKey={1}/></div>
          <div className="col-md-6"><Card><MapAccidents name={cityResult} /></Card></div>
          <div className="col-md-3"><GroupByTable /></div>
        </div>
        <div className="row">
          <div className="col-auto"><AccidentsTable /></div>
        </div>
      </div>
    </div>
  )
})

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



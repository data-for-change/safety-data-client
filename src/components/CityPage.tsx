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
  //init city query by url
  let query = useQuery();
  const store = useStore();
  let cityName = "תל אביב -יפו";  
  let name = query.get("name")
  let found = false;
  if (name !== null)
     found = citisNamesHeb.includes(name);
  if(found)
  {
    cityName = citisNamesHeb.find(element => element === name!)!;
  }
  store.updateCity(cityName);
  store.submitFilter();
  console.log (cityName)

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row ">
          <div className="p-3 col-md-3"><FilterPanel /></div>
          <div className="col-md-9"><Card><MapAccidents name={query.get("name")!} /></Card></div>
        </div>
        <div className="row">
          <div className="col-auto"><AccidentsTable /></div>
        </div>
      </div>
    </div>
  )
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface IProps2 {
  name:string
}
const Child: React.FC<IProps2>= ({ name }) => {
  return (
    <div>
      {name ? (
        <h3>
          The <code>name</code> in the query string is &quot;{name}
          &quot;
        </h3>
      ) : (
        <h3>There is no name in the query string</h3>
      )}
    </div>
  );
}

import React from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { FilterPanel } from '../organisms/FilterPanel'
import { GroupByGraphsPanel } from '../organisms/GroupByGraphsPanel'
import { GroupByTablesPanel } from '../organisms/GroupByTablesPanel'
import MapAccidents from '../organisms/MapAccidents'
import { AccidentsTable } from '../organisms/AccidentsTable'
import { useStore } from '../../stores/storeConfig'
import citisNamesHeb from "../../assets/cities_names_heb.json";


interface IProps { }

export const TabsTemplate: React.FC<IProps> = observer(() => {
  const style = {
    marginTop: "20px"
  }
  const { t } = useTranslation();
  const store = useStore();
  store.isMultipleCities = false;
  const { cityResult } = store;
  if (cityResult === "") {
    let cityName = useCityNamefromQuery();
    store.updateCities(cityName);
    store.submitFilter();
  }
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row ">
          <div className="p-2 col-md-2"><FilterPanel /></div>
          <div className="col-md-10">
              <h4>{cityResult}</h4>
              <Tabs defaultActiveKey="map" id="uncontrolled-tab1">
                <Tab style={style} eventKey="home" title={t("Charts")}>
                   <GroupByGraphsPanel/>
                </Tab>
                <Tab style={style} eventKey="grouptables" title={t("Groups")}>
                    <GroupByTablesPanel/>
                </Tab>
                <Tab style={style} eventKey="map" title={t("Map")}>
                  <MapAccidents name="" />
                </Tab>
                <Tab style={style} eventKey="table" title={t("Table")}>
                  <div className="col-auto"><AccidentsTable /></div>
                </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
})

//get city name by query by url
function useCityNamefromQuery() {
  let query = useQuery();
  let res = ["תל אביב -יפו"];
  let name = query.get("name")
  let found = false;
  if (name !== null)
    found = citisNamesHeb.includes(name);
  if (found) {
    res = [citisNamesHeb.find(element => element === name!)!];
  }
  return res;
}
// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}



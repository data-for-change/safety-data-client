import React from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import MapAccidents from '../organisms/MapAccidents'
import { FilterPanel } from '../organisms/FilterPanel'
import { AccidentsTable } from '../organisms/AccidentsTable'
import { GroupByGraphsPanel } from '../organisms/GroupByGraphsPanel'
import { GroupByTablesPanel } from '../organisms/GroupByTablesPanel'
import { useStore } from '../../stores/storeConfig'

interface IProps { }

export const HomeTemplate: React.FC<IProps> = observer(() => {
  const style = {
    marginTop: "20px"
  }
  const { t } = useTranslation();
  const store = useStore();
  store.isMultipleCities = true;
  store.updateCities([]);
  store.submitFilter();
  return (
    <div className="App">
    <div className="container-fluid">
      <div className="row ">
        <div className="p-2 col-md-2"><FilterPanel /></div>
        <div className="col-md-10">
            <h4>{t("Israel")}</h4>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab1">
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

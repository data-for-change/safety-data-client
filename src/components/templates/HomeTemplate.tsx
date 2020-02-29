import React from 'react'
import Card from 'react-bootstrap/Card';
import MapAccidents from '../organisms/MapAccidents'
import { FilterPanel } from '../organisms/FilterPanel'
import { AccidentsTable } from '../organisms/AccidentsTable'
import { AggregatesPanel } from '../organisms/AggregatesPanel'

interface IProps { }

export const HomeTemplate: React.FC<IProps> = () => {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row ">
          <div className="p-2 col-md-2"><FilterPanel /></div>
          <div className="col-md-10">
            <AggregatesPanel />
            <Card><MapAccidents name="" /></Card>
            <div className="row">
              <div className="col-auto"><AccidentsTable /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

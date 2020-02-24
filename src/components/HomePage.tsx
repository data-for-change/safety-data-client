import React from 'react'
import MapAccidents from './MapAccidents'
import { FilterPanel } from './FilterPanel'
import { AccidentsTable } from './AccidentsTable'
import Card from 'react-bootstrap/Card';

interface IProps { }

export const HomePage: React.FC<IProps> = () => {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row ">
          <div className="p-3 col-md-2"><FilterPanel /></div>
          <div className="col-md-10"><Card><MapAccidents /></Card></div>
        </div>
        <div className="row">
          <div className="col-auto"><AccidentsTable /></div>
        </div>
      </div>
    </div>
  )
}

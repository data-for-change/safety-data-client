import React from 'react'
import MapAccidents from './MapAccidents'
import Header from './Headr';
import Footer from './Footer';
import { FilterPanel } from './FilterPanel'
import {AccidentsTable} from './AccidentsTable'
interface IProps {}

export const HomePage: React.FC<IProps> = () => {
    return (
        <div className="App">
        <Header title="Accidents Map" />
        <MapAccidents />
        <FilterPanel/>
        <AccidentsTable/>
        <Footer />
      </div>
    )
}

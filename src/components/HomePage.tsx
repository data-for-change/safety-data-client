import React from 'react'
import { observer } from "mobx-react"
import { useStore } from '../stores/storeConfig'
import MapAccidents from './MapAccidents'
import { FilterPanel } from './FilterPanel'
import {LanguageSelector} from './LanguageSelector'
import { AccidentsTable } from './AccidentsTable'
import Card from 'react-bootstrap/Card';


interface IProps { }

export const HomePage: React.FC<IProps> = observer(() => {
  const store = useStore();
  const style:any = document.getElementById('style-direction')
  if (style !== null)
  {
      if(store.language === 'he') {
        style.href = './bootstrap.rtl.min.css';
        document.body.classList.remove('dir-ltr');
        document.body.classList.add('dir-rtl');
    } else {
        style.href = './bootstrap.min.css';
        document.body.classList.remove('dir-rtl');
        document.body.classList.add('dir-ltr');
    }
  }
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row ">
          <div className="p-3 col-md-2"><FilterPanel /><LanguageSelector/></div>
          <div className="col-md-10"><Card><MapAccidents /></Card></div>
        </div>
        <div className="row">
          <div className="col-auto"><AccidentsTable /></div>
        </div>
      </div>
    </div>
  )
})

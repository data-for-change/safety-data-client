import React from 'react'
import { useTranslation } from 'react-i18next';
import Card from 'react-bootstrap/Card';
import MapAccidents from './MapAccidents'
import { FilterPanel } from './FilterPanel'
import { GroupByTable } from './GroupByTable'
import { AccidentsTable } from './AccidentsTable'


interface IProps { }

export const HomePage: React.FC<IProps> = () => {
  const { t } = useTranslation();
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row ">
          <div className="p-2 col-md-2"><FilterPanel /></div>
          <div className="col-md-10">
            <div className="row">
              <Card style={{ width: '18rem' }}>
                <GroupByTable type={0} title={t('AllCasualtiesInRegion')} />
              </Card>
              <Card style={{ width: '18rem' }}>
                <GroupByTable type={1} title={t('CasualtiesByFilter')} />
              </Card>
            </div>
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

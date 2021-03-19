import React from 'react'
import { Col, Row } from 'react-bootstrap'
import SmallCard2 from '../atoms/SmallCard2'
import { useTranslation } from 'react-i18next';
import MyFilterItem from '../atoms/MyFilterItem';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/storeConfig'


const MyFiltersList: React.FC<any> = observer(({ }) => {
   const { t } = useTranslation()
   const { filterStore: { filtersArrayLocalStorage } } = useStore()
   console.log(filtersArrayLocalStorage)
   return (
      <div className="my-3 p-3 bg-body rounded shadow-sm">
         <h6 className="border-bottom pb-2 mb-0">{t('My-Filters')}</h6>
         <MyFilterItem url={"http://localhost:3000/home?tab=charts"} description={'Main'} />
         <small className="d-block text-end mt-3"></small>
      </div>
   )
})


export default MyFiltersList
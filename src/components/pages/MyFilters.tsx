import React from 'react'
import { Col, Row } from 'react-bootstrap'
import SmallCard2 from '../atoms/SmallCard2'
import { useTranslation } from 'react-i18next';
import MyFilterItem from '../atoms/MyFilterItem';

const MyFilters: React.FC<any> = () => {
   const { t } = useTranslation()
   return (
      <div className="container" style={{ marginTop: '5rem' }}>
         <Row>
            <Col md={12}>
               <div className="my-3 p-3 bg-body rounded shadow-sm">
                  <h6 className="border-bottom pb-2 mb-0">{t('My-Filters')}</h6>
                  <MyFilterItem url={"http://localhost:3000/home?tab=charts"} description={'Main'} />
                  <small className="d-block text-end mt-3">
                  </small>
               </div>
            </Col>
         </Row>
      </div>
   )
}

export default MyFilters
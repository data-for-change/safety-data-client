import React from 'react'
import { Col, Row } from 'react-bootstrap'
import MyFiltersList from '../molecules/MyFiltersList'


const MyFilters: React.FC<any> = () => {

   return (
      <div className="container" style={{ marginTop: '5rem' }}>
         <Row>
            <Col md={12}>
               <MyFiltersList />
            </Col>
         </Row>
      </div>
   )
}

export default MyFilters
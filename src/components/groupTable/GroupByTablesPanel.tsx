import React, {FC} from 'react';
import CardGroupTablesYears from './CardGroupTablesYears';
import CardGroupTablesYears2 from './CardGroupTablesYears2';
import CardGroupTable from './CardGroupTable';
import CardGroupTables2 from './CardGroupTables2';
import { Col, Row } from 'react-bootstrap';

interface IProps { }
export const GroupByTablesPanel: FC<IProps> = () => {
  return (
    <React.Fragment>
      <Row>
        <Col md={4} >
          <CardGroupTablesYears />
        </Col>
        <Col md={4}>
          <CardGroupTablesYears2 />
        </Col>
        <Col md={4}>
          <CardGroupTable />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <CardGroupTables2 />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default GroupByTablesPanel;

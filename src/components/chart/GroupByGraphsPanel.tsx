import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/storeConfig';
import CardChartByGroup1 from './CardChartByGroup1';
import CardChartGrpBy2 from './CardChartGrpBy2';
import CardChartYears from './CardChartYears';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface IProps { }
// const getSize = (width: number) => {
//    let size: number = 500;
//    if (width <= 350) size = 300;
//    else if (width <= 770) size = width * 0.8;
//    else if (width <= 1200) size = (width - 300) * 0.9;
//    else size = 1000;
//    return size;
// };

const styles = {
   divCharts: {
     width:0,
     minWidth: '100%',
   },
 };

export const GroupByGraphsPanel: React.FC<IProps> = observer(() => {
   const { filterStore } = useStore();
   const { injuriesCount } = filterStore;
   if (injuriesCount > 0 || true) {
      return (
         <div style={styles.divCharts}>           
            <Row>
               <Col md={4}>                  
                  <CardChartYears />
               </Col>
               <Col md={8} >
                  <CardChartByGroup1 />
               </Col>
            </Row>
            <Row>
               <Col md={12}>
                  <CardChartGrpBy2 />
               </Col>
            </Row>
         </div>
      );
   }
   return null;
});

export default GroupByGraphsPanel;
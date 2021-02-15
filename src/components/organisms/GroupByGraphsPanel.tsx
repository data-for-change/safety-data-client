import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Button from 'react-bootstrap/Button';
import { useStore } from '../../stores/storeConfig';
import SelectGroupBy from '../atoms/SelectGroupBy';
import SelectGroupBy2 from '../atoms/SelectGroupBy2';
// import { RangeSlider } from '../atoms/RangeSlider'
// import MyBarChart from '../molecules/MyBarChart';
// import MyPieChart from '../molecules/MyPieChart';
// import MyTreeMap from '../molecules/MyTreeMap';
import ChartBar from '../molecules/ChartBar';
import ChartGroupBy2 from '../molecules/ChartGroupBy2';
import ConfigModal from './ConfigModal';
import ConfigChart from '../molecules/ConfigChart';
import gearlogo from '../../assets/gear2.png';
import SmallCard2 from '../atoms/SmallCard2';
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

export const GroupByGraphsPanel: React.FC<IProps> = observer(() => {
   const { filterStore } = useStore();
   const { dataByYears } = filterStore;
   const reactData1 = toJS(dataByYears);

   if (reactData1.length > 0) {
      return (
         <React.Fragment>
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
         </React.Fragment>
      );
   }
   return null;
});

const CardChartYears: React.FC<IProps> = observer(() => {
   const { t } = useTranslation();
   const { filterStore } = useStore();
   const { dataFilterdByYears, casualtiesNames } = filterStore;
   const reactData2 = toJS(dataFilterdByYears);

   return (
      <SmallCard2 styleType={2} header={`${t(casualtiesNames)} ${t('by-years')}`}>
         <div style={{ height: '60vh', width: '100%' }}>
            <ChartBar data={reactData2} fill="#FE9772" />
         </div>
      </SmallCard2>
   );
});

const CardChartByGroup1: React.FC<IProps> = observer(() => {
   const styles = {
      divStyle: {
         display: 'flex',
         justifyContent: 'space-between',
      },
      iconStyle: {
         height: '21px',
         width: '21px',
         paddingTop: '0px',
         paddingBottom: '1px',
      },
   };
   // const { t } = useTranslation();
   const [showModel, setShowModal] = useState(false);
   const { filterStore, uiStore } = useStore();
   const { dataFilterd } = filterStore;
   const reactData3 = toJS(dataFilterd);
   const { chartType } = uiStore;
   const chart = <ChartBar data={reactData3} fill="#8884d8" chartType={chartType} height={150} />;
   return (
      <SmallCard2>
         <div style={styles.divStyle}>
            <SelectGroupBy id="Graphs.Main" />
            <Button onClick={() => { setShowModal(!showModel); }}>
               <img src={gearlogo} alt="settings" style={styles.iconStyle} />
            </Button>
         </div>
         <ConfigModal title="Chart Options" showModal={showModel} setShow={setShowModal}>
            <ConfigChart />
         </ConfigModal>
         <div >
            <hr />
            <div style={{ width: '100%', height: '60vh' }} >
               {chart}
            </div>
         </div>
      </SmallCard2>
   );
});

const CardChartGrpBy2: React.FC<IProps> = observer(() => {
   const styleLable = {
      fontWeight: 700,
      marginTop: '5px',
      marginLeft: '20px',
      marginRight: '20px',
   };
   const divConstolsRow = {
      display: 'flex',
      flexWrap: 'wrap',
   } as React.CSSProperties;
   const { t } = useTranslation();
   const { filterStore, uiStore } = useStore();
   const { groupBy2 } = filterStore;
   const { chartType } = uiStore;
   const metaDAta = groupBy2.getBars();
   const reactDataGrp2 = toJS(filterStore.dataGroupby2);
   const show = true;
   return (
      <div>
         {show
            && (
               <SmallCard2>
                  <div style={divConstolsRow}>
                     <span style={styleLable}>
                        {' '}
                        {t('GroupBy')}
                        {' '}
                  :
                </span>
                     <SelectGroupBy id="Graphs.Grp2" labelText="" />
                     {' '}
                &nbsp;
                <SelectGroupBy2 id="Graphs" />
                     {/* <RangeSlider id="Graphs" label="resize" value={80} onChange={onSizeSliderChange}/> */}
                  </div>
                  <hr />
                  <div style={{ height: '60vh', width: '100%' }}>
                     <ChartGroupBy2 data={reactDataGrp2} metaData={metaDAta} chartType={chartType} />
                  </div>
               </SmallCard2>
            )}
      </div>
   );
});

// const CardChartGrpBy2Old: React.FC<IProps> = observer(() => {
//   const styleLable = {
//     fontWeight: 700,
//     marginTop: '5px',
//     marginLeft: '20px',
//     marginRight: '20px',
//   };
//   const divConstolsRow = {
//     display: 'flex',
//     flexWrap: 'wrap',
//   } as React.CSSProperties;
//   const { t } = useTranslation();
//   const [graphSize, setGraphSize] = useState(getSize(window.innerWidth));
//   React.useEffect(() => {
//     function handleResize() {
//       const size = getSize(window.innerWidth);
//       setGraphSize(size);
//     }
//     window.addEventListener('resize', handleResize);
//     return (() => { window.removeEventListener('resize', handleResize); });
//   });
//   const { filterStore } = useStore();
//   const { groupBy2, groupBy } = filterStore;
//   const barsGrp2 = groupBy2.getBars();
//   const reactDataGrp2 = toJS(filterStore.dataGroupby2);
//   const show = (groupBy.text !== 'CityByPop') && graphSize > 500;
//   return (
//     <div>
//       {show
//             && (
//             <SmallCard2>
//               <div style={divConstolsRow}>
//                 <span style={styleLable}>
//                   {' '}
//                   {t('GroupBy')}
//                   {' '}
//                   :
//                 </span>
//                 <SelectGroupBy id="Graphs.Grp2" labelText="" />
//                 {' '}
//                 &nbsp;
//                 <SelectGroupBy2 id="Graphs" />
//                 {/* <RangeSlider id="Graphs" label="resize" value={80} onChange={onSizeSliderChange}/> */}
//               </div>
//               <hr />
//               <MyBarChart
//                 data={reactDataGrp2}
//                 barsData={barsGrp2}
//                 width={graphSize}
//                 height={graphSize * 0.62}
//                 legendType="top"
//               />
//             </SmallCard2>
//             )}
//     </div>
//   );
// });

export default GroupByGraphsPanel;

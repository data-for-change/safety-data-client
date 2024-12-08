import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Button from 'react-bootstrap/Button';
import { useStore } from '../../stores/storeConfig';
import GroupBy2 from '../../stores/filter/GroupBy2';
import SelectGroupBy from '../atoms/SelectGroupBy';
import SelectGroupBy2 from '../atoms/SelectGroupBy2';
import SmallCard2 from '../atoms/SmallCard2';
import ChartBar from '../molecules/chart/ChartBar';
import ConfigChart from '../molecules/chart/ConfigChart';
import ConfigModal from './ConfigModal';
import { useMemos } from '../../hooks/myUseMemo';
import SvgIconSettings from '../../assets/SvgIconSettings';
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
   console.log('injuriesCount', injuriesCount);
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

const foramtDataPrecision = (data: any[]) => {
   const data2 = data.map((x) => {
      if (typeof x.count === 'number' && !Number.isInteger(x.count)) {
         return { _id: x._id, count: x.count.toFixed(1) };
      }
      return { _id: x._id, count: x.count };
   });
   return data2;
};

const CardChartYears: React.FC<IProps> = observer(() => {
   const { t } = useTranslation();
   const { filterStore, uiStore } = useStore();
   const { dataFilterdByYears, casualtiesNames } = filterStore;
   const { direction } = uiStore;
   const reactData2 = toJS(dataFilterdByYears);
   const styles = {
      divChart: {
         width: '100%',
         height: '60vh',
      },
   };
   return (
      <SmallCard2 styleType={2} header={`${t(casualtiesNames)} ${t('by-years')}`}>
         <div style={styles.divChart}>
            <ChartBar data={reactData2} fill="#FE9772" dir={direction} />
         </div>
      </SmallCard2>
   );
});

const CardChartByGroup1: React.FC<IProps> = observer(() => {
   const styles = {
      divConfig: {
         display: 'flex',
         justifyContent: 'space-between',
      },
      divChart: {
         width: '100%',
         height: '60vh',
      },
   };
   // const { t } = useTranslation();
   const [showModel, setShowModal] = useState(false);
   const { filterStore, uiStore } = useStore();
   const { dataFilterd } = filterStore;
   const reactData = toJS(dataFilterd);
   const dataFormated = foramtDataPrecision(reactData);
   const { chartType, direction } = uiStore;
   const chart = <ChartBar
      data={dataFormated}
      fill="#8884d8"
      chartType={chartType}
      height={150}
      dir={direction}
   />;
   const memoSettingsIcon = useMemos([],
      <SvgIconSettings color={'var(--onprimary-color)'} />
   );
   // const memoSettingsIcon = <SvgIconSettings color={'var(--onprimary-color)'} />;   
   return (
      <SmallCard2>
         <div style={styles.divConfig}>
            <SelectGroupBy id="Graphs.Main" />
            <Button onClick={() => { setShowModal(!showModel); }}>
               {memoSettingsIcon}
            </Button>
         </div>
         <ConfigModal title="Chart Options" showModal={showModel} setShow={setShowModal}>
            <ConfigChart />
         </ConfigModal>
         <div >
            <hr />
            <div style={styles.divChart} >
               {chart}
            </div>
         </div>
      </SmallCard2>
   );
});

const CardChartGrpBy2: React.FC<IProps> = observer(() => {
   const styles = {
      styleLable: {
         fontWeight: 700,
         marginTop: '5px',
         marginLeft: '20px',
         marginRight: '20px',
      },
      divChart: {
         width: '100%',
         height: '60vh',
      },
   }
   const divConstolsRow = {
      display: 'flex',
      flexWrap: 'wrap',
   } as React.CSSProperties;
   const { t } = useTranslation();
   const { filterStore, uiStore } = useStore();
   const { group2Dict } = filterStore;
   const { groupBy } = group2Dict;
   const { chartType, direction } = uiStore;
   const metaDAta = (groupBy as GroupBy2).getBars();
   const reactDataGrp2 = toJS(filterStore.dataGroupby2);
   const show = true;
   return (
      <div>
         {show
            && (
               <SmallCard2>
                  <div style={divConstolsRow}>
                     {/* <span style={styles.styleLable}>
                        {' '}
                        {t('GroupBy')}
                        {' '}
                  :
                </span> */}
                     <SelectGroupBy id="Graphs.Grp2" labelText="" />
                     {' '}
                &nbsp;
                <SelectGroupBy2 id="Graphs" />
                     {/* <RangeSlider id="Graphs" label="resize" value={80} onChange={onSizeSliderChange}/> */}
                  </div>
                  <hr />
                  <div style={styles.divChart}>
                     <ChartBar data={reactDataGrp2} metaData={metaDAta} chartType={chartType} dir={direction} />
                  </div>
               </SmallCard2>
            )}
      </div>
   );
});

export default GroupByGraphsPanel;

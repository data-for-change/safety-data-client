import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Button from 'react-bootstrap/Button';
import { useStore } from '../../stores/storeConfig';
import SelectGroupBy from '../atoms/SelectGroupBy';
import SelectGroupBy2 from '../atoms/SelectGroupBy2';
// import { RangeSlider } from '../atoms/RangeSlider'
import MyBarChart from '../molecules/MyBarChart';
// import MyPieChart from '../molecules/MyPieChart';
// import MyTreeMap from '../molecules/MyTreeMap';
import ChartBar from '../molecules/ChartBar';
import ChartGroupBy2 from '../molecules/ChartGroupBy2';
import ConfigFilterModal from './ConfigFilterModal';
import ConfigChart from '../molecules/ConfigChart';
import gearlogo from '../../assets/gear2.png';
import SmallCard2 from '../atoms/SmallCard2';

interface IProps { }
const getSize = (width: number) => {
  let size: number = 500;
  if (width <= 350) size = 300;
  else if (width <= 770) size = width * 0.8;
  else if (width <= 1200) size = (width - 300) * 0.9;
  else size = 1000;
  return size;
};

export const GroupByGraphsPanel: React.FC<IProps> = observer(() => {
  const styles = {
    divStyle: {
      marginLeft: '0',
      marginRight: '0',
      marginTop: '20px',
    },
  };
  const { filterStore } = useStore();
  const { dataByYears } = filterStore;
  const reactData1 = toJS(dataByYears);
  if (reactData1.length > 0) {
    return (
      <>
        <div className="grid-charts">
          <div className="grid-charts-item1">
            <CardChartYears />
          </div>
          <div className="grid-charts-item2">
            <CardChartByGroup1 />
          </div>
          <div className="grid-charts-item3" />
        </div>
        <div>
          <CardChartGrpBy2 />
        </div>
      </>
    );
  }
  return null;
});

// const CardChartYears: React.FC<IProps> = observer(() => {
//    const { t } = useTranslation();
//    const [graphSize, setGraphSize] = useState(getSize(window.innerWidth));
//    React.useEffect(() => {
//       function handleResize() {
//          const size = getSize(window.innerWidth);
//          setGraphSize(size);
//       }
//       window.addEventListener('resize', handleResize);
//       return (() => { window.removeEventListener('resize', handleResize); });
//    });
//    const graph1Size = Math.min(380, graphSize);
//    const { filterStore } = useStore();
//    const { dataFilterdByYears, casualtiesNames } = filterStore;
//    const reactData2 = toJS(dataFilterdByYears);
//    return (
//       <SmallCard2 header={`${t(casualtiesNames)} ${t('by-years')}`}>
//          <MyBarChart
//             data={reactData2}
//             width={graph1Size}
//             fill="#FE9772"
//          />
//       </SmallCard2>
//    );
// });

const CardChartYears: React.FC<IProps> = observer(() => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { dataFilterdByYears, casualtiesNames } = filterStore;
  const reactData2 = toJS(dataFilterdByYears);
  return (
    <SmallCard2 styleType={2} title={`${t(casualtiesNames)} ${t('by-years')}`}>
      <ChartBar data={reactData2} fill="#FE9772" />
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
  const chart = <ChartBar data={reactData3} fill="#8884d8" chartType={chartType} />;
  return (
    <SmallCard2>
      <div style={styles.divStyle}>
        <SelectGroupBy id="Graphs.Main" />
        <Button onClick={() => { setShowModal(!showModel); }}>
          <img src={gearlogo} alt="settings" style={styles.iconStyle} />
        </Button>
      </div>
      <ConfigFilterModal title="Chart Options" showModal={showModel} setShow={setShowModal}>
        <ConfigChart />
      </ConfigFilterModal>
      {chart}
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
              <ChartGroupBy2 data={reactDataGrp2} metaData={metaDAta} chartType={chartType} />
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

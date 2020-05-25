import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Button from 'react-bootstrap/Button';
import { useStore } from '../../stores/storeConfig';
import SmallCard from '../atoms/SmallCard';
import SelectGroupBy from '../atoms/SelectGroupBy';
import SelectGroupBy2 from '../atoms/SelectGroupBy2';
// import { RangeSlider } from '../atoms/RangeSlider'
import MyBarChart from '../molecules/MyBarChart';
import MyPieChart from '../molecules/MyPieChart';
import ConfigFilterModal from './ConfigFilterModal';
import ConfigChart from '../molecules/ConfigChart';

interface IProps { }
const getSize = (width: number) => {
  let size: number = 500;
  if (width <= 350) size = 300;
  else if (width <= 760) size = width * 0.85;
  else if (width <= 1500) size = width * 0.75;
  else size = 1200;
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
      <div className="row" style={styles.divStyle}>
        <CardChartYears />
        <CardChartByGroup1 />
        <CardChartGrpBy2 />
      </div>
    );
  }
  return null;
});

const CardChartYears: React.FC<IProps> = observer(() => {
  const { t } = useTranslation();
  const [graphSize, setGraphSize] = useState(getSize(window.innerWidth));
  React.useEffect(() => {
    function handleResize() {
      const size = getSize(window.innerWidth);
      setGraphSize(size);
    }
    window.addEventListener('resize', handleResize);
    return (() => { window.removeEventListener('resize', handleResize); });
  });
  const graph1Size = Math.min(380, graphSize);
  const { filterStore } = useStore();
  const { dataFilterdByYears, casualtiesNames } = filterStore;
  const reactData2 = toJS(dataFilterdByYears);
  return (
    <SmallCard styleType={2} title={`${t(casualtiesNames)} ${t('by-years')}`}>
      <MyBarChart data={reactData2} width={graph1Size} fill="#FE9772" />
    </SmallCard>
  );
});

const CardChartByGroup1: React.FC<IProps> = observer(() => {
  const styles = {
    divStyle: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  };
  const { t } = useTranslation();
  const [showModel, setShowModal] = useState(false);
  const [graphSize, setGraphSize] = useState(getSize(window.innerWidth));
  const graph2Size = Math.min(600, graphSize);
  React.useEffect(() => {
    function handleResize() {
      const size = getSize(window.innerWidth);
      setGraphSize(size);
    }
    window.addEventListener('resize', handleResize);
    return (() => { window.removeEventListener('resize', handleResize); });
  });
  const { filterStore, uiStore } = useStore();
  const { dataFilterd } = filterStore;
  const reactData3 = toJS(dataFilterd);
  const { usePieChart } = uiStore;
  const Chart = (usePieChart)
    ? <MyPieChart data={reactData3} width={graph2Size * 0.65} />
    : <MyBarChart data={reactData3} width={graph2Size} height={graph2Size * 0.65} />;
  return (
    <SmallCard styleType={3}>
      <div style={styles.divStyle}>
        <SelectGroupBy id="Graphs.Main" />
        <Button onClick={() => { setShowModal(!showModel); }}>
          {t('Chart Options')}
        </Button>
      </div>
      <ConfigFilterModal title="Chart Options" showModal={showModel} setShow={setShowModal}>
        <ConfigChart />
      </ConfigFilterModal>
      {Chart}
    </SmallCard>
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
  const [graphSize, setGraphSize] = useState(getSize(window.innerWidth));
  React.useEffect(() => {
    function handleResize() {
      const size = getSize(window.innerWidth);
      setGraphSize(size);
    }
    window.addEventListener('resize', handleResize);
    return (() => { window.removeEventListener('resize', handleResize); });
  });
  const { filterStore } = useStore();
  const { groupBy2 } = filterStore;
  const barsGrp2 = groupBy2.getBars();
  const reactDataGrp2 = toJS(filterStore.dataGroupby2);
  return (
    <SmallCard width={graphSize + 150}>
      <div style={divConstolsRow}>
        <span style={styleLable}>
          {' '}
          {t('GroupBy')}
          :
        </span>
        <SelectGroupBy id="Graphs.Grp2" labelText="" />
        <SelectGroupBy2 id="Graphs" />
        {/* <RangeSlider id="Graphs" label="resize" value={80} onChange={onSizeSliderChange}/> */}
      </div>
      <MyBarChart data={reactDataGrp2} barsData={barsGrp2} width={graphSize} height={graphSize * 0.62} legendType="top" />
    </SmallCard>
  );
});
export default GroupByGraphsPanel;

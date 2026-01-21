import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useSelector } from 'react-redux';
import { useStore } from '../../stores/storeConfig';
import { RootState } from '../../stores/store';
import { useMemos } from '../../hooks/myUseMemo';
import { SmallCard } from '../common';
import ChartBar from './ChartBar';
import ConfigChart from './ConfigChart';
import ConfigModal from '../organisms/ConfigModal';
import SvgIconSettings from '../../assets/SvgIconSettings';
import ChartDataFilterSlider from '../organisms/ChartDataFilterSlider';
import SelectGroupBy from '../groupby/SelectGroupBy';
import SelectSortBy from '../groupby/SelectSortBy';
import LimitInput from '../groupby/limitInput/LimitInput';
import { EchartId } from '../types';
import './card-charts.css';

const CardChartByGroup1: React.FC<{}> = observer(() => {
    const styles = {
       divConfig: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
       },
       divChart: {
          width: '100%',
          height: '57vh',
       },
    };
    // const { t } = useTranslation();
    const [showModel, setShowModal] = useState(false);
    const { filterStore } = useStore();
    const { dataFilterd, getChartData } = filterStore;
    const chartId = EchartId.Group_1;
    const dataFormated = getChartData(chartId);
    const { chartType, direction } = useSelector((state: RootState) => state.appUi);

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
      <>
       <SmallCard style={{marginBottom: '0.5rem'}}>
          <div className="chart-config">
            <SelectGroupBy id="Graphs.Main.SelectGroupby" />
            <div style={{ width: '200px', margin: '0 auto' }}>
               <ChartDataFilterSlider id={chartId} data={dataFilterd} />
            </div>
            <LimitInput id="Graphs.Main.LimitInput"/>
            <SelectSortBy id="Graphs.Main.SelectSort"/>
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
       </SmallCard>

       </>
    );
 });

 export default CardChartByGroup1;
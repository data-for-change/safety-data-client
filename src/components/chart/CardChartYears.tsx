import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useSelector } from 'react-redux';
import { toJS } from 'mobx';
import { useStore } from '../../stores/storeConfig';
import { SmallCard } from '../common';
import ChartBar from './ChartBar';
import { RootState } from '../../stores/store';
import ChartDataFilterSlider from '../organisms/ChartDataFilterSlider';
import { EchartId } from '../types';

const CardChartYears: React.FC<{}> = observer(() => {
    const { t } = useTranslation();
    const { filterStore } = useStore();
    const { dataFilterdByYears, casualtiesNames, getChartData } = filterStore;
    const chartId = EchartId.Years;
    const dataFormated = getChartData(chartId);
    const direction  = useSelector((state: RootState) => state.appUi.direction);
    const styles = {
       divChart: {
          width: '100%',
          height: '58.5vh',
       },
    };
    return (
        <SmallCard styleType={2} header={`${t(casualtiesNames)} ${t('by-years')}`}>
           <div style={{ padding: '0 10px', width: '80%', margin: '0 auto' }}>
              <ChartDataFilterSlider id={chartId} data={dataFilterdByYears} />
           </div>
           <div style={styles.divChart}>
              <ChartBar data={dataFormated} fill="#FE9772" dir={direction} />
           </div>
        </SmallCard>
    );
 });

 export default CardChartYears;
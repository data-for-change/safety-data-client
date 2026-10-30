import React, { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
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
    const { casualtiesNames, getChartData, getCompareChartData, compareYearsEnabled, setCompareYearsEnabled } = filterStore;
    const chartId = EchartId.Years;
    const dataFormated = getChartData(chartId);
    const compareData = getCompareChartData(chartId);
    const direction  = useSelector((state: RootState) => state.appUi.direction);
    const styles = {
       divChart: {
          width: '100%',
          height: '56vh',
       },
    };
    return (
        <SmallCard styleType={2} header={`${t(casualtiesNames)} ${t('by-years')}`}>
           <div style={styles.divChart}>
              <ChartBar data={dataFormated} compareData={compareData} fill="#FE9772" dir={direction} />
           </div>
           <Form.Check
              type="checkbox"
              id="Graphs.Years.CompareEnabled"
              className="text-danger"
              label={t('compare_to_last_update_month')}
              checked={compareYearsEnabled}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCompareYearsEnabled(e.target.checked)}
           />
        </SmallCard>
    );
 });

 export default CardChartYears;
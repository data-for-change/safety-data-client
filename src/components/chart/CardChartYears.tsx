import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useSelector } from 'react-redux';
import { toJS } from 'mobx';
import { useStore } from '../../stores/storeConfig';
import { SmallCard } from '../common';
import ChartBar from './ChartBar';
import { RootState } from '../../stores/store';

const CardChartYears: React.FC<{}> = observer(() => {
    const { t } = useTranslation();
    const { filterStore } = useStore();
    const { dataFilterdByYears, casualtiesNames } = filterStore;
    const direction  = useSelector((state: RootState) => state.appUi.direction);
    const reactData2 = toJS(dataFilterdByYears);
    const styles = {
       divChart: {
          width: '100%',
          height: '58.5vh',
       },
    };
    return (
       <SmallCard styleType={2} header={`${t(casualtiesNames)} ${t('by-years')}`}>
          <div style={styles.divChart}>
             <ChartBar data={reactData2} fill="#FE9772" dir={direction} />
          </div>
       </SmallCard>
    );
 });

 export default CardChartYears;
 
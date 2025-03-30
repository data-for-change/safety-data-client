import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/storeConfig';
import GroupByTable from './GroupByTable';
import SmallCard2 from '../atoms/SmallCard2';

//total casualties grouped by years,  filterd by severty and region 
const CardGroupTablesYears: FC<{}> = observer(() => {
    const { t } = useTranslation();
    const { filterStore } = useStore();
    const { dataByYears, casualtiesNames } = filterStore;
    if (dataByYears.length > 0) {
      return (
        <SmallCard2 header={`${t('total')} ${t(casualtiesNames)} ${t('in-region')} ${t('by-years')}`}>
          <GroupByTable data={dataByYears} />
        </SmallCard2>
      );
    }
    return null;
  });
  
  export default CardGroupTablesYears;
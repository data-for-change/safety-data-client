import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { useStore } from '../../stores/storeConfig';
import GroupByTable from './GroupByTable';
import SmallCard2 from '../atoms/SmallCard2';

const CardGroupTablesYears: FC<{}> = observer(() => {
    const { t } = useTranslation();
    const { filterStore } = useStore();
    const { dataByYears, casualtiesNames } = filterStore;
    const reactData1 = toJS(dataByYears);
    if (reactData1.length > 0) {
      return (
        <SmallCard2 header={`${t(casualtiesNames)} ${t('in-region')}, ${t('by-years')}`}>
          <GroupByTable data={reactData1} />
        </SmallCard2>
      );
    }
    return null;
  });
  
  export default CardGroupTablesYears;
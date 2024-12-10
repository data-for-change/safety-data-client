import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { useStore } from '../../stores/storeConfig';
import GroupByTable from './GroupByTable';
import SmallCard2 from '../atoms/SmallCard2';

const CardGroupTablesYears2: FC<{}> = observer(() => {
    const { t } = useTranslation();
    const { filterStore } = useStore();
    const { dataFilterdByYears, casualtiesNames } = filterStore;
    const reactData2 = toJS(dataFilterdByYears);
    if (reactData2.length > 0) {
      return (
        <SmallCard2 header={`${t(casualtiesNames)} ${t('by-years')}`}>
          <GroupByTable data={reactData2} />
        </SmallCard2>
      );
    }
    return null;
  });
  
  export default CardGroupTablesYears2;
  
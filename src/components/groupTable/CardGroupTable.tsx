import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { useStore } from '../../stores/storeConfig';
import GroupByTable from './GroupByTable';
import { SmallCard } from '../common';
import SelectGroupBy from '../groupby/SelectGroupBy';

const CardGroupTable: FC<{}> = observer(() => {
    const divStyle = {
      display: 'flex',
      flexDirection: 'row',
    } as React.CSSProperties;
    const { filterStore } = useStore();
    const { dataFilterd, groupByDict } = filterStore;
    const reactData = toJS(dataFilterd);
    
    if (reactData.length > 0) {
      return (
        <SmallCard style={{marginBottom: '0.5rem'}}>
          <div style={divStyle}>
            <SelectGroupBy id="Tables.Main" />
          </div>
          <hr />
          <GroupByTable data={reactData} dataName={groupByDict.groupBy.text} />
        </SmallCard>
      );
    }
    return null;
  });
  
  export default CardGroupTable;
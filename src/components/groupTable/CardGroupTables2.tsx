import React, {FC} from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { useStore } from '../../stores/storeConfig';
import GroupBy2 from '../../stores/filter/GroupBy2';
import GroupByTable from './GroupByTable';
import SmallCard2 from '../atoms/SmallCard2';
import SelectGroupBy from '../atoms/SelectGroupBy';
import SelectGroupBy2 from '../atoms/SelectGroupBy2';

const CardGroupTables2: FC<{}> = observer(() => {
    const divStyle = {
      display: 'flex',
      // flexWrap: 'wrap',
    } as React.CSSProperties;
    const styleLable = {
      fontWeight: 700,
      lineHeight: '40px',
      marginLeft: '15px',
      // marginTop: '5px',
      // marginRight: '20px',
    };
    const { t } = useTranslation();
    const { filterStore } = useStore();
    const { groupByDict, group2Dict, dataGroupby2 } = filterStore;
    const columnsGrp2 = (group2Dict.groupBy as GroupBy2).getColumns().map((x: any) => ({ dataField: x, text: t(x) }));
    const reactDataGrp2 = toJS(dataGroupby2);
    const show = (groupByDict.groupBy.text !== 'CityByPop');
    if (reactDataGrp2.length > 0) {
      return (
        <>
          { show
            && (
              <SmallCard2>
                <div style={divStyle}>
                  {/* <span style={styleLable}>
                    {' '}
                    {t('GroupBy')}
                    :
                  </span> */}
                  <SelectGroupBy
                    id="Tables.Grp2"
                    labelText=""
                  />
                  &nbsp;
                  <SelectGroupBy2 id="Tables" />
                </div>
                <hr />
                <GroupByTable
                  data={reactDataGrp2}
                  dataName={groupByDict.groupBy.text}
                  columns={columnsGrp2}
                />
              </SmallCard2>
            )}
        </>
      );
    }
    return null;
  });
  export default CardGroupTables2;
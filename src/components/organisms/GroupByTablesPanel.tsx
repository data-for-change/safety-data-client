import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { useStore } from '../../stores/storeConfig';
import GroupByTable from '../molecules/GroupByTable';
import SmallCard2 from '../atoms/SmallCard2';
import SelectGroupBy from '../atoms/SelectGroupBy';
import SelectGroupBy2 from '../atoms/SelectGroupBy2';

interface IProps { }
export const GroupByTablesPanel: FunctionComponent<IProps> = () => (
  // <div className="row" style={style}>
  <>
    <div className="tabels-grid">
      <div className="grid-table-item1">
        <GroupTablesYears />
      </div>
      <div className="grid-table-item2">
        <GroupTablesYears2 />
      </div>
      <div className="grid-table-item3">
        <GroupTablesFilter />
      </div>
      {/* <div className="grid-table-item4"> */}
      {/* </div> */}
    </div>
    <GroupTables2Grp />
  </>
);
const GroupTablesYears: FunctionComponent<IProps> = observer(() => {
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
const GroupTablesYears2: FunctionComponent<IProps> = observer(() => {
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
const GroupTablesFilter: FunctionComponent<IProps> = observer(() => {
  const divStyle = {
    // display: 'flex',
    // flexWrap: 'wrap',
  } as React.CSSProperties;
  const { filterStore } = useStore();
  const { dataFilterd, groupBy } = filterStore;
  const reactData = toJS(dataFilterd);

  if (reactData.length > 0) {
    return (
      <SmallCard2>
        <div style={divStyle}>
          <SelectGroupBy id="Tables.Main" />
        </div>
        <hr />
        <GroupByTable data={reactData} dataName={groupBy.text} />
      </SmallCard2>
    );
  }
  return null;
});

const GroupTables2Grp: FunctionComponent<IProps> = observer(() => {
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
  const { groupBy, groupBy2, dataGroupby2 } = filterStore;
  const columnsGrp2 = groupBy2.getColumns().map((x: any) => ({ dataField: x, text: t(x) }));
  const reactDataGrp2 = toJS(dataGroupby2);
  const show = (groupBy.text !== 'CityByPop');
  if (reactDataGrp2.length > 0) {
    return (
      <>
        { show
          && (
            <SmallCard2>
              <div style={divStyle}>
                <span style={styleLable}>
                  {' '}
                  {t('GroupBy')}
                  :
                </span>
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
                dataName={groupBy.text}
                columns={columnsGrp2}
              />
            </SmallCard2>
          )}
      </>
    );
  }
  return null;
});
export default GroupByTablesPanel;

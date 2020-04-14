import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import { toJS } from 'mobx'
import { useStore } from '../../stores/storeConfig'
import { GroupByTable } from '../molecules/GroupByTable'
import { SmallCard } from '../atoms/SmallCard'
import { SelectGroupBy } from '../atoms/SelectGroupBy'
import { SelectGroupBy2 } from '../atoms/SelectGroupBy2'

interface IProps { }
export const GroupByTablesPanel: FunctionComponent<IProps> = () => {
    const style = {
        marginLeft: "0",
        marginRight: "0",
        marginTop: "20px"
    };
    return (
        <div className="row" style={style}>
            <GroupTablesYears />
            <GroupTablesYears2 />
            <GroupTablesFilter />
            <GroupTables2Grp/>
        </div>
    )
};


const GroupTablesYears: FunctionComponent<IProps> = observer(() => {
    const { t } = useTranslation();
    const { filterStore } = useStore();
    const { dataByYears } = filterStore;
    let reactData1 = toJS(dataByYears);
    if (reactData1.length > 0) {
        return (
            <SmallCard title={t('AllCasualtiesInRegion')}>
                <GroupByTable data={reactData1} />
            </SmallCard>
        )
    }
    else return null;
});
const GroupTablesYears2: FunctionComponent<IProps> = observer(() => {
    const { t } = useTranslation();
    const { filterStore } = useStore();
    const { dataFilterdByYears } = filterStore;
    let reactData2 = toJS(dataFilterdByYears);
    if (reactData2.length > 0) {
        return (
            <SmallCard title={t('CasualtiesByFilter')}>
                <GroupByTable data={reactData2} />
            </SmallCard>
        )
    }
    else return null;
});
const GroupTablesFilter: FunctionComponent<IProps> = observer(() => {
    const { filterStore } = useStore();
    const { dataFilterd , groupBy} = filterStore;
    const reactData = toJS(dataFilterd)
    if (reactData.length > 0) {
        return (
            <SmallCard styleType={1}>
                <SelectGroupBy id="Tables.Main" />
                <GroupByTable data={reactData} dataName={groupBy.text} />
            </SmallCard>
        )
    }
    else return null;
});

const GroupTables2Grp: FunctionComponent<IProps> = observer(() => {
    const divStyle = {
        display: "flex",
        flexWrap: "wrap"
    } as React.CSSProperties;
    const styleLable = {
        fontWeight: 700,
        marginTop: "5px",
        marginLeft: "20px",
        marginRight: "20px"
    };
    const { t } = useTranslation();
    const { filterStore } = useStore();
    const { groupBy, groupBy2, dataGroupby2} = filterStore;
    const columnsGrp2 = groupBy2.getColumns().map((x) => { return ({ dataField: x, text: t(x) }) })
    const reactDataGrp2 = toJS(dataGroupby2)
    if (reactDataGrp2.length > 0) {
        return (
            <SmallCard styleType={4}>
                <div style={divStyle}>
                    <span style={styleLable}> {t('GroupBy')}:</span>
                    <SelectGroupBy id="Tables.Grp2" labelText='' />
                    <SelectGroupBy2 id="Tables" /></div>
                <GroupByTable data={reactDataGrp2} dataName={groupBy.text} columns={columnsGrp2} />
            </SmallCard>
        )
    }
    else return null;
});
export default GroupByTablesPanel
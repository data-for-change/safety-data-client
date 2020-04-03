import React ,{ FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import { toJS } from 'mobx'
import { useStore } from '../../stores/storeConfig'
import { GroupByTable } from '../molecules/GroupByTable'
import { SmallCard } from '../atoms/SmallCard'
import { SelectGroupBy } from '../atoms/SelectGroupBy'
import { SelectGroupBy2 } from '../atoms/SelectGroupBy2'

interface IProps { }

export const GroupByTablesPanel: FunctionComponent<IProps> = observer(() => {
    const { t } = useTranslation();
    const store = useStore();
    const style = {
        marginLeft: "0",
        marginRight: "0",
        marginTop: "20px"
    };
    const divConstolsRow ={
        display: "flex",
        flexWrap: "wrap" 
    }  as React.CSSProperties;
    const styleLable = {
        fontWeight: 700,
        marginTop: "5px",
        marginLeft: "20px",
        marginRight: "20px"
    }; 
    let reactData1 = toJS(store.dataByYears)
    let reactData2 = toJS(store.dataFilterdByYears)
    let reactData3 = toJS(store.dataFilterd)
    let columnsGrp2 = store.groupBy2.getColumns().map((x) => { return ({ dataField: x, text: t(x) }) })
    let reactDataGrp2 = toJS(store.dataGroupby2)
    if (reactData1.length > 0) {
        return (
            <div className="row" style={style}>
                <SmallCard title={t('AllCasualtiesInRegion')}>
                    <GroupByTable data={reactData1} />
                </SmallCard>
                <SmallCard title={t('CasualtiesByFilter')}>
                    <GroupByTable data={reactData2} />
                </SmallCard>
                <SmallCard styleType={1}>
                    <SelectGroupBy id="Tables.Main"/>
                    <GroupByTable data={reactData3} dataName={store.groupBy.text} />
                </SmallCard>
                <SmallCard styleType={4}>
                    <div style ={divConstolsRow}>
                        <span style={styleLable}> {t('GroupBy')}:</span>
                        <SelectGroupBy  id="Tables.Grp2"  labelText=''/>
                        <SelectGroupBy2 id="Tables"/></div>
                    <GroupByTable data={reactDataGrp2} dataName={store.groupBy.text} columns={columnsGrp2} />
                </SmallCard>
            </div>
        )
    }
    else return null;
})

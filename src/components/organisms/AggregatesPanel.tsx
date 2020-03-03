import React from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import { toJS } from 'mobx'
import { useStore } from '../../stores/storeConfig'
import { GroupByTable } from '../molecules/GroupByTable'
import { SmallCard } from '../atoms/SmallCard'
import {SelectGroupBy} from '../atoms/SelectGroupBy'
import MyBarChart from '../molecules/MyBarChart'

interface IProps { }

export const AggregatesPanel: React.FC<IProps> = observer(() => {
    const { t } = useTranslation();
    const store = useStore();
    const style = {
        marginLeft: "0",
        marginRight: "0",
    };
    let reactData1 = toJS(store.dataByYears)
    let reactData2 = toJS(store.dataFilterdByYears)
    let reactData3 = toJS(store.dataFilterd)
    if (reactData1.length > 0) {
        return (
            <div className="row" style={style}>
                <SmallCard title={t('AllCasualtiesInRegion')}>
                    <GroupByTable>{reactData1}</GroupByTable>
                </SmallCard>
                <SmallCard title={t('CasualtiesByFilter')}>
                    <GroupByTable>{reactData2}</GroupByTable>
                </SmallCard>
                <SmallCard styleType={1}>
                    <SelectGroupBy/>
                    <GroupByTable dataName={store.groupByText}>{reactData3}</GroupByTable>
                </SmallCard>
                <SmallCard>
                <MyBarChart data={reactData1}></MyBarChart>
                <MyBarChart data={reactData3}></MyBarChart>
                </SmallCard>
            </div>
        )
    }
    else return null;
})

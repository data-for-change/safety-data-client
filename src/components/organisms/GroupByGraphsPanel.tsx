import React from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import { toJS } from 'mobx'
import { useStore } from '../../stores/storeConfig'
import { GroupByTable } from '../molecules/GroupByTable'
import { SmallCard } from '../atoms/SmallCard'
import { SelectGroupBy } from '../atoms/SelectGroupBy'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import MyBarChart from '../molecules/MyBarChart'

interface IProps { }

export const GroupByGraphsPanel: React.FC<IProps> = observer(() => {
    const { t } = useTranslation();
    const store = useStore();
    const style = {
        marginLeft: "0",
        marginRight: "0",
        marginTop: "20px"
    };
    let reactData1 = toJS(store.dataByYears)
    let reactData2 = toJS(store.dataFilterdByYears)
    let reactData3 = toJS(store.dataFilterd)
    if (reactData1.length > 0) {
        return (
            <div className="row" style={style}>
                <SmallCard styleType={2} title={t('AllCasualtiesInRegion')}>
                    <MyBarChart data={reactData1} />
                </SmallCard>
                <SmallCard styleType={3}>
                    <SelectGroupBy />
                    <MyBarChart data={reactData3} width={600} height={300}></MyBarChart>
                </SmallCard>
            </div>
        )
    }
    else return null;
})

import React from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import { toJS } from 'mobx'
import { useStore } from '../../stores/storeConfig'
import { SmallCard } from '../atoms/SmallCard'
import { SelectGroupBy } from '../atoms/SelectGroupBy'
import { SelectGroupBy2 } from '../atoms/SelectGroupBy2'
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
    let barsGrp2 = store.groupBy2.getBars();
    let reactDataGrp2 = toJS(store.dataGroupby2)
    if (reactData1.length > 0) {
        return (
            <div className="row" style={style}>
                <SmallCard styleType={2} title={t('CasualtiesByFilter')}>
                    <MyBarChart data={reactData2} />
                </SmallCard>
                <SmallCard styleType={3}>
                    <SelectGroupBy id="Graphs.Main"/>
                    <MyBarChart data={reactData3} width={600} height={300}></MyBarChart>
                </SmallCard>
                <SmallCard styleType={3}>
                    <div className="row"> 
                        <SelectGroupBy id="Graphs.Grp2"/>
                        <SelectGroupBy2 id="Graphs"/>
                        
                    </div>
                    <MyBarChart data={reactDataGrp2} bars={barsGrp2} width={600} height={400}></MyBarChart>
                </SmallCard>
            </div>
        )
    }
    else return null;
})

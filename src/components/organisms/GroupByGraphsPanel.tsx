import React from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import { toJS } from 'mobx'
import { useStore } from '../../stores/storeConfig'
import { SmallCard } from '../atoms/SmallCard'
import { SelectGroupBy } from '../atoms/SelectGroupBy'
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
    let barsGrp2 = '<Bar dataKey="male" name="male" fill="#8884d8" />'
    let reactDataGrp2 = toJS(store.dataGroupby2)
    //let reactDataGrp2 = '["{_id:הולך רגל,זכר:335,נקבה:198}", "{_id:נהג - אופנוע,נקבה:2,זכר:261}", "{_id:נהג - אופניים,זכר:68,נקבה:5}", "{_id:נהג - רכב בעל 4 גלגלים ויותר,נקבה:78,זכר:409}", "{_id:נהג - רכב לא ידוע,נקבה:2,זכר:77}", "{_id:נוסע - אופנוע (לא נהג),זכר:12,נקבה:4}",  "{_id:נוסע - רכב בעל 4 גלגלים ויותר,נקבה:163,זכר:183}", "{_id:נוסע - רכב לא ידוע,זכר:15,נקבה:6}"]'
   console.log(reactData3)
   //console.log(reactDataGrp2)
    if (reactData1.length > 0) {
        return (
            <div className="row" style={style}>
                <SmallCard styleType={2} title={t('CasualtiesByFilter')}>
                    <MyBarChart data={reactData2} />
                </SmallCard>
                <SmallCard styleType={3}>
                    <SelectGroupBy />
                    <MyBarChart data={reactData3} width={600} height={300}></MyBarChart>
                </SmallCard>
                <SmallCard styleType={3}>
                    <SelectGroupBy />
                    <MyBarChart data={reactDataGrp2} bars={barsGrp2} width={600} height={300}></MyBarChart>
                </SmallCard> 
            </div>
        )
    }
    else return null;
})

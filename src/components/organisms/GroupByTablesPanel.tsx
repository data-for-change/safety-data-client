import React from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import { toJS } from 'mobx'
import { useStore } from '../../stores/storeConfig'
import { GroupByTable } from '../molecules/GroupByTable'
import { SmallCard } from '../atoms/SmallCard'
import { SelectGroupBy } from '../atoms/SelectGroupBy'

interface IProps { }

export const GroupByTablesPanel: React.FC<IProps> = observer(() => {
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
    let columnsGrp2 = [{
        dataField: '_id',
        text: t('_id'),
    }, {
        dataField: 'male',
        text: t('male'),
    }, {
        dataField: 'female',
        text: t('female'),
    }];
    let reactDataGrp2 = toJS(store.dataGroupby2)
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
                    <SelectGroupBy />
                    <GroupByTable dataName={store.groupBy.text}>{reactData3}</GroupByTable>
                </SmallCard>
                <SmallCard styleType={1}>
                    <SelectGroupBy />
                    <GroupByTable dataName={store.groupBy.text} columns={columnsGrp2}>{reactDataGrp2}</GroupByTable>
                </SmallCard> 
            </div>
        )
    }
    else return null;
})

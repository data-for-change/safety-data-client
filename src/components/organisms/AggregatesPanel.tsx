import React from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import { toJS } from 'mobx'
import { useStore } from '../../stores/storeConfig'
import { GroupByTable } from '../molecules/GroupByTable'
import { SmallCard } from '../molecules/SmallCard'

interface IProps { }

export const AggregatesPanel: React.FC<IProps> = observer(() => {
    const { t } = useTranslation();
    const store = useStore();
    const style = {
        marginLeft: "0",
        marginRight: "0",
      };
    let reactData = toJS(store.dataByYears)
    if (reactData.length >0 ){
    return (
        <div className="row" style={style}>
            <SmallCard title={t('AllCasualtiesInRegion')}>
                <GroupByTable type={0} />
            </SmallCard>
            <SmallCard title={t('CasualtiesByFilter')}>
                <GroupByTable type={1} />
            </SmallCard>
        </div>
    )}
    else return null;
})

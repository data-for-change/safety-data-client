import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import { toJS } from 'mobx'
import Form from 'react-bootstrap/Form';
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
                <SmallCard>
                    <GroupByTable>{reactData3}</GroupByTable>
                </SmallCard>
                <Form>
                    <Form.Group controlId="GrupForm.ControlSelectGroupBy">
                        <Form.Label className="filterLable"> {t('GroupBy')}:</Form.Label>
                        <Form.Control as="select" defaultValue={store.startYear} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateGroupby(e.target.value); }}>
                            <option>injured_type_hebrew</option>
                            <option>vehicle_vehicle_type_hebrew</option>
                            <option>sex_hebrew</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </div>
        )
    }
    else return null;
})

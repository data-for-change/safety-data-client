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
                <SmallCard styleType={1}>
                    <GroupByTable dataName={store.groupByText}>{reactData3}</GroupByTable>
                </SmallCard>
                <Form>
                    <Form.Group controlId="GrupForm.ControlSelectGroupBy">
                        <Form.Label className="filterLable"> {t('GroupBy')}:</Form.Label>
                        <Form.Control as="select" defaultValue={store.groupBy} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateGroupby(e.target.value); }}>
                            <option value="injured_type_hebrew">{t('Type')}</option>
                            <option value="vehicle_vehicle_type_hebrew">{t('Vehicle')}</option>
                            <option value="sex_hebrew">{t('Gender')}</option>
                            <option value="day_in_week_hebrew">{t('WeekDay')}</option>
                            <option value="road_type_hebrew">{t('RoadType')}</option>
                            <option value="accident_type_hebrew">{t('AccidentType')}</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </div>
        )
    }
    else return null;
})

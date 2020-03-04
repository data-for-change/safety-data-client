import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import Form from 'react-bootstrap/Form';
import { useStore } from '../../stores/storeConfig'


interface IProps { }

export const SelectGroupBy: React.FC<IProps> = observer(() => {
    const { t } = useTranslation();
    const store = useStore();
    return (
        <Form className="form-inline">
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
    )

})

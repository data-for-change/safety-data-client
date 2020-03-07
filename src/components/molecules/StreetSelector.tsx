
import React, {ChangeEvent} from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import Form from 'react-bootstrap/Form';

import { useStore } from '../../stores/storeConfig'


interface IProps {
    isMultiple?: boolean
}
export const StreetSelector: React.FC<IProps> = observer(({ isMultiple = false}) => {
    const store = useStore();
    const { t } = useTranslation();
    if (store.cities.length >0){
        return (
            <Form.Group controlId="exampleForm.ControlStreet">
                <Form.Label className="filterLable">{t('Street')}:</Form.Label>
                <Form.Control type="input" placeholder="" value={store.streets.toString()} onChange={(e:ChangeEvent<HTMLInputElement>) => {store.updateStreets(e.target.value);}}/>
            </Form.Group>
       
        )
    }
    else return null;
})
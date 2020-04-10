
import React from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import Form from 'react-bootstrap/Form';
// @ts-ignore
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useStore } from '../../stores/storeConfig'
import citisNamesHeb from "../../assets/cities_names_heb.json";

interface IProps {
    isMultiple?: boolean
}
export const CitySelector: React.FC<IProps> = observer(({ isMultiple = false }) => {
    const { filterStore } = useStore();
    const { t } = useTranslation();
    return (
        <Form.Group controlId="exampleForm.ControlCity">
            <Form.Label className="filterLable">{t('City')}:</Form.Label>
            <Typeahead
                id="typeaheadCity"
                //defaultSelected={[store.city]}
                onChange={(selected: string[]) => {
                    filterStore.updateCities(selected);
                }}
                options={citisNamesHeb}
                multiple={isMultiple}
                selected={filterStore.cities}
            />
        </Form.Group>
    )
})

import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
// @ts-ignore
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useStore } from '../../stores/storeConfig';
import citisNamesHeb from '../../assets/json/cities_names_heb.json';

interface IProps {
  isMultiple?: boolean
}

const CitySelector: React.FC<IProps> = observer(({ isMultiple = false }) => {
  const { filterStore } = useStore();
  const { cities, updateCities} = filterStore;
  const { t } = useTranslation();
  return (
    <Form.Group controlId="exampleForm.ControlCity">
      <Form.Label className="filterLable">
        {t('City')}:
      </Form.Label>
      <Typeahead
        id="typeaheadCity"
        onChange={(selected) => {         
          const selectedCities = selected.map(option => option as string);
          updateCities(selectedCities ?? [], true);
        }}
        options={citisNamesHeb}
        multiple={isMultiple}
        selected={cities.arrValues}
      />
    </Form.Group>
  );
});
export default CitySelector;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';
import { useStore } from '../../stores/storeConfig';
import { Street } from '../../types';

interface IProps { }
const StreetSelector: React.FC<IProps> = observer(() => {
  const { filterStore } = useStore();
  const { streets, cities, updateStreets, cityStreets } = filterStore;
  const { t } = useTranslation();
  const oCityStreets = toJS(cityStreets);
  const selectedStreets = oCityStreets?.filter((street: Street) =>
    streets.arrValues.includes(street.street.toString())
  ) || [];

  if (cities.arrValues.length > 0 && oCityStreets) {
    return (
      <Form.Group controlId="filterForm.ControlStreet">
        <Form.Label className="filterLable">
          {t('Street')}
        </Form.Label>
        <Typeahead
          id="street-selector"
          options={oCityStreets}
          onChange={(selected) => {
            const selectedStreets = (selected as Street[]).map(option => option.street.toString());
            updateStreets(selectedStreets ?? []);
          }}
          //onChange={setSelectedCities}
          labelKey="street_hebrew" // the key to display in the dropdown
          selected={selectedStreets}
          multiple={true}
        />
      </Form.Group>

    );
  }
  return null;
});
export default StreetSelector;

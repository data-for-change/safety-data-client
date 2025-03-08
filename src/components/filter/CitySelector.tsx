import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useStore } from '../../stores/storeConfig';
import { CityKeyVal } from '../../types'
import citisNamesHeb from '../../assets/json/cities_names_heb.json';

interface IProps {
  isMultiple?: boolean;
}

const CitySelector: React.FC<IProps> = observer(({ isMultiple = false }) => {
  const { filterStore } = useStore();
  const { cities, updateCities } = filterStore;
  const { t } = useTranslation();
  const selectedCities = citisNamesHeb.filter(city => cities.arrValues.includes(city.value.toString()));
  return (
    <div className="form-group">
      <div className="filterLable">
        {t('City')}:
      </div>
      <Typeahead
        id="city-selector"
        options={citisNamesHeb}
        onChange={(selected) => {
          const selectedCities = (selected as CityKeyVal[]).map(option => option.value.toString());
          updateCities(selectedCities ?? [], true);
        }}
        //onChange={setSelectedCities}
        labelKey="label" // the key to display in the dropdown
        selected={selectedCities}
        multiple={isMultiple}
      />
    </div>
  );
});

export default CitySelector;
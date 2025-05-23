
import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useStore } from '../../stores/storeConfig';
import roadNames from '../../assets/json/road_names.json';

interface IProps {
  isMultiple?: boolean
}

const RoadNameSelector: React.FC<IProps> = observer(({ isMultiple = true }) => {
  const { filterStore } = useStore();
  const {roads, setRoads} = filterStore;
  const {arrValues} = roads;
  const { t } = useTranslation();
  return (
    <div id="filterForm.ControlRoad">
      <div className="filterLable">
        {t('Road')}:
      </div>
      <Typeahead
        id="typeaheadCity"
        // defaultSelected={[store.city]}
        onChange={(selected) => {
          const selectedStr = selected.map(option => option as string);
          setRoads(selectedStr);
        }}
        inputProps={{
          type: 'number',
        }}
        options={roadNames}
        multiple={isMultiple}
        selected={arrValues}
      />
    </div>
  );
});
export default RoadNameSelector;

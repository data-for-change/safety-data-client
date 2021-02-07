
import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
// @ts-ignore
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useStore } from '../../stores/storeConfig';
import roadNames from '../../assets/road_names.json';

interface IProps {
  isMultiple?: boolean
}

const RoadNameSelector: React.FC<IProps> = observer(({ isMultiple = true }) => {
  const { filterStore } = useStore();
  const {roads, setRoads} = filterStore;
  const { t } = useTranslation();
  return (
    <Form.Group controlId="filterForm.ControlRoad">
      <Form.Label className="filterLable">
        {t('Road')}:
      </Form.Label>
      <Typeahead
        id="typeaheadCity"
        // defaultSelected={[store.city]}
        onChange={(selected: string[]) => {
          setRoads(selected);
        }}
        inputProps={{
          type: 'number',
        }}
        options={roadNames}
        multiple={isMultiple}
        selected={roads}
      />
    </Form.Group>
  );
});
export default RoadNameSelector;

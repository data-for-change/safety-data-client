import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
import { useStore } from '../../stores/storeConfig';

interface IProps {}
const StreetSelector: React.FC<IProps> = observer(() => {
  const { filterStore } = useStore();
  const { streets, cities } = filterStore;
  const { t } = useTranslation();
  if (cities.arrValues.length > 0) {
    return (
      <Form.Group controlId="exampleForm.ControlStreet">
        <Form.Label className="filterLable">
          {t('Street')}
:
        </Form.Label>
        <Form.Control 
          type="input" 
          placeholder="" 
          value={streets.arrValues.toString()} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => { filterStore.updateStreets(e.target.value); }} 
          />
      </Form.Group>

    );
  }
  return null;
});
export default StreetSelector;

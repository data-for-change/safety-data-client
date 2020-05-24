import React, { ChangeEvent } from 'react';
// import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
import Checkbox from '../atoms/Checkbox';
import { useStore } from '../../stores/storeConfig';

interface IProps { }
const ConfigFilter: React.FC<IProps> = observer(() => {
  // const { t } = useTranslation();
  const { filterStore } = useStore();
  const { showAllVehicleTypes, updateShowAllVehicleTypes } = filterStore;
  return (
    <Form.Group controlId="ConfigFile.ControlVehicles">
      <Checkbox
        key={1}
        label="ShowAllVehicleTypes"
        group="filterConfig"
        id={1}
        checked={showAllVehicleTypes}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          updateShowAllVehicleTypes(e.target.checked);
        }}
      />
    </Form.Group>

  );
});
export default ConfigFilter;

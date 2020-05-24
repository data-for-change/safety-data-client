import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import Checkbox from '../atoms/Checkbox';

interface IProps {}
const ConfigFilter: React.FC<IProps> = () => {
  const { t } = useTranslation();
  return (
    <Form.Group controlId="ConfigFile.ControlVehicles">
      <Checkbox
        key={1}
        label="ShowAllVehicleTypes"
        group="filterConfig"
        id={1}
        checked
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          console.log(e);
        }}
      />
    </Form.Group>

  );
};
export default ConfigFilter;

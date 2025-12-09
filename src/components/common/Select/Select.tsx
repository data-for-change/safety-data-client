import React from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { KeyVal } from '../../../types';

interface IProps {
  label?: string;
  id: string;
  data: KeyVal[];
  value: string;
  onChange: (val: string) => void;
}
const styleSelect = {
  width: '150px',
};

const Select: React.FC<IProps> = ({ label, id, data, value, onChange }) => {
  const { t } = useTranslation();
  const opttions = data.map((x: KeyVal, index) => <option value={x.val} key={index}>{t(x.text)}</option>)
  return (
    <div>
      <Form.Group as={Col} controlId={id}>
        {label && <Form.Label className="selectLabel">
          {t(label)}:
        </Form.Label>}
        <Form.Control
          as="select"
          className="form-select form-select-sm"
          style={styleSelect}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onChange(e.target.value); }}
        >
          {opttions}
        </Form.Control>
      </Form.Group>
    </div>
  );
};

export default Select;

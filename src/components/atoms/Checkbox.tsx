
import React, { ChangeEvent, memo } from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import '../molecules/GroupCheckBox';

interface IProps {
  label: string,
  group: string,
  id: number,
  checked: boolean,
  onChange: (e: ChangeEvent<HTMLInputElement>) => any
}
const Checkbox: React.FC<IProps> = ({
  group, label, id, checked, onChange,
}) => {
  const { t } = useTranslation();
  return (
    <Form.Check className="checkbox" inline label={t(label)} type="checkbox" id={`cbox${group}${id}`} checked={checked} onChange={onChange} />
  );
};
export default memo(Checkbox);

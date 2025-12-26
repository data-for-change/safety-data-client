import React, { ChangeEvent, memo } from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';

interface IProps {
  label: string;
  group: string;
  id: number;
  checked: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => any;
}

const Checkbox: React.FC<IProps> = ({
  group, label, id, checked, disabled, onChange,
}) => {
  const { t } = useTranslation();
  const checkboxId = `cbox${group}${id}`;

  return (
    <Form.Check
      className="checkbox"
      inline
      label={t(label)}
      type="checkbox"
      id={checkboxId}  // Ensure the id matches
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default memo(Checkbox);


import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';

interface IProps {
  condtion: boolean,
  textTrue: string,
  textFalse: string,
  disabled?: boolean,
  onClick: () => void
}
const ButtonToggle: React.FC<IProps> = ({
  condtion, textTrue, textFalse, disabled = false ,onClick,
} : IProps) => {
  const { t } = useTranslation();
  return (
    <Button
      className="btn-sm"
      variant="primary"
      disabled = {disabled}
      onClick={() => { onClick(); }}
    >
      {condtion ? t(textTrue) : t(textFalse)}
    </Button>
  );
};
export default ButtonToggle;

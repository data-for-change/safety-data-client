
import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';

interface IProps {
  condtion: boolean,
  textTrue: string,
  textFalse: string,
  disabled?: boolean,
  style?: React.CSSProperties,
  onClick: () => void
}
const ButtonToggle: React.FC<IProps> = ({
  condtion, textTrue, textFalse, disabled = false ,onClick,style
} : IProps) => {
  const { t } = useTranslation();
  return (
    <Button
      className="btn-sm"
      variant="primary"
      disabled = {disabled}
      onClick={() => { onClick(); }}
      style={{...style}}
    >
      {condtion ? t(textTrue) : t(textFalse)}
    </Button>
  );
};
export default ButtonToggle;

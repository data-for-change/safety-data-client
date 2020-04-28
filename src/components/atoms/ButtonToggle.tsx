
import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';

interface IProps {
    condtion: boolean,
    textTrue: string,
    textFalse: string,
    width?:number
    onClick: () => void
}
const ButtonToggle: React.FC<IProps> = ({
  condtion, textTrue, textFalse, width = 70, onClick,
}) => {
  const { t } = useTranslation();
  const style = { width: `${width}px` };
  return (
    <Button
      style={style}
      variant="primary"
      onClick={() => { onClick(); }}
    >
      {condtion ? t(textTrue) : t(textFalse)}
    </Button>
  );
};
export default ButtonToggle;

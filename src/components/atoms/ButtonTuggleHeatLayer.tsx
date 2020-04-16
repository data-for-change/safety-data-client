
import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';

interface IProps {
    isLoading: boolean,
    isHeatMapHidden: boolean,
    onClick: () => any
}
const ButtonTuggleHeatLayer: React.FC<IProps> = ({ isLoading, isHeatMapHidden, onClick }) => {
  const { t } = useTranslation();
  return (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={() => { onClick(); }}
    >
      {isHeatMapHidden ? t('HeatMap') : t('Markers')}
    </Button>
  );
};
export default ButtonTuggleHeatLayer;

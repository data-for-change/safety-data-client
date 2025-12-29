/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable space-before-blocks */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Popup } from 'react-leaflet';
import { Accident, ClusterRow } from '../../types';

interface IProps {
  data: ClusterRow,
  language: string
}

const ModelMarkerPopUp: React.FC<IProps> = (({ data: x, language }) => {
  const pStyle = {
    color: '#004ba0',
    fontWeight: 600, 
  };
  const { t } = useTranslation();
  if (x.severityIndex !== undefined) {
    return (
      <Popup>
        <div style={{fontSize: '14px'}} className={`text${language}`}>
          <div><span style={pStyle}>{t(x.roadType)} {x.name}</span></div>
          <div>{t('Severity')}: {x.severityIndex},  {t('casualties')}: {x.count}</div>  
        </div>
      </Popup>
    );
  }
  return null;
});
export default ModelMarkerPopUp;
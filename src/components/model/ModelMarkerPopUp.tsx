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
  };
  const { t } = useTranslation();
  if (x.severityIndex !== undefined) {
    return (
      <Popup>
        <div className={`text${language}`}>
          <div><span style={pStyle}></span> {x.roadType}, {x.name}: index: {x.severityIndex}, count: {x.count},  </div>
          </div>
      </Popup>
    );
  }
  return null;
});
export default ModelMarkerPopUp;
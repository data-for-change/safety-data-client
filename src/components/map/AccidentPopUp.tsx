/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable space-before-blocks */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Popup } from 'react-leaflet';
import { Accident } from '../../types';

interface IProps {
  data: Accident,
  language: string
}

const AccidentsPopUp: React.FC<IProps> = (({ data: x, language }) => {
  const pStyle = {
    color: '#004ba0',
  };
  const { t } = useTranslation();
  if (x.injured_type_hebrew !== undefined) {
    return (
      <Popup>
        <div style={{fontSize: '20px'}} className={`text${language}`}>
          <div><span style={pStyle}>{t('When')}:</span> {x.accident_timestamp.slice(0, 16)}, {x.day_in_week_hebrew}, {x.day_night_hebrew}</div>
          <div><span style={pStyle}>{t('Who')}:</span> {x.injured_type_hebrew}, {x.injury_severity_hebrew}, {x.vehicle_vehicle_type_hebrew ? `${x.vehicle_vehicle_type_hebrew}, ` : ''} {x.sex_hebrew}, {x.age_group_hebrew}, {x.population_type_hebrew}</div>
          <div><span style={pStyle}>{t('Where')}:</span>
            {x.accident_yishuv_name ? `${x.accident_yishuv_name}, ` : ''}
            {x.street1_hebrew ? `${x.street1_hebrew}, ` : ''}
            {x.street2_hebrew ? `${x.street2_hebrew}, ` : ''}
            {x.road1 ? `${t('Road')} ${x.road1}, ` : ''}
            {x.road2 ? `${x.road2}, ` : ''}
            {x.road_segment_name ? `${x.road_segment_name}, ` : ''}
            {x.road_type_hebrew}
            {x.location_accuracy_hebrew ? ` (${x.location_accuracy_hebrew})` : ''}
          </div>
          <div><span style={pStyle}>{t('What')}:</span> {x.accident_type_hebrew} ({x.vehicles})</div>
          <div><span style={pStyle}>{t('WhatRoad')}:</span> {x.speed_limit_hebrew ? `${x.speed_limit_hebrew}, ` : ''}{x.multi_lane_hebrew ? `${x.multi_lane_hebrew}, ` : ''}{x.one_lane_hebrew ? `${x.one_lane_hebrew}, ` : ''}{x.road_width_hebrew ? `${x.road_width_hebrew} ` : ''}</div>
        </div>
      </Popup>
    );
  }
  return null;
});
export default AccidentsPopUp;
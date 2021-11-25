/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import L, { divIcon } from 'leaflet';
import { Marker } from 'react-leaflet';

import { renderToStaticMarkup } from 'react-dom/server';
// import { getColorByVehicle } from '../../../services/mapUtils';
import IconCar from './markers/IconCar.tsx';
import IconMotorcycle from './markers/IconMotorcycle.tsx';
import IconWalk from './markers/IconWalk.tsx';
import IconBike from './markers/IconBike.tsx';
import IconScooter from './markers/IconScooter.tsx';
import IconQuestion from './markers/IconQuestion.tsx';
import IconEmpty from './markers/IconEmpty.tsx';

// eslint-disable-next-line import/no-unresolved
import AccidentPopUp from '../../atoms/AccidentPopUp';

// const iconSize = {
//   iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
// };

const getColorByVehicle = (category) => {
  let res = '';
  switch (category) {
    case '':
      res = '#FF0F80';
      break;
    case 'רכב נוסעים פרטי':
      res = '#FE4E00';
      break;
    case 'אופנוע עד 50 סמ"ק':
    case 'אופנוע 51 עד 125 סמ"ק':
    case 'אופנוע 126 עד 400 סמ"ק':
    case 'אופנוע 401+ סמ"ק':
      res = '#E9190F';
      break;
    case 'אופניים':
      res = '#F41448';
      break;
    case 'אופניים חשמליים':
      res = '#EF172C';
      break;
    case 'קורקינט חשמלי':
      res = '#EF172C';
      break;
    default:
      res = '#FE4E00';
      break;
  }
  return res;
};
const getColorsBySeverity = (severity) => {
  let res = '';
  switch (severity) {
    case 'הרוג':
      res = '#CA273B';
      break;
    default:
      res = '#F8A141';
      break;
  }
  return res;
};
const getColorsByDayNight = (value) => {
  let res = '';
  switch (value) {
    case 'יום':
      res = '#ffcc00';
      break;
    default:
      res = '#333333';
      break;
  }
  return res;
};
const getColors = (colorBy, data) => {
  let res = '';
  switch (colorBy) {
    case 'Severity':
      res = getColorsBySeverity(data.injury_severity_hebrew);
      break;
    case 'Vehicle':
      res = getColorByVehicle(data.vehicle_vehicle_type_hebrew);
      break;
    case 'DayNight':
      res = getColorsByDayNight(data.day_night_hebrew);
      break;
    default:
      res = getColorsBySeverity(data.injury_severity_hebrew);
      break;
  }
  return res;
};

const getSVGPinByCategory = (category, color) => {
  let pin;
  switch (category) {
    case '':
      pin = <IconWalk fill={color} />;
      break;
    case 'רכב נוסעים פרטי':
      pin = <IconCar fill={color} />;
      break;
    case 'אופנוע עד 50 סמ"ק':
    case 'אופנוע 51 עד 125 סמ"ק':
    case 'אופנוע 126 עד 400 סמ"ק':
    case 'אופנוע 401+ סמ"ק':
      pin = <IconMotorcycle fill={color} />;
      break;
    case 'אופניים':
      pin = <IconBike fill={color} />;
      break;
    case 'אופניים חשמליים':
      pin = <IconBike fill={color} />;
      break;
    case 'קורקינט חשמלי':
      pin = <IconScooter fill={color} />;
      break;
    default:
      pin = <IconQuestion fill={color} />;
      break;
  }
  const iconMarkup = renderToStaticMarkup(
    pin,
  );
  const customMarketIcon = divIcon({
    html: iconMarkup,
    className: 'ship-div-icon',
    iconAnchor: [0, 30],
    popupAnchor: [1, -32],
  });
  return customMarketIcon;
};

const getEmptyIcon = (color) => {
  const pin = <IconEmpty fill={color} />;
  const iconMarkup = renderToStaticMarkup(
    pin,
  );
  const customMarketIcon = divIcon({
    html: iconMarkup,
    className: 'ship-div-icon',
    iconAnchor: [0, 30],
    popupAnchor: [1, -32],
  });
  return customMarketIcon;
};

// eslint-disable-next-line react/prop-types
// eslint-disable-next-line no-unused-vars
const MarkerSvg = (({
  data, language, colorBy, markerIconsType,
}) => {
  // eslint-disable-next-line react/prop-types
  const lPoint = new L.LatLng(data.latitude, data.longitude);
  const color = getColors(colorBy, data);
  const icon = (markerIconsType === 'general') ? getEmptyIcon(color)
    : getSVGPinByCategory(data.vehicle_vehicle_type_hebrew, color);
  // console.log(data.vehicle_vehicle_type_hebrew);
  // const icon: L.Icon = setIconBySeverity(data.injury_severity_hebrew, useSmallMarkers);
  return (
    <Marker position={lPoint} icon={icon}>
      <AccidentPopUp data={data} language={language} />
    </Marker>
  );
});

export default MarkerSvg;

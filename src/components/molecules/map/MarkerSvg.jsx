/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import L, { divIcon } from 'leaflet';
import { Marker } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { getColors } from '../../../stores/mapUtils.ts';
import Accident from '../../../types/Accident.ts';

// import { getColorByVehicle } from '../../../services/mapUtils';
import IconCar from './markers/IconCar.tsx';
import IconMotorcycle from './markers/IconMotorcycle.tsx';
import IconWalk from './markers/IconWalk.tsx';
import IconBike from './markers/IconBike.tsx';
import IconScooter from './markers/IconScooter.tsx';
import IconQuestion from './markers/IconQuestion.tsx';
import IconBus from './markers/IconBus.tsx';
import IconEmpty from './markers/IconEmpty.tsx';

// eslint-disable-next-line import/no-unresolved
import AccidentPopUp from '../../atoms/AccidentPopUp';

// const iconSize = {
//   iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
// };

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
    case 'אוטובוס':
    case 'אוטובוס זעיר':
      pin = <IconBus fill={color} />;
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

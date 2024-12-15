import React from 'react';
import L, { divIcon } from 'leaflet';
import { Marker } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { getColors } from '../../utils/mapUtils';
import { Accident } from '../../types';

// import { getColorByVehicle } from '../../../services/mapUtils';
import IconCar from './markers/IconCar';
import IconMotorcycle from './markers/IconMotorcycle';
import IconWalk from './markers/IconWalk';
import IconBike from './markers/IconBike';
import IconScooter from './markers/IconScooter';
import IconQuestion from './markers/IconQuestion';
import IconBus from './markers/IconBus';
import IconTruck from './markers/IconTruck';
import IconEmpty from './markers/IconEmpty';
import AccidentPopUp from './AccidentPopUp';

// const iconSize = {
//   iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
// };

const customMarketIcon = (iconMarkup:any) => {
  const res = divIcon({
    html: iconMarkup,
    className: 'ship-div-icon',
    iconAnchor: [0, 30],
    popupAnchor: [1, -32],
  });
  return res;
};

const getSVGPinByCategory = (category: string, color: string) => {
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
    case 'משא 3.6 עד 9.9 טון':
    case 'משא 10.0 עד 12.0 טון':
    case 'משא 12.1 עד 15.9 טון':
    case 'משא 16.0 עד 33.9 טון':
    case 'משא 34.0+ טון':
      pin = <IconTruck fill={color} />;
      break;
    default:
      pin = <IconQuestion fill={color} />;
      break;
  }
  const iconMarkup = renderToStaticMarkup(
    pin,
  );
  const res = customMarketIcon(iconMarkup);
  return res;
};

const getEmptyIcon = (color: string) => {
  const pin = <IconEmpty fill={color} />;
  const iconMarkup = renderToStaticMarkup(
    pin,
  );
  const res = customMarketIcon(iconMarkup);
  return res;
};

interface IProps {
  data: Accident,
  language: string,
  colorBy : string,
  markerIconsType: string,
}
const MarkerSvg: React.FC<IProps> = (({
  data, language, colorBy, markerIconsType,
}) => {
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

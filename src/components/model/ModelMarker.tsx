import React from 'react';
import { divIcon, LatLngExpression } from 'leaflet';
import { Marker } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { getColors, getNumSeverity } from '../../utils/mapUtils';
import { Accident, ClusterRow } from '../../types';
// import { getColorByVehicle } from '../../../services/mapUtils';
import {IconBike, IconBus, IconCar, IconEmpty, IconMotorcycle, IconQuestion, IconScooter, IconTruck, IconWalk } from '../map/markers';
import ModelMarkerPopUp from './ModelMarkerPopUp';
//import AccidentPopUp from './AccidentPopUp';

// const iconSize = {
//   iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
// };

const customMarketIcon = (iconMarkup:any, isSmall :boolean = false) => {
  const size = isSmall? 9:22;
  const res = divIcon({
    html: iconMarkup,
    className: 'ship-div-icon',
    iconAnchor: [0, size],
    popupAnchor: [2, -(size-2)],
  });
  return res;
};

const getEmptyIcon = (color: string, isAccuratePos: boolean) => {
  const pin = <IconEmpty fill={color} isAccuratePos={isAccuratePos}/>;
  const iconMarkup = renderToStaticMarkup(
    pin,
  );
  const res = customMarketIcon(iconMarkup);
  return res;
};

interface IProps {
  data: ClusterRow,
  position: LatLngExpression;
  language: string,
  color : string,
  markerIconsType: string,
}
const ModelMarker: React.FC<IProps> = (({
  data, position, language, color, markerIconsType,
}) => {
  //const lPoint = new L.LatLng(data.latitude, data.longitude);
  //const color = (data.roadType=="junction")? '#D87F1D':'#A0202F'; //getColors(colorBy, data);
  const severity = 1;// getNumSeverity(data.injury_severity_hebrew);
  //const isSmall = severity === 3; 
  const icon =  getEmptyIcon(color, true);  
  return (
    <Marker position={position} icon={icon}
      // @ts-ignore to allow custom props in Marker options
      severity={severity}
    >
     <ModelMarkerPopUp data={data} language={language} />
    </Marker>
  );
});

export default ModelMarker;

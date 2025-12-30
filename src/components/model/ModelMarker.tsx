import React from 'react';
import { divIcon, LatLngExpression } from 'leaflet';
import { Marker } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { ClusterRow } from '../../types';
import { IconEmpty, IconCircle } from '../map/markers';
import ModelMarkerPopUp from './ModelMarkerPopUp';

// const iconSize = {
//   iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
// };

const customMarketIcon = (iconMarkup:any, size :number = 40) => {
  const half = size / 2;
  const res = divIcon({
    html: iconMarkup,
    className: 'ship-div-icon',
    iconAnchor: [-2, half],
    popupAnchor: [0, -half]
  });
  return res;
};

const getEmptyIcon = (color: string, isHeat: boolean) => {
  const opacity = isHeat? 0.35: 0.8;
  const size = isHeat? 40: 30;
  const pin = <IconCircle fill={color} size={size} opacity={opacity} isAccuratePos={false}/>;
  const iconMarkup = renderToStaticMarkup(
    pin,
  );
  const res = customMarketIcon(iconMarkup, size);
  return res;
};

interface IProps {
  data: ClusterRow,
  position: LatLngExpression;
  language: string,
  color : string,
  markerIconsType: string,
  isHeat: boolean
}
const ModelMarker: React.FC<IProps> = (({
  data, position, language, color, isHeat,
}) => {
  const severity = 1;// getNumSeverity(data.injury_severity_hebrew);
  const icon =  getEmptyIcon(color, isHeat);  
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

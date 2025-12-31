import React from 'react';
import { divIcon, LatLngExpression } from 'leaflet';
import { Marker, Circle, CircleMarker } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { ClusterRow } from '../../types';
import { IconEmpty, IconCircle } from '../map/markers';
import ModelMarkerPopUp from './ModelMarkerPopUp';

interface IProps { 
  data: ClusterRow, 
  position: LatLngExpression; 
  language: string, 
  color : string, 
  markerIconsType: string, 
  isHeat: boolean,
  size: number
}
const HEAT_RADIUS_METERS =200;

const ModelMarker: React.FC<IProps> = ({
  data,
  position,
  language,
  color,
  isHeat,
  size = HEAT_RADIUS_METERS
  
}) => {
  const severity = 1; // example

if (isHeat) {
  return (
    <>
      <Circle
        center={position}
        radius={size}   // meters
        pathOptions={{
          color,
          fillColor: color,
          fillOpacity: 0.35,
          weight: 1,
        }}
      >
      </Circle>
      <CircleMarker
        center={position}
        pane="center-dot"
        radius={3}      
        pathOptions={{
          color,
          fillColor: 'red',
          fillOpacity: 1,
          weight: 0,
        }}
      >       
        <ModelMarkerPopUp data={data} language={language} />
      </CircleMarker>
    </>
  );
}

  // normal marker
  const icon = getEmptyIcon(color, false);

  return (
    <Marker
      position={position}
      icon={icon}
    >
      <ModelMarkerPopUp data={data} language={language} />
    </Marker>
  );
};


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

export default ModelMarker;


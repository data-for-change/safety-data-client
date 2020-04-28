import React from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import AccidentPopUp from '../atoms/AccidentPopUp';
import redMarker from '../../assets/marker-icon-2x-red.png';
import orangeMarker from '../../assets/marker-icon-2x-orange2.png';
import shadoMarker from '../../assets/marker-shadow.png';
import redCMarker from '../../assets/circle_red_20.png';
import orangeCMarker from '../../assets/circle_orange_20.png';

interface IProps {
    data: any,
    language: string,
    useSmallMarkers : boolean,
}

const iconSize = {
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
};
const mIconSizes = {
  iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [1, -10],
};
const RED_ICON = new L.Icon({
  iconUrl: redMarker,
  shadowUrl: shadoMarker,
  iconSize: L.point(iconSize.iconSize[0], iconSize.iconSize[1]),
  iconAnchor: L.point(iconSize.iconAnchor[0], iconSize.iconAnchor[1]),
  popupAnchor: L.point(iconSize.popupAnchor[0], iconSize.popupAnchor[1]),
  shadowSize: L.point(iconSize.shadowSize[0], iconSize.shadowSize[1]),
});
const ORANGE_ICON = new L.Icon({
  iconUrl: orangeMarker,
  shadowUrl: shadoMarker,
  iconSize: L.point(iconSize.iconSize[0], iconSize.iconSize[1]),
  iconAnchor: L.point(iconSize.iconAnchor[0], iconSize.iconAnchor[1]),
  popupAnchor: L.point(iconSize.popupAnchor[0], iconSize.popupAnchor[1]),
  shadowSize: L.point(iconSize.shadowSize[0], iconSize.shadowSize[1]),
});
const RED_ICON_C = new L.Icon({
  iconUrl: redCMarker,
  iconSize: L.point(mIconSizes.iconSize[0], mIconSizes.iconSize[1]),
  iconAnchor: L.point(mIconSizes.iconAnchor[0], mIconSizes.iconAnchor[1]),
  popupAnchor: L.point(mIconSizes.popupAnchor[0], mIconSizes.popupAnchor[1]),
});
const ORANGE_ICON_C = new L.Icon({
  iconUrl: orangeCMarker,
  iconSize: L.point(mIconSizes.iconSize[0], mIconSizes.iconSize[1]),
  iconAnchor: L.point(mIconSizes.iconAnchor[0], mIconSizes.iconAnchor[1]),
  popupAnchor: L.point(mIconSizes.popupAnchor[0], mIconSizes.popupAnchor[1]),
});


const setIconBySeverity = (severity: string, useSmallIcons: boolean) => {
  if (useSmallIcons) {
    return (severity === 'הרוג') ? RED_ICON_C : ORANGE_ICON_C;
  }
  return (severity === 'הרוג') ? RED_ICON : ORANGE_ICON;
};

const AccidentsMarker: React.FC<IProps> = (({ data, language, useSmallMarkers }) => {
  const lPoint: L.LatLng = new L.LatLng(data.latitude, data.longitude);
  const icon: L.Icon = setIconBySeverity(data.injury_severity_hebrew, useSmallMarkers);
  // console.log(data.latitude)
  return (
    <Marker position={lPoint} icon={icon}>
      <AccidentPopUp data={data} language={language} />
    </Marker>
  );
});

export default AccidentsMarker;

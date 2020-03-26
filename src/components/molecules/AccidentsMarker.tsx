import React from 'react'
import L from 'leaflet'
import { Marker} from 'react-leaflet'
import AccidentPopUp from '../atoms/AccidentPopUp'
import redMarker from '../../assets/marker-icon-2x-red.png'
import orangeMarker from '../../assets/marker-icon-2x-orange2.png'
import shadoMarker from '../../assets/marker-shadow.png'

interface IProps {
    data: any,
    language: string
}
const lIconSizes = { iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] }
//const mIconSizes = { iconSize: [19, 31], iconAnchor: [9, 31], popupAnchor: [1, -25], shadowSize: [31, 31] }
const iconSize = lIconSizes;
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

const AccidentsMarker: React.FC<IProps> = (({ data, language }) => {
    const lPoint: L.LatLng = new L.LatLng(data.latitude, data.longitude);
    const icon: L.Icon = setIconBySeverity(data.injury_severity_hebrew)
    //console.log(data.latitude)
    return (<Marker position={lPoint} icon={icon}>
        <AccidentPopUp data={data} language={language} />
    </Marker>)
})

const setIconBySeverity = (severity: string) => {
    if (severity === "הרוג")
        return RED_ICON;
    else // (severity === "קשה")    
        return ORANGE_ICON;
}

export default AccidentsMarker
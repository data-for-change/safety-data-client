import React from 'react'
import { useTranslation } from 'react-i18next';
import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import 'leaflet-css'
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

const AccidentsMarkers: React.FC<IProps> = (({ data: x, language }) => {
    const pStyle = {
        color: "#004ba0"
    };
    const { t } = useTranslation();
    const lPoint: L.LatLng = new L.LatLng(x.latitude, x.longitude);
    const icon: L.Icon = setIconBySeverity(x.injury_severity_hebrew)
    return (<Marker key={`marker-${x._id}`} position={lPoint} icon={icon}>
        {<Popup>
            <div className={'text' + language}>
                <div><span style={pStyle}>{t('When')}:</span> {x.accident_timestamp}, {x.day_in_week_hebrew}, {x.day_night_hebrew}</div>
                <div><span style={pStyle}>{t('Who')}:</span> {x.injured_type_hebrew}, {x.injury_severity_hebrew}, {x.vehicle_vehicle_type_hebrew ? x.vehicle_vehicle_type_hebrew + ", " : ""} {x.sex_hebrew}, {x.age_group_hebrew}, {x.population_type_hebrew}</div>
                <div><span style={pStyle}>{t('Where')}:</span> {x.accident_yishuv_name ? x.accident_yishuv_name + ", " : ""}{x.street1_hebrew ? x.street1_hebrew + ", " : ""}{x.street2_hebrew ? x.street2_hebrew + ", " : ""}{x.road_segment_name ? x.road_segment_name + ", " : ""}{x.road_type_hebrew}</div>
                <div><span style={pStyle}>{t('What')}:</span> {x.accident_type_hebrew}</div>
                <div><span style={pStyle}>{t('WhatRoad')}:</span> {x.speed_limit_hebrew ? x.speed_limit_hebrew + ", " : ""}{x.multi_lane_hebrew ? x.multi_lane_hebrew + ", " : ""}{x.one_lane_hebrew ? x.one_lane_hebrew + ", " : ""}{x.road_width_hebrew ? x.road_width_hebrew + ", " : ""}</div>
            </div>
        </Popup>}
    </Marker>)
})

const setIconBySeverity = (severity: string) => {
    if (severity === "הרוג")
        return RED_ICON;
    else // (severity === "קשה")    
        return ORANGE_ICON;
}

export default AccidentsMarkers
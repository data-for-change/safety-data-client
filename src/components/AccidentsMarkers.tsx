import React from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import { useStore } from '../stores/storeConfig'
import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'

import 'leaflet-css'
import redMarker from '../assets/marker-icon-2x-red.png'
import shadoMarker from '../assets/marker-shadow.png'
import { toJS } from 'mobx'

const redIcon = new L.Icon({
    iconUrl: redMarker,
    shadowUrl: shadoMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const AccidentsMarkers = observer(() => {
    const pStyle= {
        color:"#004ba0"
       };
    const store = useStore();
    const { t } = useTranslation();
    const reactMarkers = toJS(store.markers);
    //console.log(reactMarkers);
    const markersArr = reactMarkers.map((x) => {
        if (x.latitude !== null && x.longitude !== null) {
            let lPoint: L.LatLng = new L.LatLng(x.latitude, x.longitude);
            return (<Marker key={`marker-${x._id}`} position={lPoint} icon={redIcon}>
                {<Popup>
                    <div className={'text'+store.language}> 
                        <div><span style={pStyle}>{t('When')}:</span>{x.accident_timestamp},{x.day_in_week_hebrew}, {x.day_night_hebrew}</div>
                        <div><span style={pStyle}>{t('Who')}:</span> {x.injured_type_hebrew},{x.vehicle_vehicle_type_hebrew},{x.sex_hebrew},{x.age_group_hebrew},{x.population_type_hebrew}</div>
                        <div><span style={pStyle}>{t('Where')}: </span> {x.accident_yishuv_name}, {x.street1_hebrew}, {x.road_type_hebrew}</div>
                        <div><span style={pStyle}>{t('What')}:</span> {x.accident_type_hebrew}</div>
                    </div>
                </Popup>}
            </Marker>)
        }
        else { return null }
    })
    if (reactMarkers.length > 0) {
        return (
            <div>
                {markersArr}
            </div>
        )
    }
    else { return null }
})
export default AccidentsMarkers
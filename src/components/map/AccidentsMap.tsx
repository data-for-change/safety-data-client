import React, {FC} from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import {LatLngTuple} from 'leaflet';
import { observer } from 'mobx-react';
import { store } from '../../stores/storeConfig';
import 'leaflet/dist/leaflet.css';
import AccidentsMarkers from './AccidentsMarkers';
import SelectMarkersColorType from './SelectMarkersColorType';
import SelectMarkersIConType from './SelectMarkersIConType';

const styels: any = {
  buttonsPanel: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: '0.2rem',
    margin: '5px'
  },
};

interface IProps {
}
const AccidentsMap: FC<IProps> = observer(() => { 
    const {filterStore}=store;
    const {isLoading}  = filterStore;
    console.log("isloading1 ", isLoading);
    
    const position : LatLngTuple = [32.07995, 34.8344] as LatLngTuple;

    return (       
        <div id="map">
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '74vh', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                  <AccidentsMarkers />
            </MapContainer>
            <div style={styels.buttonsPanel}>
                <SelectMarkersColorType />
                <SelectMarkersIConType />
                {/* <CurrButtonTuggleHeatLayer /> */}
           </div>
        </div>
    );
});

export default AccidentsMap;
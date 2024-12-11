import React, { FC, useRef } from 'react';
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import { Map as LeafletMap, LatLngTuple } from 'leaflet';
import { observer } from 'mobx-react';
import { store } from '../../stores/storeConfig';
import 'leaflet/dist/leaflet.css';
import AccidentsMarkers from './AccidentsMarkers';
import MapCenterUpdater from './MapCenterUpdater';
import LegendWarpper from './legend/LegendWarpper';
import SelectMarkersColorType from './SelectMarkersColorType';
import SelectMarkersIConType from './SelectMarkersIConType';
import ButtonTuggleHeatLayer from './ButtonTuggleHeatLayer';
import AccidentHeatLayer from './AccidentHeatLayer';

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
  const mapRef = useRef<LeafletMap | null>(null);
  const { mapStore } = store;
  const { updateMapBounds } = mapStore;

  const MapEventHandlerMoveEnd: FC = () => {
    const map = useMapEvent("moveend", () => {
      const newBounds = map.getBounds();
      updateMapBounds(newBounds);
    });
    return null;
  };

  const handleMapReady = () => {
    // Wait 1 second before fetching the bounds
    setTimeout(() => {
      const bounds = mapRef.current?.getBounds();
      if (bounds) {
        //updateMapBounds to get markers in bbox         
        updateMapBounds(bounds);
      }
    }, 500); //delay to get mapRef.current
  };
  //const {isLoading} = filterStore;
  const { mapCenter, heatLayerHidden } = mapStore;
  const position: LatLngTuple = [mapCenter.lat, mapCenter.lng] as LatLngTuple;
  return (
    <div id="map">
      <MapContainer center={position} zoom={13}
        ref={mapRef}
        scrollWheelZoom={true}
        whenReady={handleMapReady}
        style={{ height: '74vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!heatLayerHidden && <AccidentHeatLayer />}
        {heatLayerHidden && <AccidentsMarkers />}
        <MapCenterUpdater center={mapCenter} />
        <LegendWarpper />
        <MapEventHandlerMoveEnd />
      </MapContainer>
      <div style={styels.buttonsPanel}>
        <SelectMarkersColorType />
        <SelectMarkersIConType />
        <ButtonTuggleHeatLayer />
      </div>
    </div>
  );
});

export default AccidentsMap;
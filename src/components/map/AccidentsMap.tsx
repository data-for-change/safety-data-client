import React, { FC, useRef } from 'react';
import { MapContainer, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import L, { Map as LeafletMap, LatLngTuple } from 'leaflet';
import { observer } from 'mobx-react';
import { Card } from 'react-bootstrap';
import MarkerClusterGroup from "react-leaflet-markercluster";
import { store } from '../../stores/storeConfig';
import { MapMarkersType } from '../../types';
import AccidentsMarkers from './AccidentsMarkers';
import MapCenterUpdater from './MapCenterUpdater';
import ClusteredMarkers from './ClusteredMarkers';
import LegendWarpper from './legend/LegendWarpper';
import SelectMarkersColorType from './SelectMarkersColorType';
import SelectMarkersIConType from './SelectMarkersIConType';
import SelectMapMarkersType from './SelectMapMarkersType';
import 'leaflet/dist/leaflet.css';
//import AccidentHeatLayer from './AccidentHeatLayer';

// Function for creating custom icon for cluster group
// https://github.com/Leaflet/Leaflet.markercluster#customising-the-clustered-markers
// NOTE: iconCreateFunction is running by leaflet, which is not support ES6 arrow func syntax
// eslint-disable-next-line
const createClusterCustomIcon = function (cluster: any) {
  const allMarkers = cluster.getAllChildMarkers();
  const totalCount = allMarkers.length;
  return L.divIcon({
    html: `<span>${totalCount}</span>`,
    className: 'marker-cluster-custom',
    iconSize: L.point(40, 40, true),
  });
};

interface IProps {
}
const AccidentsMap: FC<IProps> = observer(() => {
  const mapRef = useRef<LeafletMap | null>(null);
  const { mapStore } = store;
  const { updateMapBounds } = mapStore;

  const MapEventHandler: FC = () => {
    const map = useMap();
    const previousZoomRef = useRef(map.getZoom());
    useMapEvents({
      moveend: () => {
        const newZoom = map.getZoom();
        const newBounds = map.getBounds();
        const newCenter = map.getCenter();

        if (newZoom !== previousZoomRef.current) {
          // console.log("Zoom changed");
          updateMapBounds(newBounds, newCenter, newZoom);
        } else {
          // console.log("Move only");
          updateMapBounds(newBounds, newCenter, undefined);
        }
        previousZoomRef.current = newZoom;
      },
    });
    return null;
  };

  const handleMapReady = () => {
    // Wait 1 second before fetching the bounds
    setTimeout(() => {
      const bounds = mapRef.current?.getBounds();
      const newCenter = mapRef.current?.getCenter();
      const newZoom = mapRef.current?.getZoom();
      if (bounds) {
        //updateMapBounds to get markers in bbox         
        updateMapBounds(bounds, newCenter, newZoom);
      }
    }, 500); //delay to get mapRef.current
  };
  //const {isLoading} = filterStore;
  const { mapCenter, mapMarkersType, mapZoom } = mapStore;
  const position: LatLngTuple = [mapCenter.lat, mapCenter.lng] as LatLngTuple;
  return (    
      <Card style={{ height: '100%' }}>
        <Card.Body style={{ padding: 0 }}>
          <div id="map" style={{ height: '90%', width: '100%' }}>
            <MapContainer center={position} zoom={13}
              ref={mapRef}
              scrollWheelZoom={true}
              whenReady={handleMapReady}
              style={{ height: '74vh', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* {mapMarkersType === MapMarkersType.Heat_Map && <AccidentHeatLayer />} */}
              {mapMarkersType === MapMarkersType.Markers && <AccidentsMarkers />}
              {mapMarkersType === MapMarkersType.Markers_AND_Clusters && <MarkerClusterGroup
                showCoverageOnHover={false}
                spiderfyDistanceMultiplier={2}
                maxClusterRadius={10}
                iconCreateFunction={createClusterCustomIcon}>
                <ClusteredMarkers />
              </MarkerClusterGroup>}
              <MapCenterUpdater center={mapCenter} zoom={mapZoom} />
              <LegendWarpper />
              <MapEventHandler />
            </MapContainer>
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="map-select-wrapper">
            <SelectMapMarkersType />
            <SelectMarkersColorType />
            <SelectMarkersIConType />
          </div>
        </Card.Footer>
      </Card>
  );
});

export default AccidentsMap;
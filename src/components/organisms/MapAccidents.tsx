import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// import L from 'leaflet'
import { Map, TileLayer } from 'react-leaflet';
import AccidentsMarkers from '../molecules/AccidentsMarkers';
import AccidentHeatLayer from '../molecules/AccidentHeatLayer';
import ButtonToggle from '../atoms/ButtonToggle';
import { useStore } from '../../stores/storeConfig';
import { BBoxType } from '../../stores/MapStore';
import logger from '../../services/logger';
import 'leaflet-css';

const styleButDiv: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-start',
  marginTop: '1rem'
};

interface IProps { }
const MapAccidents: React.FC<IProps> = observer(() => {
  const WRAPPER_STYLES = { height: '75vh', width: '100vw', maxWidth: '100%' };
  const mapRef = useRef<Map>(null);

  const { mapStore } = useStore();
  mapStore.setMapRef(mapRef);

  const { heatLayerHidden, mapCenter, bboxType } = mapStore;
  const reactMapCenter = toJS(mapCenter);
  const markers = heatLayerHidden && <AccidentsMarkers />;
  const heatLayer = !heatLayerHidden && <AccidentHeatLayer />;
  const updateBounds = (() => {
    try {
      if (bboxType !== BBoxType.NO_BBOX) mapStore.getMarkersInBBox();
    } catch (error) {
      logger.error(error);
    }
  });
  useEffect(() => {
    // us in mountOnEnter
    updateBounds();
    // prevent zoom  0 bug
    if (mapRef.current !== null) {
      const zoom = mapRef.current.leafletElement.getZoom();
      if (zoom === 0) mapRef.current.leafletElement.setZoom(13);
    }
  });
  return (
    <div>
      <Map
        ref={mapRef}
        center={reactMapCenter}
        zoom={13}
        // bounds={mapBounds}
        style={WRAPPER_STYLES}
        onmoveend={updateBounds}
      >
        {heatLayer}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </Map>
      <div style={styleButDiv} className="div-buttons">
        <CurrButtonTuggleHeatLayer />
        <ButtonToggleSmallMarkers />
      </div>
      <MapInvalidateSize mapRef={mapRef} />
      {/* {store.isReadyToRenderMap ? " " : ""} */}
    </div>
  );
});

interface IPropsButtonTuggleHeatLayer { }

const CurrButtonTuggleHeatLayer: React.FC<IPropsButtonTuggleHeatLayer> = observer(() => {
  const { mapStore, filterStore } = useStore();
  return (
    <ButtonToggle
      condtion={mapStore.heatLayerHidden}
      textTrue="HeatMap"
      textFalse="Markers"
      disabled={filterStore.isLoading}
      onClick={mapStore.toggleHeatLayer}
    />
  );
});

const ButtonToggleSmallMarkers: React.FC<{}> = observer(() => {
  const { mapStore } = useStore();
  const { useSmallMarkers, toggleUseSmallMarkers } = mapStore;
  return (
    <ButtonToggle
      condtion={useSmallMarkers}
      textTrue="big-markers"
      textFalse="small-markers"
      onClick={toggleUseSmallMarkers}
    />
  );
});

interface IPropsMapInvalidateSize {
  mapRef: React.RefObject<Map<any>>
}

const MapInvalidateSize: React.FC<IPropsMapInvalidateSize> = observer(({ mapRef }) => {
  const didMountRef = useRef(false);
  const { mapStore } = useStore();
  useEffect(() => {
    if (didMountRef.current) {
      // like componentDidUpdate
      if (mapRef.current) {
        // invalidateSize - leaflet map rendered has a bug if container tab not active / hidden
        // this event is fierd when parent tab is shown - to help render map and prevent css bug
        if (mapStore.isReadyToRenderMap) {
          setTimeout(() => {
            if (mapRef.current !== null) mapRef.current.leafletElement.invalidateSize(false);
          }, 300); // Adjust timeout to tab transition
        }
      }
    } else didMountRef.current = true;
  });
  return <span>{mapStore.isReadyToRenderMap ? ' ' : ''}</span>;
});
export default MapAccidents;

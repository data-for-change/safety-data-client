import React, { FunctionComponent, useRef, useEffect } from 'react'
import { observer } from "mobx-react"
import { toJS } from 'mobx'
//import L from 'leaflet'
import { Map, TileLayer } from 'react-leaflet'
import AccidentsMarkers from '../molecules/AccidentsMarkers'
import AccidentHeatLayer from '../molecules/AccidentHeatLayer'
import ButtonTuggleHeatLayer from '../atoms/ButtonTuggleHeatLayer'
import { useStore } from '../../stores/storeConfig'
import { BBoxType } from '../../stores/MapStore'
import 'leaflet-css'


interface IProps { }
const MapAccidents: FunctionComponent<IProps> = observer(() => {
  const WRAPPER_STYLES = { height: '80vh', width: '100vw', maxWidth: '100%' };
  const mapRef = useRef<any>();
  const {mapStore} = useStore();
  const { heatLayerHidden, mapBounds, mapCenter, bboxType } = mapStore;
  const reactMapCenter = toJS(mapCenter);
  const markers = heatLayerHidden && <AccidentsMarkers />
  const heatLayer = !heatLayerHidden && <AccidentHeatLayer />

  useEffect(() => {
    //prevent zoom  0 bug 
    const zoom = mapRef.current.leafletElement.getZoom();
    if (zoom === 0)
      mapRef.current.leafletElement.setZoom(13);
  })
  const updateBounds = (() => {
    const bounds = mapRef.current.leafletElement.getBounds()
    mapStore.updateBounds(bounds);
    if (bboxType !== BBoxType.NO_BBOX) {
      mapStore.getMarkersInBBox(bounds);
    }
  })
  return (
    <div>
      <Map ref={mapRef}
        center={reactMapCenter}
        zoom={13}
        bounds={mapBounds}
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
      <CurrButtonTuggleHeatLayer />
      <MapInvalidateSize mapRef={mapRef} />
      {/* {store.isReadyToRenderMap ? " " : ""} */}
    </div>
  )
})

interface IPropsButtonTuggleHeatLayer { }
const CurrButtonTuggleHeatLayer: FunctionComponent<IPropsButtonTuggleHeatLayer> = observer(() => {
  const { mapStore, filterStore } = useStore();
  return <ButtonTuggleHeatLayer isLoading={filterStore.isLoading} isHeatMapHidden={mapStore.heatLayerHidden} onClick={mapStore.toggleHeatLayer} />
})

interface IPropsMapInvalidateSize {
  mapRef: any
}

const MapInvalidateSize: FunctionComponent<IPropsMapInvalidateSize> = observer(({ mapRef }) => {
  const didMountRef = useRef(false)
  const { mapStore } = useStore();
  useEffect(() => {
    if (didMountRef.current) {
      if (mapRef.current) {
        //mapRef.current  = true - like componentDidUpdate
        //invalidateSize - leaflet map rendered has a bug if container parent tab not active / hidden
        //this event is fierd when parent tab is shown - to help render map and prevent css bug
        if (mapStore.isReadyToRenderMap) {
          setTimeout(() => {
            mapRef.current.leafletElement.invalidateSize(false);
          }, 300); // Adjust timeout to tab transition   
        }
      }
    }
    else didMountRef.current = true
  })
  return <span>{mapStore.isReadyToRenderMap ? " " : ""}</span>
})
export default MapAccidents 
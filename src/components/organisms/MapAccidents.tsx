import React, { FunctionComponent, useRef, useEffect } from 'react'
import { observer } from "mobx-react"
import { toJS } from 'mobx'
//import L from 'leaflet'
import { Map, TileLayer } from 'react-leaflet'
import AccidentsMarkers from '../molecules/AccidentsMarkers'
import AccidentHeatLayer from '../molecules/AccidentHeatLayer'
import ButtonTuggleHeatLayer from '../atoms/ButtonTuggleHeatLayer'
import { useStore } from '../../stores/storeConfig'
import 'leaflet-css'

interface IProps { }
const MapAccidents: FunctionComponent<IProps> = observer(() => {
  const mapRef = useRef<any>();
  const store = useStore();
  const { heatLayerHidden, mapBounds, mapCenter } = store;
  const reactMapCenter = toJS(mapCenter);
  const WRAPPER_STYLES = { height: '80vh', width: '100vw', maxWidth: '100%' };

  const markers = heatLayerHidden && <AccidentsMarkers />
  const heatLayer = !heatLayerHidden && <AccidentHeatLayer />

  const didMountRef = useRef(false)
  useEffect(() => {
    //console.log("useEffect")
    if (didMountRef.current) {
      if (mapRef.current) {
        //mapRef.current  = true - like componentDidUpdate
        //invalidateSize - leaflet map rendered has a bug parent tab not active
        //this event is fierd when parent tab is shown - help render map 
        if (store.isReadyToRenderMap)
        {
          setTimeout(() => {
            //console.log("invalidateSize")
            mapRef.current.leafletElement.invalidateSize(false);
          }, 300); // Adjust timeout to tab transition   
        }
      }
    }
    else didMountRef.current = true
    //prevent zoom  0 bug 
    const zoom = mapRef.current.leafletElement.getZoom();
    if (zoom === 0)
      mapRef.current.leafletElement.setZoom(13);
  })
  const updateMarkers = (() => {
    //console.log("updateMarkers")
    if (store.isDynamicMarkers) {
      const b = mapRef.current.leafletElement.getBounds()
      store.submintGetMarkersBBox(b);
    }
  })
  return (
    <div>
      <Map ref={mapRef}
        center={reactMapCenter}
        zoom={13}
        bounds={mapBounds}
        style={WRAPPER_STYLES}
        onmoveend={updateMarkers}
      >
        {heatLayer}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </Map>
      <CurrButtonTuggleHeatLayer />
      {store.isReadyToRenderMap ? " " : ""}
    </div>
  )
})

interface IProps2 { }
const CurrButtonTuggleHeatLayer: FunctionComponent<IProps2> = observer(() => {
  const store = useStore();
  return <ButtonTuggleHeatLayer isLoading={store.isLoading} isHeatMapHidden={store.heatLayerHidden} onClick={store.toggleHeatLayer} />
})

export default MapAccidents 

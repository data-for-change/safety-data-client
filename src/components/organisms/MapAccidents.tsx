import React, { FunctionComponent, useRef ,useEffect} from 'react'
import { observer } from "mobx-react"
import { toJS } from 'mobx'

//import L from 'leaflet'
import { Map, TileLayer } from 'react-leaflet'
import AccidentsMarkers from '../molecules/AccidentsMarkers'
import { useStore } from '../../stores/storeConfig'
import 'leaflet-css'

interface IProps {}
const MapAccidents: FunctionComponent<IProps> = observer(() => {
  const mapRef = useRef<any>();
  const store = useStore();
  const reactMapCenter = toJS(store.mapCenter);
  const WRAPPER_STYLES = { height: '80vh', width: '100vw', maxWidth: '100%' };
  const didMountRef = useRef(false) 
  useEffect(() => {
    if (didMountRef.current) { 
      if (mapRef.current) {
        //mapRef.current  = true - like componentDidUpdate
        //invalidateSize - leaflet map rendered has a bug parent tab not active
        //this event is fierd when parent tab is shown - help render map 
        mapRef.current.leafletElement.invalidateSize(false);
      }
    } 
    else didMountRef.current = true
  })
  return (
    <div>
        <Map ref={mapRef}
          center={reactMapCenter}
          zoom={13}
          style={WRAPPER_STYLES}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <AccidentsMarkers />
        </Map>
        {store.isReadyToRenderMap?"":""}
    </div>
  )
})


export default MapAccidents

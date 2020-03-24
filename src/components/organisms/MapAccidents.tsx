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
  const {isDynamicMarkers, mapBounds, language} = store;
  let reactMarkers;
  if (isDynamicMarkers)
      reactMarkers = toJS(store.dataMarkersInBounds);
  else    
      reactMarkers = toJS(store.dataAllInjuries);
  let markers = reactMarkers.map((x: any) => {
    if (x.latitude !== null && x.longitude !== null) {
        return <AccidentsMarkers data={x}  language={language} />
    }
    return null;
});
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
  const updateMarkers= (()=>{
    //console.log("updateMarkers")
    if (store.isDynamicMarkers){
      const b = mapRef.current.leafletElement.getBounds()
      store.submintGetMarkersBBox(b);
    }
  })
  return (
    <div>
        <Map ref={mapRef}
          center={reactMapCenter}
          zoom={13}
          bounds ={mapBounds}
          style={WRAPPER_STYLES}
          onmoveend ={updateMarkers}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers}
        </Map>
        {store.isReadyToRenderMap?"":""}
    </div>
  )
})



export default MapAccidents

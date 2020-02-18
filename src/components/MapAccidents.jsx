import React from 'react'
import { observer } from "mobx-react"
import { useStore } from '../stores/storeConfig'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { FilterPanel } from './FilterPanel'
import {AccidentsTable} from './AccidentsTable'
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

const MapAccidents = observer(() => {
  const store = useStore();
  const WRAPPER_STYLES = { height: '500px', width: '100vw' ,maxWidth:'100%'};
  return (
    <div>
      <Map
        center={[32.09, 34.7818]}
        zoom={13}
        style={WRAPPER_STYLES}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AccidentsMarkers />
      </Map>
      {/* <button className="button" type="button" onClick={this.getPoints.bind()} >Get Accidents</button> */}
      <FilterPanel />
      <AccidentsTable/>
    </div>
  )
})

const AccidentsMarkers = observer(() => {
  const store = useStore();
  const reactMarkers = toJS(store.markers);
  console.log(reactMarkers);
  const markersArr = reactMarkers.map((x) => {
    if (x.latitude !== null && x.longitude !== null) {
      return (<Marker key={`marker-${x._id}`} position={new L.latLng(x.latitude, x.longitude)} icon={redIcon}>
        {<Popup maxWidth="300">
          <div>{x.accident_year}, {x.accident_yishuv_name}</div> 
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

/* const  getPoints =(e) =>{
    var service = new  AccidentService ();
    service.getAll(this.addPointsToMap);
  }

  const addPointsToMap=(arrPoints) =>{
    this.setState(() => {
      return {markers: arrPoints};
    })
  } */

export default MapAccidents

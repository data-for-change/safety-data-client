import React from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker,Popup} from 'react-leaflet'
import 'leaflet-css'
import AccidentService from '../services/Accident.Service'

const redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default class MapAccidents extends React.Component {
  constructor() {
    super();
    this.state = {
      markers: []
    };
  }

  getPoints =(e) =>{
    var service = new  AccidentService ();
    service.getAll(this.addPointsToMap);
  }
  addPointsToMap=(arrPoints) =>{
    this.setState(() => {
      return {markers: arrPoints};
    })
  }

  render() {
    const WRAPPER_STYLES = { height: '500px', width: '100vw' };
    let listMarkers = this.state.markers.map((x) => <li key={`${x._id}`} >{x.accident_year}:  ({x.latitude}, {x.longitude}, )</li>);
    let rendMarkers = this.state.markers.map((x) => {
      if (x.latitude !== null && x.longitude !== null){
        return(
          <Marker key={`marker-${x._id}`} position={[x.latitude,x.longitude]} icon={redIcon}>
            <Popup maxWidth="300">
             {x.accident_year}
            </Popup>
          </Marker>)
        }
      else return null
    });
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
          {rendMarkers}
        </Map>
        <button className="button" type="button" onClick={this.getPoints.bind()} >Get Accidents</button>
        <div className="listDiv">
        <ul>{listMarkers}</ul>
        </div>
      </div>
    )
  }
}

import React from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker,Popup} from 'react-leaflet'
import AccidentService from '../services/Accident.Service'
import 'leaflet-css'
import redMarker from '../assets/marker-icon-2x-red.png'
import shadoMarker from '../assets/marker-shadow.png'

const redIcon = new L.Icon({
  iconUrl: redMarker,
  shadowUrl: shadoMarker,
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

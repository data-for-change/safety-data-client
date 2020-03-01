import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet'
import 'leaflet-css'
// @ts-ignore
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import {getAll} from '../../services/Accident.Service'
 



interface IPoint{
  lat: number,
  lon: number,
  _id: string
}
interface IState {
  layerHidden?: boolean;
  fitBoundsOnUpdate?: boolean;
  addressPoints?: Array<IPoint>;
}

const INITIAL_ZOOM = 10;

export default class HeatMap extends React.Component<{},IState> {
    public state = {
      layerHidden: false,
      fitBoundsOnUpdate : true,
      addressPoints: []
    };
  
  componentWillMount() {
/*     const { addressPoints } = this.state
    geojsonPoints.data.map ((x:any)=>{return addressPoints.push( [x.latitude,x.longitude,x.accident_timestamp]) })
    // {{latitude: number, longitude: number,accident_timestamp: string}}
    this.setState({ addressPoints }) */
    console.log("heatmap")
  }
  getPoints =(e:object) =>{
   
    getAll(this.addPointsToMap);
  }
  addPoint = (e:LeafletMouseEvent) => {
    let newPoint:any = [e.latlng.lat,e.latlng.lng,e.originalEvent.timeStamp.toString()]
    if (this.state.addressPoints.length >0)
    {
      this.setState(prevState => ({
        addressPoints: [...prevState.addressPoints, newPoint]
      }))
    }
    // else{
    //   this.setState(state => ({
    //     addressPoints: [newPoint]
    //   }))
    // }
  }
  addPointsToMap=(arrPoints: any[]) =>{
    let newArr:any[] = arrPoints.map (x => [x.latitude, x.longitude, x._id])
    this.setState({ addressPoints: [...newArr]});
  }
  render() {
    const WRAPPER_STYLES = { height: '400px', width: '100vw' }

    return (
      <div>
        <Map center={[32.09, 34.7818]} zoom={INITIAL_ZOOM} style={WRAPPER_STYLES}
         onClick={this.addPoint}
        >
        {!this.state.layerHidden &&
          <HeatmapLayer
            fitBoundsOnLoad
            fitBoundsOnUpdate
            points={this.state.addressPoints}
            longitudeExtractor={(m:any) => m[1]}
            latitudeExtractor={(m:any) => m[0]}
            intensityExtractor={(m:any) => parseFloat(m[2])} />
            }
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </Map>
        <button className="button" onClick={() => this.setState({ layerHidden: !this.state.layerHidden })}>Toggle Layer</button>
        <button className="button" type="button" onClick={this.getPoints} >Add Heat Points</button>
      </div>
    );
  }
 
}

export const geojsonPoints:any = {
  data: [
      {
          "longitude": 34.9780568296871,
          "latitude": 32.4543458814189,
          "accident_severity": "קשה",
          "accident_timestamp": "2016-05-15 21:00:00"
      },
      {
          "longitude": 34.9618510776681,
          "latitude": 32.4494011939289,
          "accident_severity": "קשה",
          "accident_timestamp": "2015-01-02 06:45:00"
      },
      {
          "longitude": 34.968629300414,
          "latitude": 32.4520110942299,
          "accident_severity": "קשה",
          "accident_timestamp": "2014-09-12 09:45:00"
      },
      {
          "longitude": 34.9618510776681,
          "latitude": 32.4494011939289,
          "accident_severity": "קשה",
          "accident_timestamp": "2014-07-27 21:00:00"
      },
      {
          "longitude": 34.9865860704716,
          "latitude": 32.458914735012,
          "accident_severity": "קשה",
          "accident_timestamp": "2011-03-26 19:30:00"
      },
      {
          "longitude": 34.9865860704716,
          "latitude": 32.458914735012,
          "accident_severity": "קלה",
          "accident_timestamp": "2019-11-28 11:30:00"
      },
      {
          "longitude": 34.9618510776681,
          "latitude": 32.4494011939289,
          "accident_severity": "קלה",
          "accident_timestamp": "2019-10-31 19:45:00"
      },
      {
          "longitude": 34.9625415910224,
          "latitude": 32.4496820631224,
          "accident_severity": "קלה",
          "accident_timestamp": "2019-10-31 06:30:00"
      },
      {
          "longitude": 34.9865860704716,
          "latitude": 32.458914735012,
          "accident_severity": "קלה",
          "accident_timestamp": "2019-10-28 10:30:00"
      },
      {
          "longitude": 34.9618510776681,
          "latitude": 32.4494011939289,
          "accident_severity": "קלה",
          "accident_timestamp": "2019-06-22 12:00:00"
      }
  ],
};


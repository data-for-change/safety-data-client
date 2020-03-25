import React ,{FunctionComponent} from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { useStore } from '../../stores/storeConfig'
import { observer } from "mobx-react"
import { toJS } from 'mobx'
import 'leaflet-css'
// @ts-ignore
import HeatmapLayer from 'react-leaflet-heatmap-layer';
//import {getAll} from '../../services/Accident.Service'
 

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
interface IProps {}
const INITIAL_ZOOM = 10;
const HeatMap: FunctionComponent<IProps> = observer(() => {
  const WRAPPER_STYLES = { height: '80vh', width: '100vw', maxWidth: '100%' };
  const store = useStore(); 
  let reactMarkers = toJS(store.dataAllInjuries);
  let newArr:any[] = reactMarkers.map (x => [x.latitude, x.longitude, x._id])
  return (
    <div>
      <Map center={[32.09, 34.7818]} zoom={INITIAL_ZOOM} style={WRAPPER_STYLES}
      
      >
      {true &&
        <HeatmapLayer
          fitBoundsOnLoad
          fitBoundsOnUpdate
          points={newArr}
          longitudeExtractor={(m:any) => m[1]}
          latitudeExtractor={(m:any) => m[0]}
          intensityExtractor={(m:any) => parseFloat(m[2])} />
          }
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
      {/* <button className="button" onClick={() => this.setState({ layerHidden: !this.state.layerHidden })}>Toggle Layer</button>
      <button className="button" type="button" onClick={this.getPoints} >Add Heat Points</button> */}
    </div>
)})
export default HeatMap




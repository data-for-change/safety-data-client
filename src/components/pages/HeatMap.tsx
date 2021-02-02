import React, { FunctionComponent } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { observer } from 'mobx-react';
import 'leaflet-css';
import AccidentHeatLayer from '../molecules/AccidentHeatLayer';

interface IProps { }
const INITIAL_ZOOM = 10;
const HeatMap: FunctionComponent<IProps> = observer(() => {
  const WRAPPER_STYLES = { height: '80vh', width: '100vw', maxWidth: '100%' };
  // const store = useStore();
  // let reactMarkers = toJS(store.dataAllInjuries);
  return (
    <div>
      <Map center={[32.09, 34.7818]} zoom={INITIAL_ZOOM} style={WRAPPER_STYLES}>
        <AccidentHeatLayer />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
      {/* <button className="button" onClick={() => this.setState({ layerHidden: !this.state.layerHidden })}>Toggle Layer</button>
      <button className="button" type="button" onClick={this.getPoints} >Add Heat Points</button> */}
    </div>
  );
});
export default HeatMap;

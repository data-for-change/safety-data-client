import React, { FunctionComponent } from 'react';
import 'leaflet-css'
// @ts-ignore
import HeatmapLayer from 'react-leaflet-heatmap-layer';



interface IPoint {
  lat: number,
  lon: number,
  _id: string
}
interface IState {
  layerHidden?: boolean;
  fitBoundsOnUpdate?: boolean;
  addressPoints?: Array<IPoint>;
}
interface IProps {
  data: any[]
}
const AccidentHeatLayer: FunctionComponent<IProps> = ({ data }) => {
  let newArr: any[] = data.map(x => [x.latitude, x.longitude, x._id])
  return (
    <HeatmapLayer
      fitBoundsOnLoad
      fitBoundsOnUpdate
      points={newArr}
      longitudeExtractor={(m: any) => m[1]}
      latitudeExtractor={(m: any) => m[0]}
      intensityExtractor={(m: any) => parseFloat(m[2])} />
  )
}
export default AccidentHeatLayer




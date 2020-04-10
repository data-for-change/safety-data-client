import React, { FunctionComponent } from 'react'
import { observer } from "mobx-react"
import { toJS } from 'mobx'
//import L from 'leaflet'
import { useStore } from '../../stores/storeConfig'
// @ts-ignore
import HeatmapLayer from 'react-leaflet-heatmap-layer';

interface IProps {
  fitBoundsOnUpdate?: boolean
}
const AccidentHeatLayer: FunctionComponent<IProps> = observer(({ fitBoundsOnUpdate = false }) => {
  const { mapStore, filterStore } = useStore();
  const { isDynamicMarkers } = mapStore;
  const { dataMarkersInBounds, dataMarkersLean, dataAllInjuries, isUse2StepsMarkers } = filterStore;
  let reactMarkers;
  if (isDynamicMarkers)
    reactMarkers = toJS(dataMarkersInBounds);
  else if (isUse2StepsMarkers) {
    reactMarkers = toJS(dataMarkersLean);
  }
  else {
    reactMarkers = toJS(dataAllInjuries);
  }
  //console.log("reactMarkers ", reactMarkers.length)
  let newArr: any[] = reactMarkers.map(x => [x.latitude, x.longitude, x._id])
  return (
    <HeatmapLayer
      fitBoundsOnLoad={fitBoundsOnUpdate}
      fitBoundsOnUpdate={fitBoundsOnUpdate}
      points={newArr}
      longitudeExtractor={(m: any) => m[1]}
      latitudeExtractor={(m: any) => m[0]}
      intensityExtractor={(m: any) => parseFloat(m[2])} />
  )
})
export default AccidentHeatLayer;
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
  const store = useStore();
  const { isDynamicMarkers, isUse2StepsMarkers } = store
  let reactMarkers;
  if (isDynamicMarkers)
    reactMarkers = toJS(store.dataMarkersInBounds);
  else if (isUse2StepsMarkers) {
    reactMarkers = toJS(store.dataMarkersLean);
  }
  else {
    reactMarkers = toJS(store.dataAllInjuries);
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
export default AccidentHeatLayer




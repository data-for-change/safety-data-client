import React, { FunctionComponent } from 'react'
import { observer } from "mobx-react"
import { toJS } from 'mobx'
//import L from 'leaflet'
import AccidentsMarker from '../molecules/AccidentsMarker'
import { useStore } from '../../stores/storeConfig'

interface IProps { }
const AccidentsMarkers: FunctionComponent<IProps> = observer(() => {
  const store = useStore();
  const { isDynamicMarkers, isUse2StepsMarkers, markersLoadStep , language } = store
  let markers;
  let reactMarkers;
  if (isDynamicMarkers)
    reactMarkers = toJS(store.dataMarkersInBounds);
  else if (isUse2StepsMarkers && markersLoadStep ===1){
    reactMarkers = toJS(store.dataMarkersLean);
    //console.log("lean Markers ", reactMarkers.length, markersLoadStep)
  }
  else {
    reactMarkers = toJS(store.dataAllInjuries);
    //console.log("Main Markers ", reactMarkers.length, markersLoadStep)
  }  
  console.log("reactMarkers ", reactMarkers.length, markersLoadStep)
  markers =  reactMarkers.map((x: any) => {
    if (x.latitude !== null && x.longitude !== null) {
      return <AccidentsMarker data={x} language={language} key={`marker-${x._id}`} />
    }
    else return null;
  });
//   const updateMarkers = (() => {
//     //console.log("updateMarkers")
//     if (store.isDynamicMarkers) {
//       const b = mapRef.current.leafletElement.getBounds()
//       store.submintGetMarkersBBox(b);
//     }
//   })
  return (
      <div>
        {markers}
    </div>
  )
})
export default AccidentsMarkers

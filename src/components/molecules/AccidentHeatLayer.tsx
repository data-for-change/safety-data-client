/* eslint-disable no-unused-vars */
import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// import L from 'leaflet'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { useStore } from '../../stores/storeConfig';
import { BBoxType } from '../../stores/MapStore';

interface IProps {
  fitBoundsOnUpdate?: boolean;
}
const AccidentHeatLayer: FunctionComponent<IProps> = observer(({ fitBoundsOnUpdate = false }) => {
  const { mapStore, filterStore } = useStore();
  const { bboxType, dataMarkersInBounds } = mapStore;
  const { dataMarkersLean, dataAllInjuries, isUse2StepsMarkers } = filterStore;
  let reactMarkers;
  if (bboxType !== BBoxType.NO_BBOX) reactMarkers = toJS(dataMarkersInBounds);
  else if (isUse2StepsMarkers) {
    reactMarkers = toJS(dataMarkersLean);
  } else {
    reactMarkers = toJS(dataAllInjuries);
  }
  // console.log("reactMarkers ", reactMarkers.length)
  const newArr: any[] = reactMarkers.map((x) => [x.latitude, x.longitude, x._id]);
  return (
    <HeatmapLayer
      fitBoundsOnLoad={fitBoundsOnUpdate}
      fitBoundsOnUpdate={fitBoundsOnUpdate}
      points={newArr}
      longitudeExtractor={(m: any) => m[1]}
      latitudeExtractor={(m: any) => m[0]}
      intensityExtractor={(m: any) => parseFloat(m[2])}
    />
  );
});
export default AccidentHeatLayer;

import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// import L from 'leaflet'
// @ts-ignore
import {HeatmapLayer} from 'react-leaflet-heatmap-layer-v3';
import { useStore } from '../../stores/storeConfig';
import { BBoxType } from '../../stores/MapStore';
// import logger from '../../services/logger';

interface IProps {
  fitBoundsOnUpdate?: boolean| undefined;
}
const AccidentHeatLayer: FunctionComponent<IProps> = observer(({ fitBoundsOnUpdate = false }: IProps) => {
  const { mapStore, filterStore } = useStore();
  const { bboxType, dataMarkersInBounds } = mapStore;
  const { dataMarkersLean, dataAllInjuries, isUse2StepsMarkers } = filterStore;
  let reactMarkers;
  debugger;
  if (bboxType !== BBoxType.NO_BBOX) reactMarkers = toJS(dataMarkersInBounds);
  else if (isUse2StepsMarkers) {
    reactMarkers = toJS(dataMarkersLean);
  } else {
    reactMarkers = toJS(dataAllInjuries);
  }
  // logger.log("reactMarkers ", reactMarkers.length)
  const newArr: any[] = reactMarkers.map((x) => [x.latitude, x.longitude, x._id]);
  //const newArr1: any[] =  [{32.08, 34.83, 1}]
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

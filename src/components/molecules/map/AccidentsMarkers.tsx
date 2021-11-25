import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// import L from 'leaflet'
import AccidentsMarker from './AccidentsMarker';
import MarkerSvg from './MarkerSvg';
import { useStore } from '../../../stores/storeConfig';
import { BBoxType } from '../../../stores/MapStore';
import logger from '../../../services/logger';

interface IProps { }
const AccidentsMarkers: FunctionComponent<IProps> = observer(() => {
  const { filterStore, mapStore, uiStore } = useStore();
  const {
    isUse2StepsMarkers, markersLoadStep, dataMarkersLean, dataAllInjuries,
  } = filterStore;
  const { bboxType, dataMarkersInBounds, useSmallMarkers, markerIconsType, markerColorType} = mapStore;
  let reactMarkers;
  if (bboxType !== BBoxType.NO_BBOX) reactMarkers = toJS(dataMarkersInBounds);
  else if (isUse2StepsMarkers && markersLoadStep === 1) {
    reactMarkers = toJS(dataMarkersLean);
  } else {
    reactMarkers = toJS(dataAllInjuries);
  }
  const markers = reactMarkers.map((x: any) => {
    try {
      if (x.latitude !== null && x.longitude !== null) {
        return <MarkerSvg data={x} 
                language={uiStore.language} 
                colorBy={markerColorType}
                markerIconsType={markerIconsType}
                key={`marker-${x._id}`} />;
        //return <AccidentsMarker data={x} language={uiStore.language} useSmallMarkers={useSmallMarkers} key={`marker-${x._id}`} />;
      }
      return null;
    } catch (error) {
      logger.error(error);
      return null;
    }
  });
  return (
    <div>
      {markers}
    </div>
  );
});
export default AccidentsMarkers;

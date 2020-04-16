import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// import L from 'leaflet'
import AccidentsMarker from '../molecules/AccidentsMarker';
import { useStore } from '../../stores/storeConfig';
import { BBoxType } from '../../stores/MapStore';

interface IProps { }
const AccidentsMarkers: FunctionComponent<IProps> = observer(() => {
  const { filterStore, mapStore, uiStore } = useStore();
  const {
    isUse2StepsMarkers, markersLoadStep, dataMarkersLean, dataAllInjuries,
  } = filterStore;
  let reactMarkers;
  if (mapStore.bboxType !== BBoxType.NO_BBOX) reactMarkers = toJS(mapStore.dataMarkersInBounds);
  else if (isUse2StepsMarkers && markersLoadStep === 1) {
    reactMarkers = toJS(dataMarkersLean);
  } else {
    reactMarkers = toJS(dataAllInjuries);
  }
  const markers = reactMarkers.map((x: any) => {
    try {
      if (x.latitude !== null && x.longitude !== null) {
        return <AccidentsMarker data={x} language={uiStore.language} key={`marker-${x._id}`} />;
      }
      return null;
    } catch (error) {
      console.error(error);
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

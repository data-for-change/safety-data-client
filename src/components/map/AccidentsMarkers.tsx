
import React, {FC} from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// import AccidentsMarker from './AccidentsMarker';
import MarkerSvg from './MarkerSvg';
import { useStore } from '../../stores/storeConfig';
import { BBoxType } from '../../stores/MapStore';
import Accident from '../../types/Accident';
//import CasualtyLean from '../../types/CasualtyLean';
import logger from '../../services/logger';
import 'leaflet/dist/leaflet.css';
 
interface IProps {
}

const AccidentsMarkers: FC<IProps> = observer(() => {
  const { filterStore, mapStore, uiStore } = useStore();
  const {
    isUse2StepsMarkers, markersLoadStep, dataMarkersLean, dataAllInjuries,
  } = filterStore;
  const { bboxType, dataMarkersInBounds, markerIconsType, markerColorType} = mapStore;
  let reactMarkers;
  if (bboxType !== BBoxType.NO_BBOX) reactMarkers = toJS(dataMarkersInBounds);
  else if (isUse2StepsMarkers && markersLoadStep === 1) {
    reactMarkers = toJS(dataMarkersLean);
  } else {
    reactMarkers = toJS(dataAllInjuries);
  }
  const markers = reactMarkers.map((x: Accident) => {
    try {
      if (x.latitude !== null && x.longitude !== null) {
        return <MarkerSvg data={x} 
                language={uiStore.language} 
                colorBy={markerColorType}
                markerIconsType={markerIconsType}
                key={`marker-${x._id}`} />;
        // return <AccidentsMarker data={x} language={uiStore.language} useSmallMarkers={useSmallMarkers} key={`marker-${x._id}`} />;
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

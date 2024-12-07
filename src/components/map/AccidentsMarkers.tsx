
import React, {FC} from 'react';
import { Marker, Popup} from 'react-leaflet';
import L, {LatLngTuple} from 'leaflet';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// import AccidentsMarker from './AccidentsMarker';
import MarkerSvg from './MarkerSvg';
import markerIcon from '../../assets/marker-icon.png.png';
import { useStore } from '../../stores/storeConfig';
import { store } from '../../stores/storeConfig';
import { BBoxType } from '../../stores/MapStore';
import Accident from '../../types/Accident';
import CasualtyLean from '../../types/CasualtyLean';
import logger from '../../services/logger';
import 'leaflet/dist/leaflet.css';

const iconSize = {
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
  };
const blue_ICON = new L.Icon({
    iconUrl: markerIcon,
    iconSize: L.point(iconSize.iconSize[0], iconSize.iconSize[1]),
    iconAnchor: L.point(iconSize.iconAnchor[0], iconSize.iconAnchor[1]),
    popupAnchor: L.point(iconSize.popupAnchor[0], iconSize.popupAnchor[1]),
    shadowSize: L.point(iconSize.shadowSize[0], iconSize.shadowSize[1]),
  }); 
 
interface IProps {
}
// const AccidentsMarkers: FC<IProps> = observer(() => { 
//     const {filterStore}=store;
//     const {
//       dataAllInjuries
//     } = filterStore;
//     const reactMarkers = toJS(dataAllInjuries);
//     console.log(reactMarkers);
//     const markers = reactMarkers.map((x: CasualtyLean) => {
//       try {
//         if (x.latitude !== null && x.longitude !== null) {
//           const position : LatLngTuple = [x.latitude, x.longitude] as LatLngTuple;
//           // return <Marker position={position} icon={blue_ICON}>
//           //   <Popup>
//           //       A pretty CSS3 popup. <br /> Easily customizable.
//           //   </Popup>
//           // </Marker>
//           return <MarkerSvg data={x} 
//                   language={uiStore.language} 
//                   colorBy={markerColorType}
//                   markerIconsType={markerIconsType}
//                   key={`marker-${x._id}`} />;
//           // return <AccidentsMarker data={x} language={uiStore.language} useSmallMarkers={useSmallMarkers} key={`marker-${x._id}`} />;
//         }
//         return null;
//       } catch (error) {
//         logger.error(error);
//         return null;
//       }
//     });
//     return (
//       <>
//         {markers}
//       </>
//     );
// });

// export default AccidentsMarkers;

/* import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// import L from 'leaflet'
//import AccidentsMarker from './AccidentsMarker';
import MarkerSvg from './MarkerSvg';
import { useStore } from '../../../stores/storeConfig';
import { BBoxType } from '../../../stores/MapStore';
import logger from '../../../services/logger';
import Accident from '../../../types/Accident';

interface IProps { }
*/
 const AccidentsMarkers: FC<IProps> = observer(() => {
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

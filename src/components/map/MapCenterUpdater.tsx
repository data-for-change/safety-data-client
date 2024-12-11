import { FC, useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface IPropsMapCenterUpdater {
  center: L.LatLng
}
/// update the map, on change in center (from store)
const MapCenterUpdater: FC<IPropsMapCenterUpdater> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (map && center) {
      map.setView([center.lat, center.lng]);
    }
  }, [map, center]);

  return null; // This component does not render anything
};

export default MapCenterUpdater;
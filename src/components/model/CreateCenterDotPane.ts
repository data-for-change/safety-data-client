import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const CreateCenterDotPane: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    if (!map.getPane('center-dot')) {
      const pane = map.createPane('center-dot');
      pane.style.zIndex = '650'; // above overlays
    }
  }, [map]);

  return null;
};

export default CreateCenterDotPane;

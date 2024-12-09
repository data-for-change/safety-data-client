import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../../stores/storeConfig';
import Legend from './Legend';
import './legend.css';

const LegendWarpper: React.FC<{}> = observer(() => {
  const { mapStore } = useStore();
  const { markerColorType } = mapStore;
  return (
    <Legend title={markerColorType}
  />
  );
});
export default LegendWarpper;
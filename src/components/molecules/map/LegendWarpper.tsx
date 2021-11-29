import React, { useRef, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useStore } from '../../../stores/storeConfig';
import Legend from './Legend';

interface IProps {
}
const LegendWarpper: React.FC<{}> = observer(() => {
  const { mapStore } = useStore();
  const {markerColorType} = mapStore;
  return (
    <Legend
    title={markerColorType}
    description={'description'}
  />
  );
});
export default LegendWarpper;
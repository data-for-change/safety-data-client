import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../stores/storeConfig';
import { observer } from 'mobx-react';
import Select from '../atoms/Select';
import 'leaflet/dist/leaflet.css';

const SelectMarkersIConType: FC<{}> = observer(() => {
  const { t } = useTranslation();
  const { mapStore } = useStore();
  const { markerIconsType, setMarkerIconsType, markerIconTypesArr } = mapStore;
  return (
    <div className='map-select-div' id="map.iconType">
      <span className='map-select-labelspan'>
        {t('MarkersIconType')}:
      </span>
      <span>
        <Select
          id='map.SelectMarkersIConType'
          value={markerIconsType}
          data={markerIconTypesArr}
          onChange={(val: string) => setMarkerIconsType(val)}
        />
      </span>
    </div>
  );
});
export default SelectMarkersIConType; 
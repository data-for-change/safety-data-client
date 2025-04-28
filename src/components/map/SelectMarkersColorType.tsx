import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../stores/storeConfig';
import { observer } from 'mobx-react';
import Select from '../atoms/Select';
import 'leaflet/dist/leaflet.css';

const SelectMarkersColorType: FC<{}> = observer(() => {
  const { t } = useTranslation();
  const { mapStore } = useStore();
  const { markerColorType, setMarkerColorType, markerColorTypesArr } = mapStore;
  return (
    <div className='map-select-div' id="map.iconColor">
      <span className='map-select-labelspan'>
        {t('MarkersColorType')}:
      </span>
      <span>
        <Select
          id='map.SelectMarkersColorType'
          value={markerColorType}
          data={markerColorTypesArr}
          onChange={(val: string) => setMarkerColorType(val)}
        />
      </span>
    </div>
  );
});
export default SelectMarkersColorType;
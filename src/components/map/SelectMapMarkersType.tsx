import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Select from '../atoms/Select';
import { useStore } from '../../stores/storeConfig';
import 'leaflet/dist/leaflet.css';

const SelectMapMarkersType: FC<{}> = observer(() => {
  const { t } = useTranslation();
  const { mapStore } = useStore();
  const { mapMarkersType, setMapMarkersType, mapMarkersTypesArr } = mapStore;
  const handleChange = (selectedVal: string) => {
    const selectedType = mapMarkersTypesArr.find(item => item.val === selectedVal)?.val;
    if (selectedType) {
      setMapMarkersType(selectedType);
    }
  };
  return (
    <div className='map-select-div' id="map.markersType">
      <span className='map-select-labelspan'>
        {t('MapMarkersType')}:
      </span>
      <span>
        <Select
          id='map.SelectMapMarkersType'
          value={mapMarkersType}
          data={mapMarkersTypesArr}
          onChange={(val: string) => handleChange(val)}
        />
      </span>
    </div>
  );
});
export default SelectMapMarkersType;
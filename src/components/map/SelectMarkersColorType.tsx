import React, {FC} from 'react';
import { useTranslation } from 'react-i18next'; 
import { useStore } from '../../stores/storeConfig';
import { observer } from 'mobx-react';
import Select from '../atoms/Select';

const styles = {
  divStyle: {
    display: 'flex',
  },
  labelspan: {
    marginTop: '7px',
    fontWeight: 700
  }
}

const SelectMarkersColorType: FC<{}> = observer(() => {
  const { t } = useTranslation();
  const { mapStore } = useStore();
  const { markerColorType, setMarkerColorType, markerColorTypesArr } = mapStore;
  return (
    <div style={styles.divStyle} id="map.iconColor">
      <span style={styles.labelspan}>
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
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
const SelectMarkersIConType: FC<{}> = observer(() => {
  const { t } = useTranslation();
  const { mapStore } = useStore();
  const { markerIconsType, setMarkerIconsType, markerIconTypesArr } = mapStore;
  return (
    <div style={styles.divStyle} id="map.iconType">
      <span style={styles.labelspan}>
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
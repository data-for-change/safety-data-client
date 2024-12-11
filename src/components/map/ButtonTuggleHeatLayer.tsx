import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import ButtonToggle from '../atoms/ButtonToggle';
import { useStore } from '../../stores/storeConfig';

const ButtonTuggleHeatLayer: FC<{}> = observer(() => {
      const { mapStore, filterStore } = useStore();
      const style = { width: '150px', height: '35px' }
      return (
        <ButtonToggle
          condtion={mapStore.heatLayerHidden}
          textTrue="HeatMap"
          textFalse="Markers"
          disabled={filterStore.isLoading}
          onClick={mapStore.toggleHeatLayer}
          style={style}
        />
      );
    });
 export default ButtonTuggleHeatLayer;
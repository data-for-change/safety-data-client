
import React, {FC} from 'react';
import { observer } from 'mobx-react';
import {useAccidentMarkers} from '../../hooks/useAccidentMarkers';
import MarkerSvg from './MarkerSvg';

const AccidentsMarkers: FC = observer(() => {
  const markers = useAccidentMarkers();

  return (
    <div>
      {markers.map((marker:any) => (
        <MarkerSvg
          key={marker.key}
          data={marker.data}
          language={marker.language}
          colorBy={marker.colorBy}
          markerIconsType={marker.markerIconsType}
        />
      ))}
    </div>
  );
});

export default AccidentsMarkers;
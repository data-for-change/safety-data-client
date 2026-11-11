
import React, {FC, useMemo} from 'react';
import { observer } from 'mobx-react';
import {useAccidentMarkers} from '../../hooks/useAccidentMarkers';
import { spreadOverlappingMarkers } from '../../utils';
import MarkerSvg from './MarkerSvg';

const AccidentsMarkers: FC = observer(() => {
  const markers = useAccidentMarkers();
  // accidents at the same coordinates would hide each other; spread them slightly
  const spreadMarkers = useMemo(() => spreadOverlappingMarkers(markers), [markers]);
  return (
    <div>
      {spreadMarkers.map((marker) => (
        <MarkerSvg
          key={marker.key}
          position={marker.position}
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

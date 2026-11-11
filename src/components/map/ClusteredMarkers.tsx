import React from "react";
import { observer } from "mobx-react";

import { useAccidentMarkers } from "../../hooks/useAccidentMarkers";
import MarkerSvg from "./MarkerSvg";

// Rendered inside <MarkerClusterGroup>, which does all the clustering and
// spiderfying (including accidents that share the exact same coordinates).
const ClusteredMarkers: React.FC = observer(() => {
  const markers = useAccidentMarkers();

  return (
    <>
      {markers.map((marker) => (
        <MarkerSvg
          key={marker.key}
          position={marker.position}
          data={marker.data}
          language={marker.language}
          colorBy={marker.colorBy}
          markerIconsType={marker.markerIconsType}
        />
      ))}
    </>
  );
});

export default ClusteredMarkers;

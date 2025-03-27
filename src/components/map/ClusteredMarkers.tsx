import React, { useMemo } from "react";
import { observer } from "mobx-react";
import { useAccidentMarkers } from "../../hooks/useAccidentMarkers";
import { clusterMarkers, generateClusterPositions } from "../../utils/mapUtils";
import MarkerSvg from "./MarkerSvg";
import "./map.css";

const ClusteredMarkers: React.FC = observer(() => {
  const markers = useAccidentMarkers();
  const clusteredMarkers = useMemo(() => clusterMarkers(markers), [markers]);

  return (
    <>
      {clusteredMarkers.map((cluster, index) => {
        if (cluster.length === 1) {
          // Single marker or zoomed-out - show as normal marker
          return (
            <MarkerSvg
              key={cluster[0].key}
              position={cluster[0].position}
              data={cluster[0].data}
              language={cluster[0].language}
              colorBy={cluster[0].colorBy}
              markerIconsType={cluster[0].markerIconsType}
            />
          );
        } else {
          // Clustered markers - show as flower arrangement
          const flowerPositions = generateClusterPositions(cluster[0].position, cluster.length);
          return flowerPositions.map((position, i) => (
            <MarkerSvg
              key={`${cluster[0].key}-${i}`}
              position={position}
              data={cluster[i].data}
              language={cluster[i].language}
              colorBy={cluster[i].colorBy}
              markerIconsType={cluster[i].markerIconsType}
            />
          ));
        }
      })}
    </>
  );
});

export default ClusteredMarkers;

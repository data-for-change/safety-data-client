import React, { useMemo } from "react";
import { observer } from "mobx-react";
import { Polyline, Marker } from "react-leaflet";
import L from "leaflet";

import ClusterCenterMarker from "./markers/ClusterCenterMarker";
import { useAccidentMarkers } from "../../hooks/useAccidentMarkers";
import { clusterMarkers, generateClusterPositions } from "../../utils";
import MarkerSvg from "./MarkerSvg";

const ClusteredMarkers: React.FC = observer(() => {
  const markers = useAccidentMarkers();
  const clusteredMarkers = useMemo(() => clusterMarkers(markers), [markers]);

  return (
    <>
      {clusteredMarkers.map((cluster) => {
        const center = cluster[0].position;

        if (cluster.length === 1) {
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
        }

        const flowerPositions = generateClusterPositions(center, cluster.length);

        return (
          <React.Fragment key={cluster[0].key}>
            {/* center red dot */}
            <ClusterCenterMarker position={center} />
            {flowerPositions.map((position, i) => (
              <React.Fragment key={`${cluster[0].key}-${i}`}>
                {/* line to center */}
                <Polyline
                  positions={[position, center]}
                  color="gray"
                  weight={1}
                  opacity={0.7}
                />
                {/* marker */}
                <MarkerSvg
                  position={position}
                  data={cluster[i].data}
                  language={cluster[i].language}
                  colorBy={cluster[i].colorBy}
                  markerIconsType={cluster[i].markerIconsType}
                />
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      })}
    </>
  );
});

export default ClusteredMarkers;
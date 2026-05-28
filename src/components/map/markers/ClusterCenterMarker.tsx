import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { LatLngExpression } from "leaflet";

type Props = {
  position: LatLngExpression;
};

const centerIcon = new L.DivIcon({
  className: "cluster-center-dot",
  iconAnchor: [5, 5],
  html: `
    <div style="
      width: 10px;
      height: 10px;
      background: red;
      border-radius: 50%;
      box-shadow: 0 0 0 2px white;
    "></div>
  `,
});

const ClusterCenterMarker: React.FC<Props> = ({ position }) => {
  return <Marker position={position} icon={centerIcon} />;
};

export default ClusterCenterMarker;
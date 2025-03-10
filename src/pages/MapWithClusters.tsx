import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L, { LatLngExpression } from "leaflet";

import orangeMarker from '../assets/marker-icon-2x-orange2.png';
import shadoMarker from '../assets/marker-shadow.png';
// import circleMarker from '../assets/circle_orange_20.png'
import '../components/map/map.css';

const iconSize = {
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
  };
  // const mIconSizes = {
  //   iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [1, -10],
  // };
const ORANGE_ICON = new L.Icon({
    iconUrl: orangeMarker,
    shadowUrl: shadoMarker,
    iconSize: L.point(iconSize.iconSize[0], iconSize.iconSize[1]),
    iconAnchor: L.point(iconSize.iconAnchor[0], iconSize.iconAnchor[1]),
    popupAnchor: L.point(iconSize.popupAnchor[0], iconSize.popupAnchor[1]),
    shadowSize: L.point(iconSize.shadowSize[0], iconSize.shadowSize[1]),
  });

  // const ORANGE_CIRCLE_ICON = new L.Icon({
  //   iconUrl: circleMarker,
  //   iconSize: L.point(iconSize.iconSize[0], iconSize.iconSize[1]),
  //   // iconAnchor: L.point(iconSize.iconAnchor[0], iconSize.iconAnchor[1]),
  //   popupAnchor: L.point(iconSize.popupAnchor[0], iconSize.popupAnchor[1]),
  // });

type MarkerData = {
  id: number;
  position: LatLngExpression;
  title: string;
};

// Function for creating custom icon for cluster group
// https://github.com/Leaflet/Leaflet.markercluster#customising-the-clustered-markers
// NOTE: iconCreateFunction is running by leaflet, which is not support ES6 arrow func syntax
// eslint-disable-next-line
const createClusterCustomIcon = function (cluster:any) {
  const allMarkers = cluster.getAllChildMarkers(); 
  const totalCount = allMarkers.length; 
  return L.divIcon({
    html: `<span>${totalCount}</span>`,
    className: 'marker-cluster-custom',
    iconSize: L.point(40, 40, true),
  });
};

const markers: MarkerData[] = [
  { id: 1, position: [51.505, -0.09], title: "Marker 1" },
  { id: 2, position: [51.505, -0.09], title: "Marker 2" },
  { id: 3, position: [51.51, -0.1], title: "Marker 3" },
  { id: 4, position: [51.51, -0.09], title: "Marker 4" },
];

const createFlower = (center: LatLngExpression, count: number): LatLngExpression[] => {
  const radius = 0.0005; // Adjust for spacing
  const angleStep = (2 * Math.PI) / count;
  return Array.from({ length: count }, (_, i) => {
    const angle = i * angleStep;
    const latOffset = radius * Math.sin(angle);
    const lngOffset = radius * Math.cos(angle);
    return [
      (center as [number, number])[0] + latOffset,
      (center as [number, number])[1] + lngOffset,
    ];
  });
};

const ClusteredMarkers: React.FC = () => {
  const map = useMap();
  const [currZoom, setCurrZoom] = React.useState(map.getZoom()); // Store the current zoom level

  // Listen for zoom events
  useMapEvents({
    zoomend: () => {
      setCurrZoom(map.getZoom()); // Update zoom level when the map zooms
    },
  });
  // const zoomThreshold = 15; // Define zoom level to "explode" clusters into flowers

  const clusteredMarkers = markers.reduce<MarkerData[][]>((clusters, marker) => {
    const existingCluster = clusters.find(cluster =>
      L.latLng(cluster[0].position).equals(L.latLng(marker.position))
    );
    if (existingCluster) {
      existingCluster.push(marker);
    } else {
      clusters.push([marker]);
    }
    return clusters;
  }, []);
  
  const icon: L.Icon = ORANGE_ICON;
  return (
    <>
      {clusteredMarkers.map((cluster, index) => {
        if (cluster.length === 1 ) {
          // Single marker or zoomed out - show as normal marker
          return (
            <Marker key={cluster[0].id} position={cluster[0].position} icon={icon}>
              <Popup>{cluster[0].title}</Popup>
            </Marker>
          );
        } else {
          // Flower arrangement for clustered markers
          const flowerPositions = createFlower(cluster[0].position, cluster.length);
          return flowerPositions.map((position, i) => (
            <Marker key={`${cluster[0].id}-${i}`} position={position} icon={icon}>
              <Popup>
                <div>
                  {cluster.map(marker => (
                    <div key={marker.id}>{marker.title}</div>
                  ))}
                </div>
              </Popup>
            </Marker>
          ));
        }
      })}
    </>
  );
};
  
  

const MapWithClusters: React.FC = () => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "80vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup 
        showCoverageOnHover={false}
        spiderfyDistanceMultiplier={2}
        iconCreateFunction={createClusterCustomIcon}>
        <ClusteredMarkers />
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapWithClusters;

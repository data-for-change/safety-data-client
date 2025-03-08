import React from "react";
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { useAccidentMarkers } from '../../hooks/useAccidentMarkers';
import MarkerSvg from './MarkerSvg';
import AccidentPopUp from './AccidentPopUp';
import { MarkerData, Accident } from '../../types';
import orangeMarker from '../../assets/marker-icon-2x-orange2.png';
import shadoMarker from '../../assets/marker-shadow.png';
import './map.css';

const iconSize = {
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
  };
  const mIconSizes = {
    iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [1, -10],
  };
const ORANGE_ICON = new L.Icon({
    iconUrl: orangeMarker,
    shadowUrl: shadoMarker,
    iconSize: L.point(iconSize.iconSize[0], iconSize.iconSize[1]),
    iconAnchor: L.point(iconSize.iconAnchor[0], iconSize.iconAnchor[1]),
    popupAnchor: L.point(iconSize.popupAnchor[0], iconSize.popupAnchor[1]),
    shadowSize: L.point(iconSize.shadowSize[0], iconSize.shadowSize[1]),
  });

type MarkerData1 = {
  key: number;
  position: LatLngExpression;
  markerIconsType: string;
  language: string;
};

// Function for creating custom icon for cluster group
// https://github.com/Leaflet/Leaflet.markercluster#customising-the-clustered-markers
// NOTE: iconCreateFunction is running by leaflet, which is not support ES6 arrow func syntax
// eslint-disable-next-line
const createClusterCustomIcon = function (cluster:any) {
  const test = cluster.length; //.getChildCount()
  return L.divIcon({
    html: `<span>${test}</span>`,
    className: 'marker-cluster-custom',
    iconSize: L.point(40, 40, true),
  });
};

// const accidentMock :Accident = {
//   _id: 1, latitude: 32.032, longitude: 34.739, accident_timestamp: "", day_in_week_hebrew: "",
//   day_night_hebrew: 'day',
//   injured_type_hebrew: "",
//   injury_severity_hebrew: "",
//   vehicle_vehicle_type_hebrew: "",
//   sex_hebrew: "",
//   age_group_hebrew: "",
//   population_type_hebrew: "",
//   road2: "",
//   road_type_hebrew: "",
//   accident_type_hebrew: "",
//   vehicles: ""
// } ;

// const markers1: MarkerData[] = [
//   { key: '1', position: [32.032, 34.739], markerIconsType: "Marker 1" , language:'he', colorBy: 'Severity', data:accidentMock},
//   { key: '2', position: [32.032, 34.739], markerIconsType: "Marker 2" , language:'he', colorBy: 'Severity', data:accidentMock},
//   { key: '3', position: [32.034, 34.742], markerIconsType: "Marker 3" , language:'he', colorBy: 'Severity', data:accidentMock},
//   { key: '4', position: [32.034, 34.746], markerIconsType: "Marker 4" , language:'he', colorBy: 'Severity', data:accidentMock},
// ];

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

const ClusteredMarkers: React.FC = observer(() => {
  const map = useMap();
  //const [currZoom, setCurrZoom] = React.useState(map.getZoom()); // Store the current zoom level

  // Listen for zoom events
  // useMapEvents({
  //   zoomend: () => {
  //     setCurrZoom(map.getZoom()); // Update zoom level when the map zooms
  //   },
  // });
  // const zoomThreshold = 15; // Define zoom level to "explode" clusters into flowers
  const markers = useAccidentMarkers();
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
            <MarkerSvg
              key={cluster[0].key}
              position={cluster[0].position}
              data={cluster[0].data}
              language={cluster[0].language}
              colorBy={cluster[0].colorBy}
              markerIconsType={cluster[0].markerIconsType}
            />
            // <Marker key={cluster[0].key} position={cluster[0].position} icon={icon}>
            //    <AccidentPopUp data={cluster[0].data} language={cluster[0].language} />
            //    {/* <Popup>{cluster[0].position.toString()}</Popup> */}
            // </Marker>
          );
        } else {
          // Flower arrangement for clustered markers
          const flowerPositions = createFlower(cluster[0].position, cluster.length);
          return flowerPositions.map((position, i) => (
            <MarkerSvg
              key={`${cluster[0].key}-${i}`}
              position={position}
              data={cluster[i].data}
              language={cluster[i].language}
              colorBy={cluster[i].colorBy}
              markerIconsType={cluster[i].markerIconsType}
            />
            //  <Marker key={`${cluster[0].key}-${i}`} position={position} icon={icon}>
            //   <Popup>
            //     <div>
            //       {cluster.map(marker => (
            //         // <div key={marker.key}>{marker.position.toString()}</div>
            //         <div key={marker.key}>{marker.position.toString() + ',' + marker.data.injured_type_hebrew +',' + marker.data.accident_timestamp}</div>
            //       ))}
            //     </div>
            //   </Popup>
            // </Marker> 
          ));
        }
      })}
    </>
  );
});
  
export default ClusteredMarkers;

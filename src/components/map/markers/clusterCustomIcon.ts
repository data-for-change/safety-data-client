import L from 'leaflet';
// Function for creating custom icon for cluster group
// https://github.com/Leaflet/Leaflet.markercluster#customising-the-clustered-markers
// NOTE: iconCreateFunction is running by leaflet, which is not support ES6 arrow func syntax
// eslint-disable-next-line
export const createClusterCustomIcon = function (cluster: any) {  
  const allMarkers = cluster.getAllChildMarkers();
  const severities = allMarkers.map((m: any) => m.options.severity);
  // Determine dominant or worst severity
  let color = '#E6C153'; // default yellow
  if (severities.includes(1)) color = '#A0202F';
  else if (severities.includes(2)) color = '#D87F1D';
  const totalCount = allMarkers.length;
  return L.divIcon({
    html: `<div style="
      background: ${color};
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      border: 2px solid white;
    ">
      <span>${totalCount}</span>
    </div>`,
    className: 'marker-cluster-custom', // optional if you want to apply additional CSS
    iconSize: L.point(30, 30, true),
  });
};
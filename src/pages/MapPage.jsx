import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from '../assets/marker-icon.png.png'

const iconSize = {
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
  };
const blue_ICON = new L.Icon({
    iconUrl: markerIcon,
    iconSize: L.point(iconSize.iconSize[0], iconSize.iconSize[1]),
    iconAnchor: L.point(iconSize.iconAnchor[0], iconSize.iconAnchor[1]),
    popupAnchor: L.point(iconSize.popupAnchor[0], iconSize.popupAnchor[1]),
    shadowSize: L.point(iconSize.shadowSize[0], iconSize.shadowSize[1]),
  }); 
  
function MapPage() {
    const position = [51.505, -0.09];
    return (
        <>
        <div><h1>map demo</h1></div>
        <div id="map">
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100vh', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                 <Marker position={position} icon={blue_ICON}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                 </Marker>
            </MapContainer>
        </div>
        </>
    );
}

export default MapPage;
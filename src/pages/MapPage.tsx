import React, {FC} from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L, {LatLngTuple} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from '../assets/marker-icon.png.png'
import { observer } from 'mobx-react';
import { store } from '../stores/storeConfig';

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
 
interface IProps {
}
const MapPage: FC<IProps> = observer(() => { 
    const {filterStore}=store;
    const {isLoading}  = filterStore;
    console.log("isloading1 ", isLoading);
    
    const position : LatLngTuple = [51.505, -0.09] as LatLngTuple;
    return (
        <>
        <div><h1>map demo</h1></div>
        <label>
            <input
                type="checkbox"
                checked={isLoading}
                onChange={(e) => filterStore.setIsLoading(e.target.checked)}
            />
            {isLoading ? "Loading" : "Not Loading"}
        </label>
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
});

export default MapPage;
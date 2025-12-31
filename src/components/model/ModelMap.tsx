import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { Map as LeafletMap, LatLngTuple } from 'leaflet';
import type { ClusterRow } from '../../types';
import { Card } from 'react-bootstrap';
import '../map/map.css';
import 'leaflet/dist/leaflet.css';
import ModelClusterMarkers from './ModelClusterMarkers';

type Props = {
    clusters: ClusterRow[];
    isHeat: boolean;
    sizeHeat : number;
};

/** ---------- Auto-fit map to clusters ---------- */
const FitBounds: React.FC<{ clusters: ClusterRow[] }> = ({ clusters }) => {
    const map = useMap();

    React.useEffect(() => {
        if (!clusters.length) return;

        const bounds = L.latLngBounds(
            clusters.map(c => [c.latitude, c.longitude])
        );

        map.fitBounds(bounds, { padding: [30, 30] });
    }, [clusters, map]);

    return null;
};

export const ModelMap: React.FC<Props> = ({ clusters, isHeat, sizeHeat}) => {
    const mapRef = useRef<LeafletMap | null>(null);
    return (
        <Card style={{ height: '100%', padding: '0' }}>
            <div id="map" style={{ height: '90%', width: '100%' }}>
                <MapContainer center={[32.0853, 34.7818]}
                    zoom={13}
                    ref={mapRef}
                    scrollWheelZoom={true}
                    //   whenReady={handleMapReady}
                    style={{ height: '74vh', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ModelClusterMarkers clusters={clusters} colorBy='1' isHeat={isHeat} sizeHeat={sizeHeat} />
                </MapContainer>
            </div>
        </Card>
    );
};

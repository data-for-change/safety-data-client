import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Card } from 'react-bootstrap';
import '../map/map.css';
import 'leaflet/dist/leaflet.css';
import type { MatchedAccidentRow, UnmatchedAccidentRow, StreetSection } from '../../services/accidentSectionMatcher';
import { buildSeveritySectors, getSeverityColor } from './modelhelper';
import CreateCenterDotPane from './CreateCenterDotPane';

type Props = {
	matched: MatchedAccidentRow[];
	unmatched: UnmatchedAccidentRow[];
	streetSections: StreetSection[] | null;
};

const UNMATCHED_COLOR = '#9E9E9E';

function severityToIndex(severity: string): number {
	if (severity === 'הרוג') return 3;
	if (severity === 'פצוע קשה') return 2;
	if (severity === 'פצוע קל') return 1;
	return 0;
}

const FitBounds: React.FC<{ matched: MatchedAccidentRow[]; unmatched: UnmatchedAccidentRow[] }> = ({ matched, unmatched }) => {
	const map = useMap();

	React.useEffect(() => {
		const points: [number, number][] = [
			...matched.map((r) => [r.latitude, r.longitude] as [number, number]),
			...unmatched.map((r) => [r.latitude, r.longitude] as [number, number]),
		];
		if (!points.length) return;
		map.fitBounds(L.latLngBounds(points), { padding: [30, 30] });
	}, [matched, unmatched, map]);

	return null;
};

export const SectionsMap: React.FC<Props> = ({ matched, unmatched, streetSections }) => {
	const severityIndices = matched.map((r) => severityToIndex(r.severity));
	const min = severityIndices.length ? Math.min(...severityIndices) : 0;
	const max = severityIndices.length ? Math.max(...severityIndices) : 0;
	const sectors = buildSeveritySectors(min, max);

	const matchedSectionIds = React.useMemo(() => new Set(matched.map((r) => r.sectionId)), [matched]);

	return (
		<Card style={{ height: '100%', padding: '0' }}>
			<div style={{ height: '74vh', width: '100%' }}>
				<MapContainer center={[32.0853, 34.7818]} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
					<CreateCenterDotPane />
					<FitBounds matched={matched} unmatched={unmatched} />

					{streetSections?.map((section) => {
						const positions = section.geometry.polyline.map((p) => [p.lat, p.lng] as [number, number]);
						const isUsed = matchedSectionIds.has(section.id);
						return (
							<Polyline
								key={section.id}
								positions={positions}
								pathOptions={{ color: isUsed ? '#2196F3' : '#90CAF9', weight: isUsed ? 4 : 2, opacity: isUsed ? 0.9 : 0.4 }}
							>
								<Popup>
									{section.streetName}<br />
									LAMAS: {section.lamas_id ?? '—'}
								</Popup>
							</Polyline>
						);
					})}

					{matched.map((row) => {
						const color = getSeverityColor(severityToIndex(row.severity), sectors, false);
						return (
							<CircleMarker
								key={row.accidentId}
								center={[row.latitude, row.longitude]}
								radius={8}
								pathOptions={{ color, fillColor: color, weight: 1, fillOpacity: 1 }}
							>
								<Popup>
									<strong>{row.severity}</strong>
									<br />
									{row.accidentStreet1 && (
										<>
											{row.accidentStreet1} ({row.accidentStreet1Id})<br />
										</>
									)}
									{row.accidentStreet2 && (
										<>
											{row.accidentStreet2} ({row.accidentStreet2Id})<br />
										</>
									)}
									LAMAS: {row.matchedLamasId ?? '—'}
									<br />
									{row.latitude.toFixed(5)}, {row.longitude.toFixed(5)}
								</Popup>
							</CircleMarker>
						);
					})}

					{unmatched.map((row) => (
						<CircleMarker
							key={row.accidentId}
							center={[row.latitude, row.longitude]}
							radius={8}
							pathOptions={{ color: UNMATCHED_COLOR, fillColor: UNMATCHED_COLOR, fillOpacity: 1, weight: 1 }}
						>
							<Popup>
								<strong>Unmatched</strong>
								<br />
								{row.accidentType}
								<br />
								{row.accidentStreet1 && (
									<>
										{row.accidentStreet1} ({row.accidentStreet1Id})<br />
									</>
								)}
								{row.accidentStreet2 && (
									<>
										{row.accidentStreet2} ({row.accidentStreet2Id})<br />
									</>
								)}
								{row.latitude.toFixed(5)}, {row.longitude.toFixed(5)}
							</Popup>
						</CircleMarker>
					))}
				</MapContainer>
			</div>
		</Card>
	);
};

export default SectionsMap;

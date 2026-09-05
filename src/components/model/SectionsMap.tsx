import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Card } from 'react-bootstrap';
import '../map/map.css';
import 'leaflet/dist/leaflet.css';
import { getSectionDisplayName } from '../../services/accidentSectionMatcher';
import type { MatchedAccidentRow, UnmatchedAccidentRow, StreetSection } from '../../services/accidentSectionMatcher';
import type { ModelSeverityMode } from '../../types';
import type { RootState } from '../../stores/types';
import { buildSeveritySectors, buildSectionScores, getSectionScoreColor } from './modelhelper';
import CreateCenterDotPane from './CreateCenterDotPane';
import AccidentPopUp from '../map/AccidentPopUp';

type Props = {
	matched: MatchedAccidentRow[];
	unmatched: UnmatchedAccidentRow[];
	streetSections: StreetSection[] | null;
	severityMode: ModelSeverityMode;
	sectionStrokeWidth: number;
	showAccidentPoints: boolean;
};

const UNMATCHED_COLOR = '#9E9E9E';

const ACCIDENT_SEVERITY_COLORS: Record<string, string> = {
	הרוג: '#D32F2F',
	'פצוע קשה': '#F57C00',
	'פצוע קל': '#FBC02D',
};

function getAccidentColor(severity: string): string {
	return ACCIDENT_SEVERITY_COLORS[severity] ?? ACCIDENT_SEVERITY_COLORS['פצוע קל'];
}

const FitBounds: React.FC<{ matched: MatchedAccidentRow[]; unmatched: UnmatchedAccidentRow[] }> = ({ matched, unmatched }) => {
	const map = useMap();
	const hasFitted = React.useRef(false);

	React.useEffect(() => {
		if (hasFitted.current) return;
		const points: [number, number][] = [
			...matched.map((r) => [r.latitude, r.longitude] as [number, number]),
			...unmatched.map((r) => [r.latitude, r.longitude] as [number, number]),
		];
		if (!points.length) return;
		map.fitBounds(L.latLngBounds(points), { padding: [30, 30] });
		hasFitted.current = true;
	}, [matched, unmatched, map]);

	return null;
};

export const SectionsMap: React.FC<Props> = ({ matched, unmatched, streetSections, severityMode, sectionStrokeWidth, showAccidentPoints }) => {
	const { t } = useTranslation();
	const { language } = useSelector((state: RootState) => state.appUi);

	// slider goes 1-10, mapped to an actual stroke weight of 10-20px
	const sectionWeight = 10 + ((sectionStrokeWidth - 1) * (20 - 10)) / (10 - 1);

	const sectionScores = React.useMemo(() => buildSectionScores(matched, severityMode), [matched, severityMode]);

	const scoreSectors = React.useMemo(() => {
		const scores = Array.from(sectionScores.values()).map((s) => s.score);
		const min = scores.length ? Math.min(...scores) : 0;
		const max = scores.length ? Math.max(...scores) : 0;
		return buildSeveritySectors(min, max);
	}, [sectionScores]);

	const pStyle = {
		color: '#004ba0',
	};

	return (
		<Card style={{ height: '100%', padding: '0' }}>
			<div style={{ height: '70vh', width: '100%' }}>
				<MapContainer center={[32.0853, 34.7818]} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
					<CreateCenterDotPane />
					<FitBounds matched={matched} unmatched={unmatched} />

					{streetSections
						?.filter((section) => sectionScores.has(section.id))
						.map((section) => {
							const positions = section.geometry.polyline.map((p) => [p.lat, p.lng] as [number, number]);
							const score = sectionScores.get(section.id)!;
							const color = getSectionScoreColor(score.score, scoreSectors);
							return (
								<Polyline
									key={section.id}
									positions={positions}
									pathOptions={{ color, weight: sectionWeight, opacity: 0.9 }}
								>
									<Popup>
										<div style={{ fontSize: '14px' }} className={`text${language}`}>
											<strong>{getSectionDisplayName(section)}</strong>
											<br />
											<div>
												<span style={pStyle}>{t('killed')}: </span>
												{score.killed}
											</div>
											<div>
												<span style={pStyle}>{t('severely-injured')}: </span>
												{score.severelyInjured}
											</div>
										</div>
									</Popup>
								</Polyline>
							);
						})}

					{showAccidentPoints &&
						matched.map((row) => {
							const color = getAccidentColor(row.severity);
							return (
								<CircleMarker
									key={row.accidentId}
									center={[row.latitude, row.longitude]}
									radius={6}
									pathOptions={{ color: '#D32F2F', fillColor: color, weight: 1, fillOpacity: 1 }}
								>
									<AccidentPopUp data={row.raw} language={language} />
								</CircleMarker>
							);
						})}

					{showAccidentPoints &&
						unmatched.map((row) => (
							<CircleMarker
								key={row.accidentId}
								center={[row.latitude, row.longitude]}
								radius={5}
								pathOptions={{ color: UNMATCHED_COLOR, fillColor: UNMATCHED_COLOR, fillOpacity: 1, weight: 1 }}
							>
								<Popup>
									<strong>{t('Unmatched')}</strong>
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
								</Popup>
							</CircleMarker>
						))}
				</MapContainer>
			</div>
		</Card>
	);
};;

export default SectionsMap;

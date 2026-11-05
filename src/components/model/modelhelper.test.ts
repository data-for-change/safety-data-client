import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { Accident } from '../../types';
import { ModelFilterType } from '../../types';
import type { StreetSection } from '../../services/accidentSectionMatcher';
import { mapAccidentsToStreetSections } from '../../services/accidentSectionMatcher';
import {
	JUNCTION_HEB_VAL,
	buildClusterTable,
	buildDensityClustersTable,
	buildMunicipalCrossroadRows,
	buildMunicipalCrossroads,
	buildOsmStreetRows,
	buildSectionScores,
	calculateKernelDensity,
	clusterPoints,
	filterNearCrossroads,
} from './modelhelper';

const EXACT = 'עיגון מדויק';
const STREET_ROAD = 'עירונית לא בצומת';
const BASE_LAT = 32.08;
const BASE_LNG = 34.78;
// ~1.11m per 1e-5 degree of latitude
const metersNorth = (m: number) => BASE_LAT + m / 111_320;

let nextId = 1;
function acc(over: Partial<Accident> = {}): Accident {
	return {
		_id: nextId++,
		latitude: BASE_LAT,
		longitude: BASE_LNG,
		accident_year: '2023',
		accident_timestamp: '',
		day_in_week_hebrew: '',
		day_night_hebrew: '',
		injured_type_hebrew: '',
		injury_severity_hebrew: 'פצוע קל',
		vehicle_vehicle_type_hebrew: 'רכב פרטי',
		sex_hebrew: '',
		age_group_hebrew: '',
		population_type_hebrew: '',
		road2: '',
		road_type_hebrew: STREET_ROAD,
		location_accuracy_hebrew: EXACT,
		accident_type_hebrew: '',
		vehicles: '',
		...over,
	} as Accident;
}
const junctionAcc = (over: Partial<Accident> = {}) => acc({ road_type_hebrew: JUNCTION_HEB_VAL, ...over });

function section(id: string, line: [number, number][], names?: { from?: string; to?: string }, streetName = `street-${id}`): StreetSection {
	const lats = line.map((p) => p[0]);
	const lngs = line.map((p) => p[1]);
	return {
		id,
		streetName,
		geometry: { polyline: line.map(([lat, lng]) => ({ lat, lng })) },
		bounds: { minLat: Math.min(...lats), maxLat: Math.max(...lats), minLng: Math.min(...lngs), maxLng: Math.max(...lngs) },
		junctionNames: names,
	};
}

// a "+" crossroad at (BASE_LAT, BASE_LNG): four segments all ending at the center
const CENTER: [number, number] = [BASE_LAT, BASE_LNG];
const D = 0.002; // ~200m arms
function plusCrossroad(prefix: string, center: [number, number], name: string): StreetSection[] {
	const [lat, lng] = center;
	return [
		section(`${prefix}-n`, [[lat + D, lng], center], { to: name }, name),
		section(`${prefix}-s`, [[lat - D, lng], center], { to: name }, name),
		section(`${prefix}-e`, [[lat, lng + D], center], { to: name }, name),
		section(`${prefix}-w`, [[lat, lng - D], center], { to: name }, name),
	];
}

describe('clusterPoints', () => {
	it('drops junction accidents that are not exactly anchored', () => {
		const clusters = clusterPoints([junctionAcc({ location_accuracy_hebrew: 'עיגון עקיף' }), acc({ street1_hebrew: 'A' })], 50);
		expect(clusters.flat()).toHaveLength(1);
		expect(clusters.flat()[0].road_type_hebrew).toBe(STREET_ROAD);
	});

	it('clusters accidents within the radius of a junction and respects the radius', () => {
		const points = [junctionAcc(), acc({ latitude: metersNorth(30) }), acc({ latitude: metersNorth(80) })];
		const small = clusterPoints(points, 50);
		expect(small[0]).toHaveLength(2); // junction + the 30m one
		const large = clusterPoints(points, 100);
		expect(large[0]).toHaveLength(3);
	});

	it('groups the remaining accidents by street name', () => {
		const clusters = clusterPoints([acc({ street1_hebrew: 'A' }), acc({ street1_hebrew: 'A' }), acc({ street1_hebrew: 'B' })], 50);
		expect(clusters.map((c) => c.length).sort()).toEqual([1, 2]);
	});
});

describe('buildClusterTable by mode', () => {
	const points = [
		junctionAcc({ street1_hebrew: 'X', street2_hebrew: 'Y' }),
		junctionAcc({ latitude: metersNorth(500), street1_hebrew: 'P', street2_hebrew: 'Q' }),
		acc({ latitude: metersNorth(2000), street1_hebrew: 'S1' }),
		acc({ latitude: metersNorth(2000), street1_hebrew: 'S1' }),
		acc({ latitude: metersNorth(4000), street1_hebrew: 'S2' }),
	];
	const clusters = clusterPoints(points, 50);

	it('Crossroads returns only junction rows', () => {
		const rows = buildClusterTable(clusters, 1, ModelFilterType.Crossroads, 30);
		expect(rows).toHaveLength(2);
		expect(rows.every((r) => r.roadType === 'Junction')).toBe(true);
	});

	it('Streets returns only street rows, sorted by severity desc', () => {
		const rows = buildClusterTable(clusters, 1, ModelFilterType.Streets, 30);
		expect(rows.map((r) => r.name)).toEqual(['S1', 'S2']);
		expect(rows.every((r) => r.roadType === 'Street')).toBe(true);
		expect(rows[0].severityIndex).toBeGreaterThanOrEqual(rows[1].severityIndex);
	});

	it('Segments returns no point rows', () => {
		expect(buildClusterTable(clusters, 1, ModelFilterType.Segments, 30)).toEqual([]);
	});

	it('All returns both kinds, capped by maxClusters', () => {
		const rows = buildClusterTable(clusters, 1, ModelFilterType.All, 30);
		expect(new Set(rows.map((r) => r.roadType))).toEqual(new Set(['Junction', 'Street']));
		expect(buildClusterTable(clusters, 1, ModelFilterType.All, 2)).toHaveLength(2);
	});

	it('severity mode changes the index (fatal = 2.5)', () => {
		const fatal = clusterPoints([acc({ injury_severity_hebrew: 'הרוג', street1_hebrew: 'Z' })], 50);
		expect(buildClusterTable(fatal, 1, ModelFilterType.Streets)[0].severityIndex).toBe(1);
		expect(buildClusterTable(fatal, 4, ModelFilterType.Streets)[0].severityIndex).toBe(2.5);
	});
});

describe('buildDensityClustersTable by mode', () => {
	const pts = [
		junctionAcc(),
		junctionAcc({ latitude: metersNorth(10) }),
		acc({ latitude: metersNorth(1000) }),
		acc({ latitude: metersNorth(1010) }),
	];
	const density = calculateKernelDensity(pts, 100);

	it('filters Crossroads / Streets / Segments / All', () => {
		expect(buildDensityClustersTable(density, ModelFilterType.Crossroads, 10).every((r) => r.roadType === 'Junction')).toBe(true);
		expect(buildDensityClustersTable(density, ModelFilterType.Streets, 10).every((r) => r.roadType === 'Street')).toBe(true);
		expect(buildDensityClustersTable(density, ModelFilterType.Segments, 10)).toEqual([]);
		expect(buildDensityClustersTable(density, ModelFilterType.All, 10)).toHaveLength(4);
	});

	it('respects topX', () => {
		expect(buildDensityClustersTable(density, ModelFilterType.All, 2)).toHaveLength(2);
	});
});

describe('buildMunicipalCrossroads', () => {
	it('finds a crossroad where 4 segments meet', () => {
		const result = buildMunicipalCrossroads(plusCrossroad('a', CENTER, 'Dizengoff'));
		expect(result).toHaveLength(1);
		expect(result[0].name).toBe('Dizengoff');
		expect(result[0].ends).toBe(4);
		expect(result[0].lat).toBeCloseTo(BASE_LAT, 6);
	});

	it('ignores plain segment breaks (only 2 segments meet)', () => {
		const two = [section('a', [[BASE_LAT, BASE_LNG - D], CENTER]), section('b', [CENTER, [BASE_LAT, BASE_LNG + D]])];
		expect(buildMunicipalCrossroads(two)).toHaveLength(0);
	});

	it('merges endpoints within 15m into one crossroad but not endpoints 50m apart', () => {
		const near = [
			section('a', [[metersNorth(200), BASE_LNG], [metersNorth(5), BASE_LNG]]),
			section('b', [[metersNorth(-200), BASE_LNG], [metersNorth(-5), BASE_LNG]]),
			section('c', [[BASE_LAT, BASE_LNG + D], [BASE_LAT, BASE_LNG]]),
		];
		expect(buildMunicipalCrossroads(near)).toHaveLength(1);
		const far = [
			section('a', [[metersNorth(200), BASE_LNG], [metersNorth(50), BASE_LNG]]),
			section('b', [[metersNorth(-200), BASE_LNG], [metersNorth(-50), BASE_LNG]]),
			section('c', [[BASE_LAT, BASE_LNG + D], [BASE_LAT, BASE_LNG]]),
		];
		expect(buildMunicipalCrossroads(far)).toHaveLength(0);
	});

	it('names a crossroad after the two most frequent streets meeting there and lists all of them', () => {
		const [lat, lng] = CENTER;
		const result = buildMunicipalCrossroads([
			section('ns1', [[lat + D, lng], CENTER], { to: 'Beta' }, 'Alpha'),
			section('ns2', [[lat - D, lng], CENTER], { to: 'Beta' }, 'Alpha'),
			section('ew1', [[lat, lng + D], CENTER], { to: 'Alpha / Gamma' }, 'Beta'),
			section('ew2', [[lat, lng - D], CENTER], { to: 'Alpha' }, 'Beta'),
		]);
		expect(result).toHaveLength(1);
		expect(result[0].name).toBe('Alpha / Beta');
		expect(result[0].streets).toEqual(['Alpha', 'Beta', 'Gamma']);
	});

	it('keeps separate crossroads separate', () => {
		const sections = [...plusCrossroad('a', CENTER, 'A'), ...plusCrossroad('b', [BASE_LAT + 0.02, BASE_LNG], 'B')];
		expect(buildMunicipalCrossroads(sections).map((c) => c.name).sort()).toEqual(['A', 'B']);
	});
});

describe('buildMunicipalCrossroadRows + filterNearCrossroads', () => {
	const crossroads = buildMunicipalCrossroads([...plusCrossroad('a', CENTER, 'A'), ...plusCrossroad('b', [BASE_LAT + 0.02, BASE_LNG], 'B')]);
	const accidents = [
		acc({ latitude: metersNorth(10) }), // 10m from A
		acc({ latitude: metersNorth(40) }), // 40m from A
		acc({ latitude: metersNorth(90) }), // 90m from A
		acc({ latitude: BASE_LAT + 0.02, injury_severity_hebrew: 'הרוג' }), // on B
		acc({ latitude: BASE_LAT + 0.01 }), // between the two, far from both
	];

	it('counts only accidents within the radius of each pin', () => {
		const rows50 = buildMunicipalCrossroadRows(crossroads, accidents, 50);
		expect(rows50.find((r) => r.name === 'A')?.count).toBe(2);
		expect(rows50.find((r) => r.name === 'B')?.count).toBe(1);
		const rows100 = buildMunicipalCrossroadRows(crossroads, accidents, 100);
		expect(rows100.find((r) => r.name === 'A')?.count).toBe(3);
		// 5m: only the fatal accident standing exactly on B is left
		expect(buildMunicipalCrossroadRows(crossroads, accidents, 5).map((r) => r.name)).toEqual(['B']);
	});

	it('applies severity mode, sorts desc and caps the result', () => {
		const rows = buildMunicipalCrossroadRows(crossroads, accidents, 50, 4);
		// mode 4: A has 2 light injuries (2) vs B with 1 fatal (2.5) -> B first
		expect(rows.map((r) => r.name)).toEqual(['B', 'A']);
		expect(rows.map((r) => r.severityIndex)).toEqual([2.5, 2]);
		expect(buildMunicipalCrossroadRows(crossroads, accidents, 50, 4, 1)).toHaveLength(1);
	});

	it('filterNearCrossroads keeps exactly the accidents inside the radius', () => {
		expect(filterNearCrossroads(accidents, crossroads, 50)).toHaveLength(3);
		expect(filterNearCrossroads(accidents, crossroads, 100)).toHaveLength(4);
		expect(filterNearCrossroads(accidents, [], 100)).toHaveLength(0);
	});

	it('near and far partition the accidents (what Crossroads vs Segments show on the section map)', () => {
		const near = new Set(filterNearCrossroads(accidents, crossroads, 50));
		const far = accidents.filter((a) => !near.has(a));
		expect(near.size + far.length).toBe(accidents.length);
		expect(near.size).toBe(3);
		expect(far).toHaveLength(2);
	});
});

describe('OSM streets matching and rows', () => {
	// two parallel OSM-like streets (no lamas ids), ~110m apart
	const street1 = section('osm-1', [[BASE_LAT, BASE_LNG], [BASE_LAT, BASE_LNG + 0.004]]);
	const street2 = section('osm-2', [[metersNorth(110), BASE_LNG], [metersNorth(110), BASE_LNG + 0.004]]);
	street1.streetName = 'Alpha';
	street2.streetName = 'Beta';

	const accidents = [
		acc({ latitude: metersNorth(5), longitude: BASE_LNG + 0.001 }), // 5m from Alpha
		acc({ latitude: metersNorth(8), longitude: BASE_LNG + 0.002, injury_severity_hebrew: 'הרוג' }), // Alpha
		acc({ latitude: metersNorth(105), longitude: BASE_LNG + 0.001 }), // Beta
		acc({ latitude: metersNorth(55), longitude: BASE_LNG + 0.001 }), // between, >20m from both
		acc({ latitude: metersNorth(5), longitude: BASE_LNG - 0.05 }), // far away
	];

	it('matches by geometry only, within maxDistance', () => {
		const { matched, unmatched } = mapAccidentsToStreetSections(accidents, [street1, street2], { maxDistanceMeters: 20, enableGeoOnlyFallback: true });
		expect(matched.map((m) => m.streetNameFromJson).sort()).toEqual(['Alpha', 'Alpha', 'Beta']);
		expect(unmatched).toHaveLength(2);
		// the wider max distance only takes effect together with a matching bounds padding (as useStreetSections passes it)
		const wide = mapAccidentsToStreetSections(accidents, [street1, street2], { maxDistanceMeters: 60, boundsPaddingMeters: 60, enableGeoOnlyFallback: true });
		expect(wide.matched.length).toBe(4);
	});

	it('without the geo fallback nothing matches (no lamas ids)', () => {
		const { matched } = mapAccidentsToStreetSections(accidents, [street1, street2], { maxDistanceMeters: 20, enableGeoOnlyFallback: false });
		expect(matched).toHaveLength(0);
	});

	it('buildOsmStreetRows groups per street, scores by severity mode, pins on a real accident', () => {
		const { matched } = mapAccidentsToStreetSections(accidents, [street1, street2], { maxDistanceMeters: 20, enableGeoOnlyFallback: true });
		const rows = buildOsmStreetRows(matched, 1);
		expect(rows.map((r) => [r.name, r.count, r.severityIndex])).toEqual([['Alpha', 2, 2], ['Beta', 1, 1]]);
		expect(rows.every((r) => r.roadType === 'Street')).toBe(true);
		const alphaPin = rows[0];
		expect(matched.some((m) => m.latitude === alphaPin.latitude && m.longitude === alphaPin.longitude)).toBe(true);
		// fatal = 2.5 in mode 4 -> Alpha = 3.5
		expect(buildOsmStreetRows(matched, 4)[0].severityIndex).toBe(3.5);
		expect(buildOsmStreetRows(matched, 1, 1)).toHaveLength(1);
	});

	it('buildSectionScores counts killed and severely injured per section', () => {
		const { matched } = mapAccidentsToStreetSections(accidents, [street1, street2], { maxDistanceMeters: 20, enableGeoOnlyFallback: true });
		const scores = buildSectionScores(matched, 1);
		expect(scores.get('osm-1')).toEqual({ score: 2, killed: 1, severelyInjured: 0 });
		expect(scores.get('osm-2')?.score).toBe(1);
	});
});

// sanity checks against the real generated Tel Aviv data files
describe('real Tel Aviv data files', () => {
	const read = (f: string) => JSON.parse(readFileSync(path.resolve(__dirname, '../../../public/data', f), 'utf-8')) as StreetSection[];
	const municipal = read('telAviv_streets.json');
	const osm = read('telAviv_osm_streets.json');

	it('OSM streets have the StreetSection shape and sit inside Tel Aviv', () => {
		expect(osm.length).toBeGreaterThan(3000);
		for (const s of osm) {
			expect(s.streetName).toBeTruthy();
			expect(s.geometry.polyline.length).toBeGreaterThanOrEqual(2);
			expect(s.bounds.minLat).toBeLessThanOrEqual(s.bounds.maxLat);
		}
		const lat = osm.flatMap((s) => [s.bounds.minLat, s.bounds.maxLat]);
		const lng = osm.flatMap((s) => [s.bounds.minLng, s.bounds.maxLng]);
		expect(Math.min(...lat)).toBeGreaterThan(31.9);
		expect(Math.max(...lat)).toBeLessThan(32.2);
		expect(Math.min(...lng)).toBeGreaterThan(34.7);
		expect(Math.max(...lng)).toBeLessThan(34.9);
	});

	it('derives a plausible number of crossroads from the municipal segments', () => {
		const crossroads = buildMunicipalCrossroads(municipal);
		expect(crossroads.length).toBeGreaterThan(1000);
		expect(crossroads.length).toBeLessThan(municipal.length);
		expect(crossroads.every((c) => c.ends >= 3)).toBe(true);
	});

	it('an accident placed on an OSM street matches that street; one far away does not', () => {
		const target = osm.find((s) => s.geometry.polyline.length >= 2)!;
		const p = target.geometry.polyline[0];
		const onStreet = acc({ latitude: p.lat, longitude: p.lng });
		const faraway = acc({ latitude: 32.5, longitude: 35.5 });
		const { matched, unmatched } = mapAccidentsToStreetSections([onStreet, faraway], osm, { maxDistanceMeters: 20, enableGeoOnlyFallback: true });
		expect(matched).toHaveLength(1);
		expect(matched[0].distanceMeters).toBeLessThanOrEqual(20);
		expect(unmatched).toHaveLength(1);
	});

	it('an accident on a municipal crossroad pin is counted by buildMunicipalCrossroadRows', () => {
		const crossroads = buildMunicipalCrossroads(municipal);
		const c = crossroads[0];
		const rows = buildMunicipalCrossroadRows([c], [acc({ latitude: c.lat, longitude: c.lng })], 50);
		expect(rows).toHaveLength(1);
		expect(rows[0].count).toBe(1);
	});
});

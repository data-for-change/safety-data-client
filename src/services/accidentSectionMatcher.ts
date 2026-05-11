import type { Accident } from '../types';
import { lineString, point } from '@turf/helpers';
import { pointToLineDistance } from '@turf/turf';

export type StreetSection = {
	id: string;
	lamas_id?: number;
	streetName: string;
	geometry: {
		polyline: Array<{ lat: number; lng: number }>;
	};
	bounds: {
		minLat: number;
		maxLat: number;
		minLng: number;
		maxLng: number;
	};
	metadata?: {
		lanes?: number;
		isTwoWay?: boolean;
		length?: number;
	};
};

export type MatchedAccidentRow = {
	accidentId: number;
	severity: string;
	streetNameFromJson: string;
	accidentStreet1?: string;
	accidentStreet2?: string;
	accidentStreet1Id?: number;
	accidentStreet2Id?: number;
	matchedLamasId?: number;
	latitude: number;
	longitude: number;
	distanceMeters: number;
	sectionId: string;
};

export type UnmatchedAccidentRow = {
	accidentId: number;
	accidentStreet1?: string;
	accidentStreet2?: string;
	accidentStreet1Id?: number;
	accidentStreet2Id?: number;
	accidentType: string;
	latitude: number;
	longitude: number;
};

export type MapAccidentsResult = {
	matched: MatchedAccidentRow[];
	unmatched: UnmatchedAccidentRow[];
};

export type AccidentSectionMatcherOptions = {
	boundsPaddingMeters?: number; // default 20
	maxDistanceMeters?: number; // default 20
	enableGeoOnlyFallback?: boolean; // default true
};

const DEFAULT_OPTIONS: Required<AccidentSectionMatcherOptions> = {
	boundsPaddingMeters: 20,
	maxDistanceMeters: 20,
	enableGeoOnlyFallback: true,
};

export function normalizeHebrewStreetName(input?: string): string | undefined {
	if (!input) return undefined;
	const trimmed = input.trim();
	if (!trimmed) return undefined;

	// keep Hebrew, Latin letters, digits and spaces. Remove punctuation/specials.
	const cleaned = trimmed
		.replace(/[״"“”'’`]/g, '')
		.replace(/[^\u0590-\u05FFa-zA-Z0-9\s]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

	return cleaned || undefined;
}

function metersToLatDegrees(meters: number): number {
	return meters / 111_320;
}

function metersToLngDegrees(meters: number, atLatDegrees: number): number {
	const latRad = (atLatDegrees * Math.PI) / 180;
	const denom = 111_320 * Math.cos(latRad);
	return denom === 0 ? meters / 111_320 : meters / denom;
}

function pointInExpandedBounds(p: { lat: number; lng: number }, bounds: StreetSection['bounds'], paddingMeters: number): boolean {
	const dLat = metersToLatDegrees(paddingMeters);
	const dLng = metersToLngDegrees(paddingMeters, p.lat);

	return p.lat >= bounds.minLat - dLat && p.lat <= bounds.maxLat + dLat && p.lng >= bounds.minLng - dLng && p.lng <= bounds.maxLng + dLng;
}

function buildSectionsByLamasId(sections: StreetSection[]): Map<number, StreetSection[]> {
	const map = new Map<number, StreetSection[]>();
	for (const s of sections) {
		if (s.lamas_id == null) continue;
		const arr = map.get(s.lamas_id);
		if (arr) arr.push(s);
		else map.set(s.lamas_id, [s]);
	}
	return map;
}

function toAccidentPoint(accident: Accident): { lat: number; lng: number } | null {
	const lat = Number(accident.latitude);
	const lng = Number(accident.longitude);
	if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
	return { lat, lng };
}

export function mapAccidentsToStreetSections(
	accidents: Accident[],
	sections: StreetSection[],
	options?: AccidentSectionMatcherOptions,
): MapAccidentsResult {
	const opt = { ...DEFAULT_OPTIONS, ...(options ?? {}) };
	const sectionsByLamasId = buildSectionsByLamasId(sections);
	const lineCache = new Map<string, ReturnType<typeof lineString>>();

	const matched: MatchedAccidentRow[] = [];
	const unmatched: UnmatchedAccidentRow[] = [];

	for (const a of accidents) {
		const accidentId = Number((a as any)._id ?? (a as any).id);
		const p = toAccidentPoint(a);

		if (!p) {
			unmatched.push({
				accidentId,
				accidentStreet1: a.street1_hebrew,
				accidentStreet2: a.street2_hebrew,
				accidentStreet1Id: a.street1,
				accidentStreet2Id: a.street2,
				accidentType: a.accident_type_hebrew,
				latitude: Number(a.latitude),
				longitude: Number(a.longitude),
			});
			continue;
		}

		const candidates: StreetSection[] = [];
		if (a.street1 != null) candidates.push(...(sectionsByLamasId.get(a.street1) ?? []));
		if (a.street2 != null) candidates.push(...(sectionsByLamasId.get(a.street2) ?? []));

		// When we have ID-matched candidates, use all of them without bounds filtering —
		// a long street has many small-bounds segments and the accident may fall between them.
		// Only apply bounds filtering for the geo-only fallback (scanning all sections).
		let shortlist: StreetSection[];
		if (candidates.length > 0) {
			shortlist = candidates;
		} else if (opt.enableGeoOnlyFallback) {
			shortlist = sections.filter((s) => pointInExpandedBounds(p, s.bounds, opt.boundsPaddingMeters));
		} else {
			shortlist = [];
		}

		if (shortlist.length === 0) {
			unmatched.push({
				accidentId,
				accidentStreet1: a.street1_hebrew,
				accidentStreet2: a.street2_hebrew,
				accidentStreet1Id: a.street1,
				accidentStreet2Id: a.street2,
				accidentType: a.accident_type_hebrew,
				latitude: p.lat,
				longitude: p.lng,
			});
			continue;
		}

		const pt = point([p.lng, p.lat]);
		let best: { section: StreetSection; distance: number } | null = null;

		for (const s of shortlist) {
			let ls = lineCache.get(s.id);
			if (!ls) {
				ls = lineString(s.geometry.polyline.map((v) => [v.lng, v.lat]));
				lineCache.set(s.id, ls);
			}

			const dist = pointToLineDistance(pt, ls, { units: 'meters' });
			if (!Number.isFinite(dist)) continue;

			if (!best || dist < best.distance) best = { section: s, distance: dist };
		}

		if (!best || best.distance > opt.maxDistanceMeters) {
			unmatched.push({
				accidentId,
				accidentStreet1: a.street1_hebrew,
				accidentStreet2: a.street2_hebrew,
				accidentStreet1Id: a.street1,
				accidentStreet2Id: a.street2,
				accidentType: a.accident_type_hebrew,
				latitude: p.lat,
				longitude: p.lng,
			});
			continue;
		}

		matched.push({
			accidentId,
			severity: a.injury_severity_hebrew,
			streetNameFromJson: best.section.streetName,
			accidentStreet1: a.street1_hebrew,
			accidentStreet2: a.street2_hebrew,
			accidentStreet1Id: a.street1,
			accidentStreet2Id: a.street2,
			matchedLamasId: best.section.lamas_id,
			latitude: p.lat,
			longitude: p.lng,
			distanceMeters: best.distance,
			sectionId: best.section.id,
		});
	}

	return { matched, unmatched };
}

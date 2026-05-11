import React from 'react';
import type { Accident } from '../../types';
import type { StreetSection, MatchedAccidentRow, UnmatchedAccidentRow } from '../../services/accidentSectionMatcher';
import { mapAccidentsToStreetSections } from '../../services/accidentSectionMatcher';

const TEL_AVIV_CITY_ID = '5000';

interface UseStreetSectionsResult {
	isTelAvivSelected: boolean;
	streetSections: StreetSection[] | null;
	sectionsLoadError: string | null;
	telAvivAccidents: Accident[];
	matched: MatchedAccidentRow[];
	unmatched: UnmatchedAccidentRow[];
}

export function useStreetSections(
	selectedCityIds: string[],
	dataAllInjuries: Accident[],
	maxDistanceMeters: number,
): UseStreetSectionsResult {
	const isTelAvivSelected = React.useMemo(
		() => selectedCityIds.includes(TEL_AVIV_CITY_ID),
		[selectedCityIds],
	);

	const [streetSections, setStreetSections] = React.useState<StreetSection[] | null>(null);
	const [sectionsLoadError, setSectionsLoadError] = React.useState<string | null>(null);

	React.useEffect(() => {
		let cancelled = false;
		async function load() {
			try {
				setSectionsLoadError(null);
				const res = await fetch(`${import.meta.env.BASE_URL}data/telAviv_streets.json`);
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const data = (await res.json()) as StreetSection[];
				if (!cancelled) setStreetSections(data);
			} catch (e: any) {
				if (!cancelled) setSectionsLoadError(e?.message ?? 'Failed to load street sections JSON');
			}
		}
		if (isTelAvivSelected) load();
		else setStreetSections(null);
		return () => { cancelled = true; };
	}, [isTelAvivSelected]);

	const telAvivAccidents = React.useMemo(() => {
		const hasAnyCity = dataAllInjuries.some((a) => !!a.accident_yishuv_name);
		if (!hasAnyCity) return dataAllInjuries;
		return dataAllInjuries.filter((a) => a.accident_yishuv_name === 'תל אביב - יפו');
	}, [dataAllInjuries]);

	const { matched, unmatched } = React.useMemo((): { matched: MatchedAccidentRow[]; unmatched: UnmatchedAccidentRow[] } => {
		if (!isTelAvivSelected || !streetSections) return { matched: [], unmatched: [] };
		return mapAccidentsToStreetSections(telAvivAccidents, streetSections, {
			maxDistanceMeters,
			enableGeoOnlyFallback: false,
		});
	}, [isTelAvivSelected, streetSections, telAvivAccidents, maxDistanceMeters]);

	return { isTelAvivSelected, streetSections, sectionsLoadError, telAvivAccidents, matched, unmatched };
}

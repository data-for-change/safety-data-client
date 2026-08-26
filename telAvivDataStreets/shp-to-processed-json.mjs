import { readFile, mkdir, writeFile } from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function normalizeStreet(name) {
	if (!name) return null;
	const cleaned = name.replace(/['"]/g, '').trim();
	// Source shapefile stores Hebrew text in visual (reversed) order instead of
	// logical Unicode order, so reverse it back for correct RTL rendering.
	if (/[֐-׿]/.test(cleaned)) {
		return cleaned.split('').reverse().join('');
	}
	return cleaned;
}

function getStreetName(props) {
	const streetRaw = props.t_rechov_r ?? props.t_rechov ?? props.T_RECHOV ?? null;
	return normalizeStreet(streetRaw);
}

function computeBounds(polyline) {
	let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;
	for (const p of polyline) {
		if (p.lat < minLat) minLat = p.lat;
		if (p.lat > maxLat) maxLat = p.lat;
		if (p.lng < minLng) minLng = p.lng;
		if (p.lng > maxLng) maxLng = p.lng;
	}
	return { minLat, maxLat, minLng, maxLng };
}

// junction_s / junction_e are junction-node IDs shared across the street segments that
// meet at that junction (not names). Group all features by that shared ID to recover the
// *other* street's name at each end - that's the cross-street/junction name.
function parseJunctionId(value) {
	if (value == null || value === 'missing') return null;
	const n = parseFloat(value);
	if (!Number.isFinite(n)) return null;
	return String(n);
}

function buildJunctionMapFromNodeIds(features) {
	const map = new Map();
	for (const feature of features) {
		const props = feature.properties || {};
		const streetName = getStreetName(props);
		for (const raw of [props.junction_s, props.junction_e]) {
			const key = parseJunctionId(raw);
			if (key == null) continue;
			const set = map.get(key) ?? new Set();
			if (streetName) set.add(streetName);
			map.set(key, set);
		}
	}
	return map;
}

// Intrsctns ("836-798 836-803") is a space-separated list of junction-node tokens with the
// same sharing property as junction_s/junction_e above, just without a start/end split.
function buildJunctionMapFromIntersectionTokens(features) {
	const map = new Map();
	for (const feature of features) {
		const props = feature.properties || {};
		const streetName = getStreetName(props);
		const tokens = (props.Intrsctns ?? '').trim().split(/\s+/).filter(Boolean);
		for (const token of tokens) {
			const set = map.get(token) ?? new Set();
			if (streetName) set.add(streetName);
			map.set(token, set);
		}
	}
	return map;
}

function resolveCrossStreets(map, key, ownStreetName) {
	if (key == null) return undefined;
	const set = map.get(key);
	if (!set) return undefined;
	const names = [...set].filter((n) => n && n !== ownStreetName);
	if (names.length === 0) return undefined;
	return names.join(' / ');
}

// Per-file junction-name resolvers. Each returns { from, to } (either may be undefined)
// for a given feature's properties + already-computed street name.
function makeNodeIdJunctionResolver(features) {
	const map = buildJunctionMapFromNodeIds(features);
	return (props, streetName) => ({
		from: resolveCrossStreets(map, parseJunctionId(props.junction_s), streetName),
		to: resolveCrossStreets(map, parseJunctionId(props.junction_e), streetName),
	});
}

function makeIntersectionTokenJunctionResolver(features) {
	const map = buildJunctionMapFromIntersectionTokens(features);
	return (props, streetName) => {
		const tokens = (props.Intrsctns ?? '').trim().split(/\s+/).filter(Boolean);
		if (tokens.length === 0) return { from: undefined, to: undefined };
		return {
			from: resolveCrossStreets(map, tokens[0], streetName),
			to: resolveCrossStreets(map, tokens[tokens.length - 1], streetName),
		};
	};
}

async function readGeoJson(geojsonName, result, seenBaseIds, seq, makeJunctionResolver) {
	const filePath = path.join(__dirname, geojsonName);
	const raw = await readFile(filePath, 'utf8');
	const geojson = JSON.parse(raw);

	const resolveJunctionNames = makeJunctionResolver(geojson.features);

	let added = 0;
	let skipped = 0;

	for (const feature of geojson.features) {
		const props = feature.properties || {};
		const geometry = feature.geometry;
		if (!geometry) continue;
		if (geometry.type !== 'LineString' && geometry.type !== 'MultiLineString') continue;

		const baseId = props.UniqueId ?? null;
		if (baseId != null && seenBaseIds.has(baseId)) { skipped++; continue; }
		if (baseId != null) seenBaseIds.add(baseId);

		const streetName = getStreetName(props);
		const junctionNames = resolveJunctionNames(props, streetName);

		const metadata = {
			lanes: props.n_lanes ?? null,
			isTwoWay: props.du_sitri === 1,
			length: props.ms_orech ?? props.Shape_Leng ?? props.length ?? null,
		};

		const coordGroups =
			geometry.type === 'LineString'
				? [geometry.coordinates]
				: geometry.coordinates;

		for (const coords of coordGroups) {
			const polyline = coords.map(([lng, lat]) => ({ lat, lng }));
			const bounds = computeBounds(polyline);
			result.push({
				id: `${baseId}-${seq.value++}`,
				lamas_id: props.ms_lamas,
				streetName,
				geometry: { polyline },
				bounds,
				metadata,
				junctionNames,
			});
			added++;
		}
	}

	return { added, skipped };
}

async function main(outPath) {
	const result = [];
	const seenBaseIds = new Set();
	const seq = { value: 0 };

	const r1 = await readGeoJson('TA_streets_dat_geo_json.geojson', result, seenBaseIds, seq, makeNodeIdJunctionResolver);
	console.log(`TA_streets_dat:        +${r1.added} sections`);

	const r2 = await readGeoJson('Roads_With_Junc_ID_V1_geo_json.geojson', result, seenBaseIds, seq, makeIntersectionTokenJunctionResolver);
	console.log(`Roads_With_Junc_ID_V1: +${r2.added} sections  (${r2.skipped} skipped)`);

	await mkdir(path.dirname(outPath), { recursive: true });
	await writeFile(outPath, JSON.stringify(result, null, 2), 'utf8');

	console.log(`\n✅ Total: ${result.length} street sections`);
	console.log(`📁 Saved to ${outPath}`);
}

const OUT_PATH = path.join(__dirname, '..', 'public', 'data', 'telAviv_streets.json');

main(OUT_PATH).catch((err) => {
	console.error(err);
	process.exit(1);
});

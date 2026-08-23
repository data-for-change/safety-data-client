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

async function readGeoJson(geojsonName, result, seenBaseIds, seq) {
	const filePath = path.join(__dirname, geojsonName);
	const raw = await readFile(filePath, 'utf8');
	const geojson = JSON.parse(raw);

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

		const streetRaw = props.t_rechov_r ?? props.t_rechov ?? props.T_RECHOV ?? null;
		const streetName = normalizeStreet(streetRaw);

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

	const r1 = await readGeoJson('TA_streets_dat_geo_json.geojson', result, seenBaseIds, seq);
	console.log(`TA_streets_dat:        +${r1.added} sections`);

	const r2 = await readGeoJson('Roads_With_Junc_ID_V1_geo_json.geojson', result, seenBaseIds, seq);
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

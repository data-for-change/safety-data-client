import { open } from 'shapefile';
import { mkdir, writeFile } from 'fs/promises';
import proj4 from 'proj4';
import path from 'node:path';

// --- Coordinate systems ---
const itm =
	'+proj=tmerc +lat_0=31.73439361111111 +lon_0=35.20451694444445 ' +
	'+k=1.0000067 +x_0=219529.584 +y_0=626907.39 +ellps=GRS80 ' +
	'+towgs84=0,0,0,0,0,0,0 +units=m +no_defs';

const wgs84 = proj4.WGS84;

// --- Convert ITM → WGS84 ---
function convert([x, y]) {
	const [lng, lat] = proj4(itm, wgs84, [x, y]);
	return { lat, lng };
}

// --- Normalize street name ---
function normalizeStreet(name) {
	if (!name) return null;
	return name.replace(/['"]/g, '').trim();
}

// --- Compute bounding box ---
function computeBounds(polyline) {
	let minLat = Infinity;
	let maxLat = -Infinity;
	let minLng = Infinity;
	let maxLng = -Infinity;

	for (const p of polyline) {
		if (p.lat < minLat) minLat = p.lat;
		if (p.lat > maxLat) maxLat = p.lat;
		if (p.lng < minLng) minLng = p.lng;
		if (p.lng > maxLng) maxLng = p.lng;
	}

	return { minLat, maxLat, minLng, maxLng };
}

// --- Main processing ---
async function processShapeFile(shpPath, outPath, encoding = 'utf-8') {
	const dbfPath = shpPath.replace(/\.shp$/i, '.dbf');
	const source = await open(shpPath, dbfPath, { encoding });

	const result = [];

	while (true) {
		const { done, value } = await source.read();
		if (done) break;

		const props = value.properties || {};
		const geometry = value.geometry;

		if (!geometry || geometry.type !== 'LineString') continue;

		// Extract street name safely
		const streetRaw = props.t_rechov ?? props.T_RECHOV ?? null;

		const streetName = normalizeStreet(streetRaw);

		// Convert full polyline
		const polyline = geometry.coordinates.map(convert);

		// Compute bounds
		const bounds = computeBounds(polyline);

		// Build normalized object
		const section = {
			id: props.UniqueId || null,
			lamas_id: props.ms_lamas,
			streetName,

			geometry: {
				polyline,
			},

			bounds,

			metadata: {
				lanes: props.n_lanes ?? null,
				isTwoWay: props.du_sitri === 1,
				length: props.length ?? null,
			},
		};

		result.push(section);
	}

	await mkdir(path.dirname(outPath), { recursive: true });
	await writeFile(outPath, JSON.stringify(result, null, 2), 'utf8');

	console.log(`✅ Processed ${result.length} street sections`);
	console.log(`📁 Saved to ${outPath}`);
}

// --- CLI ---
const [, , shpPath, encodingArg = 'utf-8'] = process.argv;

if (!shpPath) {
	console.error('Usage: node shp-to-processed-json.mjs <input.shp> [encoding]');
	process.exit(1);
}

processShapeFile(shpPath, 'public/data/telAviv_streets.json', encodingArg).catch((err) => {
	console.error(err);
	process.exit(1);
});

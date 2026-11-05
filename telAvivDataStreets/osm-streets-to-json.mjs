// Pulls Tel Aviv-Yafo drivable streets from OpenStreetMap (Overpass) and writes them in the StreetSection
// shape used by accidentSectionMatcher, to public/data/telAviv_osm_streets.json.
// Usage: npm run process-osm-streets
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
const OUT_FILE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/data/telAviv_osm_streets.json');

// OSM relation of the Tel Aviv-Yafo municipal boundary (admin_level 8); Overpass area id = relation id + 3.6e9
const TEL_AVIV_RELATION_ID = 1382494;

const HIGHWAY_CLASSES = 'motorway|trunk|primary|secondary|tertiary|unclassified|residential|living_street|motorway_link|trunk_link|primary_link|secondary_link|tertiary_link';

const query = `
[out:json][timeout:180];
area(id:${3_600_000_000 + TEL_AVIV_RELATION_ID})->.city;
way(area.city)["highway"~"^(${HIGHWAY_CLASSES})$"]["name"];
out geom;
`;

const res = await fetch(OVERPASS_URL, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		Accept: 'application/json',
		'User-Agent': 'safety-data-client osm-streets-to-json (https://github.com/data-for-change)',
	},
	body: `data=${encodeURIComponent(query)}`,
});
if (!res.ok) throw new Error(`Overpass HTTP ${res.status}`);
const { elements } = await res.json();

const sections = elements
	.filter((el) => el.type === 'way' && Array.isArray(el.geometry) && el.geometry.length >= 2)
	.map((el) => {
		const polyline = el.geometry.map((g) => ({ lat: g.lat, lng: g.lon }));
		const lats = polyline.map((p) => p.lat);
		const lngs = polyline.map((p) => p.lng);
		return {
			id: `osm-${el.id}`,
			streetName: el.tags['name:he'] ?? el.tags.name,
			geometry: { polyline },
			bounds: { minLat: Math.min(...lats), maxLat: Math.max(...lats), minLng: Math.min(...lngs), maxLng: Math.max(...lngs) },
			metadata: { isTwoWay: el.tags.oneway !== 'yes' },
		};
	});

await writeFile(OUT_FILE, JSON.stringify(sections));
console.log(`Wrote ${sections.length} OSM street ways to ${OUT_FILE}`);

Assistant Manifest — quick reference for AI helpers

Purpose

- Short, actionable map of where to look and what to avoid when working with this repo to minimize tokens and effort.

High-value files & entry points

- `src/main.tsx` — app bootstrap and providers
- `src/App.tsx` — routes and top-level layout
- `src/pages/MapPage.tsx`, `src/MapWithClusters.tsx` — map UI, clustering behavior
- `src/components/filter/CardFilterWhere.tsx` — filter UI (current focus)
- `src/services/AccidentService.ts` — core data access & transformation
- `src/stores/RootStore.ts` and `src/stores/*` — global app state and derived selectors
- `src/hooks/*` — common hooks used by components (debounce, memo, queries)
- `vite.config.ts`, `package.json` — scripts and build settings

Large-data locations (avoid fetching whole files)

- `telAvivDataStreets/` — large geojson files (do not paste full contents)
- `data/` and `build/static/` — prebuilt assets and large JSON/geojson

Recommended small-reads (ask for these ranges)

- Component or function scope: request 20–80 lines around the component/function.
- Service methods: request the method and its imports + 3 lines of context above/below.
- Store files: request only the selector or action you need, not the entire store.

Search hints / grep patterns

- Find data pipelines: `AccidentService|getAll|transform|geojson|marker`
- Map & markers: `map|cluster|Cluster|Marker|lat|lng|coordinates`
- Filters: `filter|CardFilterWhere|FilterWhere|debounce|onChange`
- Stores: `RootStore|useStore|createStore|mobx|observable`
- Large-file references: `telAviv|geojson|TA_streets|shp-to-processed`

Example focused queries

- "Show `src/services/AccidentService.ts` method that converts geojson to markers (lines X–Y)."
- "Open `src/components/filter/CardFilterWhere.tsx` lines 1–200." 
- "List selectors in `src/stores` that affect map markers." 

Assistant rules / redaction

- Never paste full person-level datasets; request schema or a tiny sample (<= 20 rows).
- Prefer aggregated outputs (counts, rates) for summaries.
- When producing examples, synthesize anonymized sample rows.

Files and folders to ignore in prompts (do not paste)

- `node_modules/`
- `build/` and `build/static/`
- `telAvivDataStreets/*.geojson` and other large geojson files
- `public/static/` (images/assets)
- Any local IndexedDB or binary blobs

Quick local commands

```bash
npm install
npm run dev
npm run build
```

Schema hint (ask before requesting samples)

- Typical accident record fields: `id, date, lat, lng, severity, vehicle_type, age, gender, street_name, city, description`
- Ask the human to confirm which fields are present before requesting sample rows.

If you want, I can now generate the compact file index (one line per top-level folder) to further speed navigation.

# Token-efficient repository work

- Search first (`rg`) and read only the relevant symbol plus its direct context.
- For behavior changes, trace the smallest necessary path through page, component, store, and service.
- Share failing inputs and the relevant error excerpt; avoid full logs and full-file dumps.
- For large datasets, inspect schema or a tiny sample. Do not print person-level records, full GeoJSON, generated bundles, or local environment values.
- Ask for a focused diff or modified function when discussing a change; include enough surrounding context to preserve imports and callers.

Repository paths to avoid reading wholesale: `node_modules/`, `build/`, `dist/`, generated `public/data/`, and `telAvivDataStreets/` data files.

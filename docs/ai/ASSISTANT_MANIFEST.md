# Assistant manifest

Use `docs/ai/AI_INSTRUCTIONS.md` as the canonical agent guide. This index is intentionally short to avoid duplicating instructions.

## Quick navigation

- Routes and initialization: `src/App.tsx`
- Redux mount/store: `src/main.tsx`, `src/stores/store.ts`
- Pages: `src/pages/`
- Accident data access: `src/services/AccidentService.ts`
- City and recommendation data access: `src/services/CityService.ts`, `src/services/RecommendationService.ts`
- Filters: `src/components/filter/`, `src/stores/filter/`
- Maps and street model: `src/components/map/`, `src/components/model/`
- Runtime API/environment helpers: `src/utils/globalEnvs.ts`, `vite.config.ts`
- Commands: `package.json`

Search by the active route, component, service method, or API path; this map is a starting point, not a guarantee that every feature uses one file.

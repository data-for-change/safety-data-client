# AI instructions

## Repo map

- Vite + React 18 + TypeScript client. `src/main.tsx` mounts Redux; `src/App.tsx` owns routes and app initialization.
- Pages: `src/pages/` (`HomePage`, `CityPage`, `ModelPage`, `RecommendationsPage`, `AboutPage`, auth/admin pages).
- UI: `src/components/`; domain logic/data access: `src/services/`; Redux state: `src/stores/`; shared calculations: `src/utils/`.
- Accident pipeline: start at `src/services/AccidentService.ts`; inspect the page/component and store that consume it before changing behavior.
- Street model data: `src/components/model/useStreetSections.ts` loads processed files under `public/data/` (check the referenced paths before assuming exact location).

## Working efficiently

1. Use `rg` to find the symbol, route, API path, or asset reference. Read only the relevant function/component and its direct callers.
2. For UI behavior, trace page → component → store/service as needed; do not read whole directories or large files by default.
3. For data issues, inspect transformations and schemas, then use a tiny representative sample. Never dump full person-level accident data.
4. Avoid `build/`, `dist/`, `node_modules/`, generated assets, and large GeoJSON files unless the task directly concerns them.
5. Check `package.json` for scripts. `npm run dev` starts Vite in `dev_local` mode; `npm run build` builds; `npm test` runs Vitest.
6. Vite proxies `/api`, `/city`, `/involved`, `/sd-user`, `/sd-authorize`, and `/logout` to `localhost:8080`. Client config is read via `import.meta.env`; do not print `.env*` values.

## Change guidance

- Keep diffs scoped and preserve existing Redux/component patterns where practical.
- Update documentation only when behavior or durable project conventions change.
- Do not run tests unless the user asks for testing or verification.

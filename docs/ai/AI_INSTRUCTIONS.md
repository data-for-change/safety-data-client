AI Instructions — How to work with this repo efficiently

Purpose

Provide targeted guidance for an AI assistant to inspect, modify, and reason about the codebase with minimal token usage.

High-level summary

- This is a Vite + React 18 TypeScript app that visualizes accident data on maps and provides recommendations.
- Large data assets live under `build/static/`, `data/`, and `telAvivDataStreets/` — avoid loading these fully unless necessary.

Primary entry points and important files

- `src/main.tsx` — app bootstrap and provider setup.
- `src/App.tsx` — top-level routes and layout.
- `src/pages/MapPage.tsx` — map rendering and clustering.
- `src/components/filter/CardFilterWhere.tsx` — current file under development (filters UI).
- `src/services/AccidentService.ts` — core data access and processing logic.
- `src/stores/RootStore.ts` and `src/stores/*` — global app state.
- `vite.config.ts` and `package.json` — build and run scripts.

Application domains and main views

- The app supports exploration of accident data across several main tabs: `All country`, `City`, `Recommendations`, and `About`.
- Primary user types: `experts` (planners, researchers) and `general public`.

Data sensitivity

- The dataset contains sensitive-person related records (fatalities and injuries). Avoid printing or exposing full raw datasets; request small samples or schema descriptions instead.

What to fetch or open first (minimize tokens)

1. Open small, focused files relevant to the task (e.g., a single component or service file).
2. When more context is needed, request specific sections or line ranges rather than entire large files.
3. Avoid reading `build/` and `public/static/` assets; instead request the code that references or loads them.

Guidance for code changes

- Prefer small, self-contained diffs. Ask to `apply` changes to a single file at a time.
- Include only the minimal surrounding context (3–8 lines) when showing code for edits.
- If diagnosing a bug, provide failing input, stack traces, or test output rather than sending large files.

How to reference files

- Use workspace-relative paths. Example: `src/components/filter/CardFilterWhere.tsx`.
- For line-specific requests include a line-range (start-end) to reduce payload.

Recommended inspection checklist (quick)

- Check `src/pages/MapPage.tsx` for map props and async data loads.
- Check `src/services/AccidentService.ts` for data-shaping logic.
- Check `src/stores` for derived state that affects UI rendering.

If you need more context

- Ask for a short excerpt from a file (e.g., 20–80 lines) focused on the function or component in question.
- Ask the human for sample inputs, environment variables, or the exact npm script used to reproduce an issue.

Example prompt templates

- "Please open `src/components/filter/CardFilterWhere.tsx` and show lines 1–200." 
- "Summarize how `AccidentService.getAll()` transforms raw geojson into markers." 
- "Change the filter component to debounce user input by 300ms; show only the modified function and import lines."

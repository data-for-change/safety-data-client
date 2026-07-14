# safety-data (client-react18)

This folder contains concise documentation for humans and AI assistants working on the `client-react18` front-end application.

Project purpose

- React 18 + TypeScript single-page app built with Vite.
- Visualize and analyze accident/safety data for city streets (Tel Aviv dataset included).
- Uses stores, services, and map components to render accident markers and recommendations.

Project overview

- safety-data (client) is a public-facing tool to help understand road accidents, find patterns, and support Vision Zero goals to prevent deaths and serious injuries.
- The app aggregates records of people involved in road accidents (fatalities and injuries) and provides exploration and analysis tools for both experts and the general public.

Main tabs / views

- All country: explore nationwide aggregated data.
- City: focus on a particular city's data and streets.
- Recommendations: suggested interventions and insights derived from analysis.
- About: project goals, data sources, privacy and contact information.

Users and use cases

- Two main user types: experts (planners, researchers) and the general public.
- Users can filter by year, location, vehicle type, road type, and other parameters.
- Results can be inspected on the map, in tables, or grouped by categories (year, age, gender, vehicle type, road type).

Quick start (dev)

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

Key places to look

- `src/` — main application source, components, pages, hooks, and stores.
- `src/pages/MapPage.tsx` and `src/MapWithClusters.tsx` — map UI and clustering logic.
- `src/services/AccidentService.ts` — data access for accidents.
- `src/stores/` — app state (RootStore, feature stores).
- `data/` and `telAvivDataStreets/` — large geojson and processed street data.

Purpose of these docs

- Help contributors understand the repo quickly.
- Provide instructions for AI assistants to minimize tokens and focus on relevant files.
- Provide token-minimization guidelines and examples for crafting prompts.

Files in this folder

- `AI_INSTRUCTIONS.md` — guidance for AI assistants (what to read, how to query, critical files).
- `TOKEN_MINIMIZATION.md` — practical tips to limit token usage when interacting with this repo.


If you'd like more detailed architecture diagrams or an expanded file index, tell me what to include.
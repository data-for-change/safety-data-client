Project Overview — safety-data (client)

Purpose

- Provide an interactive public tool to explore, analyze, and visualize road-traffic accidents to identify patterns and support Vision Zero objectives (prevent deaths and serious injuries).

Core data

- Person-level records of road accidents (fatalities and injuries).
- Geographic data for streets and intersections (large geojson files are stored under `telAvivDataStreets/`).

Main tabs / features

- All country: nationwide aggregates and filters.
- City: per-city exploration and map-focused analysis.
- Recommendations: derived suggestions or interventions (policy or infrastructure) based on analysis.
- About: project goals, data sources, privacy and contact details.

Users

- Experts: planners, researchers, and analysts needing detailed exports, aggregated statistics, and reproducible queries.
- General public: easy-to-use filters, map views, and human-readable explanations of findings.

Common interactions

- Filtering: by year, location (street/city), vehicle type, road type, and other parameters.
- Outputs: map markers, table/list details, grouped summaries by year/age/gender/vehicle/road type.

Privacy and token guidance for assistants

- Do not return large raw datasets or geojson files in prompts. Request a small representative sample or a schema description.
- When summarizing data, aggregate (counts, rates) rather than exposing individual records.

If you want this file adapted into a short public-facing description for the `About` tab, say "write About text" and I will compose it.

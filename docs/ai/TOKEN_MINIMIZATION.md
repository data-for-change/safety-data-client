Token Minimization Guidelines — Practical tips for AI helpers

When to include file contents

- Include only the function/component block you are editing, plus 3–5 lines of context above and below.
- Never paste full JSON or geojson files into prompts; provide a small sample or a description instead.

Search and narrowing strategies

- Use grep-style queries: search for function names, component names, or unique strings.
- Share failing inputs, console logs, or unit test failures rather than entire logs.

How to ask for changes

- Be explicit about the file and line range. Example: "Edit `src/components/filter/CardFilterWhere.tsx` lines 40–120 to add input debounce." 
- Request only the diff or the modified function — not the whole file.

Example compact workflows

- Debugging: 1) ask AI to open the small function, 2) provide minimal failing input, 3) request a focused patch.
- Feature change: 1) indicate target file and UI behaviour, 2) request component-level changes with import lines, 3) run and report errors.

Repository-specific notes

- Large files to avoid sending: `build/asset-manifest.json`, `telAvivDataStreets/*` geojson files, and `build/static/*` assets.
- Prioritize `src/services`, `src/stores`, `src/components`, and `src/pages` for code edits.

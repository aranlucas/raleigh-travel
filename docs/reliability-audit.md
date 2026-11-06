# Correctness and reliability audit — 2026-11-06

## Baseline and inventory (before implementation)

Clean isolated worktree at remote main `50311a60c967464da1d8be297908d6eb93553717`, after #31. Read AGENTS.md, CLAUDE.md, README, ROADMAP and previous decisions. This audit preserves the historical October 2–6 trip, public routes and APIs; it does not repeat structural cleanup.

- `/`: hash-selected itinerary, accessible keyboard day tabs, category filters, activity details, print recap and weather units/update controls. Full ISO trip dates govern selection; Saturday remains the intentional out-of-trip default.
- `/packing`: 18 fixed checklist IDs, browser-local persistence, same-tab subscribers and cross-tab storage events. Zod filters malformed/unknown persisted values. Failed saves preserve in-memory intent; clear/removal replaces it.
- `/details`, `/raleigh`: static historical logistics, links, places and a browser-only Leaflet map. Async map import checks cancellation and removes its map on cleanup. Map tiles and external links are third-party availability boundaries, not authenticated services.
- `/api/weather`: read-only, public GET; date-keyed server cache; fixed Open-Meteo location and query; 2.5-second request deadline, one sequential retry after 250 ms, 503 on exhausted failure. Past/upcoming dates do not fetch. Provider fields use Zod, missing optional values remain null.
- Browser weather: validated five-day response, 12-second deadline, deduplicated refreshes, periodic/online/visible refresh, last-valid forecast retained on failure. Timers and listeners removed on cleanup.
- No accounts, tenants, writes to a server, transactions, credentials or production mutations. Stored packing IDs and untrusted weather JSON are the principal validation boundaries. Map popup prose is escaped and comes from static source. Saved schedule text is editorial history, not current travel advice.
- Existing Vitest contracts cover provider retry/failure, parsing, timezone/day selection, suggestions, storage failures/events and hook refresh behavior. CI runs format/lint/types/tests/build. No browser journey gate exists yet.

## Confirmed finding

P2, high confidence — `src/components/trip-packing.tsx`, empty forecast notes branch. A successful response with all five days `past`, `upcoming` or `unavailable` has no forecasts and produces no notes, but the UI says “No extra heat, rain, or cool-weather packing notes from the available forecast.” This occurs on the current archived trip without a provider failure. Expected: distinguish no forecast data from a valid mild forecast with no extra recommendations. A failed refresh after a mild forecast also hides the freshness warning because it only appears with nonempty notes. Preserve last-loaded guidance but disclose its age/failure in both branches.

Regression contract: all-past successful data must explicitly say no trip forecast is available; mild forecast data may say no extra notes; failed refresh after mild data must disclose last-loaded guidance. These assertions must fail on the baseline in a dedicated CI reproduction, then pass with the fix.

## Rejected hypotheses and limits

- A network failure does not erase the last valid weather: existing hook regression proves the intended retention path; no speculative replacement.
- Storage read/write exceptions and malformed JSON are already handled with meaningful tests; no persistence rewrite. Simultaneous cross-tab whole-list writes remain last-writer-wins, consistent with this local checklist's contract.
- The itinerary's Saturday default after the trip is deliberate, documented behavior, not stale-date logic to repair.
- No evidence warrants auth, database, transaction or generalized retry machinery. No external production services or real credentials belong in ordinary regression tests.
- Leaflet tile outages are external; list content remains available. No claim that this audit verifies the historical accuracy or availability of external venues.

## Framework and validation plan

Read current published e2e quickstart, CI, GitHub Actions, web and config docs. Registry confirms `e2e@0.23.0` and `@e2e-dev/web@0.15.5`, requiring Node ^22.22.3 or >=24.8.0; repo Node 24.22.1 qualifies. Use the real runner and web engine for deterministic packing persistence/reload and day/filter navigation journeys against the production Next server in CI. No model, login or paid-provider dependency. Browser routes will fixture weather where necessary, and the archived API can be checked without contacting Open-Meteo.

All tests and builds run only in CI. Dependencies installed with `--ignore-scripts`; existing prepare is Husky, no tests/builds. Static inspection and formatting are local. CI regression evidence and independent review are pending.

## Implementation and independent review

Packing now distinguishes missing forecasts from mild forecasts, and both mild and advisory forecasts disclose failed refreshes. Public APIs/storage keys remain unchanged. Added the real `e2e` and web engine as exact dev dependencies because the requested supported browser runner fits this Next app; the engine pins Playwright internally. No new production dependency or custom script file is needed.

Independent read-only review confirmed the finding, examined weather/provider validation, persistence, hash navigation, map lifetime, print and routes, and found no further concrete worthwhile defect. Final diff review identified an SSR/hydration race in the first browser test: a checkbox's initial unchecked appearance alone did not prove hydration. The test now awaits the post-mount loaded forecast message before tapping. Review also checked installed runner types/config and the baseline reproduction assertions. No local tests/builds were run.

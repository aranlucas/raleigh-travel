# Untangle decisions — 2026-11-06

## Baseline and scope

Baseline: `1cd4792` on a clean worktree. Read root AGENTS.md and CLAUDE.md; no nested instructions. Applied the requested [untangle-codebase skill](https://github.com/caldoai/skills/blob/main/skills/untangle-codebase/SKILL.md), including Comments and Tests. Inventory covers every tracked source, test, document and configuration file. Preserve the curated historical itinerary and roadmap decisions; this is not a new trip engine.

No local tests, benchmarks, browser tests or builds are permitted. No owned test process was running at entry. Dependencies installed without lifecycle scripts to read bundled Next.js guides. CI already runs behavioral Vitest tests, formatting, lint, types and build; make its test command explicitly non-watching. Baseline failures have not been measured locally.

## Inventory before implementation and coherent fixes

- Give the itinerary and forecast a small shared calendar with full ISO dates, and select by full date.
  - Hidden link: weather.ts separately enumerates the five dates while itinerary.ts stores only day-of-month strings.
  - Hidden convention: selected-day.ts and trip-weather.ts join these lists by slicing day numbers.
  - Retain authored display dates and text as editorial content, not a speculative date templating system.
- Make Zod the weather contract, inferring public and provider types and requesting the schema's provider fields.
  - Hidden link: weather.ts duplicates all fields/statuses in weather-response.ts.
  - Hidden link: weather-service.ts repeats provider shape in a handwritten Daily type and DAILY_FIELDS string.
  - Surplus: provider data is parsed twice at the same request boundary.
- Separate the details route from itinerary interaction; keep the shared trip shell server-renderable.
  - Needless link: details mounts hash selection, filters, scroll effects and itinerary client imports through TripPlanner's view switch.
  - Surplus: TripDayPlan only forwards props and lays out a single caller's children; fold it into the itinerary controller.
- Represent the single navigation group directly.
  - Surplus: one-element group schema, index branch and separators support a variation that does not exist.
- Remove comments which repeat implementation, while retaining provenance, hydration, browser-only imports, storage failure semantics and forecast limitations.
- Keep meaningful behavior tests. Add a stale-weather retention regression for a failed refresh following success; the visible last forecast must survive malformed replacement data.
  - Existing storage, parsing, day-selection and refresh tests protect credible bugs; none warrant deletion.
- Move shared addresses, source URLs and map-link construction out of itinerary content into trip-info.ts; the Raleigh guide no longer imports the entire itinerary for stable metadata.
- Put travel/study summaries and weather suggestion link labels in itinerary data; remove day-ID and link-display-label dispatch where it encodes authored content.

## Special cases deliberately retained

Bounded sequential provider retry and delay are covered recovery behavior; no speculative general retry utility. Storage failures, cross-tab clear/removal, and offline weather retention are browser requirements. Saturday is the deliberate default outside the trip; URL hashes take priority. Monday styling and outing suggestions encode this trip's exam schedule. CARTO/OSM fallback, browser-only Leaflet loading and async mount cancellation are integration requirements. Fixed PT/CT offsets describe saved October schedules, not arbitrary future timezone conversion. Static source links, flight summaries and historical prose remain editorial snapshots.

## Review and validation

Initial read-only inventory review confirmed the weather schema duplication and recommended retaining existing tests and retry semantics. Subsequent review and CI evidence will be recorded here before completion.

Second static review caught a Sunday link-label wording change and loss of readonly provider types; both corrected before CI. React checklist: server shell owns static content, itinerary state stays in its client controller, hydration fallback and accessible tab/filter controls retained. Existing unstable_cache remains supported (bundled docs recommend use cache only with a Cache Components migration); changing the application caching mode is outside this structural refactor.

Final sequential completion review: clean; no worthwhile remaining issues. Added a link regression that changes activity IDs/display labels while requiring Saturday museum/Capitol suggestion links to survive. Existing tests retained. Local static lint passed after readonly/spacing corrections; tests and production/type validation are CI-only.

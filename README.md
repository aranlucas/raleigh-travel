# Raleigh, together

A personal Next.js itinerary for a pediatric dental oral boards trip to Raleigh, October 2–6, 2026.

## Run locally

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The repository uses pnpm and its committed lockfile. Open http://localhost:3000. If that port is occupied, run `pnpm dev --port 3001`.

## Quality checks

```sh
pnpm format       # Oxfmt: format source, styles, JSON, and Markdown
pnpm check        # Formatting check, strict Oxlint, and TypeScript
pnpm build        # Production build
```

Oxlint enables correctness, suspicious, pedantic, and performance rules as errors, with TypeScript, React, accessibility, Next.js, imports, and promises plugins. Type-aware checks catch unsafe values, unhandled promises, and non-exhaustive switches. Explicit `any`, non-null assertions, unused variables, console statements, and unused lint suppressions fail the check; warnings are also failures.

The configuration accounts for the automatic JSX runtime and CSS side-effect imports. Arbitrary file/function line limits are disabled because this project contains long reference data and declarative page markup. Explicit parameter types are checked for immutability; inferred callback parameters and React's `ReactNode`/`KeyboardEvent` library types are exempt. Oxfmt enforces import sorting, two-space indentation, semicolons, double quotes, and LF endings. ESLint and Prettier are not required.

## Features

- Five daily itineraries, flights, hotel, exam-day logistics, meals, and local outings.
- Explore Raleigh by area, with events and places already in the itinerary marked.
- Study times remain on the itinerary, with direct links to the matching sessions at [Oral Boards](https://oral-boards.vercel.app/study).
- Theme notes, flashcards, decision pathways, practice sessions, and recap content now live in the Oral Boards project. All old `/study` URLs permanently redirect to their matching pages there.
- Responsive layouts, keyboard navigation, reduced-motion support, and a printable itinerary.

Deploy Oral Boards with the migrated `/study` routes before deploying these redirects. Flashcard progress stored under the travel site's origin does not automatically transfer to the new site.

The itinerary is a static snapshot, not a live Gmail or airline integration. Sources were reviewed September 23, 2026. Monday registration is at 2:45 PM. The approximately 6:15–6:45 PM hotel return is an estimate; ABPD says to allow about four hours in total. Outings, meals, transfers, and study blocks are suggestions, not bookings.

## Editing

`src/lib/itinerary.ts` contains the daily plan and source links. `src/lib/raleigh.ts` contains places and weekend events. `src/lib/exam-day.ts` holds the candidate logistics used by the trip details page. The site uses the shared pine and sage palette in `src/app/globals.css`.

The public version retains the approved trip schedule, hotel, and examination location. Personal names, reservation/ticket identifiers, payment details, and Gmail message links are omitted. No mailbox credentials or live integrations are included. Search-engine indexing is disabled; this is not authentication.

Official materials remain on the ABPD, AAPD, and Vimeo sites and are linked rather than redistributed. Sources were checked September 23, 2026; current official guidance and candidate instructions take precedence. Restaurant budgets are planning estimates per person before tax, tip, drinks, and transport.

The watercolor asset in `public/raleigh-watercolor.png` was created with the built-in image generation tool. It is an illustration, not a documentary city photograph.

# Boards & beyond

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

- Five daily itineraries with study/explore filters and expandable activity notes.
- Confirmed hotel and exam logistics with direct identifiers and private email links removed.
- User-provided American Airlines flights with explicit local time zones and connection times.
- Local lunch and dinner suggestions, estimated food budgets, menus, and directions.
- `/study`: a crash course covering all ten ABPD blueprint domains, mapped to seven scheduled practice blocks (including the optional flight review).
- The public ABPD candidate resource library: blueprint, exam guide, study tips, communication advice, three mock videos, two examination-day videos, policies, and FAQs.
- A curated AAPD reading list for each topic plus access to the complete Reference Manual. Summaries and original practice prompts are independent review aids, not ABPD exam questions or clinical protocols.
- `/study/recap`: a printable one-page review sheet with editable reminders. Reminders remain in the current tab and are included when printing or saving as PDF; they are not sent to a server or saved after navigation.
- A print layout covering all five days regardless of the selected day or filter.
- Keyboard navigation, responsive layouts, and reduced-motion support.

The itinerary is a static snapshot, not a live Gmail or airline integration. Sources were reviewed September 23, 2026. The 2 PM Monday buffer is user-confirmed; registration is at 2:45 PM. The approximately 6:15 PM hotel return is tentative. Outings, meals, transfers, and study blocks are suggestions, not bookings.

## Editing

`src/lib/itinerary.ts` contains the daily plan and source links. `src/lib/study.ts` contains the study sessions, topic notes, and original-source links. Presentation lives in `src/components`; shared design tokens are in `src/app/globals.css` and study/recap styles are in `src/app/study/study.css`.

The public version retains the approved trip schedule, hotel, and examination location. Personal names, reservation/ticket identifiers, payment details, and Gmail message links are omitted. No mailbox credentials or live integrations are included. Search-engine indexing is disabled; this is not authentication.

Official materials remain on the ABPD, AAPD, and Vimeo sites and are linked rather than redistributed. Sources were checked September 23, 2026; current official guidance and candidate instructions take precedence. Restaurant budgets are planning estimates per person before tax, tip, drinks, and transport.

The watercolor asset in `public/raleigh-watercolor.png` was created with the built-in image generation tool. It is an illustration, not a documentary city photograph.

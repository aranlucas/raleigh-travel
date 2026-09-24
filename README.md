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

- Navigation in two groups: **Trip** (day by day, Explore Raleigh, logistics) and **Study** (study plan, theme notes, recap). The two sides stay separate but linked: study entries in the timeline are one line with a link to their session page, and each session page links back to its day and to what comes next.
- Five daily itineraries with study/explore filters and expandable activity notes. The selected day is in the URL hash (`/#monday`), so other pages can link to a day.
- `/raleigh`: things to do in Raleigh. What's on October 2–6 (First Friday, Raleigh Wide Open, Midtown Farmers' Market, the Market at NCMA) and places grouped by area, each tagged as a study break, an afternoon, or an evening, with the ones already in the itinerary marked (`src/lib/raleigh.ts`).
- `/details#exam-day`: how the exam afternoon runs and what to bring, from ABPD's February 2026 candidate guide and exam-day page.
- Confirmed hotel and exam logistics with direct identifiers and private email links removed.
- User-provided American Airlines flights with explicit local time zones and connection times.
- Local lunch and dinner suggestions, estimated food budgets, menus, and directions.
- `/study`: an index of the seven practice sessions (including the optional flight review), the answer framework, blueprint coverage, and official resources.
- `/study/sessions/[id]`: one page per session with timed steps, related themes, and the blueprint domains it covers (all ten domains across the seven sessions). Each domain lists every ABPD blueprint task statement with its cognitive level.
- `/study/themes`: 27 source PDFs (the 26 linked AAPD readings, including the 2026 acute pain, antibiotic prophylaxis, and child abuse and neglect documents, and the ABPD candidate guide) combined into nine themes, with concise summaries, original memory cues, seven decision diagrams, and 27 answer-aloud recall questions. Each theme links to its scheduled practice sessions and cites the original PDF pages. Revision dates come from the individual documents rather than the manual's collection year.
- `/study/themes/[id]`: one page per theme with key points, the classic trap, decision diagrams (17 in total, including 2026 pain and endocarditis-prophylaxis maps), a flashcard deck, and sources.
- `/study/flashcards`: all 96 cards in one shuffleable deck. Cards are built only from cited theme content and recap rules (`src/lib/flashcards.ts`). Flip with Space, move with arrow keys, mark with 1/2; "known/again" progress is kept in this browser's localStorage and shared across decks. Printing a deck prints every card as a list.
- The public ABPD candidate resource library: blueprint, exam guide, study tips, communication advice, three mock videos, two examination-day videos, policies, and FAQs.
- A curated AAPD reading list for each topic plus access to the complete Reference Manual. Summaries and original practice prompts are independent review aids, not ABPD exam questions or clinical protocols.
- `/study/recap`: a printable one-page review sheet with editable reminders. It condenses each clinical theme into its memory cue, trigger → answer rules, and the classic trap, plus a "numbers to know" strip. Every rule restates a cited point from `/study/themes` (`src/lib/recap.ts`). Reminders remain in the current tab and are included when printing or saving as PDF; they are not sent to a server or saved after navigation.
- A print layout covering all five days regardless of the selected day or filter.
- Keyboard navigation, responsive layouts, and reduced-motion support.
- Tailwind utility classes throughout the components, using the default system sans-serif font, type scale, colors, spacing, radii, and shadows. Study activities use emerald, breaks and cautions use amber, and travel uses sky blue. There are no downloaded Google fonts or custom Tailwind theme overrides.

The itinerary is a static snapshot, not a live Gmail or airline integration. Sources were reviewed September 23, 2026. Monday registration is at 2:45 PM. The approximately 6:15–6:45 PM hotel return is an estimate; ABPD says to allow about four hours in total. Outings, meals, transfers, and study blocks are suggestions, not bookings.

## Editing

`src/lib/itinerary.ts` contains the daily plan and source links. `src/lib/raleigh.ts` contains the Explore Raleigh places and weekend events. `src/lib/study.ts` contains the study sessions, topic notes, and original-source links. `src/lib/study-themes.ts` contains the merged review notes and PDF source metadata; cited page numbers count from the first PDF page. Presentation uses Tailwind utilities in `src/components` and the page components in `src/app`. `src/app/globals.css` only imports Tailwind and sets the printed page margin; responsive, focus, reduced-motion, and print styles live alongside their components.

The public version retains the approved trip schedule, hotel, and examination location. Personal names, reservation/ticket identifiers, payment details, and Gmail message links are omitted. No mailbox credentials or live integrations are included. Search-engine indexing is disabled; this is not authentication.

Official materials remain on the ABPD, AAPD, and Vimeo sites and are linked rather than redistributed. Sources were checked September 23, 2026; current official guidance and candidate instructions take precedence. Restaurant budgets are planning estimates per person before tax, tip, drinks, and transport.

The watercolor asset in `public/raleigh-watercolor.png` was created with the built-in image generation tool. It is an illustration, not a documentary city photograph.

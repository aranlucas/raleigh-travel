# Feature roadmap

Planning baseline: `5ac896963342` on `origin/main`, 2026-10-26. The October 2–6, 2026 trip has passed. This plan treats the [existing itinerary](README.md) as a public-safe trip artifact, not a live booking service.

## Outcome

Preserve a useful trip record and make its layout reusable without accidentally presenting old logistics as current.

## 1. Make the archived trip unmistakable

Show the original trip dates prominently and distinguish historical itinerary information from any currently retrieved weather. Provide a compact archived print view with a clear content date.

Acceptance:

- A visitor can tell that the trip is historical before relying on a schedule.
- Old reservations, events or exam arrangements are not described as current confirmations.
- The recap retains the useful itinerary and map structure without adding personal identifiers.
- Study links continue to lead to Oral Boards, which owns the learning experience.

Ask the owner whether the archive is still useful. There is no need to build more features if preservation is the only remaining job.

## 2. Start another small trip from a reviewed copy

Provide an explicit duplication checklist for replacing dates, locations, transport, stays and study links together. Surface unresolved items as unconfirmed.

Acceptance: a sample replacement trip contains no old date-specific bookings or events; public output excludes names, ticket identifiers, payment details and private mailbox links.

## 3. Keep the next-day view usable

If the template is reused, offer a concise day view and printable fallback showing the next action, location and verified logistics. Mark unavailable live information honestly.

## Boundaries and evidence

No mailbox ingestion, reservations API, new study engine or general travel-agent backend belongs in this release. trvl owns broader travel discovery; this repository presents a deliberately curated itinerary. Keep native framework and test commands. Measure preparation effort and the ability to find the next practical detail during a trip; traffic and itinerary size do not establish value.

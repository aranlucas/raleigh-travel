/** Facts from ABPD's OCE pages and candidate guide (updated February 2026), checked September 23, 2026. */
export const examFacts: readonly Readonly<{ label: string; value: string }>[] = [
  {
    label: "Format",
    value: "Two successive one-hour segments, two examiners each, clinical vignettes",
  },
  {
    label: "Segment length",
    value: "At least 1 hour and up to 1 hour 15 minutes, with a short restroom break between",
  },
  {
    label: "Total time",
    value: "About four hours with registration (~20 min), orientation, and a restroom break",
  },
  { label: "Questions", value: "Open-ended, in English; examiners do not give feedback" },
  { label: "Scoring", value: "Each examiner scores independently, 1–3 per task" },
  { label: "Results", value: "Pass/fail, on the ABPD website within 8 weeks" },
];

export const examDayRules: readonly string[] = [
  "Bring a valid government-issued photo ID to registration.",
  "Small items (phone, keys, wallet, watch, small purse) go in a locker and cannot be accessed during breaks.",
  "No phones, smartwatches, notes, or bags in the exam room. Larger items are not permitted at registration; leave them at the hotel.",
  "A light snack, such as a granola bar, is available in the exam room.",
  "Examinations may be monitored for examiner training; they are not recorded.",
];

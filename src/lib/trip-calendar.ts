export const tripDays = [
  { id: "friday", short: "FRI", date: "02", isoDate: "2026-10-02" },
  { id: "saturday", short: "SAT", date: "03", isoDate: "2026-10-03" },
  { id: "sunday", short: "SUN", date: "04", isoDate: "2026-10-04" },
  { id: "monday", short: "MON", date: "05", isoDate: "2026-10-05" },
  { id: "tuesday", short: "TUE", date: "06", isoDate: "2026-10-06" },
] as const;

export const TRIP_DATES = tripDays.map((day) => day.isoDate);

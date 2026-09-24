import { maps, sources } from "./itinerary";

export type Area = "north-hills" | "downtown" | "west";
export type Fit = "break" | "half-day" | "evening";

export type Place = Readonly<{
  id: string;
  name: string;
  area: Area;
  kind: string;
  blurb: string;
  /** Travel time from Hyatt House North Hills; approximate, traffic varies. */
  fromHotel: string;
  /** Latitude and longitude, from OpenStreetMap. */
  coords: readonly [number, number];
  cost: string;
  hours: string;
  fit: Fit;
  /** Set when the itinerary already schedules this place. */
  planned?: Readonly<{ dayId: string; label: string }>;
  href: string;
  directions: string;
}>;

export type Happening = Readonly<{
  id: string;
  name: string;
  when: string;
  where: string;
  blurb: string;
  verdict: string;
  dayId: string;
  href: string;
}>;

export const hotelCoords = [35.8364, -78.6381] as const;
export const examCoords = [35.8369, -78.6399] as const;

export const areaOrder: readonly Area[] = ["north-hills", "downtown", "west"];

export const areas: Readonly<Record<Area, { label: string; note: string }>> = {
  "north-hills": {
    label: "North Hills",
    note: "Your neighborhood. Everything here is a short walk from the hotel and the exam.",
  },
  downtown: {
    label: "Downtown",
    note: "About 15 minutes by car. Museums, the Capitol, and the busiest food streets.",
  },
  west: {
    label: "West Raleigh & parks",
    note: "About 15–20 minutes by car. Art, gardens, and room to walk.",
  },
};

export const fits: Readonly<Record<Fit, string>> = {
  break: "Fits a study break",
  "half-day": "Worth an afternoon",
  evening: "An evening out",
};

// Hours and prices were checked on official or listing sites September 23, 2026. Confirm before going.
export const places: readonly Place[] = [
  {
    id: "midtown-market",
    name: "Midtown Farmers’ Market",
    area: "north-hills",
    kind: "Market",
    blurb:
      "A producers-only Saturday market in the Commons at North Hills: produce, bread, flowers, and coffee.",
    fromHotel: "5 min walk",
    coords: [35.8375, -78.6409],
    cost: "Free to browse",
    hours: "Saturdays 8 AM–noon, April–November",
    fit: "break",
    planned: { dayId: "saturday", label: "Optional, Sat 8 AM" },
    href: sources.midtownMarket,
    directions: maps("The Commons at North Hills, Raleigh NC"),
  },
  {
    id: "shelley-lake",
    name: "Shelley Lake loop",
    area: "north-hills",
    kind: "Outdoors",
    blurb:
      "A flat, paved two-mile loop around a lake, with boardwalks and shade. Good for clearing your head between study sessions.",
    fromHotel: "10 min drive",
    coords: [35.8623, -78.6593],
    cost: "Free",
    hours: "City park hours, daylight",
    fit: "break",
    href: "https://www.visitraleigh.com/listing/shelley-lake-park/58881/",
    directions: maps("Shelley Lake Park, 1400 W Millbrook Rd, Raleigh NC"),
  },
  {
    id: "north-hills-evening",
    name: "North Hills restaurants",
    area: "north-hills",
    kind: "Food & drink",
    blurb:
      "Cowfish, Coquette, Vivace, and the BBQ Lab are all in the plan and within walking distance of the hotel.",
    fromHotel: "5 min walk",
    coords: [35.8379, -78.6425],
    cost: "$15–30 per person",
    hours: "Varies by restaurant",
    fit: "evening",
    planned: { dayId: "friday", label: "Fri, Sat & Sun dinners" },
    href: "https://www.visitnorthhills.com/",
    directions: maps("North Hills, Raleigh NC"),
  },
  {
    id: "science",
    name: "NC Museum of Natural Sciences",
    area: "downtown",
    kind: "Museum",
    blurb:
      "Two buildings of dinosaurs, living animals, and a research wing with a café. Free, and easy to leave after an hour.",
    fromHotel: "15 min drive",
    coords: [35.7822, -78.6395],
    cost: "Free general admission",
    hours: "Tue–Sun 10 AM–5 PM",
    fit: "half-day",
    planned: { dayId: "saturday", label: "Sat 1:15 PM" },
    href: sources.science,
    directions: maps("North Carolina Museum of Natural Sciences, 11 West Jones Street, Raleigh NC"),
  },
  {
    id: "capitol",
    name: "State Capitol & Union Square",
    area: "downtown",
    kind: "History",
    blurb:
      "An 1840 Greek Revival capitol under old oaks, one block from the science museum. Self-guided visits.",
    fromHotel: "15 min drive",
    coords: [35.7804, -78.6391],
    cost: "Free",
    hours: "Sat 10 AM–5 PM",
    fit: "break",
    planned: { dayId: "saturday", label: "Sat 3 PM" },
    href: sources.capitol,
    directions: maps("North Carolina State Capitol, 1 East Edenton Street, Raleigh NC"),
  },
  {
    id: "videri",
    name: "Videri Chocolate Factory",
    area: "downtown",
    kind: "Sweet stop",
    blurb:
      "Bean-to-bar chocolate in a Warehouse District brick building; watch through the windows, then buy a celebration bar.",
    fromHotel: "15 min drive",
    coords: [35.7757, -78.6439],
    cost: "$5–15",
    hours: "Fri–Sat 10 AM–9 PM · Sun 10 AM–5 PM · Mon 10 AM–6 PM",
    fit: "break",
    href: "https://viderichocolatefactory.com/hours",
    directions: maps("Videri Chocolate Factory, 327 W Davie St, Raleigh NC"),
  },
  {
    id: "transfer-co",
    name: "Transfer Co. Food Hall",
    area: "downtown",
    kind: "Food & drink",
    blurb:
      "A restored bus depot full of local counters. Easy if the two of you want different things.",
    fromHotel: "15 min drive",
    coords: [35.775, -78.6322],
    cost: "$12–25 per person",
    hours: "Hours vary by vendor; check before going",
    fit: "evening",
    href: "https://www.transfercofoodhall.com/",
    directions: maps("Transfer Co. Food Hall, 500 E Davie St, Raleigh NC"),
  },
  {
    id: "sitti",
    name: "Sitti",
    area: "downtown",
    kind: "Celebration dinner",
    blurb: "Lebanese mezze on Wilmington Street. The post-exam dinner in this plan.",
    fromHotel: "15 min drive",
    coords: [35.7785, -78.6381],
    cost: "$25–40 per person",
    hours: "Mon 11 AM–9 PM",
    fit: "evening",
    planned: { dayId: "monday", label: "Mon ~7:30 PM" },
    href: sources.sitti,
    directions: maps("Sitti, 135 South Wilmington Street, Raleigh NC"),
  },
  {
    id: "ncma",
    name: "NC Museum of Art & Museum Park",
    area: "west",
    kind: "Museum",
    blurb:
      "Big, bright galleries plus a 164-acre park with outdoor sculpture and trails. The Sunday afternoon in this plan.",
    fromHotel: "20 min drive",
    coords: [35.8105, -78.7022],
    cost: "Free general admission",
    hours: "Galleries Wed–Sun 10 AM–5 PM · park dawn to dusk",
    fit: "half-day",
    planned: { dayId: "sunday", label: "Sun 1 PM" },
    href: sources.art,
    directions: maps("North Carolina Museum of Art, 2110 Blue Ridge Road, Raleigh NC"),
  },
  {
    id: "raulston",
    name: "JC Raulston Arboretum",
    area: "west",
    kind: "Garden",
    blurb:
      "NC State’s free arboretum, with thousands of plants. Quiet on an early-October afternoon.",
    fromHotel: "20 min drive",
    coords: [35.7942, -78.6996],
    cost: "Free",
    hours: "Sat–Sun 10 AM–5 PM · weekdays 9 AM–4:30 PM",
    fit: "break",
    href: "https://jcra.ncsu.edu/",
    directions: maps("JC Raulston Arboretum, 4415 Beryl Rd, Raleigh NC"),
  },
  {
    id: "dix-park",
    name: "Dorothea Dix Park",
    area: "west",
    kind: "Outdoors",
    blurb:
      "Rolling lawns with the best skyline view in Raleigh. Bring a coffee and sit on the Big Field hill.",
    fromHotel: "20 min drive",
    coords: [35.7701, -78.6568],
    cost: "Free",
    hours: "Daily, sunrise to sunset",
    fit: "break",
    href: "https://dixpark.org/",
    directions: maps("Dorothea Dix Park Big Field, Raleigh NC"),
  },
];

export const happenings: readonly Happening[] = [
  {
    id: "first-friday",
    name: "First Friday Market & Movie",
    when: "Fri, Oct 2 · 5–9 PM",
    where: "Moore Square, downtown",
    blurb:
      "Vendors, food trucks, live music at 5:30, and Ghostbusters on an outdoor screen around 7:15. Galleries stay open late.",
    verdict: "You land at 4:54 PM after a 4:40 AM start. Skip it and sleep.",
    dayId: "friday",
    href: sources.firstFriday,
  },
  {
    id: "wide-open",
    name: "Raleigh Wide Open",
    when: "Oct 1–3 · downtown streets",
    where: "Downtown Raleigh",
    blurb:
      "A free festival of bluegrass and roots music across downtown stages, plus food and craft vendors.",
    verdict:
      "It overlaps Saturday’s downtown afternoon. Listen for a few songs between the museum and the Capitol.",
    dayId: "saturday",
    href: sources.wideOpen,
  },
  {
    id: "midtown-market",
    name: "Midtown Farmers’ Market",
    when: "Sat, Oct 3 · 8 AM–noon",
    where: "The Commons, North Hills",
    blurb: "Your neighborhood market, a five-minute walk from the hotel.",
    verdict: "A short loop before the 9 AM study block, if you are up early.",
    dayId: "saturday",
    href: sources.midtownMarket,
  },
  {
    id: "ncma-market",
    name: "The Market at NCMA",
    when: "Sat, Oct 3 · 11 AM–4 PM",
    where: "NC Museum of Art plaza",
    blurb:
      "A first-Saturday market of local artists with live music, outdoors on the museum plaza.",
    verdict:
      "The plan visits NCMA on Sunday. To catch this, swap the weekend afternoons; both work.",
    dayId: "saturday",
    href: "https://www.trianglepopup.com/events",
  },
];

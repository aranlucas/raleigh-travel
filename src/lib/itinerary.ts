export type Category = "study" | "explore" | "reset" | "travel" | "exam";
export type PlanLink = Readonly<{ label: string; href: string }>;
export type Activity = Readonly<{
  id: string;
  time: string;
  category: Category;
  title: string;
  description: string;
  details: readonly string[];
  minutes?: number;
  optional?: boolean;
  links?: readonly PlanLink[];
}>;
export type Day = Readonly<{
  id: string;
  short: string;
  date: string;
  label: string;
  title: string;
  description: string;
  takeaway: string;
  activities: readonly Activity[];
  milestones?: readonly Readonly<{ time: string; label: string }>[];
}>;
export const sources = {
  abpd: "https://www.abpd.org/become-certified/oral-clinical-examination",
  science: "https://www.naturalsciences.org/visit/hours-admission",
  capitol: "https://historicsites.nc.gov/all-sites/north-carolina-state-capitol",
  art: "https://www.dncr.nc.gov/visit/museums/art-museums/north-carolina-museum-art",
  park: "https://ncartmuseum.org/plan-your-visit/museum-park/",
  cowfish: "https://thecowfish.com/",
  dailyPlanet: "https://thedailyplanetcafe.com/",
  bbqLab: "https://ncbbqlab.com/",
  coquette: "https://coquetteraleigh.com/sunday-brunch",
  vivace: "https://vivaceraleigh.com/menu",
  sitti: "https://www.sitti-raleigh.com/contact",
  happyHale: "https://www.happyandhale.com/locations",
  midtownMarket: "https://www.visitnorthhills.com/signature-events/midtown-farmers-market",
  wideOpen: "https://raleighwideopen.com/event-info/",
  firstFriday: "https://raleighnc.gov/parks-and-recreation/events/first-friday-market-and-movie-2",
};
export function maps(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
export const hotelAddress =
  "Hyatt House Raleigh North Hills, 160 Park at North Hills Street, Raleigh, NC 27609";
export const examAddress = "AIME Center, 4208 Six Forks Road, Raleigh, NC 27609";
export const days: Day[] = [
  {
    id: "friday",
    short: "FRI",
    date: "02",
    label: "Arrive",
    title: "Friday, October 2",
    description: "Fly in, check in, eat nearby, sleep early.",
    takeaway: "No plans after dinner. You have been up since 4 AM Pacific.",
    activities: [
      {
        id: "sea-airport",
        time: "4:40 AM PT",
        category: "travel",
        title: "Arrive at SEA",
        description: "Suggested airport arrival, two hours before takeoff.",
        details: [
          "A planning buffer, not an airline check-in deadline. Allow extra time from home for the drive and bags.",
          "Seattle is three hours behind Raleigh. Flight times use each airport’s local time.",
        ],
      },
      {
        id: "outbound",
        time: "6:40 AM PT",
        category: "travel",
        title: "Seattle → Charlotte → Raleigh",
        description: "AA 381, then AA 1894 · 7 hrs 14 mins total.",
        details: [
          "AA 381: SEA 6:40 AM Pacific → CLT 2:50 PM Eastern.",
          "Charlotte connection: 1 hour 8 minutes.",
          "AA 1894: CLT 3:58 PM Eastern → RDU 4:54 PM Eastern.",
          "Schedule supplied by you. Check American Airlines for live flight status and gates.",
        ],
        links: [{ label: "American Airlines", href: "https://www.aa.com/" }],
      },
      {
        id: "flight-study",
        time: "During the flight",
        category: "study",
        title: "Optional: flight review",
        description: "30 minutes with familiar notes, only if you feel rested.",
        minutes: 30,
        optional: true,
        details: ["Only if you feel rested. No new material on a travel day."],
        links: [{ label: "Open the session", href: "/study/sessions/flight-study" }],
      },
      {
        id: "rdu-arrival",
        time: "4:54–6:00 PM",
        category: "travel",
        title: "Land at RDU",
        description: "Collect bags and head to North Hills.",
        details: [
          "Allow time to leave the airport, then a planning allowance of 30–45 minutes for the transfer. The exam email gives this range for travel between the hotel and RDU; actual traffic varies.",
          "Around 6 PM is an estimated hotel arrival.",
        ],
        links: [{ label: "Hotel directions", href: maps(hotelAddress) }],
      },
      {
        id: "check-in",
        time: "Around 6:00 PM",
        category: "reset",
        title: "Hotel check-in",
        description: "Check in at Hyatt House Raleigh North Hills.",
        details: [
          "Your confirmation lists October 2–6: four nights, two guests, one king bed. Check-in starts at 3 PM; Tuesday checkout is noon.",
          "Bring photo ID and a card for incidentals. Keep your booking confirmation handy.",
        ],
      },
      {
        id: "friday-dinner",
        time: "6:30–8:00 PM",
        category: "reset",
        title: "Dinner at The Cowfish",
        description: "Burgers or sushi, a short walk from the hotel.",
        details: [
          "Locally owned, at 4208 Six Forks Road. A burger or one roll keeps it around $20–30 per person.",
          "First Friday is on downtown tonight. Skip it; sleep matters more.",
        ],
        links: [
          { label: "Cowfish menu & details", href: sources.cowfish },
          { label: "Explore Raleigh", href: "/raleigh" },
          {
            label: "Directions",
            href: maps("The Cowfish, 4208 Six Forks Road, Raleigh NC"),
          },
        ],
      },
      {
        id: "friday-sleep",
        time: "9:30 PM",
        category: "reset",
        title: "Bed",
        description: "Get onto Eastern time. No studying tonight.",
        details: ["After an early Seattle departure, aim for a full night’s sleep."],
      },
    ],
  },
  {
    id: "saturday",
    short: "SAT",
    date: "03",
    label: "Study, then downtown",
    title: "Saturday, October 3",
    description: "Two study blocks in the morning, downtown in the afternoon.",
    takeaway: "Stop studying at 12:15. The afternoon is off.",
    activities: [
      {
        id: "sat-market",
        time: "8:00–8:45 AM",
        category: "explore",
        title: "Optional: farmers’ market",
        description: "Midtown Farmers’ Market, a 5-minute walk from the hotel.",
        minutes: 45,
        optional: true,
        details: [
          "A producers-only market in the Commons at North Hills, Saturdays 8 AM–noon, April through November. Pick up coffee, fruit, or a pastry for the study break.",
          "Keep it to a loop and be back at your desk by 9 AM. Skip it if you would rather sleep in.",
        ],
        links: [
          { label: "Market details", href: sources.midtownMarket },
          { label: "Directions", href: maps("The Commons at North Hills, Raleigh NC") },
        ],
      },
      {
        id: "sat-cases",
        time: "9:00–10:30 AM",
        category: "study",
        title: "Study: caries, prevention, growth",
        description: "Build full care plans and explain them to a parent.",
        minutes: 90,
        details: [
          "Steps, cases, and readings are on the session page. Take a real 15-minute break at 10:30.",
        ],
        links: [{ label: "Open the session", href: "/study/sessions/sat-cases" }],
      },
      {
        id: "sat-review",
        time: "10:45 AM–12:15 PM",
        category: "study",
        title: "Study: trauma, pulp, pathology",
        description: "Work through the decision points out loud.",
        minutes: 90,
        details: ["Say the answers out loud. Stop at 12:15; lunch is part of the plan."],
        links: [{ label: "Open the session", href: "/study/sessions/sat-review" }],
      },
      {
        id: "sat-lunch",
        time: "12:15–1:15 PM",
        category: "reset",
        title: "Lunch at Daily Planet Cafe",
        description: "Inside the science museum, downtown.",
        details: [
          "Sandwiches and salads in the Nature Research Center, 121 West Jones Street. Saturday 9 AM–5 PM · $12–20 per person.",
        ],
        links: [
          { label: "Cafe menu & hours", href: sources.dailyPlanet },
          {
            label: "Directions",
            href: maps("Daily Planet Cafe, 121 West Jones Street, Raleigh NC"),
          },
        ],
      },
      {
        id: "science",
        time: "1:15–3:00 PM",
        category: "explore",
        title: "Museum of Natural Sciences",
        description: "Free. Stay as long as it holds your interest.",
        minutes: 105,
        details: [
          "A relaxed visit of about 1¾ hours, with permission to leave sooner. General admission is free; special exhibitions may cost extra.",
          "The downtown museum lists Tuesday–Sunday hours of 10 AM–5 PM. Address: 11 West Jones Street.",
          "Check current museum notices before visiting.",
        ],
        links: [
          { label: "Hours & admission", href: sources.science },
          {
            label: "Directions",
            href: maps(
              "North Carolina Museum of Natural Sciences, 11 West Jones Street, Raleigh NC",
            ),
          },
        ],
      },
      {
        id: "capitol",
        time: "3:00–4:00 PM",
        category: "explore",
        title: "State Capitol and a coffee",
        description: "One block from the museum.",
        minutes: 60,
        details: [
          "Self-guided visits, Saturday 10 AM–5 PM. Skip it if you would rather linger over coffee.",
          "Raleigh Wide Open, a free music festival, is on downtown today. Expect stages and some street closures.",
        ],
        links: [
          { label: "Capitol visitor details", href: sources.capitol },
          { label: "Raleigh Wide Open", href: sources.wideOpen },
          {
            label: "Directions",
            href: maps("North Carolina State Capitol, 1 East Edenton Street, Raleigh NC"),
          },
        ],
      },
      {
        id: "sat-rest",
        time: "4:00–6:30 PM",
        category: "reset",
        title: "Back to the hotel",
        description: "Rest before dinner.",
        details: ["Keep this as open time. There is no additional study assignment today."],
      },
      {
        id: "sat-dinner",
        time: "6:30 PM onward",
        category: "reset",
        title: "Dinner at The BBQ Lab",
        description: "North Carolina barbecue in North Hills.",
        details: [
          "Try a pork plate with sides for a straightforward local meal. Budget: $15–25 per person.",
          "The restaurant lists Saturday service from 11 AM–9 PM, but smoked meats can sell out. Go a little earlier if a particular item matters to you.",
          "Aim to start winding down around 9 PM.",
        ],
        links: [
          { label: "BBQ Lab menu & hours", href: sources.bbqLab },
          {
            label: "Directions",
            href: maps("The BBQ Lab North Hills Raleigh NC"),
          },
        ],
      },
    ],
  },
  {
    id: "sunday",
    short: "SUN",
    date: "04",
    label: "Rehearse, then art",
    title: "Sunday, October 4",
    description: "A mock run in the morning, the art museum in the afternoon.",
    takeaway: "Studying ends at 5 PM. Nothing new after that.",
    activities: [
      {
        id: "sun-mock",
        time: "9:00–10:30 AM",
        category: "study",
        title: "Study: mock cases",
        description: "Behavior guidance and special health care needs, no notes.",
        minutes: 90,
        details: ["No looking things up mid-case. Debrief at the end."],
        links: [{ label: "Open the session", href: "/study/sessions/sun-mock" }],
      },
      {
        id: "sun-review",
        time: "10:45–11:30 AM",
        category: "study",
        title: "Study: safety and 2026 updates",
        description: "Sedation, emergencies, and what changed in the manual.",
        minutes: 45,
        details: ["Includes a 10-minute skim of the 2026 manual updates. No new resources."],
        links: [{ label: "Open the session", href: "/study/sessions/sun-review" }],
      },
      {
        id: "sun-lunch",
        time: "11:30 AM–1 PM",
        category: "reset",
        title: "Brunch at Coquette",
        description: "French brasserie in North Hills.",
        details: [
          "A French brasserie in North Hills at 4351 The Circle. Choose one brunch main for a relaxed sit-down meal. Budget: $18–28 per person.",
          "Aim to eat at 11:30 AM and leave around 12:30 PM for the museum at 2110 Blue Ridge Road. Check brunch availability ahead; shorten the museum visit if lunch runs long.",
        ],
        links: [
          { label: "Sunday brunch", href: sources.coquette },
          {
            label: "Directions",
            href: maps("Coquette Brasserie, 4351 The Circle at North Hills Street, Raleigh NC"),
          },
        ],
      },
      {
        id: "art",
        time: "1:00–3:00 PM",
        category: "explore",
        title: "NC Museum of Art",
        description: "Galleries plus the outdoor Museum Park. Free.",
        minutes: 120,
        details: [
          "Pick a few galleries and a short sculpture-park loop. Galleries Wed–Sun 10 AM–5 PM; park dawn to dusk. Free.",
          "If it rains, stay indoors.",
        ],
        links: [
          { label: "Museum visitor details", href: sources.art },
          { label: "Museum Park", href: sources.park },
          {
            label: "Directions",
            href: maps("North Carolina Museum of Art, 2110 Blue Ridge Road, Raleigh NC"),
          },
        ],
      },
      {
        id: "sun-return",
        time: "3:00–4:00 PM",
        category: "reset",
        title: "Back to the hotel",
        description: "Rest.",
        details: ["Leave the rest of the afternoon deliberately light."],
      },
      {
        id: "route",
        time: "4:00–4:20 PM",
        category: "exam",
        title: "Walk the route to the exam",
        description: "Five minutes each way to the AIME Center.",
        details: [
          "The exam email says 4208 Six Forks Road is less than 0.2 miles and a five-minute walk from Hyatt House.",
          "Locate the entrance from outside. This route check does not assume access to the testing center on Sunday.",
        ],
        links: [
          { label: "Testing center directions", href: maps(examAddress) },
          { label: "Official ABPD exam information", href: sources.abpd },
        ],
      },
      {
        id: "sun-recap",
        time: "4:30–5:00 PM",
        category: "study",
        title: "Study: final recap",
        description: "Read the one-page sheet, lay out ID and clothes.",
        minutes: 30,
        details: ["Read your one-page sheet, lay out ID and outfit, then put it all away."],
        links: [{ label: "Open the session", href: "/study/sessions/sun-recap" }],
      },
      {
        id: "sun-dinner",
        time: "6:00–9:30 PM",
        category: "reset",
        title: "Dinner at Vivace",
        description: "Italian in North Hills. Eat early.",
        details: [
          "Pizza or pasta at 4209 Lassiter Mill Road · $20–30 per person. Eat around 6, in bed by 10.",
        ],
        links: [
          { label: "Vivace menu", href: sources.vivace },
          {
            label: "Directions",
            href: maps("Vivace, 4209 Lassiter Mill Road, Raleigh NC"),
          },
        ],
      },
    ],
  },
  {
    id: "monday",
    short: "MON",
    date: "05",
    label: "Exam day",
    title: "Monday, October 5",
    description: "A short review in the morning. Registration at 2:45 PM.",
    takeaway: "Registration is at 2:45 PM. Leave the hotel around 2:25 PM.",
    milestones: [
      { time: "9:45 AM", label: "Close the notes" },
      { time: "2:25 PM", label: "Leave the hotel" },
      { time: "2:45 PM", label: "Registration" },
      { time: "~6:30 PM", label: "Back at the hotel" },
    ],
    activities: [
      {
        id: "mon-breakfast",
        time: "8:00–9:00 AM",
        category: "reset",
        title: "Breakfast",
        description: "At or near the hotel.",
        details: [
          "Stay around the hotel this morning. Allow time to eat and get ready without rushing.",
        ],
      },
      {
        id: "mon-review",
        time: "9:00–9:45 AM",
        category: "study",
        title: "Study: warm-up",
        description: "Recap sheet and one or two familiar cases.",
        minutes: 45,
        details: ["Recap sheet and one or two comfortable cases. Notes close at 9:45 AM."],
        links: [{ label: "Open the session", href: "/study/sessions/mon-review" }],
      },
      {
        id: "mon-rest",
        time: "9:45–11:30 AM",
        category: "reset",
        title: "Free time",
        description: "Stay near the hotel. No sightseeing.",
        details: ["Keep the morning free of sightseeing appointments and additional mock exams."],
      },
      {
        id: "mon-lunch",
        time: "11:30 AM–12:30 PM",
        category: "reset",
        title: "Lunch at Happy + Hale",
        description: "Bowls and salads, next to the hotel.",
        details: [
          "Bowls and salads at 200 Park at North Hills Street, open 8 AM–8 PM · $14–20 per person.",
          "Choose something familiar and be back by 12:30 PM.",
        ],
        links: [
          { label: "Happy + Hale location & hours", href: sources.happyHale },
          { label: "Menu", href: "https://www.happyandhale.com/menu" },
          {
            label: "Directions",
            href: maps("Happy and Hale, 200 Park at North Hills Street, Raleigh NC"),
          },
        ],
      },
      {
        id: "mon-ready",
        time: "12:30–2:25 PM",
        category: "exam",
        title: "Get ready",
        description: "Photo ID, clothes, and your latest exam email.",
        details: [
          "Bring government photo ID. Phone, keys, and watch go in a locker for the whole exam; leave everything else at the hotel.",
          "Eat something before you leave; a light snack is provided in the exam room.",
        ],
        links: [
          { label: "Exam-day checklist", href: "/details#exam-day" },
          { label: "Official ABPD exam information", href: sources.abpd },
        ],
      },
      {
        id: "walk-exam",
        time: "2:25–2:45 PM",
        category: "exam",
        title: "Walk to the AIME Center",
        description: "Wait in the lobby for the ABPD escort.",
        details: [
          "Allow a comfortable margin for a walk described in the email as less than five minutes.",
          "Wait in the lobby for an ABPD representative to escort candidates to registration. Registration is scheduled for 2:45 PM.",
        ],
        links: [
          {
            label: "Walking directions",
            href:
              "https://www.google.com/maps/dir/?api=1&origin=" +
              encodeURIComponent(hotelAddress) +
              "&destination=" +
              encodeURIComponent(examAddress) +
              "&travelmode=walking",
          },
        ],
      },
      {
        id: "exam",
        time: "2:45–~6:30 PM",
        category: "exam",
        title: "ABPD Oral Clinical Examination",
        description: "Session 3 · AIME Center, 4208 Six Forks Road.",
        details: [
          "Registration, orientation, then two segments of up to 1 hr 15 min with a short break. Allow about four hours.",
          "Back at the hotel around 6:15–6:45 PM.",
        ],
        links: [{ label: "Official ABPD exam information", href: sources.abpd }],
      },
      {
        id: "celebrate",
        time: "Around 7:00–7:30 PM",
        category: "reset",
        title: "Dinner at Sitti",
        description: "Lebanese, downtown. The exam is done.",
        details: [
          "Share mezze downtown at 135 South Wilmington Street · $25–40 per person. Monday 11 AM–9 PM.",
          "Book for 7:30 PM and allow 20–30 minutes for a rideshare. Too tired? Vivace in North Hills is the easy backup.",
        ],
        links: [
          { label: "Restaurant & reservations", href: sources.sitti },
          {
            label: "Directions",
            href: maps("Sitti, 135 South Wilmington Street, Raleigh NC"),
          },
        ],
      },
    ],
  },
  {
    id: "tuesday",
    short: "TUE",
    date: "06",
    label: "Fly home",
    title: "Tuesday, October 6",
    description: "Breakfast, pack, and leave for RDU at 11.",
    takeaway: "Leave the hotel around 11 AM. Your DFW connection is 51 minutes.",
    activities: [
      {
        id: "tue-breakfast",
        time: "8:30–9:30 AM",
        category: "reset",
        title: "Breakfast",
        description: "In North Hills.",
        details: ["Keep the morning close to the hotel. No studying scheduled."],
      },
      {
        id: "tue-pack",
        time: "9:30–10:45 AM",
        category: "reset",
        title: "Pack and check out",
        description: "Checkout is noon; leave earlier.",
        details: [
          "The confirmation lists noon checkout, but this plan leaves earlier for a comfortable airport buffer.",
          "Check the room, chargers, ID, and boarding passes.",
        ],
      },
      {
        id: "tue-airport",
        time: "11:00–11:45 AM",
        category: "travel",
        title: "Leave for RDU",
        description: "Leave North Hills for RDU around 11 AM.",
        details: [
          "Allow 30–45 minutes for the transfer. Target RDU by 11:45 AM, about 2½ hours before departure.",
          "Recheck traffic and airline guidance that morning, especially if checking bags.",
        ],
        links: [
          {
            label: "RDU directions",
            href: maps("Raleigh-Durham International Airport"),
          },
        ],
      },
      {
        id: "return",
        time: "2:13 PM ET",
        category: "travel",
        title: "Raleigh → Dallas → Seattle",
        description: "AA 2693, then AA 1483 · 8 hrs 31 mins total.",
        details: [
          "AA 2693: RDU 2:13 PM ET → DFW 4:30 PM CT. AA 1483: DFW 5:21 PM CT → SEA 7:44 PM PT.",
          "The DFW connection is 51 minutes. Eat at RDU and go straight to the next gate.",
        ],
        links: [{ label: "American Airlines", href: "https://www.aa.com/" }],
      },
      {
        id: "home",
        time: "7:44 PM PT",
        category: "travel",
        title: "Back in Seattle",
        description: "Scheduled arrival at SEA.",
        details: ["Allow time for deplaning, baggage, and your onward journey home."],
      },
    ],
  },
];
export function studyMinutes(day: Day) {
  return day.activities.reduce(
    (total, event) =>
      total + (event.category === "study" && event.optional !== true ? (event.minutes ?? 0) : 0),
    0,
  );
}
export function duration(minutes: number) {
  const hours = Math.floor(minutes / 60),
    rest = minutes % 60;
  return [hours ? `${hours} ${hours === 1 ? "hr" : "hrs"}` : "", rest ? `${rest} mins` : ""]
    .filter(Boolean)
    .join(" ");
}
const zoneOffsets: Record<string, number> = { PT: 180, CT: 60, ET: 0 };

function parseClock(text: string, fallbackMeridiem: string | undefined) {
  const match = /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/u.exec(text);
  if (match === null) {
    return null;
  }
  const meridiem = match[3] ?? fallbackMeridiem;
  const hours = (Number(match[1]) % 12) + (meridiem === "PM" ? 12 : 0);
  return { minutes: hours * 60 + Number(match[2] ?? 0), explicit: match[3] !== undefined };
}

/** Minutes after midnight, Eastern time. Returns null for untimed entries. */
export function parseTime(time: string): { start: number; end?: number } | null {
  const offset = zoneOffsets[/\b(PT|CT|ET)\b/u.exec(time)?.[1] ?? "ET"];
  const [startText, endText] = time.split("–");
  const end = endText === undefined ? null : parseClock(endText, "AM");
  const start = parseClock(startText, /(AM|PM)/u.exec(endText ?? "")?.[1]);
  if (start === null) {
    return null;
  }
  const startMinutes =
    end !== null && !start.explicit && start.minutes > end.minutes
      ? start.minutes - 720
      : start.minutes;
  return end === null
    ? { start: startMinutes + offset }
    : { start: startMinutes + offset, end: end.minutes + offset };
}

export type Span = Readonly<{ id: string; category: Category; start: number; end: number }>;

/** Timed activities as Eastern spans; open-ended entries run until the next one begins. */
export function daySpans(day: Day): Span[] {
  const timed = day.activities.flatMap((activity) => {
    const parsed = parseTime(activity.time);
    return parsed === null ? [] : [{ activity, ...parsed }];
  });
  return timed.map((item, index) => {
    const nextStart = timed.at(index + 1)?.start;
    const end = item.end ?? nextStart ?? item.start + 60;
    return {
      id: item.activity.id,
      category: item.activity.category,
      start: item.start,
      end: Math.max(end, item.start + 15),
    };
  });
}

export function daySummary(day: Day) {
  const study = studyMinutes(day);
  const exploring = day.activities.reduce(
    (total, event) => total + (event.category === "explore" ? (event.minutes ?? 0) : 0),
    0,
  );
  return (
    [study ? `${duration(study)} study` : "", exploring ? `${duration(exploring)} exploring` : ""]
      .filter(Boolean)
      .join(" · ") ||
    (day.id === "friday" ? "Travel day · Early night" : "Travel day · No studying")
  );
}

/** Where an activity sits in the trip, and the first non-study activity after it. */
export function activityContext(activityId: string) {
  for (const day of days) {
    const index = day.activities.findIndex((activity) => activity.id === activityId);
    if (index !== -1) {
      const after = day.activities.slice(index + 1).find((item) => item.category !== "study");
      return { day, after };
    }
  }
  return null;
}

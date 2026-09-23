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
    label: "Arrive & settle in",
    title: "Friday, October 2",
    description: "A travel day, a soft landing, and an early night.",
    takeaway: "Sleep is the priority tonight. The exploring can wait until tomorrow.",
    activities: [
      {
        id: "sea-airport",
        time: "4:40 AM PT",
        category: "travel",
        title: "An early start at SEA",
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
        title: "A small, optional refresh",
        description: "30 minutes with familiar pediatric dentistry notes, if you feel rested.",
        minutes: 30,
        optional: true,
        details: [
          "Pick two familiar cases and mentally outline how you would explain your reasoning.",
          "Spend the rest of the flight resting. No new material today.",
        ],
        links: [{ label: "Open this practice block", href: "/study#flight-study" }],
      },
      {
        id: "rdu-arrival",
        time: "4:54–6:00 PM",
        category: "travel",
        title: "Welcome to Raleigh",
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
        title: "Make yourself at home",
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
        title: "Dinner close to home",
        description: "The Cowfish: burgers or sushi, right in North Hills.",
        details: [
          "A locally owned regional restaurant at 4208 Six Forks Road, Suite 100. A burger or a single roll with a side keeps the bill more manageable than a large sushi order.",
          "Planning budget: about $20–30 per person for food, before tax, tip, and drinks. This is an estimate, not a menu quote.",
          "If travel runs late, shorten the walk and go straight to winding down. Check the wait before heading out.",
        ],
        links: [
          { label: "Cowfish menu & details", href: sources.cowfish },
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
        title: "Call it a night",
        description: "Settle into Eastern time and leave the notes closed.",
        details: [
          "A suggested bedtime after an early Seattle departure. Adjust for how you feel, with a full night’s sleep as the goal.",
        ],
      },
    ],
  },
  {
    id: "saturday",
    short: "SAT",
    date: "03",
    label: "Study & explore",
    title: "Saturday, October 3",
    description: "A focused morning. An afternoon to make the city yours.",
    takeaway: "Three focused hours are enough. Let the afternoon be a real break.",
    activities: [
      {
        id: "sat-cases",
        time: "9:00–10:30 AM",
        category: "study",
        title: "Small patients, clear thinking",
        description: "Caries, prevention, developing dentition, and family-centered care planning.",
        minutes: 90,
        details: [
          "Suggested focus: caries risk, prevention, restorative choices, developing dentition, and explaining an achievable plan to a parent.",
          "Have a study partner read familiar practice cases, or record your answers if studying solo.",
          "Practice an organized response: findings → diagnosis and differential → management → complications → follow-up.",
          "Use your trusted preparation materials. Note any reasoning that felt unclear.",
        ],
        links: [{ label: "Open this practice block", href: "/study#sat-cases" }],
      },
      {
        id: "sat-review",
        time: "10:45 AM–12:15 PM",
        category: "study",
        title: "One more focused block",
        description: "Trauma, pulp therapy, and the cases that need a second look.",
        minutes: 90,
        details: [
          "Take a real 15-minute break before starting.",
          "Suggested focus: dental trauma, pulpal conditions, and oral pathology, prioritizing your own weak areas.",
          "Explain the difficult answers out loud and build a one-page recap. Stop at 12:15 PM.",
          "These are suggested review topics, not a complete exam blueprint.",
        ],
        links: [
          { label: "Open this practice block", href: "/study#sat-review" },
          { label: "Official ABPD OCE resources", href: sources.abpd },
        ],
      },
      {
        id: "sat-lunch",
        time: "12:15–1:15 PM",
        category: "reset",
        title: "Lunch & a change of pace",
        description: "Daily Planet Cafe: a local lunch at the science museum.",
        details: [
          "Head downtown, then have a sandwich or seasonal salad at the Nature Research Center wing, 121 West Jones Street. The cafe prepares food in-house and serves Raleigh-roasted coffee.",
          "Saturday hours: 9 AM–5 PM. Planning budget: $12–20 per person for food, before tax, tip, and drinks.",
          "This hour includes transport and lunch; start the museum later if needed.",
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
        title: "A little natural wonder",
        description: "North Carolina Museum of Natural Sciences.",
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
        title: "A walk through Raleigh",
        description: "The State Capitol, a coffee, and a slower pace.",
        minutes: 60,
        details: [
          "Visit the nearby State Capitol if you feel like another stop. Saturday hours are 10 AM–5 PM, with self-guided visits during opening hours.",
          "The official site currently flags sidewalk repairs on the grounds; use the open visitor routes.",
          "Skip the Capitol or shorten the walk if you would rather linger over coffee.",
        ],
        links: [
          { label: "Capitol visitor details", href: sources.capitol },
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
        title: "Back to your own pace",
        description: "Return to the hotel, rest, and freshen up.",
        details: ["Keep this as open time. There is no additional study assignment today."],
      },
      {
        id: "sat-dinner",
        time: "6:30 PM onward",
        category: "reset",
        title: "Dinner, then switch off",
        description: "The BBQ Lab: North Carolina barbecue, then a quiet evening.",
        details: [
          "Try a pork plate with sides for a straightforward local meal. Planning budget: $15–25 per person for food, before tax, tip, and drinks.",
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
    label: "Slow down",
    title: "Sunday, October 4",
    description: "A little rehearsal, a little art, and plenty of breathing room.",
    takeaway: "Finish studying by 5 PM. Familiarity and a quiet evening are the goal.",
    activities: [
      {
        id: "sun-mock",
        time: "9:00–10:30 AM",
        category: "study",
        title: "One calm dress rehearsal",
        description: "Behavior guidance, medically complex patients, and clear communication.",
        minutes: 90,
        details: [
          "Run a short sequence of familiar pediatric dentistry cases without pausing to look things up.",
          "Suggested focus: behavior guidance, patients with special health care needs, and explaining choices to families.",
          "Use your existing practice format. This is a short rehearsal, not a full simulation of the OCE’s timing. Debrief after the cases.",
        ],
        links: [{ label: "Open this practice block", href: "/study#sun-mock" }],
      },
      {
        id: "sun-review",
        time: "10:45–11:30 AM",
        category: "study",
        title: "Tidy up the loose ends",
        description: "Review weak spots and familiar sedation and emergency frameworks.",
        minutes: 45,
        details: [
          "Take a break first, then revisit only areas that need clarification, using your trusted course and references.",
          "Refine the one-page recap. Avoid opening a new study resource.",
          "The focus topics in this sample plan do not replace the official OCE blueprint.",
        ],
        links: [
          { label: "Open this practice block", href: "/study#sun-review" },
          { label: "Official ABPD OCE resources", href: sources.abpd },
        ],
      },
      {
        id: "sun-lunch",
        time: "11:30 AM–1 PM",
        category: "reset",
        title: "Lunch without a rush",
        description: "Coquette: Sunday brunch before the art museum.",
        details: [
          "A French brasserie in North Hills at 4351 The Circle. Choose one brunch main for a relaxed sit-down meal; planning budget is $18–28 per person for food, before tax, tip, and drinks.",
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
        title: "Art, oak trees, open space",
        description: "North Carolina Museum of Art & Museum Park.",
        minutes: 120,
        details: [
          "Choose a few galleries and a gentle sculpture-park stroll rather than trying to see everything.",
          "The galleries list Wednesday–Sunday hours of 10 AM–5 PM. The Museum Park is open daily from dawn to dusk.",
          "General museum and park admission are free; some exhibitions are ticketed. If it rains, spend the visit indoors.",
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
        title: "Head back & take a breath",
        description: "Return to North Hills and rest.",
        details: ["Leave the rest of the afternoon deliberately light."],
      },
      {
        id: "route",
        time: "4:00–4:20 PM",
        category: "exam",
        title: "Make Monday feel familiar",
        description: "Walk the route to the AIME Center and back.",
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
        title: "Your final recap",
        description: "Read the one-page sheet, then put it away.",
        minutes: 30,
        details: [
          "A quick review of familiar points you want to carry into Monday. No new topics tonight.",
          "Lay out your outfit, photo ID, and items required in your latest exam instructions.",
        ],
        links: [{ label: "Open this practice block", href: "/study#sun-recap" }],
      },
      {
        id: "sun-dinner",
        time: "6:00–9:30 PM",
        category: "reset",
        title: "A quiet evening in North Hills",
        description: "Vivace: an early Italian dinner, then wind down.",
        details: [
          "Stay in North Hills at 4209 Lassiter Mill Road, Suite 115. Pizza or pasta gives you a sit-down dinner at a moderate price; the posted menu includes a $16 margherita pizza and $18 pappardelle bolognese.",
          "Planning budget: $20–30 per person for food, before tax, tip, and drinks. Menu prices can change. Eat around 6 PM, wind down around 9 PM, and aim for bed around 9:30–10 PM.",
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
    label: "Board day",
    title: "Monday, October 5",
    description: "You have made space for this. Keep the morning simple.",
    takeaway: "Registration is at 2:45 PM. Leave the hotel around 2:25 PM.",
    activities: [
      {
        id: "mon-breakfast",
        time: "8:00–9:00 AM",
        category: "reset",
        title: "Start with something familiar",
        description: "Breakfast, water, and a gentle start.",
        details: [
          "Stay around the hotel this morning. Allow time to eat and get ready without rushing.",
        ],
      },
      {
        id: "mon-review",
        time: "9:00–9:45 AM",
        category: "study",
        title: "A light touch",
        description: "Your recap sheet and one or two comfortable pediatric oral cases.",
        minutes: 45,
        details: [
          "A confidence warm-up. Stop at 9:45 AM and put your materials away.",
          "No new topics and no full mock exam today.",
        ],
        links: [{ label: "Open this practice block", href: "/study#mon-review" }],
      },
      {
        id: "mon-rest",
        time: "9:45–11:30 AM",
        category: "reset",
        title: "Give yourself some space",
        description: "Relax at the hotel or take a short neighborhood walk.",
        details: ["Keep the morning free of sightseeing appointments and additional mock exams."],
      },
      {
        id: "mon-lunch",
        time: "11:30 AM–12:30 PM",
        category: "reset",
        title: "An unhurried lunch",
        description: "Happy + Hale: a familiar bowl or salad close to the hotel.",
        details: [
          "A Raleigh-grown counter-service option at 200 Park at North Hills Street, Suite 101, open 8 AM–8 PM daily. This is the practical exam-day pick: fresh bowls, salads, and a short trip back to your room.",
          "Choose ingredients you already enjoy. Planning budget: $14–20 per person for food, before tax, tip, and drinks. For a table-service alternative, Coquette also serves weekday lunch nearby.",
          "Be back at the hotel by 12:30 PM to get ready at your own pace.",
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
        title: "Get ready, at your pace",
        description: "Outfit, photo ID, and your latest exam instructions.",
        details: [
          "Check the latest candidate instructions for required materials, permitted items, and any updates.",
          "Your confirmation lists Session 3. Registration does not open before the listed time.",
        ],
        links: [{ label: "Official ABPD exam information", href: sources.abpd }],
      },
      {
        id: "walk-exam",
        time: "2:25–2:45 PM",
        category: "exam",
        title: "The short walk over",
        description: "Walk to the AIME Center and wait in the lobby.",
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
        time: "2:45–~6:15 PM",
        category: "exam",
        title: "Pediatric dental oral boards",
        description: "ABPD Oral Clinical Examination · Session 3 · AIME Center.",
        details: [
          "Official registration: 2:45 PM, Monday, October 5, 2026.",
          "The email estimates a 6:15 PM return to the hotel and does not give a separate exam start time. Session times were marked tentative; the latest official instructions take precedence.",
          "The entire afternoon remains protected.",
        ],
        links: [{ label: "Official ABPD exam information", href: sources.abpd }],
      },
      {
        id: "celebrate",
        time: "Around 7:00–7:30 PM",
        category: "reset",
        title: "Now, exhale",
        description: "Sitti: a Lebanese dinner downtown to celebrate finishing.",
        details: [
          "A local downtown restaurant at 135 South Wilmington Street. Share mezze and choose a main for a celebratory meal without a tasting-menu bill. Planning budget: $25–40 per person for food, before tax, tip, and drinks; transport is extra.",
          "Monday hours: 11 AM–9 PM. After the tentative 6:15 PM hotel return, freshen up and allow roughly 20–30 minutes for a rideshare as a planning estimate.",
          "Prefer to stay close or feeling tired? Vivace in North Hills is the easy backup.",
          "A suggestion, not a reservation. Keep the start flexible in case the exam session runs late.",
          "The notes can stay closed tonight.",
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
    label: "Head home",
    title: "Tuesday, October 6",
    description: "One last coffee, then home with a little less on your mind.",
    takeaway: "Leave the hotel around 11 AM. Your DFW connection is 51 minutes.",
    activities: [
      {
        id: "tue-breakfast",
        time: "8:30–9:30 AM",
        category: "reset",
        title: "One last slow morning",
        description: "Breakfast and coffee in North Hills.",
        details: ["Keep the morning close to the hotel. No studying scheduled."],
      },
      {
        id: "tue-pack",
        time: "9:30–10:45 AM",
        category: "reset",
        title: "Pack up the weekend",
        description: "Gather your things and check out early.",
        details: [
          "The confirmation lists noon checkout, but this plan leaves earlier for a comfortable airport buffer.",
          "Check the room, chargers, ID, and boarding passes.",
        ],
      },
      {
        id: "tue-airport",
        time: "11:00–11:45 AM",
        category: "travel",
        title: "A comfortable airport buffer",
        description: "Leave North Hills for RDU around 11 AM.",
        details: [
          "Allow about 30–45 minutes for the transfer, based on the exam email’s estimate. Target RDU by approximately 11:45 AM, about 2½ hours before departure.",
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
          "AA 2693: RDU 2:13 PM Eastern → DFW 4:30 PM Central.",
          "Eat lunch at RDU after security and bring a meal or snacks for the long trip home. DFW connection: 51 minutes; go directly to the onward gate and skip a sit-down dinner there.",
          "AA 1483: DFW 5:21 PM Central → SEA 7:44 PM Pacific.",
          "Schedule supplied by you. Live flight status and gates are not tracked in this app.",
        ],
        links: [{ label: "American Airlines", href: "https://www.aa.com/" }],
      },
      {
        id: "home",
        time: "7:44 PM PT",
        category: "travel",
        title: "Back in Seattle",
        description: "Scheduled arrival at SEA. Welcome home.",
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

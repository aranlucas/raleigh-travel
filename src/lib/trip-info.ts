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
  wideOpenSchedule: "https://raleighwideopen.com/",
  wideOpenMap:
    "https://raleighwideopen.com/wp-content/uploads/2026/09/RWO26-SiteMap-092426-scaled.png",
  gators:
    "https://floridagators.com/news/2026/9/29/football-broadcast-information-no-8-florida-vs-no-25-missouri",
  firstFriday: "https://raleighnc.gov/parks-and-recreation/events/first-friday-market-and-movie-2",
  weather: "https://forecast.weather.gov/MapClick.php?lat=35.7796&lon=-78.6382",
  snacks: "https://www.harristeeter.com/stores/grocery/nc/raleigh/north-hills/097/00422",
  hotelDining:
    "https://www.hyatt.com/hyatt-house/en-US/rduxn-hyatt-house-raleigh-north-hills/dining",
};

export function maps(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export const hotelAddress =
  "Hyatt House Raleigh North Hills, 160 Park at North Hills Street, Raleigh, NC 27609";

export const examAddress = "AIME Center, 4208 Six Forks Road, Raleigh, NC 27609";

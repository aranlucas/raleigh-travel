import { days } from "./itinerary";
import { localToday, TRIP_DATES } from "./weather";

export function selectedDayId(hash: string, now = new Date()): string {
  const linkedDay = days.find((day) => day.id === hash);

  if (linkedDay !== undefined) {
    return linkedDay.id;
  }

  const today = localToday(now);
  const tripDate = TRIP_DATES.find((date) => date === today);

  return days.find((day) => day.date === tripDate?.slice(8))?.id ?? "saturday";
}

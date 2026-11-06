import { tripDays } from "./trip-calendar";
import { localToday } from "./weather";

export function selectedDayId(hash: string, now = new Date()): string {
  const linkedDay = tripDays.find((day) => day.id === hash);

  if (linkedDay !== undefined) {
    return linkedDay.id;
  }

  const today = localToday(now);

  return tripDays.find((day) => day.isoDate === today)?.id ?? "saturday";
}

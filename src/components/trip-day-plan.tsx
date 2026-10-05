import type { Day } from "@/lib/itinerary";

import { DayTabs } from "./day-tabs";
import type { Filter } from "./timeline";
import { TripSidebar } from "./trip-sidebar";
import { TripWeather } from "./trip-weather";

export function TripDayPlan({
  day,
  filter,
  onSelectDay,
  onFilterChange,
  onMonday,
}: Readonly<{
  day: Day;
  filter: Filter;
  onSelectDay: (id: string) => void;
  onFilterChange: (filter: Filter) => void;
  onMonday: () => void;
}>) {
  return (
    <>
      <DayTabs selectedId={day.id} onSelect={onSelectDay} />
      <div className="mt-10 grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1fr)_19rem] lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
        <TripWeather day={day} filter={filter} onFilterChange={onFilterChange} />
        <TripSidebar onMonday={onMonday} />
      </div>
    </>
  );
}

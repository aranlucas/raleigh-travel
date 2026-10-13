import type { Day } from "@/lib/itinerary";

import { DayTabs } from "./day-tabs";
import type { Filter } from "./timeline";
import { TripSidebar } from "./trip-sidebar";
import { TripWeather } from "./trip-weather";

type TripDayPlanProps = Readonly<{
  day: Day;
  filter: Filter;
  onSelectDay: (id: string) => void;
  onFilterChange: (filter: Filter) => void;
  onMonday: () => void;
}>;

export function TripDayPlan({
  day,
  filter,
  onSelectDay,
  onFilterChange,
  onMonday,
}: TripDayPlanProps) {
  return (
    <>
      <DayTabs selectedId={day.id} onSelect={onSelectDay} />
      <div className="mbs-10 grid grid-cols-1 items-start gap-10 md:grid-plan lg:grid-plan-wide lg:gap-14">
        <TripWeather day={day} filter={filter} onFilterChange={onFilterChange} />
        <TripSidebar onMonday={onMonday} />
      </div>
    </>
  );
}

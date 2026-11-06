import { TripPlanner } from "@/components/trip-planner";
import { TripShell } from "@/components/trip-shell";

export default function Home() {
  return (
    <TripShell current="itinerary">
      <TripPlanner />
    </TripShell>
  );
}

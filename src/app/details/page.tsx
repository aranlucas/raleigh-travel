import type { Metadata } from "next";

import { TripPlanner } from "@/components/trip-planner";

export const metadata: Metadata = {
  title: "Trip details · Raleigh, together",
};

export default function DetailsPage() {
  return <TripPlanner view="details" />;
}

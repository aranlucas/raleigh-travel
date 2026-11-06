import type { Metadata } from "next";

import { TripDetails } from "@/components/trip-details";
import { TripShell } from "@/components/trip-shell";

export const metadata: Metadata = {
  title: "Trip details · Raleigh, together",
};

export default function DetailsPage() {
  return (
    <TripShell current="details">
      <div id="trip-content" className="scroll-mbs-6" tabIndex={-1}>
        <TripDetails />
      </div>
    </TripShell>
  );
}

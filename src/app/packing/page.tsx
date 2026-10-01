import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TripPacking } from "@/components/trip-packing";
export const metadata: Metadata = {
  title: "Packing · Raleigh, together",
  description: "Lucas’s five-day carry-on packing checklist for Raleigh, October 2–6, 2026.",
};
export default function PackingPage() {
  return (
    <>
      <a className="skip-link" href="#packing">
        Skip to packing checklist
      </a>
      <SiteHeader current="packing" />
      <main className="page-shell">
        <TripPacking />
        <SiteFooter />
      </main>
    </>
  );
}

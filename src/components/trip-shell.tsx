import { PrintItinerary } from "./print-itinerary";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { TripHero } from "./trip-hero";

type TripShellProps = Readonly<{ current: "itinerary" | "details"; children: React.ReactNode }>;

export function TripShell({ current, children }: TripShellProps) {
  return (
    <>
      <div className="print:hidden">
        <a className="skip-link" href="#trip-content">
          Skip to itinerary
        </a>
        <SiteHeader current={current} />
        <main className="page-shell">
          <TripHero />
          {children}
          <SiteFooter />
        </main>
      </div>
      <PrintItinerary />
    </>
  );
}

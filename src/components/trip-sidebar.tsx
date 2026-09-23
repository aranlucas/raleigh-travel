import { ArrowRight, CalendarDays, House, MapPin } from "lucide-react";

export function TripSidebar({
  onMonday,
  onDetails,
}: Readonly<{
  onMonday: () => void;
  onDetails: () => void;
}>) {
  return (
    <aside className="trip-sidebar" aria-label="Exam and hotel details">
      <section className="exam-card">
        <div className="panel-label">
          <CalendarDays size={23} strokeWidth={1.5} aria-hidden="true" />
          <span>The important part</span>
        </div>
        <h2>Monday is yours.</h2>
        <p className="exam-subtitle">Pediatric dental oral boards</p>
        <p className="exam-organization">ABPD Oral Clinical Examination</p>
        <ol className="exam-times">
          <li>
            <span>2:00 PM</span>
            <span>Your calm buffer</span>
          </li>
          <li>
            <span>2:45 PM</span>
            <span>Registration · Session 3</span>
          </li>
          <li>
            <span>~6:15 PM</span>
            <span>Back at the hotel</span>
          </li>
        </ol>
        <div className="exam-location">
          <MapPin size={22} strokeWidth={1.6} aria-hidden="true" />
          <div>
            <strong>AIME Center</strong>
            <p>4208 Six Forks Road</p>
            <p className="walking-note">Less than a 5-minute walk from your hotel.</p>
            <button type="button" className="text-button" onClick={onMonday}>
              See Monday’s plan <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
      <section className="hotel-card">
        <House size={24} strokeWidth={1.5} aria-hidden="true" />
        <div>
          <p className="panel-label">Your home base</p>
          <h3>Hyatt House Raleigh North Hills</h3>
          <p>Oct 2–6 · 4 nights · 2 guests</p>
          <button type="button" className="text-button" onClick={onDetails}>
            View trip details <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
      </section>
      <p className="sidebar-note">
        A sample plan from your travel emails.
        <br />
        Raleigh plans use Eastern time.
      </p>
    </aside>
  );
}

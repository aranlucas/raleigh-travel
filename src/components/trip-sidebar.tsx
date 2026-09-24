import { ArrowRight, CalendarDays, House, MapPin } from "lucide-react";

const focusClasses =
  "focus-visible:outline-2 focus-visible:outline-amber-700 focus-visible:outline-offset-[5px] focus-visible:rounded-sm";
const textButtonClasses =
  "inline-flex items-center gap-2 p-0 text-sm font-medium leading-normal text-emerald-700 underline decoration-1 underline-offset-4 transition-colors motion-reduce:transition-none hover:text-amber-700";

export function TripSidebar({
  onMonday,
  onDetails,
}: Readonly<{
  onMonday: () => void;
  onDetails: () => void;
}>) {
  return (
    <aside
      className="pt-0 sm:grid sm:grid-cols-2 sm:gap-4 md:block"
      aria-label="Exam and hotel details"
    >
      <section className="rounded-xl bg-emerald-50 p-6 md:max-lg:px-5">
        <div className="flex items-center gap-4 text-sm text-emerald-700">
          <CalendarDays size={23} strokeWidth={1.5} aria-hidden="true" />
          <span>The important part</span>
        </div>
        <h2 className="mt-3 text-4xl font-medium leading-tight tracking-tight">Monday is yours.</h2>
        <p className="text-2xl font-medium leading-normal tracking-tight">
          Pediatric dental oral boards
        </p>
        <p className="mt-1 text-sm text-slate-600">ABPD Oral Clinical Examination</p>
        <ol className="m-0 mt-5 mb-6 list-none pl-2">
          <li className="relative grid grid-cols-[82px_1fr] gap-2 pb-3 pl-6 text-sm leading-normal before:absolute before:top-2 before:left-0 before:z-[1] before:size-[7px] before:rounded-full before:bg-emerald-600 before:content-[''] after:absolute after:top-[15px] after:bottom-[-7px] after:left-[3px] after:w-px after:bg-emerald-100 md:max-lg:grid-cols-[70px_1fr] md:max-lg:pl-4 xl:grid-cols-[82px_1fr]">
            <span>2:45 PM</span>
            <span>Registration · Session 3</span>
          </li>
          <li className="relative grid grid-cols-[82px_1fr] gap-2 pl-6 text-sm leading-normal before:absolute before:top-2 before:left-0 before:z-[1] before:size-[7px] before:rounded-full before:bg-emerald-600 before:content-[''] md:max-lg:grid-cols-[70px_1fr] md:max-lg:pl-4 xl:grid-cols-[82px_1fr]">
            <span>~6:15 PM</span>
            <span>Back at the hotel</span>
          </li>
        </ol>
        <div className="flex gap-3 border-t border-slate-200 pt-4">
          <MapPin className="mt-1" size={22} strokeWidth={1.6} aria-hidden="true" />
          <div>
            <strong className="text-sm font-semibold">AIME Center</strong>
            <p className="text-sm">4208 Six Forks Road</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600 italic">
              Less than a 5-minute walk from your hotel.
            </p>
            <button
              type="button"
              className={`${textButtonClasses} ${focusClasses} mt-4`}
              onClick={onMonday}
            >
              See Monday’s plan <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
      <section className="mt-3 flex gap-4 rounded-xl border border-slate-200 p-6 sm:mt-0 md:mt-3 md:max-lg:gap-3 md:max-lg:px-4 md:max-lg:py-5">
        <House className="shrink-0" size={24} strokeWidth={1.5} aria-hidden="true" />
        <div>
          <p className="flex items-center gap-4 text-sm text-emerald-700">Your home base</p>
          <h3 className="mt-3 text-sm font-semibold leading-normal">
            Hyatt House Raleigh North Hills
          </h3>
          <p className="mt-1 text-sm text-slate-600">Oct 2–6 · 4 nights · 2 guests</p>
          <button
            type="button"
            className={`${textButtonClasses} ${focusClasses} mt-4`}
            onClick={onDetails}
          >
            View trip details <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
      </section>
      <p className="mt-4 text-center text-sm font-normal leading-normal text-slate-600 sm:col-span-2 sm:mt-0 md:mt-4">
        A sample plan from your travel emails.
        <br />
        Raleigh plans use Eastern time.
      </p>
    </aside>
  );
}

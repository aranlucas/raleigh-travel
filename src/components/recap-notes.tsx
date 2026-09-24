"use client";

import { Printer } from "lucide-react";
import { useState } from "react";

const solidLinkClass =
  "inline-flex items-center justify-center gap-2 rounded-md border border-slate-900 bg-slate-900 px-4 py-3 text-base font-medium leading-normal text-white no-underline transition-colors hover:bg-emerald-800 hover:text-white motion-reduce:transition-none max-[760px]:px-3 max-[760px]:py-2 max-[760px]:text-sm";

export function RecapPrintButton() {
  return (
    <button
      className={solidLinkClass}
      type="button"
      onClick={() => {
        window.print();
      }}
    >
      <Printer size={17} aria-hidden="true" />
      Print / save PDF
    </button>
  );
}

export function RecapNotes() {
  const [notes, setNotes] = useState("");
  return (
    <section className="mt-6 border-t border-slate-200 pt-4 print:mt-3 print:pt-2">
      <label className="block text-base font-semibold print:text-[9pt]" htmlFor="recap-notes">
        My three reminders
      </label>
      <p className="mt-1 text-sm text-slate-600 print:hidden">
        Keep these in your own words. Notes stay in this tab; print or save as PDF before leaving.
      </p>
      <textarea
        className="mt-3 block w-full resize-y rounded-md border border-slate-200 bg-white p-3 font-sans text-base font-normal leading-normal text-slate-900 outline-none focus-visible:outline-2 focus-visible:outline-amber-700 focus-visible:outline-offset-3 print:hidden"
        id="recap-notes"
        rows={3}
        maxLength={360}
        value={notes}
        onChange={(event) => {
          setNotes(event.target.value);
        }}
        placeholder="1. One decision I want to explain clearly…&#10;2. One source or threshold to verify…&#10;3. One thing I already do well…"
      />
      <div className="hidden print:mt-1 print:block print:min-h-9 print:whitespace-pre-wrap print:[overflow-wrap:anywhere] print:font-sans print:text-[9pt] print:leading-[1.5]">
        {notes ||
          "1. _______________________________________________________________________\n2. _______________________________________________________________________\n3. _______________________________________________________________________"}
      </div>
    </section>
  );
}

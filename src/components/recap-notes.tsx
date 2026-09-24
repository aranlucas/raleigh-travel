"use client";

import { useState } from "react";

export function RecapNotes() {
  const [notes, setNotes] = useState("");
  return (
    <section className="mt-6 border-t border-line pt-4 print:mt-1 print:pt-1">
      <label className="block text-base font-semibold print:text-[8pt]" htmlFor="recap-notes">
        My three reminders
      </label>
      <p className="mt-1 text-sm text-muted print:hidden">
        Keep these in your own words. Notes stay in this tab; print or save as PDF before leaving.
      </p>
      <textarea
        className="mt-3 block w-full resize-y rounded-md border border-line-strong bg-surface p-3 text-base leading-normal text-ink transition-colors placeholder:text-muted/70 hover:border-pine/60 print:hidden"
        id="recap-notes"
        rows={3}
        maxLength={360}
        value={notes}
        onChange={(event) => {
          setNotes(event.target.value);
        }}
        placeholder="1. One decision I want to explain clearly…&#10;2. One source or threshold to verify…&#10;3. One thing I already do well…"
      />
      <div className="hidden print:mt-0.5 print:block print:whitespace-pre-wrap print:[overflow-wrap:anywhere] print:font-sans print:text-[7pt] print:leading-[1.6]">
        {notes ||
          "1. _______________________________________________________________________\n2. _______________________________________________________________________\n3. _______________________________________________________________________"}
      </div>
    </section>
  );
}

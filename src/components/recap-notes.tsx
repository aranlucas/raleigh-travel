"use client";

import { Printer } from "lucide-react";
import { useState } from "react";

export function RecapPrintButton() {
  return (
    <button
      className="solid-link"
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
    <section className="recap-personal">
      <label htmlFor="recap-notes">My three reminders</label>
      <p className="recap-note-help">
        Keep these in your own words. Notes stay in this tab; print or save as PDF before leaving.
      </p>
      <textarea
        id="recap-notes"
        rows={3}
        maxLength={360}
        value={notes}
        onChange={(event) => {
          setNotes(event.target.value);
        }}
        placeholder="1. One decision I want to explain clearly…&#10;2. One source or threshold to verify…&#10;3. One thing I already do well…"
      />
      <div className="recap-printed-notes">
        {notes ||
          "1. _______________________________________________________________________\n2. _______________________________________________________________________\n3. _______________________________________________________________________"}
      </div>
    </section>
  );
}

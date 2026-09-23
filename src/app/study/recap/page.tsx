import { ArrowLeft, Leaf } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { RecapNotes, RecapPrintButton } from "@/components/recap-notes";
import { StudyHeader } from "@/components/study-header";
import { recapSections, readings, studySources } from "@/lib/study";

import "../study.css";

export const metadata: Metadata = {
  title: "One-page OCE recap · Boards & beyond",
};

export default function RecapPage() {
  return (
    <div className="recap-app">
      <a className="skip-link" href="#recap-content">
        Skip to recap sheet
      </a>
      <StudyHeader recap />
      <main className="page-shell recap-shell" id="recap-content">
        <div className="recap-toolbar">
          <Link className="text-link" href="/study">
            <ArrowLeft size={16} aria-hidden="true" /> Back to the study guide
          </Link>
          <Link className="text-link" href="/study/themes">
            Theme notes & decisions
          </Link>
          <RecapPrintButton />
        </div>
        <article className="recap-paper">
          <header className="recap-title">
            <div>
              <p className="eyebrow">BOARDS & BEYOND · PEDIATRIC DENTISTRY</p>
              <h1>A calm, clear recap.</h1>
              <p>Sunday: finish by 5 PM. Monday: review 9–9:45 AM, then close the notes.</p>
            </div>
            <Leaf size={34} strokeWidth={1.3} aria-hidden="true" />
          </header>
          <section className="recap-answer">
            <h2>Hear the question. Give the answer. Explain why.</h2>
            <p>
              For a full care plan:{" "}
              <strong>findings → diagnosis → options → recommendation → follow-up.</strong> For a
              focused question, answer just that part. Clarify uncertainty; don’t fill the silence
              with unrelated facts.
            </p>
          </section>
          <div className="recap-grid">
            {recapSections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.cue}</p>
                <a
                  href={section.source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="recap-source"
                >
                  Source: {section.source.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </section>
            ))}
          </div>
          <section className="recap-safety">
            <h2>Sedation & emergencies: rehearse the safety system</h2>
            <p>
              Assessment and airway → appropriate setting and team → monitoring and rescue readiness
              → recovery and discharge. Verify medications, calculations, fasting, and emergency
              algorithms in current source material and your training.
            </p>
            <a
              href={readings.sedation.href}
              className="recap-source"
              target="_blank"
              rel="noopener noreferrer"
            >
              AAP/AAPD sedation guideline
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </section>
          <RecapNotes />
          <section className="recap-logistics">
            <strong>MONDAY, OCTOBER 5</strong>
            <p>
              2:25 PM walk · 2:45 PM registration
              <br />
              AIME Center · 4208 Six Forks Road · Government photo ID
            </p>
          </section>
          <footer className="recap-disclaimer">
            <p>
              Independent review aid, not a clinical protocol or an official ABPD handout.
              Percentages combine related blueprint domains. Use current candidate instructions for
              exam logistics.
            </p>
            <p>
              Sources reviewed September 23, 2026:{" "}
              <a href={studySources.blueprint}>ABPD blueprint</a> ·{" "}
              <a href={studySources.communication}>communication</a> ·{" "}
              <a href={studySources.manual}>AAPD Reference Manual</a>. Full links and practice
              cases: /study
            </p>
          </footer>
        </article>
      </main>
    </div>
  );
}

import { ArrowRight, BookOpen, ChevronDown, Clock3, FileText, Leaf } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { StudyHeader } from "@/components/study-header";
import { ExternalLink } from "@/components/ui";
import { domains, officialResources, practiceBlocks, studySources } from "@/lib/study";

import "./study.css";

export const metadata: Metadata = {
  title: "OCE study guide · Boards & beyond",
  description:
    "A focused pediatric dental oral boards review mapped to the Raleigh study schedule, with official ABPD and AAPD resources.",
};

export default function StudyPage() {
  return (
    <div className="study-app">
      <a className="skip-link" href="#study-content">
        Skip to study guide
      </a>
      <StudyHeader />
      <main className="page-shell study-shell" id="study-content">
        <section className="study-hero">
          <div>
            <p className="eyebrow">
              <BookOpen size={16} aria-hidden="true" /> YOUR OCE FIELD NOTES
            </p>
            <h1>
              Practice with a plan.
              <br />
              <em>Then take a breath.</em>
            </h1>
            <p className="study-intro">
              A focused crash course for pediatric dental oral boards. Review the decision points,
              say your reasoning out loud, and use the original sources to close the gaps.
            </p>
            <div className="study-hero-actions">
              <a className="solid-link" href="#sat-cases">
                Start Saturday’s practice <ArrowRight size={17} aria-hidden="true" />
              </a>
              <Link className="text-link" href="/study/recap">
                <FileText size={16} aria-hidden="true" /> One-page recap
              </Link>
            </div>
          </div>
          <aside className="study-intent">
            <Leaf size={25} strokeWidth={1.4} aria-hidden="true" />
            <h2>
              Enough structure.
              <br /> Room to breathe.
            </h2>
            <dl>
              <div>
                <dt>Focused preparation</dt>
                <dd>6½ hours</dd>
              </div>
              <div>
                <dt>Blueprint domains</dt>
                <dd>All 10</dd>
              </div>
              <div>
                <dt>Monday stopping point</dt>
                <dd>9:45 AM</dd>
              </div>
            </dl>
            <p>
              Choose the readings for your weak areas. This weekend is for consolidation, not
              reading the entire manual.
            </p>
          </aside>
        </section>

        <section className="answer-framework" aria-labelledby="answer-heading">
          <div>
            <p className="eyebrow">BEFORE EVERY CASE</p>
            <h2 id="answer-heading">Answer what was asked.</h2>
          </div>
          <div>
            <p>
              Pause, clarify if needed, then give a direct answer with a reason. When a full plan is
              requested, try:{" "}
              <strong>findings → diagnosis → options → recommendation → follow-up.</strong> Use only
              the parts relevant to the question.
            </p>
            <p className="study-small">
              An original rehearsal aid informed by ABPD’s communication guidance. Examiners assess
              clinical reasoning, communication, and professionalism; their 1–3 ratings distinguish
              inaccurate, incomplete, and fully demonstrated performance. This page does not predict
              a score.
            </p>
            <div className="detail-links">
              <ExternalLink label="Communication guidance" href={studySources.communication} />
              <ExternalLink label="Official scoring rubric" href={studySources.blueprint} />
            </div>
          </div>
        </section>

        <div className="study-layout">
          <aside className="study-sidebar">
            <nav aria-label="Practice blocks">
              <p className="eyebrow">YOUR PRACTICE BLOCKS</p>
              {practiceBlocks.map((block) => (
                <a key={block.id} href={`#${block.id}`}>
                  <span>{block.day}</span>
                  <strong>{block.time}</strong>
                  <small>{block.title}</small>
                </a>
              ))}
              <a href="#blueprint">
                <strong>Blueprint at a glance</strong>
              </a>
              <a href="#official-resources">
                <strong>Official resource library</strong>
              </a>
              <Link href="/study/recap">
                <strong>Print your recap sheet ↗</strong>
              </Link>
            </nav>
          </aside>
          <div className="study-main">
            <p className="study-scope">
              Independent study aid, reviewed September 23, 2026. The prompts below are original
              practice cases, not ABPD exam questions. Clinical notes are brief review cues; use the
              full current guidelines and your training for treatment decisions.
            </p>
            {practiceBlocks.map((block, index) => (
              <section
                className="practice-block"
                id={block.id}
                key={block.id}
                aria-labelledby={`${block.id}-heading`}
              >
                <div className="practice-heading">
                  <span className="block-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="eyebrow">
                      {block.day} · {block.time}
                    </p>
                    <h2 id={`${block.id}-heading`}>{block.title}</h2>
                  </div>
                  <span className="time-pill">
                    <Clock3 size={14} aria-hidden="true" />
                    {block.minutes} min
                  </span>
                </div>
                <p className="block-purpose">{block.purpose}</p>
                <ol className="practice-steps">
                  {block.steps.map((step) => (
                    <li key={step.task}>
                      <span>{step.minutes} min</span>
                      <p>{step.task}</p>
                    </li>
                  ))}
                </ol>
                {block.domains.length > 0 && (
                  <div className="domain-list">
                    {block.domains.map((id) => {
                      const domain = domains.find((item) => item.id === id);
                      if (domain === undefined) {
                        throw new Error(`Unknown study domain: ${id}`);
                      }
                      return (
                        <details className="domain-card" key={id} id={`domain-${id}`}>
                          <summary>
                            <span className="domain-weight">{domain.weight}%</span>
                            <span>
                              <strong>{domain.title}</strong>
                              <small>{domain.checkpoint}</small>
                            </span>
                            <ChevronDown size={18} className="domain-chevron" aria-hidden="true" />
                          </summary>
                          <div className="domain-content">
                            <h3>Decision points to rehearse</h3>
                            <ul>
                              {domain.essentials.map((point) => (
                                <li key={point}>{point}</li>
                              ))}
                            </ul>
                            <div className="case-prompt">
                              <p className="eyebrow">SAY IT OUT LOUD · ORIGINAL PRACTICE PROMPT</p>
                              <p>{domain.prompt}</p>
                              <p>
                                <strong>Change one thing:</strong> {domain.challenge}
                              </p>
                            </div>
                            <h3>Read to resolve a gap</h3>
                            <div className="reading-links">
                              {domain.resources.map((resource) => (
                                <ExternalLink {...resource} key={resource.href} />
                              ))}
                            </div>
                          </div>
                        </details>
                      );
                    })}
                  </div>
                )}
                {block.resources.length > 0 && (
                  <div className="block-readings">
                    <p className="eyebrow">KEEP THESE HANDY</p>
                    <div className="reading-links">
                      {block.resources.map((resource) => (
                        <ExternalLink key={resource.href} {...resource} />
                      ))}
                    </div>
                  </div>
                )}
                {(block.id === "sun-recap" || block.id === "mon-review") && (
                  <Link className="text-link recap-inline" href="/study/recap">
                    <FileText size={16} aria-hidden="true" /> Open the one-page recap
                  </Link>
                )}
                <p className="block-finish">
                  <Leaf size={17} aria-hidden="true" />
                  {block.finish}
                </p>
              </section>
            ))}
          </div>
        </div>

        <section className="blueprint-section" id="blueprint" aria-labelledby="blueprint-heading">
          <div>
            <p className="eyebrow">THE WHOLE PICTURE</p>
            <h2 id="blueprint-heading">Ten domains. One thoughtful clinician.</h2>
            <p>
              The percentages below are ABPD’s published blueprint weights. They describe exam
              coverage, not the number of minutes to spend studying. Labels are shortened here; open
              the original for every task statement.
            </p>
            <ExternalLink label="Complete ABPD blueprint" href={studySources.blueprint} />
          </div>
          <div className="blueprint-bars">
            {domains.map((domain) => (
              <a href={`#domain-${domain.id}`} key={domain.id}>
                <span>
                  {domain.title}
                  <strong>{domain.weight}%</strong>
                </span>
                <span className="weight-track" aria-hidden="true">
                  <span style={{ width: `${(domain.weight / 17) * 100}%` }} />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section
          className="resource-section"
          id="official-resources"
          aria-labelledby="resources-heading"
        >
          <p className="eyebrow">THE ORIGINAL SOURCES</p>
          <h2 id="resources-heading">Your official resource shelf.</h2>
          <p className="resource-intro">
            The public candidate preparation resources linked from ABPD’s OCE pages, together in one
            place. Full documents and videos open at their original hosts; they are not copied into
            this app.
          </p>
          <div className="resource-grid">
            {officialResources.map((resource) => (
              <article key={resource.href}>
                <ExternalLink {...resource} />
                <p>{resource.note}</p>
              </article>
            ))}
          </div>
          <div className="manual-callout">
            <BookOpen size={26} strokeWidth={1.4} aria-hidden="true" />
            <div>
              <h3>AAPD Reference Manual · 2026–2027</h3>
              <p>
                ABPD recommends the AAPD policies and clinical guidance, recent research, and
                textbooks; it does not provide a closed list of required books or articles on its
                study-tips page. The selected chapter links above match your sessions. The complete
                manual also includes sealants, SDF, nitrous oxide, local anesthesia, pain,
                periodontal care, child protection, medication references, and other topics for a
                targeted gap check.
              </p>
              <p className="study-small">
                AAPD currently labels the 2026–2027 collection “Official But Unformatted.” Check
                each document’s revision date and distinguish a newly revised chapter from older
                guidance carried into the current edition.
              </p>
              <ExternalLink
                label="Open the complete AAPD manual & PDFs"
                href={studySources.manual}
              />
            </div>
          </div>
        </section>
        <footer className="site-footer">
          <span className="footer-brand">
            Clear thinking. Kind communication. Then a little Raleigh.
          </span>
          <Link className="text-link" href="/">
            Back to your itinerary <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </footer>
      </main>
    </div>
  );
}

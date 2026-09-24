import { ArrowLeft, ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PracticeBlockBody } from "@/components/practice-block";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { activityContext } from "@/lib/itinerary";
import { practiceBlocks } from "@/lib/study";

export const dynamicParams = false;

type SessionProps = Readonly<{ params: Promise<Readonly<{ id: string }>> }>;

export function generateStaticParams() {
  return practiceBlocks.map((block) => ({ id: block.id }));
}

function findSession(id: string) {
  const index = practiceBlocks.findIndex((block) => block.id === id);
  return index === -1 ? null : { block: practiceBlocks[index], index };
}

export async function generateMetadata({ params }: SessionProps): Promise<Metadata> {
  const session = findSession((await params).id);
  return {
    title: `${session?.block.title ?? "Practice session"} · Boards & beyond`,
  };
}

export default async function SessionPage({ params }: SessionProps) {
  const session = findSession((await params).id);
  if (session === null) {
    notFound();
  }
  const { block, index } = session;
  const previous = practiceBlocks.at(index - 1);
  const next = practiceBlocks.at(index + 1);
  const dayId = activityContext(block.id)?.day.id;

  return (
    <div className="print:bg-white">
      <a className="skip-link print:hidden" href="#session-content">
        Skip to session
      </a>
      <SiteHeader current="study" />
      <main className="page-shell max-w-[62rem]" id="session-content">
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-8" aria-label="Session">
          <Link className="link" href="/study">
            <ArrowLeft size={15} aria-hidden="true" /> All sessions
          </Link>
          {dayId === undefined ? null : (
            <Link className="link" href={`/#${dayId}`}>
              <CalendarDays size={15} aria-hidden="true" /> See the day
            </Link>
          )}
        </nav>
        <header className="border-b border-line pt-8 pb-8">
          <p className="eyebrow">
            Session {index + 1} of {practiceBlocks.length} · {block.day} · {block.time}
          </p>
          <h1 className="type-display mt-4">{block.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 rounded-full bg-pine-wash px-3 py-1 text-sm">
              <Clock3 size={14} aria-hidden="true" />
              {block.minutes} min
            </span>
            <p className="type-lead max-w-[48ch]">{block.purpose}</p>
          </div>
        </header>
        <div className="pt-6">
          <PracticeBlockBody block={block} />
        </div>
        <nav
          className="mt-10 grid gap-3 border-t border-line pt-6 sm:grid-cols-2"
          aria-label="Other sessions"
        >
          {index > 0 && previous !== undefined ? (
            <Link
              className="card flex flex-col p-4 text-ink no-underline hover:border-pine"
              href={`/study/sessions/${previous.id}`}
            >
              <span className="eyebrow">
                <ArrowLeft size={13} aria-hidden="true" /> Previous · {previous.day}
              </span>
              <span className="type-subhead mt-1">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next === undefined ? null : (
            <Link
              className="card flex flex-col p-4 text-right text-ink no-underline hover:border-pine sm:items-end"
              href={`/study/sessions/${next.id}`}
            >
              <span className="eyebrow">
                Next · {next.day} <ArrowRight size={13} aria-hidden="true" />
              </span>
              <span className="type-subhead mt-1">{next.title}</span>
            </Link>
          )}
        </nav>
        <SiteFooter />
      </main>
    </div>
  );
}

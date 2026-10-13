import type { Category } from "@/lib/itinerary";

type CategoryTone = { label: string; text: string; fill: string };

export const categoryTones: Record<Category, CategoryTone> = {
  study: { label: "Study", text: "text-pine", fill: "bg-pine" },
  explore: { label: "Explore", text: "text-sky", fill: "bg-sky-bright" },
  reset: { label: "Reset", text: "text-ochre", fill: "bg-ochre-bright" },
  travel: { label: "Travel", text: "text-muted", fill: "bg-line-strong" },
  exam: { label: "Exam", text: "text-cardinal", fill: "bg-cardinal" },
};

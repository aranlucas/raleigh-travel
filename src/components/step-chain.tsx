import { ArrowRight } from "lucide-react";

/** Renders "A → B → C" (or short sentences "A. B. C.") as a sequence of steps. */
export function StepChain({
  text,
  size = "lg",
  className = "",
}: Readonly<{ text: string; size?: "sm" | "lg"; className?: string }>) {
  const steps = (text.includes("→") ? text.split("→") : text.split(/(?<=\.)\s+/u))
    .map((step) => step.trim().replace(/\.$/u, ""))
    .filter(Boolean);
  const chip =
    size === "lg"
      ? "px-3 py-1 font-display text-lg leading-snug text-pine-deep md:text-xl"
      : "px-2.5 py-0.5 text-sm font-semibold text-pine-deep";
  return (
    <ol className={`flex flex-wrap items-center gap-x-1.5 gap-y-2 ${className}`}>
      {steps.map((step, index) => (
        <li className="flex items-center gap-1.5" key={step}>
          {index > 0 ? (
            <ArrowRight
              className="text-pine/50"
              size={size === "lg" ? 16 : 13}
              aria-hidden="true"
            />
          ) : null}
          <span
            className={`rounded-full bg-surface ring-1 ring-pine/20 print:ring-line-strong ${chip}`}
          >
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}

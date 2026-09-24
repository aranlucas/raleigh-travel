import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Boards & beyond · Raleigh, October 2–6",
  description: "A pediatric dental boards weekend with time to prepare, explore, and celebrate.",
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth motion-reduce:scroll-auto">
      <body className="min-h-screen bg-slate-50 font-sans text-base leading-relaxed text-slate-900 antialiased print:bg-white print:text-[10pt] motion-reduce:[&_*]:transition-none motion-reduce:[&_*]:animate-none [&_svg]:shrink-0 [&_button]:cursor-pointer [&_summary]:cursor-pointer [&_:is(a,button,summary)]:touch-manipulation [&_:is(a,button,summary)]:[-webkit-tap-highlight-color:transparent] [&_:is(a,button,summary,textarea,[tabindex]):focus-visible]:rounded-sm [&_:is(a,button,summary,textarea,[tabindex]):focus-visible]:outline-2 [&_:is(a,button,summary,textarea,[tabindex]):focus-visible]:outline-offset-4 [&_:is(a,button,summary,textarea,[tabindex]):focus-visible]:outline-amber-700">
        {children}
      </body>
    </html>
  );
}

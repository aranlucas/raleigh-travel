import type { Metadata } from "next";
import { Figtree, IBM_Plex_Mono, Young_Serif } from "next/font/google";

import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });
const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-young-serif",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Boards & beyond · Raleigh, October 2–6",
  description: "A pediatric dental boards weekend with time to prepare, explore, and celebrate.",
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${figtree.variable} ${youngSerif.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

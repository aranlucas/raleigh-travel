import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Boards & beyond · Raleigh, October 2–6",
  description: "A pediatric dental boards weekend with time to prepare, explore, and celebrate.",
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

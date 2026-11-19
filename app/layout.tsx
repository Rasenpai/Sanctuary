import type { Metadata } from "next";
import { Suspense } from "react";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sanctuary Villas & Retreat",
    template: "%s · Sanctuary Villas",
  },
  description:
    "Bespoke architectural residences on the Mallorcan coast, calibrated for quietude and unhurried contemplation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream font-sans text-ink antialiased">
        <Suspense
          fallback={<div aria-hidden className="fixed inset-x-0 top-0 h-20" />}
        >
          <SiteHeader />
        </Suspense>
        <main className="w-full flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

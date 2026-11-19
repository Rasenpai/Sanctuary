import Link from "next/link";
import { villas } from "@/lib/villas";
import { NewsletterForm } from "./newsletter-form";

const YEAR = 2026;

const EXPLORE = [
  { href: "/", label: "Home" },
  { href: "/villas", label: "Our Villas" },
  { href: "/#philosophy", label: "Philosophy" },
  { href: "/#experiences", label: "Experiences" },
  { href: "/reserve", label: "Reserve a Stay" },
];

const linkClass = "text-primary-200 transition-colors hover:text-paper";

function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="label-caps mb-6 text-primary-300">{title}</h4>
      {children}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-primary-900 text-paper">
      <div className="mx-auto max-w-[90rem] px-5 pt-20 pb-10 md:px-8 lg:px-14">
        <div className="grid gap-12 border-b border-primary-700 pb-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4 lg:pr-10">
            <Link href="/" className="font-display text-3xl tracking-wide">
              SANCTUARY
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-200">
              An architectural sanctuary defined by stillness, native geology,
              and measured luxury. Designed for unhurried contemplation.
            </p>
            <address className="mt-6 space-y-1.5 text-sm not-italic text-primary-300">
              <p>Camí de Son Borràs, Km 4.2</p>
              <p>07140 S&apos;Arracó, Illes Balears</p>
              <a
                href="mailto:concierge@sanctuary-villas.com"
                className="block transition-colors hover:text-paper"
              >
                concierge@sanctuary-villas.com
              </a>
            </address>
          </div>

          <div className="lg:col-span-3">
            <Column title="Accommodations">
              <ul className="space-y-3 text-sm">
                {villas.map((v) => (
                  <li key={v.slug}>
                    <Link href={`/villas/${v.slug}`} className={linkClass}>
                      {v.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
          </div>

          <div className="lg:col-span-2">
            <Column title="Explore">
              <ul className="space-y-3 text-sm">
                {EXPLORE.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
          </div>

          <div className="lg:col-span-3">
            <Column title="The Monograph Dispatch">
              <p className="mb-6 text-sm leading-relaxed text-primary-200">
                Seasonal essays, openings and quiet invitations. Delivered
                bi-annually.
              </p>
              <NewsletterForm />
            </Column>
          </div>
        </div>

        <div className="label-caps flex flex-col gap-4 pt-8 text-primary-300 md:flex-row md:items-center md:justify-between">
          <p>© {YEAR} Sanctuary Villas &amp; Retreat. All rights reserved.</p>
          <Link href="/reserve" className="transition-colors hover:text-paper">
            Book Your Stay
          </Link>
        </div>
      </div>
    </footer>
  );
}

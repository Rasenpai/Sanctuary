"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";

const NAV = [
  { href: "/", label: "Home", match: ["/"], exact: true },
  { href: "/villas", label: "Our Villas", match: ["/villas"] },
  { href: "/#philosophy", label: "Philosophy", match: [] },
  { href: "/#experiences", label: "Experiences", match: [] },
  { href: "/reserve", label: "Stay", match: ["/reserve", "/confirmation"] },
];

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const getScrolled = () => window.scrollY > 8;
const getServerScrolled = () => false;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrolled,
    getServerScrolled,
  );

  const isHome = pathname === "/";
  const solid = scrolled || open || !isHome;
  const light = isHome && !solid;

  const isActive = ({ match, exact }: (typeof NAV)[number]) =>
    match.some((m) =>
      exact ? pathname === m : pathname === m || pathname.startsWith(`${m}/`),
    );

  const text = light ? "text-paper" : "text-ink";
  const textSoft = light
    ? "text-paper/80 hover:text-paper"
    : "text-ink-soft hover:text-ink";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          solid
            ? "border-ink/10 bg-cream/90 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto grid h-20 max-w-[90rem] grid-cols-[1fr_auto] items-center px-5 md:px-8 xl:grid-cols-[1fr_auto_1fr] lg:px-14">
          <Link href="/" className="flex flex-col justify-self-start">
            <span
              className={`font-display text-2xl leading-none tracking-wide transition-colors ${text}`}
            >
              SANCTUARY
            </span>
            <span
              className={`label-caps mt-1.5 text-[0.625rem] leading-none tracking-[0.2em] transition-colors ${
                light ? "text-paper/70" : "text-secondary"
              }`}
            >
              Villas &amp; Retreat
            </span>
          </Link>

          <nav
            className="hidden items-center gap-9 xl:flex"
            aria-label="Primary"
          >
            {NAV.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`label-caps border-b py-1.5 transition-colors ${
                    active
                      ? `${light ? "border-paper text-paper" : "border-ink text-ink"}`
                      : `border-transparent ${textSoft}`
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-self-end gap-8">
            <a
              href="mailto:concierge@sanctuary-villas.com"
              className={`label-caps hidden transition-colors xl:inline-block ${textSoft}`}
            >
              Contact
            </a>
            <Link
              href="/reserve"
              className="label-caps hidden bg-primary px-7 py-3.5 text-paper transition-colors hover:bg-tertiary-hover sm:inline-flex"
            >
              Book Your Stay
            </Link>
            <button
              type="button"
              className={`transition-colors xl:hidden ${text}`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X size={24} strokeWidth={1.5} />
              ) : (
                <Menu size={24} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {open && (
          <nav
            className="border-t border-ink/10 bg-cream px-5 py-4 xl:hidden"
            aria-label="Mobile"
          >
            <ul>
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item) ? "page" : undefined}
                    className={`label-caps block border-b border-ink/10 py-4 ${
                      isActive(item) ? "text-ink" : "text-ink-soft"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/reserve"
                  onClick={() => setOpen(false)}
                  className="label-caps mt-4 block bg-primary py-4 text-center text-paper"
                >
                  Book Your Stay
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
      {!isHome && <div aria-hidden className="h-20" />}
    </>
  );
}

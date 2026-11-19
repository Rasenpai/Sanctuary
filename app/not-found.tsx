import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] w-full items-center justify-center px-5 py-20 md:px-8 lg:px-14">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <svg
          viewBox="0 0 112 128"
          fill="none"
          aria-hidden
          className="mb-10 h-24 w-auto text-primary"
        >
          <path
            d="M8 124V56a48 48 0 0 1 96 0v68"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle
            cx="56"
            cy="72"
            r="28"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="2 5"
            strokeLinecap="round"
          />
        </svg>

        <span className="label-caps tracking-[0.25em] text-secondary-700">
          Error 404
        </span>
        <h1 className="heading-display mt-3 text-5xl text-ink md:text-6xl">
          This path leads <em className="italic">nowhere</em>
        </h1>
        <p className="mt-5 text-lg leading-relaxed font-light text-ink-soft">
          The page you are looking for has moved or no longer exists. Let us
          guide you back to the sanctuary.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="label-caps bg-primary px-8 py-4 text-paper transition-colors hover:bg-tertiary-hover"
          >
            Return Home
          </Link>
          <Link
            href="/villas"
            className="label-caps border border-ink/20 px-8 py-4 text-ink transition-colors hover:border-ink hover:bg-cream-dark"
          >
            Explore Our Villas
          </Link>
        </div>
      </div>
    </section>
  );
}

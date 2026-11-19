"use client";

import Link from "next/link";
import { Headset, ShieldCheck, Star } from "lucide-react";
import { stayQuery } from "@/lib/booking";
import {
  REFUND_WINDOW_DAYS,
  buildQuote,
  formatDate,
  usd,
  addDays,
} from "@/lib/pricing";
import type { Villa } from "@/lib/villas";
import { useStay } from "./stay-context";

export function BookingCard({ villa }: { villa: Villa }) {
  const { checkIn, checkOut, nights, adults, maxGuests, setAdults } = useStay();
  const ready = !!(checkIn && checkOut && nights > 0);
  const q = ready ? buildQuote(villa.price, nights) : null;
  const rating = villa.detail?.rating;

  const href = ready
    ? `/reserve?${(() => {
        const p = stayQuery({ checkIn: checkIn!, checkOut: checkOut!, adults });
        p.set("villa", villa.slug);
        return p;
      })()}`
    : null;

  return (
    <aside id="booking" className="lg:sticky lg:top-28 lg:col-span-4">
      <div className="flex flex-col gap-6 border border-ink/10 bg-paper p-6 sm:p-10">
        <div className="flex items-baseline justify-between bg-primary-50 p-6">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-4xl">{usd(villa.price)}</span>
            <span className="text-sm text-ink-soft">/ night</span>
          </div>
          {rating && (
            <div className="flex items-center gap-1 text-secondary-700">
              <Star
                size={14}
                strokeWidth={1.5}
                fill="currentColor"
                aria-hidden
              />
              <span className="label-caps font-medium">{rating.score}</span>
              <span className="label-caps text-ink-soft">
                ({rating.reviews} reviews)
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="grid grid-cols-2 gap-1.5">
            <div className="flex flex-col bg-primary-50 p-3">
              <span className="label-caps text-secondary-700">Arrival</span>
              <span className="font-medium">
                {checkIn ? formatDate(checkIn) : "Select"}
              </span>
            </div>
            <div className="flex flex-col bg-primary-50 p-3">
              <span className="label-caps text-secondary-700">Departure</span>
              <span className="font-medium">
                {checkOut ? formatDate(checkOut) : "Select"}
              </span>
            </div>
          </div>
          <label className="flex items-center justify-between bg-primary-50 p-3">
            <span className="flex flex-col">
              <span className="label-caps text-secondary-700">Guests</span>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="-ml-1 cursor-pointer bg-transparent py-0.5 pr-6 text-base focus:outline-none"
              >
                {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Adult" : "Adults"}
                  </option>
                ))}
              </select>
            </span>
          </label>
        </div>

        {q ? (
          <>
            <div className="flex flex-col gap-3 py-3 text-sm">
              <div className="flex items-center justify-between text-ink-soft">
                <span>
                  {usd(villa.price)} × {q.nights} nights
                </span>
                <span className="font-medium text-ink">{usd(q.stay)}</span>
              </div>
              <div className="flex items-center justify-between text-ink-soft">
                <span>Sanctuary host &amp; housekeeping</span>
                <span className="font-medium text-ink">{usd(q.hostFee)}</span>
              </div>
              <div className="flex items-center justify-between text-ink-soft">
                <span>Regional tourism eco contribution</span>
                <span className="font-medium text-ink">{usd(q.ecoFee)}</span>
              </div>
              <div className="flex items-center justify-between text-ink-soft">
                <span>Daily artisan breakfast &amp; butler</span>
                <span className="label-caps font-medium text-primary">
                  Complimentary
                </span>
              </div>
              <div className="my-1.5 h-px w-full bg-ink/10" />
              <div className="flex items-baseline justify-between">
                <div className="flex flex-col">
                  <span className="font-display text-2xl">Total</span>
                  <span className="label-caps text-secondary-700">
                    All fees included
                  </span>
                </div>
                <span className="font-display text-4xl">{usd(q.total)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1 bg-primary-50 p-3 text-ink-soft">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink">
                  Initial 30% Deposit Due:
                </span>
                <span className="font-display text-2xl text-primary-600">
                  {usd(q.deposit, true)}
                </span>
              </div>
              <span className="text-xs text-secondary-700">
                Remaining {usd(q.balance, true)} settled {REFUND_WINDOW_DAYS}{" "}
                days prior to arrival (
                {formatDate(addDays(checkIn!, -REFUND_WINDOW_DAYS), {
                  month: "short",
                  day: "numeric",
                })}
                ).
              </span>
              <div className="label-caps mt-2 flex items-center gap-1.5 text-primary">
                <ShieldCheck size={16} strokeWidth={1.5} />
                <span>
                  100% refund guaranteed up to {REFUND_WINDOW_DAYS} days prior
                </span>
              </div>
            </div>
          </>
        ) : (
          <p className="bg-primary-50 p-4 text-sm leading-relaxed text-ink-soft">
            Select your arrival and departure dates in the Sanctuary Calendar to
            see your full residency breakdown.
          </p>
        )}

        {href ? (
          <Link
            href={href}
            className="label-caps group flex w-full items-center justify-center gap-2 bg-primary py-5 text-center tracking-[0.2em] text-paper transition-colors duration-300 hover:bg-tertiary-hover"
          >
            <span>Reserve {villa.name}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="label-caps w-full cursor-not-allowed bg-primary/40 py-5 text-center tracking-[0.2em] text-paper"
          >
            Select Dates to Reserve
          </button>
        )}

        <div className="flex flex-col items-center gap-1.5 pt-1.5 text-center">
          <div className="label-caps flex items-center gap-1.5 text-ink-soft">
            <Headset size={16} strokeWidth={1.5} className="text-secondary" />
            <span>Private Estate Concierge on Call</span>
          </div>
          <p className="text-sm text-ink-soft">
            Inquire directly with Head Butler Antoni:{" "}
            <a
              href="tel:+34971000000"
              className="font-medium text-ink underline underline-offset-4 transition-colors hover:text-primary"
            >
              +34 971 00 82 14
            </a>
          </p>
        </div>
      </div>
    </aside>
  );
}

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  CALENDAR_FIRST_MONTH,
  CALENDAR_LAST_MONTH,
  RESERVED,
} from "@/lib/booking";
import { MIN_NIGHTS, formatDate, toISO } from "@/lib/pricing";
import { useStay } from "./stay-context";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function monthLabel(ym: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${ym}-01T00:00:00Z`));
}

function shiftMonth(ym: string, delta: number) {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + delta, 1));
  return toISO(d).slice(0, 7);
}

function buildGrid(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  const first = new Date(Date.UTC(y, m - 1, 1));
  const lead = (first.getUTCDay() + 6) % 7; // Monday-first
  const total =
    Math.ceil((lead + new Date(Date.UTC(y, m, 0)).getUTCDate()) / 7) * 7;
  return Array.from({ length: total }, (_, i) => {
    const d = new Date(Date.UTC(y, m - 1, 1 - lead + i));
    return {
      iso: toISO(d),
      day: d.getUTCDate(),
      inMonth: d.getUTCMonth() === m - 1,
    };
  });
}

export function Calendar() {
  const { checkIn, checkOut, nights, notice, selectDate, clear } = useStay();
  const [month, setMonth] = useState(CALENDAR_FIRST_MONTH);
  const cells = buildGrid(month);

  return (
    <div className="flex flex-col gap-6 bg-paper p-6 sm:p-10">
      <div className="flex items-center justify-between">
        <span className="font-display text-2xl text-ink" aria-live="polite">
          {monthLabel(month)}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Previous month"
            disabled={month <= CALENDAR_FIRST_MONTH}
            onClick={() => setMonth(shiftMonth(month, -1))}
            className="flex h-8 w-8 items-center justify-center bg-cream-dark transition-colors hover:bg-secondary-100 disabled:opacity-40 disabled:hover:bg-cream-dark"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Next month"
            disabled={month >= CALENDAR_LAST_MONTH}
            onClick={() => setMonth(shiftMonth(month, 1))}
            className="flex h-8 w-8 items-center justify-center bg-cream-dark transition-colors hover:bg-secondary-100 disabled:opacity-40 disabled:hover:bg-cream-dark"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div>
        <div className="label-caps mb-1.5 grid grid-cols-7 text-center text-secondary-700">
          {WEEKDAYS.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {cells.map(({ iso, day, inMonth }) => {
            if (!inMonth) {
              return (
                <div key={iso} className="py-3 text-ink-muted/40" aria-hidden>
                  {String(day).padStart(2, "0")}
                </div>
              );
            }
            const reserved = RESERVED.has(iso);
            const selected =
              checkIn &&
              iso >= checkIn &&
              (checkOut ? iso <= checkOut : iso === checkIn);
            const edge = iso === checkIn || iso === checkOut;

            let cls =
              "bg-primary-50 text-ink-soft hover:bg-primary-100 cursor-pointer";
            if (reserved)
              cls =
                "bg-cream-dark text-ink-muted line-through cursor-not-allowed";
            if (selected)
              cls = `bg-primary text-paper font-medium cursor-pointer ${edge ? "" : "bg-primary-500/85"}`;

            return (
              <button
                key={iso}
                type="button"
                disabled={reserved}
                aria-pressed={!!selected}
                aria-label={`${formatDate(iso, { weekday: "long", month: "long", day: "numeric" })}${reserved ? " — reserved" : ""}`}
                onClick={() => selectDate(iso)}
                className={`py-3 transition-colors ${cls}`}
              >
                {String(day).padStart(2, "0")}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-3 pt-1.5 text-sm sm:flex-row sm:items-center">
        <span className="font-medium text-primary-700" aria-live="polite">
          {checkIn && checkOut
            ? `Stay Duration: ${nights} Nights (${formatDate(checkIn, { month: "short", day: "numeric", year: "numeric" })} – ${formatDate(checkOut, { month: "short", day: "numeric", year: "numeric" })})`
            : checkIn
              ? "Now choose your departure date"
              : "Choose your arrival date"}
        </span>
        <button
          type="button"
          onClick={clear}
          className="label-caps self-start text-secondary-700 underline underline-offset-4 hover:text-ink"
        >
          Clear Selected Dates
        </button>
      </div>
      {notice && (
        <p role="status" className="text-sm text-danger">
          {notice}
        </p>
      )}
      <p className="sr-only">Minimum reservation is {MIN_NIGHTS} nights.</p>
    </div>
  );
}

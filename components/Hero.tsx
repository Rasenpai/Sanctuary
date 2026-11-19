"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "./icons";

export type BookingQuery = {
  checkIn: string;
  checkOut: string;
  guests: number;
  villas: number;
};

type HeroProps = {
  onSearch?: (query: BookingQuery) => void;
};

const GUEST_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);
const VILLA_OPTIONS = Array.from({ length: 4 }, (_, i) => i + 1);

const pluralize = (count: number, word: string) =>
  `${count} ${word}${count === 1 ? "" : "s"}`;

const FIELD_LABEL = "label-caps !text-[0.625rem] text-secondary-700";
const FIELD_INPUT =
  "w-full bg-transparent font-display text-[1.05rem] text-ink outline-none";
const DATE_PICKER_OVERLAY =
  "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0";

type DateFieldProps = {
  label: string;
  value: string;
  min?: string;
  onChange: (value: string) => void;
};

function DateField({ label, value, min, onChange }: DateFieldProps) {
  return (
    <label className="relative block px-5 py-3 md:border-r md:border-cream-dark">
      <span className={FIELD_LABEL}>{label}</span>
      <div className="mt-1 flex items-center justify-between gap-3">
        <input
          type="date"
          value={value}
          min={min}
          onChange={(event) => onChange(event.target.value)}
          className={`${FIELD_INPUT} ${DATE_PICKER_OVERLAY}`}
        />
        <span className="pointer-events-none text-ink-muted">
          <Icon name="calendar" />
        </span>
      </div>
    </label>
  );
}

type CountSelectProps = {
  label: string;
  noun: string;
  options: number[];
  value: number;
  onChange: (value: number) => void;
};

function CountSelect({
  label,
  noun,
  options,
  value,
  onChange,
}: CountSelectProps) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className="cursor-pointer appearance-none bg-transparent outline-none"
    >
      {options.map((count) => (
        <option key={count} value={count}>
          {pluralize(count, noun)}
        </option>
      ))}
    </select>
  );
}

export default function Hero({ onSearch }: HeroProps) {
  const [checkIn, setCheckIn] = useState("2025-10-14");
  const [checkOut, setCheckOut] = useState("2025-10-21");
  const [guests, setGuests] = useState(2);
  const [villas, setVillas] = useState(1);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch?.({ checkIn, checkOut, guests, villas });
  };

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col bg-ink md:mb-14">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero.jpg"
        alt="Stone villa and infinity pool overlooking the Balearic sea at sunset"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/70 via-ink/25 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/55 via-transparent to-ink/20" />

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between px-6 pb-10 pt-12 sm:px-10 md:pb-36 lg:px-12">
        <div className="max-w-2xl pt-6 sm:pt-10">
          <div
            className="animate-fade-up flex items-center gap-4 text-white/85"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="h-px w-10 bg-white/70" />
            <span className="label-caps !text-[0.625rem]">
              Your Private Escape · Balearic Coast
            </span>
          </div>

          <h1
            className="heading-display animate-fade-up mt-8 text-[clamp(3rem,7.2vw,6rem)] text-white"
            style={{ animationDelay: "0.25s" }}
          >
            Find Your Space to Slow Down.
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-md text-[0.95rem] leading-relaxed text-white/90"
            style={{ animationDelay: "0.4s" }}
          >
            Thoughtfully designed villas for meaningful moments, peaceful
            mornings, and unforgettable stays.
          </p>
        </div>

        <div
          className="animate-fade-up flex items-end justify-between text-white/85"
          style={{ animationDelay: "0.55s" }}
        >
          <div className="label-caps flex items-center gap-4 !text-[0.625rem]">
            <span>39°34′N 2°23′E</span>
            <span className="h-1 w-1 rounded-full bg-white/70" />
            <span>Cala d&apos;Oliva · S&apos;Arracó</span>
          </div>
          <a
            href="#sanctuaries"
            className="label-caps hidden items-center gap-2 !text-[0.625rem] transition-opacity hover:opacity-70 sm:flex"
          >
            Explore Sanctuaries
            <span className="animate-nudge">
              <Icon name="arrowDown" size={12} strokeWidth={2} />
            </span>
          </a>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-6 sm:px-10 md:absolute md:inset-x-0 md:bottom-0 md:pb-0 lg:px-12"
      >
        <div className="rounded-sm bg-white p-3 shadow-[0_18px_50px_-12px_rgba(41,41,35,0.35)] sm:p-4 md:translate-y-1/2">
          <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-[1fr_1fr_1fr_auto] md:gap-0">
            <DateField label="Check-in" value={checkIn} onChange={setCheckIn} />
            <DateField
              label="Check-out"
              value={checkOut}
              min={checkIn}
              onChange={setCheckOut}
            />

            <div className="px-5 py-3 md:pr-8">
              <span className={FIELD_LABEL}>Sanctuary Capacity</span>
              <div className="mt-1 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1 font-display text-[1.05rem] text-ink">
                  <CountSelect
                    label="Guests"
                    noun="Guest"
                    options={GUEST_OPTIONS}
                    value={guests}
                    onChange={setGuests}
                  />
                  <span className="text-ink-muted">·</span>
                  <CountSelect
                    label="Villas"
                    noun="Villa"
                    options={VILLA_OPTIONS}
                    value={villas}
                    onChange={setVillas}
                  />
                </div>
                <span className="pointer-events-none text-ink-muted">
                  <Icon name="guest" />
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="label-caps h-14 rounded-[2px] bg-tertiary px-8 text-white transition-colors hover:bg-tertiary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary md:ml-2"
            >
              Check Availability
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

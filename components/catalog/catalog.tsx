"use client";

import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, Rows3 } from "lucide-react";
import { useState } from "react";
import { Icon } from "@/components/icons";
import { FILTERS, villas, type FilterKey, type Villa } from "@/lib/villas";
import { usd } from "@/lib/pricing";

type Filter = FilterKey | "all";

function matches(v: Villa, f: Filter) {
  return f === "all" || v.filters.includes(f);
}

function Photo({
  villa,
  className,
  children,
}: {
  villa: Villa;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <Image
        src={villa.image}
        alt={villa.imageAlt}
        fill
        sizes="(min-width: 1024px) 58vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {children}
    </div>
  );
}

const plaque = "label-caps absolute bg-paper/90 px-3 py-1.5 backdrop-blur-sm";

function Price({ villa }: { villa: Villa }) {
  return (
    <div className="text-right">
      <span className="font-display text-2xl text-ink">{usd(villa.price)}</span>
      <span className="label-caps ml-1 text-ink-muted">/ Night</span>
    </div>
  );
}

function Specs({
  villa,
  compact = false,
}: {
  villa: Villa;
  compact?: boolean;
}) {
  const items = [
    {
      label: compact ? "Bed" : "Bedrooms",
      value: villa.beds,
      note: villa.bedsNote,
    },
    {
      label: compact ? "Bath" : "Baths",
      value: villa.baths,
      note: villa.bathsNote,
    },
    {
      label: compact ? "Max" : "Occupancy",
      value: villa.maxGuests,
      note: "Guests Max",
    },
  ];
  return (
    <dl
      className={`grid grid-cols-3 bg-cream-dark ${compact ? "gap-2 px-3 py-3 text-center" : "my-2 gap-4 px-4 py-4"}`}
    >
      {items.map((i) => (
        <div key={i.label}>
          <dt className="label-caps block text-ink-muted">{i.label}</dt>
          <dd className="font-display text-2xl text-ink">{i.value}</dd>
          {!compact && (
            <span className="block text-sm text-ink-soft">{i.note}</span>
          )}
        </div>
      ))}
    </dl>
  );
}

function Inclusions({ villa }: { villa: Villa }) {
  return (
    <ul className="space-y-2">
      {villa.inclusions.map((inc) => (
        <li key={inc.text} className="flex items-center gap-2 text-sm text-ink">
          <Icon name={inc.icon} size={16} className="shrink-0 text-primary" />
          {inc.text}
        </li>
      ))}
    </ul>
  );
}

function Actions({
  villa,
  compact = false,
}: {
  villa: Villa;
  compact?: boolean;
}) {
  const pad = compact ? "px-3 py-2.5" : "px-4 py-3";
  return (
    <div
      className={`flex gap-3 ${compact ? "pt-4" : "flex-col pt-8 sm:flex-row"}`}
    >
      <Link
        href={`/villas/${villa.slug}`}
        className={`label-caps flex-1 bg-cream-dark text-center text-ink transition-colors hover:bg-secondary-100 ${pad}`}
      >
        {compact ? "Details" : "View Villa Details"}
      </Link>
      <Link
        href={`/reserve?villa=${villa.slug}`}
        className={`label-caps flex-1 bg-primary text-center text-paper transition-colors hover:bg-tertiary-hover ${pad}`}
      >
        {compact ? "Reserve" : "Quick Reserve"}
      </Link>
    </div>
  );
}

function FeatureCard({
  villa,
  reverse = false,
}: {
  villa: Villa;
  reverse?: boolean;
}) {
  return (
    <article className="grid grid-cols-1 items-stretch gap-8 bg-paper lg:grid-cols-12">
      <Photo
        villa={villa}
        className={`min-h-[380px] lg:col-span-7 lg:min-h-[500px] ${reverse ? "order-1 lg:order-2" : ""}`}
      >
        <div className={`${plaque} top-4 left-4 flex items-center gap-2`}>
          <span className="text-secondary-700">{villa.zone}</span>
          <span className="text-ink-muted">·</span>
          <span className="text-ink-soft">{villa.setting}</span>
        </div>
        <div className={`${plaque} bottom-4 left-4 py-1 text-ink`}>
          {villa.badge}
        </div>
      </Photo>

      <div
        className={`flex flex-col justify-between bg-primary-50 p-6 lg:col-span-5 lg:p-10 ${
          reverse ? "order-2 lg:order-1" : ""
        }`}
      >
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="label-caps text-secondary-700">
              Sanctuary {villa.number}
            </span>
            <Price villa={villa} />
          </div>
          <h2 className="font-display mb-3 text-4xl leading-tight text-ink">
            {villa.name}
          </h2>
          <p className="mb-6 font-light leading-relaxed text-ink-soft">
            {villa.blurb}
          </p>
          <Specs villa={villa} />
          <div className="mt-6">
            <Inclusions villa={villa} />
          </div>
        </div>
        <Actions villa={villa} />
      </div>
    </article>
  );
}

function DuoCard({ villa }: { villa: Villa }) {
  return (
    <article className="flex flex-col bg-paper">
      <Photo villa={villa} className="h-[340px]">
        <div className={`${plaque} top-4 left-4`}>
          <span className="text-secondary-700">
            {villa.zone} · {villa.setting}
          </span>
        </div>
        <div className={`${plaque} right-4 bottom-4 py-1 text-ink`}>
          {villa.badge}
        </div>
      </Photo>
      <div className="flex flex-1 flex-col justify-between bg-primary-50 p-6 md:p-8">
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="label-caps text-secondary-700">
              Sanctuary {villa.number}
            </span>
            <Price villa={villa} />
          </div>
          <h2 className="font-display mb-2 text-4xl leading-tight text-ink">
            {villa.name}
          </h2>
          <p className="mb-6 font-light leading-relaxed text-ink-soft">
            {villa.blurb}
          </p>
          <div className="mb-6">
            <Specs villa={villa} compact />
          </div>
          <Inclusions villa={villa} />
        </div>
        <Actions villa={villa} compact />
      </div>
    </article>
  );
}

export function Catalog() {
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<"grid" | "plan">("grid");

  const [serein, olive, hideaway, solstice] = villas;
  const show = (v: Villa) => matches(v, filter);
  const duo = [hideaway, solstice].filter(show);

  const count = (f: Filter) => villas.filter((v) => matches(v, f)).length;

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-14">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-primary-50 p-2 md:p-3">
          <div
            className="flex flex-wrap items-center gap-1.5"
            role="group"
            aria-label="Filter villas"
          >
            {FILTERS.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.key)}
                  className={`label-caps px-5 py-2.5 transition-colors ${
                    active
                      ? "bg-primary text-paper"
                      : "bg-paper text-ink hover:bg-cream-dark"
                  }`}
                >
                  {f.label}
                  {f.key === "all" && (
                    <span className="ml-1 opacity-70">{count("all")}</span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-4 px-2">
            <span className="label-caps text-ink-soft">View Mode</span>
            <div className="flex items-center bg-paper">
              <button
                type="button"
                title="Architectural Grid"
                aria-pressed={view === "grid"}
                onClick={() => setView("grid")}
                className={`p-2 transition-colors ${view === "grid" ? "bg-cream-dark text-primary" : "text-ink-soft hover:text-ink"}`}
              >
                <LayoutGrid size={18} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                title="Plan View"
                aria-pressed={view === "plan"}
                onClick={() => setView("plan")}
                className={`p-2 transition-colors ${view === "plan" ? "bg-cream-dark text-primary" : "text-ink-soft hover:text-ink"}`}
              >
                <Rows3 size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="w-full px-5 py-10 md:px-8 lg:px-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-16">
          {view === "grid" ? (
            <>
              {show(serein) && <FeatureCard villa={serein} />}
              {show(olive) && <FeatureCard villa={olive} reverse />}
              {duo.length > 0 && (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {duo.map((v) => (
                    <DuoCard key={v.slug} villa={v} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {villas.filter(show).map((v) => (
                <DuoCard key={v.slug} villa={v} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

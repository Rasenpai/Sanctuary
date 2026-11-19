import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bike,
  CalendarDays,
  ConciergeBell,
  Croissant,
  Package,
  Ruler,
} from "lucide-react";
import { Catalog } from "@/components/catalog/catalog";
import { DEFAULT_CHECK_IN, DEFAULT_CHECK_OUT } from "@/lib/booking";
import { images } from "@/lib/images";
import { formatDate } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Our Villas",
  description:
    "Four bespoke architectural residences surrounded by private gardens and coastal breezes.",
};

const metrics = [
  {
    label: "Elevation Range",
    value: "42m – 188m",
    note: "Above Mediterranean Datum",
  },
  {
    label: "Thermal Comfort",
    value: "Passive Geothermal",
    note: "Cross-breeze architecture",
  },
  {
    label: "Footpath Network",
    value: "3.8 Kilometers",
    note: "Crushed limestone trails",
  },
];

const pins = [
  {
    name: "Villa Serein (Elev. 75m)",
    className: "top-1/4 left-1/3",
    dot: "bg-primary",
  },
  {
    name: "The Olive Grove (Elev. 182m)",
    className: "top-1/2 right-1/4",
    dot: "bg-secondary",
  },
  {
    name: "Hideaway Pavilion (Elev. 42m)",
    className: "bottom-1/4 left-1/4",
    dot: "bg-primary-300",
  },
];

const standards = [
  {
    Icon: ConciergeBell,
    title: "Dedicated Concierge",
    text: "An assigned personal residence host available 24/7 via private digital channel for unhurried requests.",
    tag: "Standard In All Villas",
  },
  {
    Icon: Croissant,
    title: "Artisanal Daily Breakfast",
    text: "Freshly pressed botanical elixirs, woodfired sourdough, and seasonal produce laid out on your private terrace.",
    tag: "Zero Intrusion Service",
  },
  {
    Icon: Package,
    title: "Provenance Hamper",
    text: "Cold-pressed estate olive oil, local wildflower honey, natural wines, and artisanal raw linens.",
    tag: "Curated Upon Check-In",
  },
  {
    Icon: Bike,
    title: "Estate Gear & Bicycles",
    text: "Custom gravel bikes, botanical suncare, snorkel equipment, and private cove beach hampers always primed.",
    tag: "Complimentary Access",
  },
];

export default function VillasPage() {
  const season = `${formatDate(DEFAULT_CHECK_IN, { month: "short", day: "numeric" })} – ${formatDate(DEFAULT_CHECK_OUT, { month: "short", day: "numeric" })}`;

  return (
    <>
      {/* Editorial header */}
      <section className="w-full px-5 pt-12 pb-8 md:px-8 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 pb-6 md:flex-row md:items-end">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-primary" />
                <span className="label-caps tracking-[0.25em] text-secondary-700">
                  Architectural Portfolio
                </span>
              </div>
              <h1 className="heading-display animate-fade-up text-5xl text-ink md:text-6xl">
                Our Villas <em className="italic">&amp;</em> Sanctuaries
              </h1>
              <p className="text-lg leading-relaxed font-light text-ink-soft">
                Four bespoke architectural residences surrounded by private
                gardens and coastal breezes, calibrated for absolute quietude
                and unhurried contemplation.
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-2 md:items-end">
              <span className="label-caps text-ink-soft">
                Current Season &amp; Availability
              </span>
              <button
                type="button"
                className="group flex items-center gap-3 bg-cream-dark px-6 py-3 transition-colors hover:bg-secondary-100"
              >
                <CalendarDays
                  size={18}
                  strokeWidth={1.5}
                  className="text-primary"
                />
                <span className="label-caps tracking-wider text-ink">
                  Spring Retreat · {season}
                </span>
                <span className="label-caps text-secondary-700 underline underline-offset-4 group-hover:text-ink">
                  Modify
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Catalog />

      {/* Spatial geography */}
      <section className="w-full bg-cream-dark px-5 py-16 md:px-8 lg:px-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-secondary" />
              <span className="label-caps tracking-[0.2em] text-secondary-700">
                Spatial Geography
              </span>
            </div>
            <h2 className="heading-display text-4xl leading-tight md:text-5xl">
              Secluded Across 42 Hectares of Untamed Coastline
            </h2>
            <p className="font-light leading-relaxed text-ink-soft">
              Each sanctuary is deliberately distanced by a minimum of 80 meters
              of indigenous macchia and stone topography, ensuring unbroken
              sonic privacy and complete optical isolation.
            </p>
            <div className="space-y-4 pt-2">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex items-center justify-between gap-4 bg-cream p-4"
                >
                  <div>
                    <span className="label-caps block text-secondary-700">
                      {m.label}
                    </span>
                    <span className="font-display text-2xl text-ink">
                      {m.value}
                    </span>
                  </div>
                  <span className="text-right text-sm text-ink-soft">
                    {m.note}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-cream-dark/60 p-4 lg:p-6">
              <div className="relative h-[420px] overflow-hidden">
                <Image
                  src={images.estateMap}
                  alt="Aerial map of the estate grounds along the Mallorcan coast"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-primary/10 mix-blend-multiply" />
                {pins.map((p) => (
                  <div
                    key={p.name}
                    className={`absolute flex items-center gap-2 bg-paper/90 p-2 backdrop-blur-sm ${p.className}`}
                  >
                    <span className={`h-2 w-2 ${p.dot}`} />
                    <span className="label-caps tracking-wider text-ink">
                      {p.name}
                    </span>
                  </div>
                ))}
                <div className="label-caps absolute right-6 bottom-8 bg-paper/95 px-3 py-1.5 tracking-widest text-ink-soft">
                  Coordinates: 39°35&apos;12″N 2°22&apos;48″E
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sanctuary standard */}
      <section className="w-full px-5 py-16 md:px-8 lg:px-14">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="label-caps mb-2 block tracking-[0.25em] text-secondary-700">
                Hospitality Creed
              </span>
              <h2 className="heading-display text-4xl md:text-5xl">
                The Sanctuary Standard
              </h2>
            </div>
            <p className="max-w-md font-light leading-relaxed text-ink-soft">
              Every booking is elevated by an invisible, highly attuned layer of
              discreet service designed to remove all cognitive friction.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {standards.map(({ Icon, title, text, tag }) => (
              <div
                key={title}
                className="flex h-full flex-col justify-between space-y-4 bg-primary-50 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center bg-cream text-primary">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display mb-2 text-2xl">{title}</h3>
                  <p className="text-sm leading-relaxed font-light text-ink-soft">
                    {text}
                  </p>
                </div>
                <span className="label-caps block pt-2 text-secondary-700">
                  {tag}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-between gap-6 bg-cream-dark p-8 md:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary/10 text-primary">
                <Ruler size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-display text-2xl">
                  Seeking a Multi-Residence Buyout?
                </h4>
                <p className="text-sm font-light text-ink-soft">
                  Reserve the entire 42-hectare peninsula estate for private
                  symposiums, family gatherings, or creative residencies.
                </p>
              </div>
            </div>
            <Link
              href="#"
              className="label-caps inline-flex items-center gap-2 whitespace-nowrap bg-ink px-6 py-3 text-cream transition-colors hover:bg-secondary-700"
            >
              <span>Inquire About Bespoke Buyouts</span>
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

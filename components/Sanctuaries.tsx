import type { ComponentType } from "react";
import { Icon, type IconKey } from "./icons";

type Feature = {
  label: string;
  icon: IconKey;
};

type Villa = {
  name: string;
  category: string;
  image: string;
  imageAlt: string;
  pricePerNight: number;
  bedrooms: number;
  maxGuests: number;
  description: string;
  features: Feature[];
  reserveLabel: string;
};

const VILLAS: Villa[] = [
  {
    name: "Villa Serein",
    category: "Pavilion Residence",
    image: "/images/villa-serein.jpg",
    imageAlt:
      "Glass pavilion villa beside a basalt reflection pool above the sea",
    pricePerNight: 680,
    bedrooms: 2,
    maxGuests: 4,
    description:
      "A contemplative two-suite residence characterized by floor-to-ceiling pivoting glass, private basalt reflection pool, and an open-air bathing courtyard enveloped in wild rosemary.",
    features: [
      { label: "Private Reflection Pool", icon: "pool" },
      { label: "Dedicated Estate Host", icon: "host" },
      { label: "In-ground Fireplace", icon: "fire" },
      { label: "Courtyard Herb Garden", icon: "leaf" },
    ],
    reserveLabel: "Reserve Villa Serein",
  },
  {
    name: "The Olive Grove Estate",
    category: "Signature Compound",
    image: "/images/olive-grove-estate.jpg",
    imageAlt:
      "Stone estate with a long infinity pool and sun loungers facing the coast",
    pricePerNight: 1150,
    bedrooms: 3,
    maxGuests: 6,
    description:
      "A private compound set within our oldest olive grove, offering a 20-meter heated stone lap pool, private culinary chef atelier, subterranean wine cellar, and panoramic sea views.",
    features: [
      { label: "Private Chef Kitchen", icon: "chef" },
      { label: "20m Heated Lap Pool", icon: "pool" },
      { label: "Subterranean Bodega", icon: "wine" },
      { label: "Private Chauffeur Included", icon: "car" },
    ],
    reserveLabel: "Reserve The Estate",
  },
];

const TOTAL_VILLAS = 6;

const formatPrice = (amount: number) => `$${amount.toLocaleString("en-US")}`;

function VillaCard({ villa }: { villa: Villa }) {
  return (
    <article className="flex flex-col bg-white shadow-[0_14px_40px_-20px_rgba(41,41,35,0.25)]">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={villa.image}
          alt={villa.imageAlt}
          className="aspect-[16/9] w-full object-cover"
        />
        <span className="label-caps absolute left-4 top-4 bg-white/85 px-3 py-1.5 !text-[0.5625rem] text-ink backdrop-blur-sm">
          From {formatPrice(villa.pricePerNight)} / night
        </span>
      </div>

      <div className="flex flex-1 flex-col px-8 pb-8 pt-7">
        <div className="flex items-baseline justify-between gap-4">
          <span className="label-caps !text-[0.5625rem] text-ink-soft">
            {villa.category}
          </span>
          <span className="text-[0.75rem] text-ink-soft">
            {villa.bedrooms} Bedrooms · Up to {villa.maxGuests} Guests
          </span>
        </div>

        <h3 className="heading-display mt-3 text-[1.9rem] text-ink">
          {villa.name}
        </h3>

        <p className="mt-3 text-[0.8rem] leading-relaxed text-ink-soft">
          {villa.description}
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-cream-dark py-4">
          {villa.features.map(({ label, icon }) => (
            <li
              key={label}
              className="flex items-center gap-2.5 text-[0.7rem] text-ink-soft"
            >
              <Icon name={icon} size={14} />
              {label}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
          <a
            href="#"
            className="label-caps !text-[0.5625rem] text-ink transition-opacity hover:opacity-60"
          >
            Explore Residence Details
          </a>
          <a
            href="#"
            className="label-caps bg-tertiary px-6 py-3.5 !text-[0.5625rem] text-white transition-colors hover:bg-tertiary-hover"
          >
            {villa.reserveLabel}
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Sanctuaries() {
  return (
    <section id="sanctuaries" className="bg-cream">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-24 sm:px-10 lg:px-12 lg:py-28">
        <header className="grid gap-6 border-b border-cream-dark pb-8 md:grid-cols-[1fr_minmax(0,24rem)] md:items-end md:gap-16">
          <div>
            <p className="label-caps !text-[0.5625rem] text-secondary-700">
              Living Accommodations
            </p>
            <h2 className="heading-display mt-3 text-[clamp(2rem,3.4vw,2.9rem)] text-ink">
              Sanctuaries of Solitude
            </h2>
          </div>
          <p className="text-[0.8rem] leading-relaxed text-ink-soft">
            Six private standalone architectural dwellings sculpted into coastal
            terraces, each offering private thermal waters, uninterrupted
            maritime horizons, and dedicated discreet hosts.
          </p>
        </header>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {VILLAS.map((villa) => (
            <VillaCard key={villa.name} villa={villa} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#"
            className="label-caps inline-flex items-center gap-2 border-b border-ink pb-1 !text-[0.5625rem] text-ink transition-opacity hover:opacity-60"
          >
            View all {TOTAL_VILLAS} architectural villas
            <Icon name="arrowRight" size={12} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}

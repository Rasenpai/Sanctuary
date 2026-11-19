import {
  AudioLines,
  Bath,
  BedDouble,
  Bike,
  ChefHat,
  ConciergeBell,
  Croissant,
  Droplets,
  Flame,
  Flower2,
  Mountain,
  Package,
  PlugZap,
  Refrigerator,
  ShowerHead,
  Sparkles,
  Speaker,
  Sun,
  Waves,
  Wifi,
  Wine,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import type { IconName } from "@/lib/villas";

// Ikon lucide untuk data villa (lib/villas.ts)
const lucide: Record<IconName, LucideIcon> = {
  drop: Droplets,
  wine: Wine,
  sun: Sun,
  chef: ChefHat,
  panorama: Mountain,
  yoga: Flower2,
  bath: Bath,
  audio: AudioLines,
  fire: Flame,
  waves: Waves,
  pool: Waves,
  concierge: ConciergeBell,
  shower: ShowerHead,
  croissant: Croissant,
  wifi: Wifi,
  speaker: Speaker,
  sparkles: Sparkles,
  fridge: Refrigerator,
  bed: BedDouble,
  plug: PlugZap,
  package: Package,
  bike: Bike,
};

// Ikon SVG custom (24x24, stroke)
const custom = {
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </>
  ),
  guest: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M17 6.5a3 3 0 0 1 0 5M18 14.5c1.7.6 3 2.3 3 4.5" />
    </>
  ),
  host: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
    </>
  ),
  leaf: (
    <path d="M12 21v-8M12 13c0-4 2.5-7 7-8 .5 4.5-2.5 8-7 8ZM12 15c0-3-2-5.5-6-6-.3 3.6 2 6 6 6Z" />
  ),
  car: (
    <>
      <path d="M4 15v-3l2-5h12l2 5v3M4 15h16M4 15v3h3v-3M17 15v3h3v-3" />
      <circle cx="8" cy="12.5" r=".6" />
      <circle cx="16" cy="12.5" r=".6" />
    </>
  ),
  plane: (
    <path d="M10.5 13.5 3 11l1-1.5 8 .5 4.5-5a1.5 1.5 0 0 1 2.5 1.5L16 12l.5 8-1.5 1-2.5-7.5Z" />
  ),
  anchor: (
    <>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v14M8 11h8M4 14c0 4 3.5 7 8 7s8-3 8-7" />
    </>
  ),
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 3 3 5-6" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  quote: (
    <path d="M6.5 17A3.5 3.5 0 0 1 3 13.5V11c0-3 1.8-5.2 5-6l.6 1.3C6.9 7 6 8.2 6 10h2.5A1.5 1.5 0 0 1 10 11.5v2A3.5 3.5 0 0 1 6.5 17Zm9 0a3.5 3.5 0 0 1-3.5-3.5V11c0-3 1.8-5.2 5-6l.6 1.3C15.9 7 15 8.2 15 10h2.5a1.5 1.5 0 0 1 1.5 1.5v2a3.5 3.5 0 0 1-3.5 3.5Z" />
  ),
} satisfies Record<string, ReactNode>;

type CustomName = keyof typeof custom;
export type IconKey = IconName | CustomName;

export function Icon({
  name,
  size = 16,
  className,
  strokeWidth,
}: {
  name: IconKey;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  if (name in custom) {
    const filled = name === "quote";
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : (strokeWidth ?? 1.6)}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden
      >
        {custom[name as CustomName]}
      </svg>
    );
  }

  const Cmp = lucide[name as IconName];
  return (
    <Cmp
      size={size}
      strokeWidth={strokeWidth ?? 1.5}
      className={className}
      aria-hidden
    />
  );
}

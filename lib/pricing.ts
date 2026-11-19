export const HOST_FEE = 150;
export const ECO_FEE = 48;
export const DEPOSIT_RATE = 0.3;
export const MIN_NIGHTS = 3;
export const REFUND_WINDOW_DAYS = 14;

export const ADDONS = {
  chef: {
    label: "Sunset In-Villa Private Chef Experience",
    short: "Sunset In-Villa Private Chef",
    description:
      "A four-course fireside seafood and mountain herb degustation prepared over local almond wood coals on your terrace.",
    price: 240,
  },
  cellar: {
    label: "Curated Cellar Reserve Stocking",
    short: "Curated Cellar Reserve Stocking",
    description:
      "Three bottles of rare Balearic biodynamic vintages and natural artisanal botanical distillates chilled upon arrival.",
    price: 180,
  },
} as const;

export type AddonKey = keyof typeof ADDONS;

export function isAddonKey(value: string): value is AddonKey {
  return value in ADDONS;
}

/* ───────────── Dates (ISO yyyy-mm-dd, always handled in UTC) ───────────── */

const DAY_MS = 86_400_000;

export function parseISO(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

export function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function isValidISO(iso: string | undefined | null): iso is string {
  return !!iso && /^\d{4}-\d{2}-\d{2}$/.test(iso) && !Number.isNaN(parseISO(iso).getTime());
}

export function addDays(iso: string, days: number): string {
  return toISO(new Date(parseISO(iso).getTime() + days * DAY_MS));
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  return Math.round((parseISO(checkOut).getTime() - parseISO(checkIn).getTime()) / DAY_MS);
}

export function formatDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = { weekday: "short", month: "short", day: "numeric" },
): string {
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(parseISO(iso));
}

/* ───────────── Money ───────────── */

export function usd(amount: number, cents = false): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  }).format(amount);
}

export type Quote = {
  nights: number;
  stay: number;
  hostFee: number;
  ecoFee: number;
  addons: { key: AddonKey; label: string; price: number }[];
  addonsTotal: number;
  total: number;
  deposit: number;
  balance: number;
};

export function buildQuote(rate: number, nights: number, addonKeys: AddonKey[] = []): Quote {
  const stay = rate * nights;
  const addons = addonKeys.map((key) => ({
    key,
    label: ADDONS[key].short,
    price: ADDONS[key].price,
  }));
  const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);
  const total = stay + HOST_FEE + ECO_FEE + addonsTotal;
  const deposit = Math.round(total * DEPOSIT_RATE * 100) / 100;
  return {
    nights,
    stay,
    hostFee: HOST_FEE,
    ecoFee: ECO_FEE,
    addons,
    addonsTotal,
    total,
    deposit,
    balance: Math.round((total - deposit) * 100) / 100,
  };
}
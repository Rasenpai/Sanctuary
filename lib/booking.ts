import {
  MIN_NIGHTS,
  addDays,
  isAddonKey,
  isValidISO,
  nightsBetween,
  type AddonKey,
} from "./pricing";

export const DEFAULT_CHECK_IN = "2027-04-16";
export const DEFAULT_CHECK_OUT = "2027-04-20";
export const CALENDAR_FIRST_MONTH = "2027-04";
export const CALENDAR_LAST_MONTH = "2027-12";

export const RESERVED = new Set<string>([
  "2027-04-02", "2027-04-03", "2027-04-04",
  "2027-04-09", "2027-04-10",
  "2027-05-07", "2027-05-08", "2027-05-09", "2027-05-10",
  "2027-05-21", "2027-05-22",
  "2027-06-04", "2027-06-05", "2027-06-06", "2027-06-07", "2027-06-08",
]);

export function rangeHasReserved(checkIn: string, checkOut: string): boolean {
  const nights = nightsBetween(checkIn, checkOut);
  for (let i = 0; i <= nights; i++) {
    if (RESERVED.has(addDays(checkIn, i))) return true;
  }
  return false;
}

export type StayParams = {
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  addons: AddonKey[];
};

type RawParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function readStayParams(params: RawParams, maxGuests = 4): StayParams {
  let checkIn = first(params.in);
  let checkOut = first(params.out);

  if (
    !isValidISO(checkIn) ||
    !isValidISO(checkOut) ||
    nightsBetween(checkIn, checkOut) < MIN_NIGHTS ||
    nightsBetween(checkIn, checkOut) > 28
  ) {
    checkIn = DEFAULT_CHECK_IN;
    checkOut = DEFAULT_CHECK_OUT;
  }

  const adultsRaw = Number(first(params.adults));
  const adults =
    Number.isInteger(adultsRaw) && adultsRaw >= 1 ? Math.min(adultsRaw, maxGuests) : Math.min(2, maxGuests);

  const addons = (first(params.addons) ?? "")
    .split(",")
    .filter(isAddonKey)
    .filter((k, i, arr) => arr.indexOf(k) === i);

  return { checkIn, checkOut, nights: nightsBetween(checkIn, checkOut), adults, addons };
}

export function stayQuery(s: { checkIn: string; checkOut: string; adults: number; addons?: AddonKey[] }) {
  const q = new URLSearchParams({ in: s.checkIn, out: s.checkOut, adults: String(s.adults) });
  if (s.addons?.length) q.set("addons", s.addons.join(","));
  return q;
}
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  CreditCard,
  Info,
  Lock,
  MapPin,
  Maximize2,
  ShieldCheck,
  Waves,
  Banknote,
  BedDouble,
  Car,
  Shield,
} from "lucide-react";
import { useMemo, useState } from "react";
import { stayQuery } from "@/lib/booking";
import {
  ADDONS,
  REFUND_WINDOW_DAYS,
  addDays,
  buildQuote,
  formatDate,
  usd,
  type AddonKey,
} from "@/lib/pricing";

export type ReserveFormProps = {
  villa: {
    slug: string;
    name: string;
    image: string;
    imageAlt: string;
    price: number;
    beds: number;
    area: number;
  };
  stay: {
    checkIn: string;
    checkOut: string;
    nights: number;
    adults: number;
    addons: AddonKey[];
  };
};

const label = "label-caps block text-ink-soft";
const input =
  "w-full border-b border-ink/15 bg-paper px-6 py-3 text-ink transition-colors placeholder:text-ink-muted/70 focus:border-primary focus:bg-white focus:outline-none";
const panel = "space-y-6 bg-primary-50 p-6 sm:p-10";

const ARRIVAL_WINDOWS = [
  { value: "15:00", label: "15:00 – 16:30 (Afternoon Reception)" },
  { value: "17:00", label: "17:00 – 18:30 (Sunset Aperitivo Window)" },
  { value: "19:00", label: "19:00 – 21:00 (Evening Hearth Reception)" },
  { value: "late", label: "Late Arrival via Private Air (Post 21:00)" },
];

function SectionHead({
  eyebrow,
  title,
  aside,
}: {
  eyebrow: string;
  title: string;
  aside: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between pb-1.5">
      <div className="space-y-0.5">
        <span className="label-caps block tracking-[0.2em] text-secondary-700">
          {eyebrow}
        </span>
        <h2 className="font-display text-2xl text-ink">{title}</h2>
      </div>
      <span className="label-caps hidden tracking-widest sm:block">
        {aside}
      </span>
    </div>
  );
}

export function ReserveForm({ villa, stay }: ReserveFormProps) {
  const router = useRouter();
  const chauffeurIncluded = stay.nights >= 4;

  const [selected, setSelected] = useState<AddonKey[]>(
    stay.addons.length ? stay.addons : ["chef"],
  );
  const [pay, setPay] = useState<"card" | "wire">("card");
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    postal: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const quote = useMemo(
    () => buildQuote(villa.price, stay.nights, selected),
    [villa.price, stay.nights, selected],
  );
  const balanceDue = addDays(stay.checkIn, -REFUND_WINDOW_DAYS);

  const toggle = (key: AddonKey) =>
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData(e.currentTarget);

    // TODO: create the payment intent / reservation on your backend here (e.g. Stripe + Supabase).
    // Card details above are intentionally never read, stored or put in the URL.
    const ref = `SV-${Math.floor(10000 + Math.random() * 90000)}`;
    try {
      sessionStorage.setItem(
        "sanctuary:last-booking",
        JSON.stringify({
          ref,
          firstName: data.get("firstName"),
          email: data.get("email"),
          arrival: data.get("arrival"),
        }),
      );
    } catch {
      /* storage unavailable — confirmation falls back to generic copy */
    }

    const q = stayQuery({
      checkIn: stay.checkIn,
      checkOut: stay.checkOut,
      adults: stay.adults,
      addons: selected,
    });
    q.set("villa", villa.slug);
    q.set("ref", ref);
    router.push(`/confirmation?${q}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12"
    >
      {/* ───────── Left column ───────── */}
      <section className="space-y-[4.5rem] lg:col-span-7">
        {/* Principal resident */}
        <div className={panel}>
          <SectionHead
            eyebrow="Primary Dossier"
            title="Principal Resident"
            aside="Mandatory Registry"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="firstName" className={label}>
                First Given Name *
              </label>
              <input
                id="firstName"
                name="firstName"
                required
                autoComplete="given-name"
                placeholder="e.g. Julian"
                className={input}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="lastName" className={label}>
                Family Surname *
              </label>
              <input
                id="lastName"
                name="lastName"
                required
                autoComplete="family-name"
                placeholder="e.g. Croft"
                className={input}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="email" className={label}>
                Secure Dispatch Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="name@domain.com"
                className={input}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="phone" className={label}>
                Direct Mobile / Signal *
              </label>
              <div className="flex border-b border-ink/15 bg-paper transition-colors focus-within:border-primary focus-within:bg-white">
                <select
                  name="dial"
                  aria-label="Country code"
                  defaultValue="+44"
                  className="shrink-0 cursor-pointer bg-cream-dark px-3 text-sm focus:outline-none"
                >
                  {["+44", "+34", "+1", "+33", "+49", "+39", "+62"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel-national"
                  placeholder="7000 000000"
                  className="w-full bg-transparent px-3 py-3 focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="space-y-1 pt-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="arrival" className={label}>
                Estimated Touchdown / Arrival Window
              </label>
              <span className="label-caps hidden text-secondary-700 sm:block">
                Palma de Mallorca (PMI)
              </span>
            </div>
            <select
              id="arrival"
              name="arrival"
              defaultValue="17:00"
              className={`${input} cursor-pointer`}
            >
              {ARRIVAL_WINDOWS.map((w) => (
                <option key={w.value} value={w.value}>
                  {w.label}
                </option>
              ))}
            </select>
            <p className="flex items-center gap-1.5 pt-1 text-sm text-ink-soft">
              <Car
                size={16}
                strokeWidth={1.5}
                className="shrink-0 text-primary"
              />
              Our private estate chauffeur coordinates your arrival with your
              flight details.
            </p>
          </div>
        </div>

        {/* Enhancements */}
        <div className={panel}>
          <SectionHead
            eyebrow="Tailored Touches"
            title="Curated Enhancements"
            aside="Bespoke Curation"
          />
          <div className="space-y-3">
            <label
              className={`flex items-start gap-3 bg-paper p-6 ${chauffeurIncluded ? "" : "opacity-60"}`}
            >
              <input
                type="checkbox"
                checked={chauffeurIncluded}
                disabled
                className="mt-1 h-4 w-4 shrink-0 accent-primary"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-1.5">
                  <span className="font-medium">
                    Private Chauffeur Airport Transfer
                  </span>
                  <span className="label-caps shrink-0 font-semibold text-primary">
                    {chauffeurIncluded ? "Complimentary" : "4+ Nights"}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-ink-soft">
                  Direct transfer between PMI and the S&apos;Arracó estate.
                  Included for residencies of 4+ evenings.
                </p>
              </div>
            </label>

            {(Object.keys(ADDONS) as AddonKey[]).map((key) => (
              <label
                key={key}
                className="group flex cursor-pointer items-start gap-3 bg-paper p-6 transition-colors hover:bg-white"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(key)}
                  onChange={() => toggle(key)}
                  className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-primary"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-1.5">
                    <span className="font-medium transition-colors group-hover:text-primary">
                      {ADDONS[key].label}
                    </span>
                    <span className="shrink-0 text-sm font-medium">
                      +{usd(ADDONS[key].price, true)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-ink-soft">
                    {ADDONS[key].description}
                  </p>
                </div>
              </label>
            ))}
          </div>
          <div className="space-y-1.5 pt-1.5">
            <label htmlFor="notes" className={label}>
              Dietary Inquiries, Bedding Preferences &amp; Special Intimations
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Please intimate any allergies, pillow preferences (down/buckwheat), early luggage staging, or infant requirements..."
              className={`${input} text-sm`}
            />
          </div>
        </div>

        {/* Payment */}
        <div className={panel}>
          <div className="flex items-center justify-between pb-1.5">
            <div className="space-y-0.5">
              <span className="label-caps block tracking-[0.2em] text-secondary-700">
                Tier 1 Guarantee
              </span>
              <h2 className="font-display text-2xl text-ink">Payment Method</h2>
            </div>
            <div className="label-caps flex items-center gap-1.5 tracking-widest text-primary">
              <ShieldCheck size={16} strokeWidth={1.5} />
              <span className="hidden sm:inline">256-Bit Encrypted</span>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Payment method"
            className="grid grid-cols-2 gap-1.5 bg-cream-dark p-1"
          >
            {(
              [
                ["card", "Credit / Apple Pay"],
                ["wire", "Direct Bank Wire"],
              ] as const
            ).map(([key, text]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={pay === key}
                onClick={() => setPay(key)}
                className={`label-caps px-3 py-2.5 text-center tracking-[0.15em] transition-all ${
                  pay === key
                    ? "bg-paper font-medium text-ink"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {text}
              </button>
            ))}
          </div>

          {pay === "card" ? (
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="cc-number" className={label}>
                    Card Number *
                  </label>
                  <div className="flex items-center gap-2">
                    {["VISA", "MC", "AMEX"].map((b) => (
                      <span
                        key={b}
                        className="bg-paper px-1.5 py-0.5 font-mono text-[10px] tracking-widest text-ink-soft"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <input
                    id="cc-number"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    required
                    maxLength={19}
                    placeholder="4000 0000 0000 0000"
                    value={card.number}
                    onChange={(e) =>
                      setCard({
                        ...card,
                        number: e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 16)
                          .replace(/(.{4})/g, "$1 ")
                          .trim(),
                      })
                    }
                    className={`${input} pr-12 font-mono tracking-wider`}
                  />
                  <CreditCard
                    size={20}
                    strokeWidth={1.5}
                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-soft"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                <div className="space-y-1">
                  <label htmlFor="cc-exp" className={label}>
                    Expires *
                  </label>
                  <input
                    id="cc-exp"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    required
                    placeholder="MM / YY"
                    value={card.expiry}
                    onChange={(e) => {
                      const d = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setCard({
                        ...card,
                        expiry:
                          d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d,
                      });
                    }}
                    className={`${input} font-mono tracking-wider`}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="cc-csc" className={label}>
                    CVV / CVC *
                  </label>
                  <input
                    id="cc-csc"
                    type="password"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    required
                    maxLength={4}
                    placeholder="•••"
                    value={card.cvv}
                    onChange={(e) =>
                      setCard({
                        ...card,
                        cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                      })
                    }
                    className={`${input} font-mono tracking-wider`}
                  />
                </div>
                <div className="col-span-2 space-y-1 sm:col-span-1">
                  <label htmlFor="postal" className={label}>
                    Postal / Zip *
                  </label>
                  <input
                    id="postal"
                    autoComplete="postal-code"
                    required
                    placeholder="Postcode"
                    value={card.postal}
                    onChange={(e) =>
                      setCard({ ...card, postal: e.target.value })
                    }
                    className={input}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 bg-paper p-6 text-sm text-ink-soft">
              <p className="font-medium text-ink">
                Bespoke Concierge Wire Transfer Instructions
              </p>
              <p>
                For reserves exceeding $10,000 or corporate acquisitions, our
                financial steward will email dedicated SWIFT / IBAN instructions
                held in escrow once you confirm. Your dates are held for 48
                hours pending receipt of the deposit.
              </p>
            </div>
          )}

          <div className="space-y-3 pt-3">
            <button
              type="submit"
              disabled={submitting}
              className="label-caps group flex w-full items-center justify-center gap-3 bg-primary px-10 py-4 tracking-[0.2em] text-paper transition-colors duration-300 hover:bg-tertiary-hover disabled:opacity-60"
            >
              <Lock
                size={18}
                strokeWidth={1.5}
                className="transition-transform group-hover:scale-110"
              />
              <span>
                {submitting
                  ? "Securing Your Residency…"
                  : `Confirm & Reserve Villa (${usd(quote.deposit, true)} Deposit)`}
              </span>
            </button>
            <p className="text-center text-xs tracking-wide text-ink-soft/80">
              By selecting confirmation, you agree to the sanctuary terms of
              residence, mindful tranquility protocols, and cancellation
              provisions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-1.5 text-center sm:grid-cols-3">
            {[
              {
                Icon: BadgeCheck,
                title: "Sanctuary Guarantee",
                text: "Guaranteed solitary privacy",
                cls: "text-primary",
              },
              {
                Icon: Banknote,
                title: "Zero Hidden Fees",
                text: "All taxes & services declared",
                cls: "text-secondary",
              },
              {
                Icon: Shield,
                title: "SSL Secure Vault",
                text: "Bank-grade level security",
                cls: "text-primary",
              },
            ].map(({ Icon, title, text, cls }) => (
              <div
                key={title}
                className="flex flex-col items-center gap-1 bg-paper p-3"
              >
                <Icon size={20} strokeWidth={1.5} className={cls} />
                <span className="label-caps font-medium text-ink">{title}</span>
                <span className="text-xs text-ink-soft">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Summary ───────── */}
      <aside className="space-y-6 lg:sticky lg:top-24 lg:col-span-5">
        <div className="overflow-hidden bg-primary-50">
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={villa.image}
              alt={villa.imageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="label-caps absolute top-4 left-4 bg-paper/90 px-3 py-1 tracking-[0.18em] text-ink backdrop-blur-sm">
              Selected Sanctuary
            </div>
            <div className="absolute right-4 bottom-4 left-4 text-paper">
              <span className="label-caps block tracking-[0.2em] text-secondary-100 opacity-90">
                Balearic Archipelago · S&apos;Arracó
              </span>
              <h3 className="font-display text-2xl">{villa.name}</h3>
            </div>
          </div>

          <div className="label-caps flex flex-wrap items-center justify-between gap-3 bg-cream-dark px-6 py-3 tracking-wider text-ink">
            <div className="flex items-center gap-1.5">
              <BedDouble
                size={16}
                strokeWidth={1.5}
                className="text-secondary"
              />
              <span>{villa.beds} Suites</span>
            </div>
            <span className="text-ink-muted">·</span>
            <div className="flex items-center gap-1.5">
              <Waves size={16} strokeWidth={1.5} className="text-secondary" />
              <span>Private Plunge Pool</span>
            </div>
            <span className="text-ink-muted">·</span>
            <div className="flex items-center gap-1.5">
              <Maximize2
                size={16}
                strokeWidth={1.5}
                className="text-secondary"
              />
              <span>{villa.area} m²</span>
            </div>
          </div>

          <div className="space-y-6 p-6 sm:p-10">
            <div className="space-y-3 bg-paper p-4 sm:p-6">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="label-caps block text-ink-soft">
                    Check-In
                  </span>
                  <span className="mt-0.5 block font-display text-lg">
                    {formatDate(stay.checkIn, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-sm text-ink-soft">From 15:00</span>
                </div>
                <div>
                  <span className="label-caps block text-ink-soft">
                    Check-Out
                  </span>
                  <span className="mt-0.5 block font-display text-lg">
                    {formatDate(stay.checkOut, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-sm text-ink-soft">Until 12:00</span>
                </div>
              </div>
              <div className="label-caps flex items-center justify-between pt-1.5 tracking-widest text-ink-soft">
                <span>Duration: {stay.nights} Nights</span>
                <span>
                  Guests: {stay.adults} {stay.adults === 1 ? "Adult" : "Adults"}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="label-caps tracking-[0.2em] text-secondary-700">
                Investment Breakdown
              </h4>
              <div className="space-y-2.5 text-sm">
                <Row
                  left={`${stay.nights} Nights × ${usd(villa.price, true)}`}
                  right={usd(quote.stay, true)}
                />
                <Row
                  left={
                    <span className="flex items-center gap-1">
                      Sanctuary Host &amp; Daily Housekeeping
                      <span title="Includes dedicated host assistance and twice-daily discreet stewardship">
                        <Info
                          size={14}
                          strokeWidth={1.5}
                          className="cursor-help text-ink-muted"
                        />
                      </span>
                    </span>
                  }
                  right={usd(quote.hostFee, true)}
                />
                <Row
                  left="Regional Tourism Eco Contribution"
                  right={usd(quote.ecoFee, true)}
                />
                {quote.addons.map((a) => (
                  <Row
                    key={a.key}
                    left={a.label}
                    right={`+${usd(a.price, true)}`}
                  />
                ))}
                {chauffeurIncluded && (
                  <div className="flex items-center justify-between text-primary">
                    <span>Chauffeur Airport Transfer (4+ Nights)</span>
                    <span className="label-caps font-semibold">Included</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 pt-3">
              <div className="flex items-baseline justify-between pt-1.5">
                <span className="font-display text-lg">
                  Total Estate Reservation
                </span>
                <span className="font-display text-2xl font-semibold">
                  {usd(quote.total, true)}
                </span>
              </div>
              <div className="space-y-1 bg-primary/10 p-3">
                <div className="flex items-baseline justify-between text-primary-700">
                  <span className="label-caps font-medium tracking-[0.15em]">
                    Due Now (30% Deposit)
                  </span>
                  <span className="font-mono text-lg font-bold">
                    {usd(quote.deposit, true)}
                  </span>
                </div>
                <p className="text-xs text-ink-soft">
                  Locks residency dates immediately. The remaining balance of{" "}
                  <span className="font-mono font-medium text-ink">
                    {usd(quote.balance, true)}
                  </span>{" "}
                  is due{" "}
                  {formatDate(balanceDue, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="mx-6 mb-6 flex items-start gap-3 bg-paper p-3 sm:mx-10 sm:mb-10">
            <ShieldCheck
              size={20}
              strokeWidth={1.5}
              className="mt-0.5 shrink-0 text-primary"
            />
            <div className="space-y-0.5">
              <span className="label-caps block font-medium tracking-wider text-ink">
                Mindful Flexibility
              </span>
              <p className="text-sm text-ink-soft">
                100% refund guaranteed up to {REFUND_WINDOW_DAYS} days prior to
                check-in (
                {formatDate(balanceDue, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                ). After this date, reserves may be transferred to future
                seasonal openings.
              </p>
            </div>
          </div>

          <div className="label-caps flex items-center justify-between border-t border-ink/5 px-6 py-4 tracking-wider text-ink-soft sm:px-10">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 bg-primary" />
              <span>Villa Steward On Call</span>
            </div>
            <a
              href="tel:+34971884022"
              className="text-secondary-700 underline transition-colors hover:text-ink"
            >
              Direct Desk +34 971 88 40 22
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between bg-cream-dark p-6 text-ink">
          <div className="flex items-center gap-3">
            <MapPin size={24} strokeWidth={1.5} className="text-secondary" />
            <div>
              <span className="label-caps block tracking-widest text-secondary-700">
                Native Geology
              </span>
              <span className="text-sm font-medium">
                Serra de Tramuntana Foothills
              </span>
            </div>
          </div>
          <span className="font-mono text-xs text-ink-soft">
            39°34&apos;N 2°25&apos;E
          </span>
        </div>

        <Link
          href={`/villas/${villa.slug}`}
          className="label-caps inline-block tracking-widest text-ink-soft underline underline-offset-4 transition-colors hover:text-ink"
        >
          ← Change dates or villa
        </Link>
      </aside>
    </form>
  );
}

function Row({ left, right }: { left: React.ReactNode; right: string }) {
  return (
    <div className="flex items-center justify-between text-ink">
      <span className="text-ink-soft">{left}</span>
      <span className="font-mono">{right}</span>
    </div>
  );
}

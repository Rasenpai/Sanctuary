import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Download,
  Flower2,
  Wallet,
  Mail,
  MessageCircle,
  Navigation,
  PhoneCall,
  Quote,
  Sailboat,
  Sparkles,
  Sun,
  UtensilsCrossed,
  Car,
  Bus,
  LayoutGrid,
  ConciergeBell,
} from "lucide-react";
import { GuestValue } from "@/components/confirmation/guest-value";
import { readStayParams } from "@/lib/booking";
import { images } from "@/lib/images";
import {
  REFUND_WINDOW_DAYS,
  addDays,
  buildQuote,
  formatDate,
  isAddonKey,
  usd,
} from "@/lib/pricing";
import { defaultVilla, getVilla } from "@/lib/villas";

export const metadata: Metadata = { title: "Reservation Confirmed" };

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const TYPICAL_HIGH_C = [15, 15, 17, 19, 23, 27, 30, 30, 27, 23, 19, 16];

export default function ConfirmationPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
      <ConfirmationContent searchParams={searchParams} />
    </Suspense>
  );
}

async function ConfirmationContent({ searchParams }: Props) {
  const sp = await searchParams;
  const one = (k: string) =>
    Array.isArray(sp[k])
      ? (sp[k] as string[])[0]
      : (sp[k] as string | undefined);

  const villa = getVilla(one("villa")) ?? defaultVilla;
  const stay = readStayParams(sp, villa.maxGuests);
  const addons = stay.addons.filter(isAddonKey);
  const quote = buildQuote(villa.price, stay.nights, addons);
  const ref = /^SV-\d{5}$/.test(one("ref") ?? "") ? one("ref")! : "SV-84291";

  const balanceDate = addDays(stay.checkIn, -REFUND_WINDOW_DAYS);
  const month = Number(stay.checkIn.slice(5, 7)) - 1;
  const celsius = TYPICAL_HIGH_C[month];
  const monthName = formatDate(stay.checkIn, { month: "long" });
  const chauffeurIncluded = stay.nights >= 4;

  const small = "label-caps tracking-wider";

  return (
    <>
      {/* Celebratory header */}
      <section className="w-full px-5 pt-6 pb-10 md:px-8 lg:px-14">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center bg-cream-dark text-primary">
            <Flower2 size={30} strokeWidth={1.25} />
          </div>

          <div className="label-caps mb-6 inline-flex flex-wrap items-center justify-center gap-3 bg-primary-50 px-6 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse bg-primary" />
            <span className="tracking-[0.2em] text-secondary-700">
              REF #{ref}
            </span>
            <span className="text-ink-muted">·</span>
            <span className="font-medium tracking-[0.15em] text-primary">
              Deposit Confirmed
            </span>
            <span className="text-ink-muted">·</span>
            <span className="tracking-[0.15em] text-ink-soft">
              Dates Secured
            </span>
          </div>

          <h1 className="heading-display animate-fade-up mb-3 max-w-3xl text-5xl text-ink md:text-7xl">
            We Look Forward to <em className="italic">Welcoming</em> You
          </h1>

          <p className="mx-auto mb-[4.5rem] max-w-2xl text-lg leading-[1.875rem] font-light text-ink-soft">
            Your stay at{" "}
            <span className="font-medium text-ink">{villa.name}</span> has been
            confirmed. A personalized confirmation dossier and access code have
            been dispatched to{" "}
            <span className="text-ink underline decoration-ink/20 underline-offset-4">
              <GuestValue field="email" fallback="your email address" />
            </span>
            .
          </p>

          {/* Stepper */}
          <ol className="grid w-full max-w-2xl grid-cols-3 bg-primary-50 px-6 py-6 sm:px-10">
            {[
              { title: "1. Reservation", sub: "Completed", done: true },
              {
                title: "2. Deposit",
                sub: `${usd(quote.deposit, true)} Settled`,
                done: true,
              },
              {
                title: "3. Arrival",
                sub: `${formatDate(stay.checkIn, { month: "short", day: "numeric" })}, 15:00`,
                done: false,
              },
            ].map((s, i) => (
              <li
                key={s.title}
                className="relative flex flex-col items-center text-center"
              >
                {i < 2 && (
                  <span
                    aria-hidden
                    className={`absolute top-3.5 left-1/2 h-px w-full ${s.done ? "bg-primary" : "bg-ink/15"}`}
                  />
                )}
                <span
                  className={`relative z-10 mb-1.5 flex h-7 w-7 items-center justify-center ${
                    s.done
                      ? "bg-primary text-paper"
                      : "bg-cream-dark text-primary"
                  }`}
                >
                  {s.done ? (
                    <Check size={16} strokeWidth={1.5} />
                  ) : (
                    <Clock size={16} strokeWidth={1.5} />
                  )}
                </span>
                <span className={`${small} font-medium text-ink`}>
                  {s.title}
                </span>
                <span className="label-caps text-secondary-700">{s.sub}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Master canvas */}
      <section className="w-full px-5 pb-[4.5rem] md:px-8 lg:px-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Left */}
          <div className="flex flex-col gap-10 lg:col-span-7">
            <div className="overflow-hidden bg-primary-50">
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={images.sereinTwilight}
                  alt={`Terrace of ${villa.name} at twilight with an illuminated infinity pool and linen loungers.`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="label-caps absolute top-6 left-6 bg-paper/90 px-3 py-1 font-medium tracking-widest text-primary backdrop-blur-sm">
                  Private Sanctuary
                </div>
                <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between text-paper">
                  <div>
                    <span className="label-caps block tracking-[0.2em] opacity-90">
                      Residency Allocation
                    </span>
                    <h2 className="font-display text-4xl tracking-wide">
                      {villa.name}
                    </h2>
                  </div>
                  <span className="label-caps bg-ink/40 px-3 py-1 backdrop-blur-sm">
                    {villa.beds} Bed · {villa.area} m²
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-6 p-6 sm:p-10">
                <div className="grid grid-cols-1 gap-3 bg-cream-dark p-6 sm:grid-cols-3">
                  {[
                    {
                      l: "Check-In",
                      v: formatDate(stay.checkIn),
                      s: "From 15:00 CEST",
                    },
                    {
                      l: "Check-Out",
                      v: formatDate(stay.checkOut),
                      s: "Until 12:00 CEST",
                    },
                    {
                      l: "Duration",
                      v: `${stay.nights} Nights`,
                      s: `${stay.adults} ${stay.adults === 1 ? "Adult" : "Adults"}`,
                    },
                  ].map((d) => (
                    <div key={d.l} className="flex flex-col">
                      <span className="label-caps tracking-wider text-secondary-700">
                        {d.l}
                      </span>
                      <span className="mt-1 font-display text-2xl text-ink">
                        {d.v}
                      </span>
                      <span className="text-sm text-ink-soft">{d.s}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-paper p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="label-caps tracking-wider text-ink-soft">
                      Deposit Paid (Settled)
                    </span>
                    <span className="font-display text-2xl font-medium text-primary">
                      {usd(quote.deposit, true)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-cream-dark/40 p-2">
                    <div className="flex flex-col">
                      <span className="label-caps tracking-widest text-secondary-700">
                        Remaining Balance
                      </span>
                      <span className="text-sm text-ink-soft">
                        Automated settlement on{" "}
                        {formatDate(balanceDate, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <span className="font-display text-2xl text-ink">
                      {usd(quote.balance, true)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 pt-1.5 text-center sm:grid-cols-4">
                  {[
                    ["Saltwater", "Heated Pool"],
                    ["Acoustics", "Spatial Audio"],
                    ["Culinary", "Daily Breakfast"],
                    ["Sanctuary", "Host On-Call"],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-cream-dark p-1.5">
                      <span className="label-caps block text-secondary-700">
                        {k}
                      </span>
                      <span className="text-sm font-medium text-ink">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Logistics */}
            <div className="flex flex-col gap-6 bg-primary-50 p-6 sm:p-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Navigation
                    size={22}
                    strokeWidth={1.5}
                    className="text-primary"
                  />
                  <h3 className="font-display text-2xl font-medium text-ink">
                    Arrival &amp; Transit Logistics
                  </h3>
                </div>
                <span className="label-caps hidden tracking-widest text-secondary-700 sm:block">
                  Access Dossier
                </span>
              </div>

              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={images.routeMap}
                  alt="Map of the route from Palma Airport to the estate"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 flex items-center gap-3 bg-paper/95 px-6 py-2 backdrop-blur-md">
                  <Bus size={18} strokeWidth={1.5} className="text-primary" />
                  <div className="flex flex-col">
                    <span className="label-caps tracking-widest text-secondary-700">
                      Transit Time
                    </span>
                    <span className="text-sm font-medium">
                      42 mins from Palma Airport (PMI)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start justify-between gap-3 bg-paper p-6 sm:flex-row sm:items-center">
                <div>
                  <span className="label-caps tracking-widest text-secondary-700">
                    Sanctuary Coordinates
                  </span>
                  <p className="font-medium">
                    Cala d&apos;Oliva Sanctuary, Camino del Faro 12
                  </p>
                  <p className="text-sm text-ink-soft">
                    07140 S&apos;Arracó, Illes Balears, Spain
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=Cala+d'Oliva+S'Arrac%C3%B3+Mallorca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-caps inline-flex items-center gap-1 tracking-wider text-primary underline underline-offset-4 transition-colors hover:text-tertiary-hover"
                >
                  <span>Google Maps Route</span>
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </a>
              </div>

              <div className="flex items-start gap-6 bg-cream-dark p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary/10 text-primary">
                  <Car size={20} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="label-caps tracking-wider text-secondary-700">
                      Sanctuary Fleet Transfer
                    </span>
                    <span className="label-caps bg-primary px-2 py-0.5 tracking-widest text-paper">
                      {chauffeurIncluded ? "Confirmed" : "On Request"}
                    </span>
                  </div>
                  <h4 className="mt-1 font-medium">
                    V-Class Chauffeur Service
                  </h4>
                  <p className="mt-1 text-sm text-ink-soft">
                    Your driver, Mateo, will greet you at the Palma Airport
                    (PMI) arrivals VIP lounge holding an etched slate nameboard.
                    Bottled rosemary spring water and cold towels provided.
                    {!chauffeurIncluded &&
                      " Complimentary on stays of 4+ nights — your host will quote this transfer."}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-1.5 sm:grid-cols-2">
                <button
                  type="button"
                  className="label-caps flex items-center justify-center gap-1.5 bg-paper px-6 py-3 tracking-[0.15em] text-ink transition-colors hover:bg-cream-dark"
                >
                  <Wallet size={18} strokeWidth={1.5} />
                  <span>Add to Wallet / Calendar</span>
                </button>
                <button
                  type="button"
                  className="label-caps flex items-center justify-center gap-1.5 bg-paper px-6 py-3 tracking-[0.15em] text-ink transition-colors hover:bg-cream-dark"
                >
                  <Download size={18} strokeWidth={1.5} />
                  <span>Download Itinerary PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-10 lg:col-span-5">
            {/* Host */}
            <div className="flex flex-col gap-6 bg-primary-50 p-6 sm:p-10">
              <div className="flex items-center justify-between">
                <span className="label-caps tracking-[0.2em] text-secondary-700">
                  Your Personal Care
                </span>
                <div className="label-caps flex items-center gap-1.5 bg-paper px-2 py-0.5 tracking-widest text-primary">
                  <span className="h-2 w-2 animate-pulse bg-primary" />
                  <span>Active Now</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden">
                  <Image
                    src={images.hostPortrait}
                    alt="Portrait of Eliza Moreau, Head of Guest Sanctuary"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-medium">
                    Eliza Moreau
                  </h3>
                  <p className="text-sm text-secondary-700">
                    Head of Guest Sanctuary &amp; Curation
                  </p>
                </div>
              </div>
              <div className="relative bg-paper p-6">
                <Quote
                  size={24}
                  strokeWidth={1.25}
                  className="absolute top-2 right-2 text-cream-dark"
                  aria-hidden
                />
                <p className="leading-relaxed text-ink-soft italic">
                  “I am delighted to curate your arrival,{" "}
                  <GuestValue field="firstName" fallback="dear guest" />. Please
                  share your flight number and any dietary preferences so we may
                  prepare your arrival welcome basket and calibrate your evening
                  cellar selection.”
                </p>
              </div>
              <div className="flex flex-col gap-1.5 sm:flex-row">
                <a
                  href="https://wa.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-caps inline-flex flex-1 items-center justify-center gap-1.5 bg-primary px-6 py-3 tracking-[0.15em] text-paper transition-colors hover:bg-tertiary-hover"
                >
                  <MessageCircle size={18} strokeWidth={1.5} />
                  <span>WhatsApp Concierge</span>
                </a>
                <a
                  href="mailto:concierge@sanctuary-villas.com?subject=Arrival%20note"
                  className="label-caps inline-flex flex-1 items-center justify-center gap-1.5 bg-paper px-6 py-3 tracking-[0.15em] text-ink transition-colors hover:bg-cream-dark"
                >
                  <Mail size={18} strokeWidth={1.5} />
                  <span>Send Arrival Note</span>
                </a>
              </div>
            </div>

            {/* Curate */}
            <div className="flex flex-col gap-6 bg-primary-50 p-6 sm:p-10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="label-caps tracking-[0.2em] text-secondary-700">
                    Unhurried Additions
                  </span>
                  <h3 className="font-display text-2xl font-medium">
                    Curate Your Stay
                  </h3>
                </div>
                <ConciergeBell
                  size={20}
                  strokeWidth={1.5}
                  className="text-secondary"
                />
              </div>
              <p className="text-sm text-ink-soft">
                Complement your days before arrival. Spaces and private charters
                are strictly limited to preserve uninterrupted seclusion.
              </p>

              {[
                {
                  Icon: Sparkles,
                  title: "In-Villa Botanical Spa",
                  price: "From $190",
                  text: "60 or 90 minute therapeutic massage using organic wild rosemary, crushed sea salt, and warmed volcanic stones on your private terrace.",
                  meta: `2 Available slots on ${formatDate(addDays(stay.checkIn, 1), { month: "short", day: "numeric" })}`,
                  cta: "Reserve Session +",
                },
                {
                  Icon: Sailboat,
                  title: "Private Secret Cove Charter",
                  price: "$850 / Half-Day",
                  text: "Sail our 38ft classic handcrafted solar-assisted sloop to Dragonera Island Marine Reserve with curated cellar wine and artisanal picnic.",
                  meta: `${formatDate(addDays(stay.checkIn, 2), { month: "short", day: "numeric" })} Morning Departure`,
                  cta: "Inquire Charter +",
                },
              ].map(({ Icon, title, price, text, meta, cta }) => (
                <div
                  key={title}
                  className="flex flex-col gap-1.5 bg-paper p-6 transition-colors hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        className="text-primary"
                      />
                      <h4 className="font-medium">{title}</h4>
                    </div>
                    <span className="label-caps shrink-0 font-medium tracking-wider text-primary">
                      {price}
                    </span>
                  </div>
                  <p className="text-sm text-ink-soft">{text}</p>
                  <div className="flex items-center justify-between pt-1.5">
                    <span className="label-caps text-secondary-700">
                      {meta}
                    </span>
                    <button
                      type="button"
                      className="label-caps tracking-widest text-primary underline underline-offset-4 transition-colors hover:text-tertiary-hover"
                    >
                      {cta}
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex flex-col gap-1.5 bg-paper p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed
                      size={20}
                      strokeWidth={1.5}
                      className="text-primary"
                    />
                    <h4 className="font-medium">Breakfast Tasting Atelier</h4>
                  </div>
                  <span className="label-caps shrink-0 font-medium tracking-wider text-secondary-700">
                    Included With Stay
                  </span>
                </div>
                <p className="text-sm text-ink-soft">
                  Freshly pressed citrus, raw local honey, slow-ferment
                  sourdough, and farm eggs delivered in woven baskets at your
                  requested hour each morning.
                </p>
                <div className="flex items-center justify-between pt-1.5">
                  <span className="label-caps text-secondary-700">
                    Served 08:00 – 11:30 Daily
                  </span>
                  <span className="label-caps flex items-center gap-1 text-primary">
                    <Check size={14} strokeWidth={1.5} />
                    <span>Pre-arranged</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Weather */}
            <div className="flex items-center justify-between gap-3 bg-cream-dark p-6">
              <div className="flex items-center gap-3">
                <Sun size={28} strokeWidth={1.25} className="text-secondary" />
                <div>
                  <span className="label-caps tracking-widest text-secondary-700">
                    Typical {monthName}
                  </span>
                  <p className="text-sm font-medium">
                    S&apos;Arracó · {celsius}°C /{" "}
                    {Math.round((celsius * 9) / 5 + 32)}°F · Calm Seas
                  </p>
                </div>
              </div>
              <span className="label-caps hidden tracking-wider text-ink-soft sm:block">
                Mediterranean Climate
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Action bar */}
      <section className="w-full bg-cream-dark px-5 py-6 md:px-8 lg:px-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-cream text-primary">
              <PhoneCall size={20} strokeWidth={1.5} />
            </div>
            <div>
              <span className="label-caps block tracking-widest text-secondary-700">
                Direct Sanctuary Line
              </span>
              <a
                href="tel:+34971884022"
                className="font-display text-2xl text-ink transition-colors hover:text-primary"
              >
                +34 971 88 40 22
              </a>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-3 sm:flex-row md:w-auto">
            <Link
              href={`/villas/${villa.slug}`}
              className="label-caps inline-flex w-full items-center justify-center gap-1.5 bg-primary px-10 py-3 text-center tracking-[0.15em] text-paper transition-colors hover:bg-tertiary-hover sm:w-auto"
            >
              <LayoutGrid size={18} strokeWidth={1.5} />
              <span>View Your Villa</span>
            </Link>
            <Link
              href="/villas"
              className="label-caps inline-flex w-full items-center justify-center gap-1.5 bg-cream px-6 py-3 text-center tracking-[0.15em] text-ink transition-colors hover:bg-paper sm:w-auto"
            >
              <span>Return to Villa Collection</span>
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

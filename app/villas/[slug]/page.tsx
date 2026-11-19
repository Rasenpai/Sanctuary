import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Images, Navigation, Anchor } from "lucide-react";
import { Icon } from "@/components/icons";
import { BookingCard } from "@/components/villa/booking-card";
import { Calendar } from "@/components/villa/calendar";
import { ShareSave } from "@/components/villa/share-save";
import { StayProvider } from "@/components/villa/stay-context";
import { MIN_NIGHTS, usd } from "@/lib/pricing";
import { getVilla, villas } from "@/lib/villas";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return villas.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const villa = getVilla((await params).slug);
  return villa ? { title: villa.name, description: villa.blurb } : {};
}

const h3 = "label-caps tracking-[0.2em] text-secondary-700";

export default async function VillaPage({ params }: Props) {
  const villa = getVilla((await params).slug);
  if (!villa) notFound();

  const d = villa.detail;
  const specs = d?.specs ?? [
    {
      label: "Capacity",
      value: `${villa.maxGuests} Guests`,
      note: "Adult sanctuary policy",
    },
    {
      label: "Suites",
      value: `${villa.beds} ${villa.bedsNote}`,
      note: "Private pavilions",
    },
    { label: "Bathrooms", value: villa.baths, note: villa.bathsNote },
    {
      label: "Footprint",
      value: `${villa.area} m²`,
      note: "Indoor-outdoor terrain",
    },
  ];
  const concept = d?.concept ?? [villa.blurb];

  return (
    <StayProvider maxGuests={villa.maxGuests}>
      {/* Breadcrumb bar */}
      <section className="w-full bg-paper px-5 py-3 md:px-8 lg:px-14">
        <div className="flex flex-col items-start justify-between gap-1.5 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Link
              href="/villas"
              className="label-caps group inline-flex items-center gap-1.5 tracking-[0.15em] text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowLeft
                size={16}
                strokeWidth={1.5}
                className="transition-transform group-hover:-translate-x-1"
              />
              <span>Back to Villas</span>
            </Link>
            <span className="text-ink-muted">/</span>
            <span className="label-caps tracking-[0.15em] text-secondary-700">
              {d?.breadcrumb ?? `${villa.zone} · ${villa.setting}`}
            </span>
          </div>
          <ShareSave />
        </div>
      </section>

      {/* Gallery */}
      <section className="w-full px-5 pt-6 pb-10 md:px-8 lg:px-14">
        {d ? (
          <div className="relative grid grid-cols-1 gap-1.5 bg-cream-dark p-1.5 lg:grid-cols-12">
            <figure className="group relative h-[420px] overflow-hidden lg:col-span-7 lg:h-[580px]">
              <Image
                src={d.gallery[0].src}
                alt={d.gallery[0].alt}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <figcaption className="label-caps absolute bottom-4 left-4 bg-paper/90 px-3 py-1.5 tracking-widest backdrop-blur-sm">
                {d.gallery[0].caption}
              </figcaption>
            </figure>
            <div className="grid h-[420px] grid-cols-2 gap-1.5 lg:col-span-5 lg:h-[580px]">
              {d.gallery.slice(1).map((g) => (
                <figure
                  key={g.caption}
                  className="group relative h-full overflow-hidden"
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(min-width: 1024px) 21vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <figcaption className="label-caps absolute inset-0 flex items-end bg-gradient-to-t from-ink/50 via-transparent to-transparent p-1.5 tracking-widest text-paper opacity-0 transition-opacity group-hover:opacity-100">
                    {g.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
            <button
              type="button"
              className="label-caps absolute right-6 bottom-6 inline-flex items-center gap-1.5 bg-cream px-6 py-3 tracking-[0.15em] shadow-md transition-colors hover:bg-cream-dark"
            >
              <Images size={18} strokeWidth={1.5} />
              <span>View All Architectural Studies</span>
            </button>
          </div>
        ) : (
          <div className="relative h-[420px] overflow-hidden lg:h-[580px]">
            <Image
              src={villa.image}
              alt={villa.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="label-caps absolute bottom-4 left-4 bg-paper/90 px-3 py-1.5 tracking-widest backdrop-blur-sm">
              {villa.badge}
            </div>
          </div>
        )}
      </section>

      {/* Body */}
      <section className="w-full px-5 pb-[4.5rem] md:px-8 lg:px-14">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-10 lg:col-span-8">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <div className="label-caps flex flex-wrap items-center gap-1.5 tracking-[0.2em] text-secondary-700">
                <span>Private Sanctuary</span>
                <span>·</span>
                <span>{d?.locality ?? villa.setting}</span>
                <span>·</span>
                <span className="font-medium text-primary">
                  {d?.reference ?? `Estate Ref. ${villa.number}`}
                </span>
              </div>
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-baseline">
                <h1 className="heading-display text-5xl text-ink">
                  {villa.name}
                </h1>
                <div className="flex items-baseline gap-1.5">
                  <span className="label-caps tracking-widest text-ink-soft">
                    Rates from
                  </span>
                  <span className="font-display text-4xl text-primary-600">
                    {usd(villa.price)}
                  </span>
                  <span className="text-sm text-ink-soft">/ night</span>
                </div>
              </div>
            </div>

            {/* Specs */}
            <dl className="grid grid-cols-2 gap-1.5 bg-cream-dark p-6 md:grid-cols-4">
              {specs.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <dt className="label-caps tracking-widest text-secondary-700">
                    {s.label}
                  </dt>
                  <dd className="font-display text-2xl text-ink">{s.value}</dd>
                  <span className="text-sm text-ink-soft">{s.note}</span>
                </div>
              ))}
            </dl>

            {/* Concept */}
            <div className="flex max-w-3xl flex-col gap-3">
              <h2 className={h3}>Architectural Concept</h2>
              {concept.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-lg leading-[1.875rem] font-light text-ink-soft"
                      : "leading-relaxed text-ink-soft"
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Experiences */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className={h3}>Signature Experiences</h3>
                <span className="label-caps tracking-widest text-ink-soft">
                  Included with Residence
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {(
                  d?.experiences ??
                  villa.inclusions.map((i) => ({
                    icon: i.icon,
                    title: i.text,
                    text: "",
                  }))
                ).map((e) => (
                  <div
                    key={e.title}
                    className="flex gap-6 bg-primary-50 p-6 transition-colors hover:bg-cream-dark"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary/15 text-primary">
                      <Icon name={e.icon} size={24} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span
                        className={`font-display text-ink ${e.text ? "text-2xl" : "text-lg leading-snug"}`}
                      >
                        {e.title}
                      </span>
                      {e.text && (
                        <p className="text-sm leading-relaxed text-ink-soft">
                          {e.text}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suites */}
            {d && (
              <div className="flex flex-col gap-6">
                <h3 className={h3}>Suite Arrangement</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {d.suites.map((s) => (
                    <article
                      key={s.title}
                      className="flex flex-col overflow-hidden bg-paper"
                    >
                      <div className="relative h-52 w-full overflow-hidden">
                        <Image
                          src={s.image}
                          alt={s.alt}
                          fill
                          sizes="(min-width: 1024px) 30vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between gap-3 p-6">
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="label-caps tracking-widest text-primary">
                              {s.pavilion}
                            </span>
                            <span className="label-caps text-secondary-700">
                              {s.aspect}
                            </span>
                          </div>
                          <h4 className="font-display mb-2 text-2xl">
                            {s.title}
                          </h4>
                          <p className="text-sm leading-relaxed text-ink-soft">
                            {s.text}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-1.5">
                          {s.tags.map((t) => (
                            <span
                              key={t}
                              className="label-caps border border-ink/10 bg-primary-50 px-2 py-1 text-ink"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {d && (
              <div className="flex flex-col gap-6 bg-primary-50 p-6 sm:p-10">
                <div className="flex items-center justify-between">
                  <h3 className={h3}>
                    Sanctuary Specifications &amp; Amenities
                  </h3>
                  <span className="label-caps hidden tracking-widest text-ink-soft sm:inline">
                    Architectural Standards
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {d.amenities.map((a) => (
                    <div key={a.title} className="flex items-start gap-1.5">
                      <Icon
                        name={a.icon}
                        size={20}
                        className="mt-0.5 shrink-0 text-primary"
                      />
                      <div className="flex flex-col">
                        <span className="label-caps tracking-wider text-ink">
                          {a.title}
                        </span>
                        <span className="text-sm text-ink-soft">{a.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Calendar */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col justify-between gap-1.5 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-display text-2xl text-ink">
                    Sanctuary Calendar
                  </h3>
                  <p className="text-sm text-ink-soft">
                    Select dates for residency. Minimum reservation is{" "}
                    {MIN_NIGHTS} nights.
                  </p>
                </div>
                <div className="label-caps flex items-center gap-3 tracking-widest text-ink-soft">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-3 w-3 bg-primary" />{" "}
                    Selected
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-3 w-3 bg-cream-dark" />{" "}
                    Reserved
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-3 w-3 border border-ink/15 bg-primary-50" />{" "}
                    Open
                  </span>
                </div>
              </div>
              <Calendar />
            </div>
          </div>

          <BookingCard villa={villa} />
        </div>
      </section>

      {/* Location */}
      {d && (
        <section className="w-full px-5 pb-[4.5rem] md:px-8 lg:px-14">
          <div className="flex flex-col items-center justify-between gap-10 bg-cream-dark p-6 sm:p-10 lg:flex-row">
            <div className="flex max-w-xl flex-col gap-1.5">
              <span className="label-caps tracking-[0.2em] text-secondary-700">
                Geography &amp; Environs
              </span>
              <h3 className="font-display text-4xl text-ink">
                {d.location.title}
              </h3>
              <p className="leading-relaxed text-ink-soft">{d.location.text}</p>
              <div className="flex flex-wrap items-center gap-6 pt-1.5">
                <div className="label-caps flex items-center gap-1 tracking-widest text-ink">
                  <Navigation
                    size={18}
                    strokeWidth={1.5}
                    className="text-primary"
                  />
                  <span>{d.location.distance}</span>
                </div>
                <div className="label-caps flex items-center gap-1 tracking-widest text-ink">
                  <Anchor
                    size={18}
                    strokeWidth={1.5}
                    className="text-primary"
                  />
                  <span>{d.location.extra}</span>
                </div>
              </div>
            </div>
            <div className="relative h-56 w-full overflow-hidden lg:w-96">
              <Image
                src={d.location.image}
                alt="Map of the coastline around the villa"
                fill
                sizes="384px"
                className="object-cover"
              />
              <div className="label-caps absolute bottom-3 left-3 bg-paper/90 px-1.5 py-1 tracking-widest backdrop-blur-sm">
                {d.location.coordinates}
              </div>
            </div>
          </div>
        </section>
      )}
    </StayProvider>
  );
}

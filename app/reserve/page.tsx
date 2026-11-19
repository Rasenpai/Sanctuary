import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { ReserveForm } from "@/components/reserve/reserve-form";
import { readStayParams } from "@/lib/booking";
import { defaultVilla, getVilla } from "@/lib/villas";

export const metadata: Metadata = { title: "Reserve Your Stay" };

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const steps = [
  {
    n: "01",
    name: "Itinerary",
    title: "Dates & Occupancy",
    status: "Confirmed",
    state: "done",
  },
  {
    n: "02",
    name: "Sanctuary Profile",
    title: "Guest Dossier & Touches",
    status: "Active Inscription",
    state: "active",
  },
  {
    n: "03",
    name: "Guarantee",
    title: "Deposit & Finalization",
    status: "Next",
    state: "pending",
  },
] as const;

export default function ReservePage({ searchParams }: Props) {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
      <ReserveContent searchParams={searchParams} />
    </Suspense>
  );
}

async function ReserveContent({ searchParams }: Props) {
  const sp = await searchParams;
  const slug = Array.isArray(sp.villa) ? sp.villa[0] : sp.villa;
  const villa = getVilla(slug) ?? defaultVilla;
  const stay = readStayParams(sp, villa.maxGuests);

  return (
    <>
      {/* Ribbon */}
      <div className="w-full bg-cream-dark px-5 py-1.5 md:px-8 lg:px-14">
        <div className="label-caps mx-auto flex max-w-7xl items-center justify-between tracking-[0.2em] text-ink-soft">
          <div className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 bg-primary" />
            <span>Secure Estate Channel · Encrypted Transaction</span>
          </div>
          <span className="hidden md:inline">Curated Balearic Portfolio</span>
        </div>
      </div>

      <div className="w-full px-5 py-10 md:px-8 lg:px-14 lg:py-[4.5rem]">
        <div className="mx-auto max-w-7xl space-y-10 lg:space-y-[4.5rem]">
          <header className="w-full space-y-6">
            <div className="flex flex-col justify-between gap-3 pb-3 md:flex-row md:items-end">
              <div>
                <span className="label-caps block tracking-[0.25em] text-secondary-700">
                  Acquisition of Residence
                </span>
                <h1 className="heading-display animate-fade-up mt-1 text-5xl text-ink">
                  Reserve {villa.name}
                </h1>
              </div>
              <div className="text-sm text-ink-soft">
                Estimated completion time:{" "}
                <span className="font-medium text-ink">2 minutes</span>
              </div>
            </div>

            <ol className="grid grid-cols-1 gap-3 pt-1.5 md:grid-cols-3">
              {steps.map((s) => (
                <li
                  key={s.n}
                  aria-current={s.state === "active" ? "step" : undefined}
                  className={`flex flex-col gap-1.5 p-3 ${s.state === "active" ? "bg-cream-dark" : "bg-primary-50"} ${
                    s.state === "pending" ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`label-caps tracking-[0.2em] ${s.state === "active" ? "font-medium text-primary" : "text-ink-soft"}`}
                    >
                      Step {s.n} / {s.name}
                    </span>
                    {s.state === "done" && (
                      <CheckCircle2
                        size={16}
                        strokeWidth={1.5}
                        className="text-primary"
                        fill="none"
                      />
                    )}
                    {s.state === "active" && (
                      <span className="h-2 w-2 animate-ping bg-primary" />
                    )}
                    {s.state === "pending" && (
                      <Lock
                        size={16}
                        strokeWidth={1.5}
                        className="text-ink-muted"
                      />
                    )}
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-base text-ink">
                      {s.title}
                    </span>
                    <span
                      className={`label-caps tracking-wide ${s.state === "done" ? "text-secondary-700" : s.state === "active" ? "text-primary" : "text-ink-soft"}`}
                    >
                      {s.status}
                    </span>
                  </div>
                  <div
                    className={`mt-1 h-0.5 w-full ${s.state === "pending" ? "bg-cream-dark" : "bg-primary"}`}
                  />
                </li>
              ))}
            </ol>
          </header>

          <ReserveForm
            villa={{
              slug: villa.slug,
              name: villa.name,
              image: villa.summaryImage ?? villa.image,
              imageAlt: villa.imageAlt,
              price: villa.price,
              beds: villa.beds,
              area: villa.area,
            }}
            stay={stay}
          />
        </div>
      </div>
    </>
  );
}

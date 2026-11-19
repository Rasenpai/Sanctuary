import { Icon, type IconKey } from "./icons";

type TransitOption = {
  title: string;
  description: string;
  icon: IconKey;
};

const TRANSIT_OPTIONS: TransitOption[] = [
  {
    title: "25 Minutes from Airport",
    description:
      "Direct access via scenic mountain pass from Palma International (PMI).",
    icon: "plane",
  },
  {
    title: "Complimentary Silent Transfers",
    description:
      "Chauffeured in Sanctuary's dedicated fleet of silent electric SUVs with luggage service.",
    icon: "car",
  },
  {
    title: "Private Deepwater Mooring",
    description:
      "Private tender service available directly to your villa for maritime arrivals.",
    icon: "anchor",
  },
];

const MAP_EMBED_URL =
  "https://www.google.com/maps?q=39.5667,2.3833&z=13&output=embed";

export default function Arrival() {
  return (
    <section id="arrival" className="bg-cream">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-14 px-6 py-24 sm:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:px-12 lg:py-28">
        <div className="max-w-md">
          <p className="label-caps !text-[0.5625rem] text-secondary-700">
            Geography &amp; Transit
          </p>
          <h2 className="heading-display mt-3 text-[clamp(2rem,3.4vw,2.9rem)] text-ink">
            Arrival &amp; Coastal Seclusion
          </h2>
          <p className="mt-5 text-[0.8rem] leading-relaxed text-ink-soft">
            Tucked away on the secluded southwestern tip of the island at Cala
            d&apos;Oliva, Sanctuary remains utterly peaceful yet effortlessly
            reachable.
          </p>

          <ul className="mt-8 space-y-6">
            {TRANSIT_OPTIONS.map(({ title, description, icon }) => (
              <li key={title} className="flex gap-4">
                <span className="mt-0.5 text-ink">
                  <Icon name={icon} size={18} />
                </span>
                <div>
                  <h3 className="font-display text-[1rem] text-ink">{title}</h3>
                  <p className="mt-1 text-[0.7rem] leading-relaxed text-ink-soft">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="label-caps mt-10 inline-flex items-center gap-2 border-b border-ink pb-1 !text-[0.5625rem] text-ink transition-opacity hover:opacity-60"
          >
            Coordinate private arrival
            <Icon name="arrowRight" size={12} strokeWidth={2} />
          </a>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden shadow-[0_20px_50px_-20px_rgba(41,41,35,0.3)] lg:aspect-[16/11]">
          <iframe
            src={MAP_EMBED_URL}
            title="Map of Sanctuary Estate Grounds at Cala d'Oliva"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
          <div className="pointer-events-none absolute left-5 top-5 max-w-[16rem] bg-paper/95 p-4 shadow-md">
            <p className="label-caps flex items-center gap-2 !text-[0.5rem] text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              Sanctuary Estate Grounds
            </p>
            <p className="mt-2 text-[0.7rem] leading-relaxed text-ink-soft">
              Camí de Son Borrás, Km 4.2 · S&apos;Arracó Coastal Reserve
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

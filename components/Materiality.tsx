type Detail = {
  title: string;
  material: string;
  image: string;
  imageAlt: string;
};

const DETAILS: Detail[] = [
  {
    title: "Master Suite Linen",
    material: "Belgian Unbleached Flax",
    image: "/images/master-suite-linen.jpg",
    imageAlt: "Unbleached linen bedding and draped curtain in a sunlit suite",
  },
  {
    title: "Hand-carved Stone Shower",
    material: "Santanyí Monolith Limestone",
    image: "/images/stone-shower.jpg",
    imageAlt: "Shower carved from a single block of rough limestone",
  },
  {
    title: "Twilight Poolside",
    material: "Dark Basalt & Thermal Water",
    image: "/images/twilight-poolside.jpg",
    imageAlt: "Infinity pool glowing at dusk above the coastline",
  },
  {
    title: "Cloistered Olive Garden",
    material: "Centenary Olea Europaea",
    image: "/images/olive-garden.jpg",
    imageAlt: "Courtyard garden shaded by centuries-old olive trees",
  },
];

export default function Materiality() {
  return (
    <section id="materiality" className="bg-cream">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label-caps !text-[0.5625rem] text-secondary-700">
              Materiality
            </p>
            <h2 className="heading-display mt-3 text-[clamp(2rem,3.4vw,2.9rem)] text-ink">
              Tactile Details Monograph
            </h2>
          </div>
          <p className="label-caps !text-[0.5625rem] text-secondary-700">
            Archival Series 04 / 2025
          </p>
        </header>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DETAILS.map((detail) => (
            <li key={detail.title} className="bg-white p-2 pb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={detail.image}
                alt={detail.imageAlt}
                className="aspect-square w-full object-cover"
              />
              <h3 className="heading-display mt-3 px-0.5 text-[1.05rem] leading-tight text-ink">
                {detail.title}
              </h3>
              <p className="label-caps mt-1.5 px-0.5 !text-[0.5rem] text-ink-soft">
                {detail.material}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

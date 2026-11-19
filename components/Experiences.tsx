type Experience = {
  title: string;
  image: string;
  imageAlt: string;
  description: string;
};

const EXPERIENCES: Experience[] = [
  {
    title: "In-Villa Floating Breakfast",
    image: "/images/floating-breakfast.jpg",
    imageAlt:
      "Floating breakfast tray with figs and fresh juice on a private pool",
    description:
      "Artisanal Balearic morning harvests floated quietly to your private plunge pool at your preferred hour.",
  },
  {
    title: "Sundown Sound Baths",
    image: "/images/sound-baths.jpg",
    imageAlt: "Guests seated with singing bowls on a clifftop terrace at dusk",
    description:
      "Acoustic frequencies played across the open coastal cliffside as dusk settles over the western archipelago.",
  },
  {
    title: "Farmed-to-Table Feast",
    image: "/images/farmed-feast.jpg",
    imageAlt:
      "Long communal dinner table set under string lights in an olive orchard",
    description:
      "Seven courses prepared over olive wood embers using ingredients cultivated entirely in our estate orchard.",
  },
  {
    title: "Guided Coastal Walking",
    image: "/images/coastal-walking.jpg",
    imageAlt: "Rocky coastal trail overlooking turquoise coves",
    description:
      "Private naturalist-led trail exploration discovering secret maritime coves, sea grottos, and ancient watchtowers.",
  },
];

const formatRitualNumber = (index: number) =>
  String(index + 1).padStart(2, "0");

export default function Experiences() {
  return (
    <section id="experiences" className="bg-paper">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-24 sm:px-10 lg:px-12 lg:py-28">
        <header className="max-w-lg">
          <p className="label-caps !text-[0.5625rem] text-secondary-700">
            Bespoke Engagements
          </p>
          <h2 className="heading-display mt-3 text-[clamp(2rem,3.4vw,2.9rem)] text-ink">
            Curated Experiences
          </h2>
          <p className="mt-4 text-[0.8rem] leading-relaxed text-ink-soft">
            Quiet rituals designed to immerse the senses in Balearic heritage,
            maritime stillness, and conscious nourishment.
          </p>
        </header>

        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERIENCES.map((experience, index) => (
            <li key={experience.title}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={experience.image}
                alt={experience.imageAlt}
                className="aspect-[4/5] w-full object-cover"
              />
              <p className="label-caps mt-5 !text-[0.5625rem] text-ink-soft">
                Ritual {formatRitualNumber(index)}
              </p>
              <h3 className="heading-display mt-2 text-[1.35rem] leading-[1.2] text-ink">
                {experience.title}
              </h3>
              <p className="mt-2 text-[0.75rem] leading-relaxed text-ink-soft">
                {experience.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

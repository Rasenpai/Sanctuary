import { Icon } from "./icons";

const PARAGRAPHS = [
  "Set across fifteen acres of wild heritage olive terraces and raw limestone ridges, Sanctuary is a quiet refusal of acceleration. Here, days are paced by shifting coastal sun, natural thermal breezes, and spaces deliberately proportioned to instill silent clarity.",
  "Constructed using dry-stone masonry sourced directly from our inland quarry, every pavilion remains naturally tempered, dissolving the threshold between sheltered domestic repose and the wild Mediterranean flora.",
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="bg-paper">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-16 px-6 py-24 sm:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24 lg:px-12 lg:py-32">
        <div className="max-w-md">
          <p className="label-caps !text-[0.625rem] text-secondary-700">
            Monograph N° 01 · Stillness
          </p>

          <blockquote className="heading-display mt-8 text-[clamp(2rem,3.4vw,2.9rem)] italic leading-[1.12] text-ink">
            “We believe true luxury is unhurried time in spaces that breathe.”
          </blockquote>

          <div className="mt-8 space-y-6 text-[0.9rem] leading-relaxed text-ink-soft">
            {PARAGRAPHS.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <a href="#sanctuaries" className="...">
            Explore our philosophy
            <Icon name="arrowRight" size={12} strokeWidth={2} />
          </a>
        </div>

        <figure className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/philosophy.jpg"
            alt="Rustic wooden table with a cast-iron teapot beside a limestone window overlooking olive groves"
            className="aspect-[4/5] w-full object-cover shadow-[0_20px_50px_-20px_rgba(41,41,35,0.3)]"
          />
          <figcaption className="mt-6 max-w-xs border-l border-ink bg-white p-5 shadow-[0_14px_40px_-14px_rgba(41,41,35,0.3)] lg:absolute lg:-bottom-10 lg:-left-16 lg:mt-0">
            <p className="label-caps !text-[0.5625rem] text-ink-soft">
              Morning Ritual
            </p>
            <p className="mt-2 text-[0.75rem] italic leading-relaxed text-ink-soft">
              “Infusions of wild mountain thyme and dried sage, gathered daily
              at sunrise from our private botanical terraces.”
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

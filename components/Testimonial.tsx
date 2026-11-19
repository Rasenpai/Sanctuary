import { Icon } from "./icons";

const PUBLICATIONS = [
  "Architectural Digest",
  "Condé Nast Traveler Gold List",
  "Cereal City Guide",
];

export default function Testimonial() {
  return (
    <section id="testimonial" className="bg-paper">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-20 text-center sm:px-10 lg:py-24">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-dark text-ink">
          <Icon name="quote" size={18} />
        </span>

        <blockquote className="heading-display mt-8 text-[clamp(1.7rem,3.2vw,2.6rem)] italic leading-[1.28] text-ink">
          “There is a profound stillness here that recalibrates the mind.
          Watching the morning mist clear over the limestone reflection pool
          with espresso in hand is something we carry with us long after
          departure.”
        </blockquote>

        <p className="mt-8 font-display text-[1rem] text-ink">
          Clare &amp; Julian M.
        </p>
        <p className="label-caps mt-1.5 !text-[0.5rem] text-ink-soft">
          Residents of Villa Serein · Featured in Architectural Digest
        </p>

        <ul className="label-caps mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 !text-[0.5rem] text-ink-muted">
          {PUBLICATIONS.map((publication) => (
            <li key={publication}>{publication}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

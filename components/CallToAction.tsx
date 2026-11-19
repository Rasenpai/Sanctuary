import type { ComponentType } from "react";
import { Icon, type IconKey } from "./icons";

type Assurance = {
  label: string;
  icon: IconKey;
  size: number;
};

const ASSURANCES: Assurance[] = [
  { label: "Flexible Rescheduling", icon: "checkCircle", size: 12 },
  { label: "Complete Architectural Seclusion", icon: "lock", size: 12 },
  { label: "100% Solar & Geothermal Powered", icon: "leaf", size: 14 },
];

export default function CallToAction() {
  return (
    <section id="reserve" className="bg-paper">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-24 text-center sm:px-10 lg:py-28">
        <p className="label-caps !text-[0.5rem] text-secondary-700">
          An Unhurried Horizon Awaits
        </p>
        <h2 className="heading-display mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)] text-ink">
          Your Escape Is Closer Than You Think.
        </h2>
        <p className="mt-6 max-w-lg text-[0.85rem] leading-relaxed text-ink-soft">
          Inquire about private residence dates, full sanctuary buyouts, or
          seasonal wellness sabbaticals with our resident concierge.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#"
            className="label-caps bg-tertiary px-8 py-4 !text-[0.625rem] text-white transition-colors hover:bg-tertiary-hover"
          >
            Reserve Your Villa
          </a>
          <a
            href="#"
            className="label-caps border border-ink px-8 py-4 !text-[0.625rem] text-ink transition-colors hover:bg-ink hover:text-white"
          >
            Speak With Concierge
          </a>
        </div>

        <ul className="label-caps mt-14 flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-cream-dark pt-8 !text-[0.5rem] text-ink-soft">
          {ASSURANCES.map(({ label, icon, size }) => (
            <li key={label} className="flex items-center gap-2">
              <Icon name={icon} size={size} />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

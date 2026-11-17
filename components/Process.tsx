import { processSteps } from "@/config/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative bg-surface/40 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="process-title"
          eyebrow="Our Process"
          title="How We Bring Your Ideas to Life."
        />

        <ol className="relative mt-14 grid gap-6 md:grid-cols-4">
          {/* connecting line (desktop) */}
          <div
            aria-hidden
            className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 md:block"
          />
          {processSteps.map((s, i) => (
            <li key={s.step} className="relative">
              <Reveal delay={i * 0.1} className="h-full">
                <div className="flex gap-5 md:block md:text-center">
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-bg font-display text-lg font-bold text-accent shadow-[0_0_28px_-8px_rgb(139_234_69_/_0.6)] md:mx-auto">
                    {s.step}
                  </span>
                  <div className="md:mt-6">
                    <h3 className="font-display text-xl font-semibold uppercase tracking-wide">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { Gem, Lightbulb, Palette, Smile } from "lucide-react";
import { values } from "@/config/site";
import { Reveal } from "./Reveal";

const valueIcons = [Palette, Gem, Lightbulb, Smile];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-20 sm:py-28">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">About Us</p>
          <h2 id="about-title" className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Creativity Meets <span className="text-gradient">Innovation.</span>
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              EPIC STUDIO is an independent creative studio founded by two passionate creators. We help individuals,
              businesses, brands, and organizations communicate their ideas through impactful visual content.
            </p>
            <p>Our mission is simple: turn ordinary ideas into extraordinary creative experiences.</p>
            <p>
              We believe every brand has a story worth telling. Our job is to make that story visually unforgettable.
            </p>
          </div>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2">
          {values.map((v, i) => {
            const Icon = valueIcons[i] ?? Palette;
            return (
              <li key={v.title}>
                <Reveal delay={i * 0.08} className="h-full">
                  <div className="h-full rounded-3xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <Icon size={22} aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{v.text}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

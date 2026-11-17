"use client";

import { ArrowUpRight } from "lucide-react";
import { services } from "@/config/services";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { useEnquiry } from "./EnquiryContext";

export function Services() {
  const { startProject } = useEnquiry();

  return (
    <section id="services" aria-labelledby="services-title" className="relative bg-surface/40 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="What We Create For You."
          description="Pick a service and tell us about your project. We'll take it from idea to delivery."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.id}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_0_40px_-12px_rgb(139_234_69_/_0.4)] sm:p-7">
                    <div className="flex items-start justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-bg">
                        <Icon size={24} aria-hidden />
                      </span>
                      <span className="font-display text-sm font-semibold text-line transition group-hover:text-accent/70">
                        {s.number}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted sm:text-base">{s.description}</p>
                    <button
                      type="button"
                      onClick={() => startProject(s.title)}
                      aria-label={`Get this service: ${s.title}`}
                      className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-semibold text-white transition hover:border-accent hover:bg-accent hover:text-bg"
                    >
                      Get This Service <ArrowUpRight size={16} aria-hidden />
                    </button>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

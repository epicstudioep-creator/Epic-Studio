"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import {
  portfolioCategories,
  portfolioItems,
  type PortfolioCategory,
  type PortfolioItem,
} from "@/config/portfolio";
import { SectionHeading } from "./SectionHeading";

type Filter = "All" | PortfolioCategory;

function SampleBadge() {
  return (
    <span className="rounded-full border border-accent/40 bg-bg/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-accent backdrop-blur">
      Sample placeholder
    </span>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<PortfolioItem | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const items = filter === "All" ? portfolioItems : portfolioItems.filter((i) => i.category === filter);

  useEffect(() => {
    if (!active) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastTrigger.current?.focus();
    };
  }, [active]);

  const thumb = (i: PortfolioItem) => i.poster ?? i.src ?? "";
  const hasSampleItems = portfolioItems.some((i) => i.sample);

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="portfolio-title"
          eyebrow="Portfolio"
          title="Our Creative Showcase."
          description="Explore some of our creative work."
        />

        {hasSampleItems && (
          <p className="mx-auto mt-6 max-w-xl rounded-2xl border border-line bg-surface px-4 py-3 text-center text-sm text-muted">
            The tiles below are <span className="text-accent">sample placeholders</span>, not completed client work.
            Our real projects will appear here soon.
          </p>
        )}

        <div role="group" aria-label="Filter portfolio by category" className="-mx-4 mt-10 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
            {portfolioCategories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                  filter === c
                    ? "border-accent bg-accent text-bg"
                    : "border-line text-muted hover:border-accent/50 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    lastTrigger.current = e.currentTarget;
                    setActive(item);
                  }}
                  aria-label={`Preview ${item.title}${item.sample ? " (sample placeholder)" : ""}`}
                  className="group relative block aspect-[4/3] w-full overflow-hidden rounded-3xl border border-line bg-surface text-left transition hover:border-accent/60"
                >
                  <Image
                    src={thumb(item)}
                    alt={item.alt}
                    fill
                    unoptimized={thumb(item).endsWith(".svg")}
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />
                  {item.type === "video" && (
                    <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-bg shadow-lg transition group-hover:scale-110">
                      <Play size={22} fill="currentColor" aria-hidden />
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-accent">{item.category}</p>
                      <p className="font-display text-lg font-semibold">{item.title}</p>
                    </div>
                    {item.sample && <SampleBadge />}
                  </div>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <button
              ref={closeRef}
              type="button"
              aria-label="Close preview"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-white"
            >
              <X size={20} aria-hidden />
            </button>
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl overflow-hidden rounded-3xl border border-line bg-surface"
            >
              <div className="relative flex aspect-[4/3] w-full items-center justify-center bg-black sm:aspect-video">
                {active.type === "video" && active.src ? (
                  <video
                    src={active.src}
                    poster={active.poster}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <>
                    <Image
                      src={active.type === "video" ? (active.poster ?? "") : (active.src ?? "")}
                      alt={active.alt}
                      fill
                      unoptimized
                      sizes="(min-width:768px) 768px, 100vw"
                      className="object-contain"
                    />
                    {active.type === "video" && (
                      <p className="absolute inset-x-4 bottom-4 rounded-xl bg-bg/90 px-4 py-3 text-center text-sm text-muted">
                        Video placeholder. Add a video file in <code className="text-accent">config/portfolio.ts</code> to
                        enable playback here.
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="flex items-center justify-between gap-3 p-4 sm:p-5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-accent">{active.category}</p>
                  <p className="font-display text-lg font-semibold">{active.title}</p>
                </div>
                {active.sample && <SampleBadge />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clapperboard, Image as ImageIcon, PenTool, Sparkles } from "lucide-react";
import { Logo } from "./Logo";
import { useEnquiry } from "./EnquiryContext";

const floaters = [
  { Icon: PenTool, label: "Posters", className: "left-0 top-6 sm:-left-4", delay: 0 },
  { Icon: Clapperboard, label: "Video", className: "right-0 top-16 sm:-right-4", delay: 0.8 },
  { Icon: Sparkles, label: "Branding", className: "bottom-10 left-2 sm:-left-6", delay: 1.6 },
  { Icon: ImageIcon, label: "Thumbnails", className: "bottom-2 right-4 sm:-right-2", delay: 2.4 },
];

export function Hero() {
  const reduce = useReducedMotion();
  const { startProject } = useEnquiry();

  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* background effects */}
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[110px]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-4 pb-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:px-8 lg:pb-28">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Creative Studio | Now Accepting Projects
          </motion.p>

          <motion.h1
            id="hero-title"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            We Make Your <span className="text-gradient">Ideas Epic.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            From eye-catching posters to cinematic videos, we transform your ideas into creative digital experiences
            that make your brand stand out.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <button
              type="button"
              onClick={() => startProject()}
              className="glow-sm group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-bg transition hover:bg-accent-2"
            >
              Start a Project
              <ArrowRight size={18} aria-hidden className="transition group-hover:translate-x-1" />
            </button>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-full border border-line bg-surface/60 px-7 py-3.5 font-semibold text-white transition hover:border-accent/60 hover:text-accent"
            >
              Explore Our Work
            </a>
          </motion.div>
        </div>

        {/* visual composition */}
        <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center sm:max-w-md">
          <motion.div
            aria-hidden
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-dashed border-accent/30"
          />
          <div aria-hidden className="absolute inset-12 rounded-full border border-line" />
          <div className="relative flex items-center justify-center rounded-[2rem] border border-line bg-surface/80 px-8 py-10 shadow-[0_0_60px_-15px_rgb(139_234_69_/_0.45)] backdrop-blur">
            <Logo size={84} />
          </div>

          {floaters.map(({ Icon, label, className, delay }) => (
            <motion.div
              key={label}
              aria-hidden
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
              className={`absolute flex items-center gap-2 rounded-full border border-line bg-bg/90 px-3 py-2 text-xs font-medium text-white/90 backdrop-blur ${className}`}
            >
              <Icon size={14} className="text-accent" />
              {label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

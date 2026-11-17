import Image from "next/image";
import { siteConfig } from "@/config/site";

type LogoProps = {
  /** Height of the planet mark in px. */
  size?: number;
  /** Show the EPIC / STUDIO wordmark next to the mark. */
  wordmark?: boolean;
};

/**
 * EPIC STUDIO logo.
 * If siteConfig.logoSrc is set (e.g. "/logo.png"), the real logo file is used.
 * Otherwise an SVG recreation is rendered: black planet with a ring,
 * neon-green EPIC and STUDIO (white on the dark theme so it stays legible).
 */
export function Logo({ size = 40, wordmark = true }: LogoProps) {
  if (siteConfig.logoSrc) {
    return (
      <Image
        src={siteConfig.logoSrc}
        alt={`${siteConfig.name} logo`}
        width={size * 4}
        height={size}
        priority
        style={{ height: size, width: "auto" }}
      />
    );
  }

  return (
    <span className="inline-flex items-center gap-2.5" role="img" aria-label={siteConfig.name}>
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <radialGradient id="planet" cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#1d231d" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
        </defs>
        {/* back half of the ring */}
        <ellipse
          cx="32"
          cy="32"
          rx="30"
          ry="9.5"
          fill="none"
          stroke="#8BEA45"
          strokeWidth="3"
          transform="rotate(-20 32 32)"
        />
        <circle cx="32" cy="32" r="17" fill="url(#planet)" stroke="#8BEA45" strokeWidth="1.5" />
        {/* front half of the ring */}
        <path
          d="M5.2 39.7C14 45.5 42 46 58.8 24.3"
          fill="none"
          stroke="#8BEA45"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      {wordmark && (
        <span className="flex flex-col font-display font-extrabold uppercase leading-none tracking-tight">
          <span className="text-accent" style={{ fontSize: size * 0.5 }}>
            Epic
          </span>
          <span className="text-white" style={{ fontSize: size * 0.34, letterSpacing: "0.22em" }}>
            Studio
          </span>
        </span>
      )}
    </span>
  );
}

import { Instagram, MessageCircle } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";
import { whatsappGreetingLink } from "@/lib/enquiry";
import { Logo } from "./Logo";

const footerServices = ["Poster Design", "Video Editing", "Branding", "Social Media Design"];

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <Logo size={40} />
          <p className="mt-4 text-sm text-muted">&ldquo;{siteConfig.tagline}&rdquo;</p>
        </div>

        <nav aria-label="Quick links">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest">Quick Links</h2>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-muted transition hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest">Our Services</h2>
          <ul className="mt-4 space-y-2.5">
            {footerServices.map((s) => (
              <li key={s}>
                <a href="#services" className="text-sm text-muted transition hover:text-accent">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest">Social Links</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
              >
                <Instagram size={16} aria-hidden /> Instagram
              </a>
            </li>
            <li>
              <a
                href={whatsappGreetingLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
              >
                <MessageCircle size={16} aria-hidden /> WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-6 text-center text-xs text-muted">
        © 2026 EPIC STUDIO. All Rights Reserved.
      </div>
    </footer>
  );
}

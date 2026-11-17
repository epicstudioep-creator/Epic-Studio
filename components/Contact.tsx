import { Instagram, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { whatsappGreetingLink } from "@/lib/enquiry";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  const cards = [
    {
      Icon: Instagram,
      label: "Instagram",
      value: `@${siteConfig.instagram.username}`,
      href: siteConfig.instagram.url,
      cta: "Follow on Instagram",
      external: true,
    },
    {
      Icon: MessageCircle,
      label: "WhatsApp",
      value: `+${siteConfig.whatsapp.number}`,
      href: whatsappGreetingLink(),
      cta: "Contact on WhatsApp",
      external: true,
    },
    {
      Icon: Mail,
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      cta: "Send an Email",
      external: false,
    },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-surface/40 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact Us"
          title="Let's Create Something Epic!"
          description="Have an idea, project, or collaboration in mind? We'd love to hear from you."
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map(({ Icon, label, value, href, cta, external }, i) => (
            <li key={label}>
              <Reveal delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-3xl border border-line bg-bg p-6 transition hover:border-accent/50">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon size={24} aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{label}</h3>
                  <p className="mt-1 flex-1 break-all text-muted">{value}</p>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-5 inline-flex items-center justify-center rounded-full border border-line px-5 py-2.5 text-sm font-semibold transition hover:border-accent hover:bg-accent hover:text-bg"
                  >
                    {cta}
                  </a>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

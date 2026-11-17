
import type { Metadata } from "next";

import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { EnquiryProvider } from "@/components/EnquiryContext";
import { Enquiry } from "@/components/Enquiry";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Portfolio } from "@/components/Portfolio";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { WhatsAppButton } from "@/components/WhatsAppButton";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "EPIC STUDIO | Creative Design & Video Editing",
  description:
    "EPIC STUDIO transforms ideas into creative experiences. Explore our poster design, video editing, branding and social media services.",
  openGraph: {
    title: "EPIC STUDIO | Your Vision. Our Creativity.",
    description:
      "Creative designs, professional video editing and branding solutions. Let's make your ideas epic.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    sameAs: [siteConfig.instagram.url],
  };

  // Escape HTML-sensitive characters in JSON-LD.
  const safeJsonLd = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <EnquiryProvider>
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <Enquiry />
        <Contact />
      </main>

      <Footer />

      <WhatsAppButton />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />
    </EnquiryProvider>
  );
}

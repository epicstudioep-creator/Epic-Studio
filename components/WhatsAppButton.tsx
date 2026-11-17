import { MessageCircle } from "lucide-react";
import { whatsappGreetingLink } from "@/lib/enquiry";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappGreetingLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with EPIC STUDIO on WhatsApp"
      className="glow-sm fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-bg transition hover:scale-105 hover:bg-accent-2 sm:bottom-6 sm:right-6"
    >
      <MessageCircle size={26} aria-hidden />
    </a>
  );
}

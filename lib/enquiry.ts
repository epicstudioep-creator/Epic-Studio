import { siteConfig } from "@/config/site";

export type EnquiryData = {
  name: string;
  email: string;
  whatsapp: string;
  service: string;
  description: string;
  budget: string;
  deadline: string;
  reference: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryData, string>>;

export const emptyEnquiry: EnquiryData = {
  name: "",
  email: "",
  whatsapp: "",
  service: "",
  description: "",
  budget: "",
  deadline: "",
  reference: "",
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(d: EnquiryData): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (d.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!emailRe.test(d.email.trim())) e.email = "Please enter a valid email address.";
  const digits = d.whatsapp.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) e.whatsapp = "Enter a valid WhatsApp number with country code.";
  if (!d.service) e.service = "Please choose a service.";
  if (d.description.trim().length < 10) e.description = "Please describe your project (at least 10 characters).";
  if (!d.budget) e.budget = "Please choose a budget range.";
  if (!d.deadline) {
    e.deadline = "Please choose an expected deadline.";
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(d.deadline) < today) e.deadline = "Deadline can't be in the past.";
  }
  if (d.reference.trim()) {
    try {
      const u = new URL(d.reference.trim());
      if (u.protocol !== "http:" && u.protocol !== "https:") throw new Error("bad protocol");
    } catch {
      e.reference = "Enter a full link starting with https://";
    }
  }
  return e;
}

export function buildMessage(d: EnquiryData): string {
  return [
    `New project enquiry — ${siteConfig.name}`,
    "",
    `Name: ${d.name.trim()}`,
    `Email: ${d.email.trim()}`,
    `WhatsApp: ${d.whatsapp.trim()}`,
    `Service: ${d.service}`,
    `Budget: ${d.budget}`,
    `Deadline: ${d.deadline}`,
    `Reference: ${d.reference.trim() || "—"}`,
    "",
    "Project description:",
    d.description.trim(),
  ].join("\n");
}

export const whatsappLink = (text: string) =>
  `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(text)}`;

export const whatsappGreetingLink = () => whatsappLink(siteConfig.whatsapp.greeting);

export const mailtoLink = (subject: string, body: string) =>
  `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

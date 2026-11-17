/**
 * EDIT THIS FILE to update contact details, branding and enquiry behaviour.
 * Values can also be overridden with environment variables (see .env.example).
 */

const PLACEHOLDER_WHATSAPP = "+91 9446062291"; // TODO: replace with your real number
const PLACEHOLDER_EMAIL = "epicstudio.ep@gmail.com"; // TODO: replace with your real email

const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || PLACEHOLDER_WHATSAPP).replace(/\D/g, "");
const email = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || PLACEHOLDER_EMAIL;
const instagramUsername = process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || "epicstudio.designs";

export const siteConfig = {
  name: "EPIC STUDIO",
  tagline: "Your Vision. Our Creativity.",
  description:
    "EPIC STUDIO is a creative studio for poster design, video editing, logo & branding, social media design, thumbnails and promotional videos. Start a project today.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://epicstudio.example",

  /**
   * Logo: drop your real logo in /public (e.g. /public/logo.png) and set
   * logoSrc to "/logo.png". While null, a built-in SVG recreation is used.
   */
  logoSrc: null as string | null,

  instagram: {
    username: instagramUsername,
    url: `https://instagram.com/${instagramUsername}`,
  },

  whatsapp: {
    number: whatsappNumber,
    greeting: "Hi EPIC STUDIO! I'd like to discuss a project.",
  },

  email,

  /**
   * How enquiries are delivered. The site has no backend, so the form
   * prepares a message that the visitor sends themselves:
   *  - "whatsapp": opens WhatsApp with the enquiry pre-filled
   *  - "email":    opens the visitor's email app with the enquiry pre-filled
   *  - "both":     offers both after validation (WhatsApp opens first)
   */
  enquiryMethod: "both" as "whatsapp" | "email" | "both",

  /** True while contact details are still the placeholders above. */
  usingPlaceholderContact:
    whatsappNumber === PLACEHOLDER_WHATSAPP || email === PLACEHOLDER_EMAIL,
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export const values = [
  { title: "Creativity", text: "Fresh, original ideas shaped around your story." },
  { title: "Quality", text: "Careful craft in every frame, pixel and detail." },
  { title: "Innovation", text: "Modern techniques and trends, used with purpose." },
  { title: "Client Satisfaction", text: "Your vision stays at the centre of the work." },
];

export const processSteps = [
  { step: "01", title: "Discuss", text: "Tell us your idea, requirements, and expectations." },
  { step: "02", title: "Plan", text: "We understand your project and prepare a creative direction." },
  { step: "03", title: "Create", text: "Our creative team works on your project." },
  { step: "04", title: "Deliver", text: "We deliver your completed creative work." },
];

export const budgetOptions = [
  "Under ₹500",
  "₹500–₹1,000",
  "₹1,000–₹3,000",
  "₹3,000–₹5,000",
  "₹5,000+",
  "Discuss My Budget",
];

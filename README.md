# EPIC STUDIO — Creative Agency Website

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide icons.

A single-page, mobile-first, dark/neon-green site for a freelance creative studio: Home, About, Services,
Portfolio, Process, Get a Quote (enquiry form), Contact, plus a custom 404, SEO/Open Graph metadata and a favicon.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # optional
npm run build && npm start
```

Requires Node.js 20.9+ (22 recommended).

## 1. Set your contact details (do this first)

Edit **`config/site.ts`** or set environment variables (copy `.env.example` to `.env.local`):

| What | Config | Env var |
|---|---|---|
| WhatsApp number (digits only, with country code, e.g. `919876543210`) | `PLACEHOLDER_WHATSAPP` | `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| Business email | `PLACEHOLDER_EMAIL` | `NEXT_PUBLIC_BUSINESS_EMAIL` |
| Instagram username | `instagramUsername` | `NEXT_PUBLIC_INSTAGRAM_USERNAME` |
| Live site URL (for SEO / Open Graph) | `url` | `NEXT_PUBLIC_SITE_URL` |

> The WhatsApp number and email are **placeholders** until you replace them. Every WhatsApp/email button on the
> site uses them, so replace them before going live.

## 2. Add your real logo

The site currently renders an SVG recreation of the logo (black planet with ring, neon EPIC, STUDIO).
To use your original artwork:

1. Put the file in `public/` (e.g. `public/logo.png`, transparent background recommended).
2. In `config/site.ts` set `logoSrc: "/logo.png"`.
3. Replace `app/icon.svg` (favicon) with your own `icon.png`/`icon.svg` (Next.js picks it up automatically).
4. Optional: replace the generated social preview by adding `app/opengraph-image.png` (delete `opengraph-image.tsx`).

## 3. Add your portfolio

Edit **`config/portfolio.ts`** (instructions are at the top of the file):

1. Copy images/videos into `public/portfolio/`.
2. Add an entry (copy an existing one) with `sample: false`.
3. Delete the six `sample: true` placeholders. While any sample entries exist, the section shows a notice that they are
   placeholders and each tile carries a "Sample placeholder" badge.

Videos: `type: "video"`, `src: "/portfolio/clip.mp4"`, `poster: "/portfolio/clip.jpg"`.

## 4. Other editable content

| Content | File |
|---|---|
| Services (title, text, icon) | `config/services.ts` |
| Budget options, process steps, values, nav links | `config/site.ts` |
| Page copy (hero, about, etc.) | `components/Hero.tsx`, `components/About.tsx`, … |
| Colors | `app/globals.css` (`@theme` block) |

## How the enquiry form works (important)

This site has **no backend**, so it does not store or email enquiries by itself. On submit it:

1. Validates every required field (name, email, WhatsApp, service, description, budget, deadline, optional reference URL).
2. Builds a formatted message and opens WhatsApp with it pre-filled (`wa.me`).
3. Shows a confirmation panel with the message plus **Send on WhatsApp**, **Send by Email** and **Copy message**
   buttons, so nothing the visitor typed is lost if a popup is blocked.

The enquiry reaches you when the visitor presses send in WhatsApp/their email app. Change delivery with
`enquiryMethod` in `config/site.ts` (`"whatsapp"`, `"email"` or `"both"`).

To receive enquiries without the visitor sending a message, connect a form service (Formspree, Resend, Web3Forms…)
by posting `values` to it inside `onSubmit` in `components/Enquiry.tsx`.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project →** import the repo (framework: Next.js is auto-detected).
3. Add the environment variables from `.env.example`.
4. Deploy. Then set `NEXT_PUBLIC_SITE_URL` to your final domain and redeploy.

## Project structure

```
app/            layout, page, 404, loading, favicon, Open Graph image, global styles
components/     Navbar, Hero, About, Services, Portfolio, Process, Enquiry, Contact, Footer, …
config/         site.ts · services.ts · portfolio.ts   (all editable content)
lib/enquiry.ts  validation + WhatsApp/email message builders
public/portfolio/  sample placeholder images (replace with your work)
```

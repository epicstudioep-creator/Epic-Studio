import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
      />
      <div className="relative">
        <Logo size={64} />
        <p className="mt-10 font-display text-7xl font-bold text-gradient sm:text-8xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">This page drifted out of orbit.</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back to the studio.
        </p>
        <Link
          href="/"
          className="glow-sm mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-bg transition hover:bg-accent-2"
        >
          <ArrowLeft size={18} aria-hidden /> Back to home
        </Link>
      </div>
    </main>
  );
}

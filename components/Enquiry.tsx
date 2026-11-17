"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Copy, Loader2, Mail, MessageCircle, Send } from "lucide-react";
import { budgetOptions, siteConfig } from "@/config/site";
import { serviceOptions } from "@/config/services";
import {
  buildMessage,
  emptyEnquiry,
  mailtoLink,
  validateEnquiry,
  whatsappLink,
  type EnquiryData,
  type EnquiryErrors,
} from "@/lib/enquiry";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { useEnquiry } from "./EnquiryContext";

const inputCls =
  "w-full rounded-xl border bg-bg px-4 py-3 text-base text-white placeholder:text-muted/60 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

type FieldProps = {
  id: keyof EnquiryData;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: (p: { id: string; invalid: boolean; describedBy?: string }) => React.ReactNode;
};

function Field({ id, label, required, error, hint, children }: FieldProps) {
  const errId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-white/90">
        {label}
        {required ? <span className="text-accent"> *</span> : <span className="text-muted"> (optional)</span>}
      </label>
      {children({ id, invalid: !!error, describedBy })}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errId} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-red-400">
          <AlertCircle size={14} aria-hidden /> {error}
        </p>
      )}
    </div>
  );
}

export function Enquiry() {
  const { service, nonce } = useEnquiry();
  const [values, setValues] = useState<EnquiryData>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "prepared">("idle");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [today, setToday] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const d = new Date();
    setToday(new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10));
  }, []);

  // Preselect the service when a "Get This Service" button is used.
  useEffect(() => {
    if (nonce > 0 && service) {
      setValues((v) => ({ ...v, service }));
      setErrors((e) => ({ ...e, service: undefined }));
      setStatus("idle");
    }
  }, [service, nonce]);

  const set =
    (key: keyof EnquiryData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const subject = `New project enquiry: ${values.service || "EPIC STUDIO"}`;
  const waHref = whatsappLink(message);
  const mailHref = mailtoLink(subject, message);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      setStatus("idle");
      formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }

    setStatus("submitting");
    const text = buildMessage(values);
    setMessage(text);
    // Short deliberate delay so the loading state is visible and the UI doesn't flash.
    window.setTimeout(() => {
      setStatus("prepared");
      if (siteConfig.enquiryMethod !== "email") {
        window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
      } else {
        window.location.href = mailtoLink(`New project enquiry: ${values.service}`, text);
      }
    }, 600);
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const showWhatsApp = siteConfig.enquiryMethod !== "email";
  const showEmail = siteConfig.enquiryMethod !== "whatsapp";
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <section id="enquiry" aria-labelledby="enquiry-title" className="relative py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]"
      />
      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="enquiry-title"
          eyebrow="Get a Quote"
          title="Have a Project in Mind?"
          description="Let's turn your idea into something epic. Tell us what you need, and let's get started."
        />

        <Reveal delay={0.1} className="mt-10">
          <div className="rounded-[2rem] border border-line bg-surface p-5 sm:p-8">
            {status === "prepared" ? (
              <div role="status" aria-live="polite" className="text-center">
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <CheckCircle2 size={28} aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold">Your enquiry is ready to send</h3>
                <p className="mx-auto mt-2 max-w-md text-muted">
                  This website doesn&apos;t store enquiries. Press send in {showWhatsApp && showEmail ? "WhatsApp or your email app" : showWhatsApp ? "WhatsApp" : "your email app"} to
                  deliver it to us. If nothing opened, use the buttons below.
                </p>

                <pre className="mx-auto mt-6 max-h-56 max-w-lg overflow-auto whitespace-pre-wrap rounded-2xl border border-line bg-bg p-4 text-left text-sm text-white/80">
                  {message}
                </pre>

                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                  {showWhatsApp && (
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-bg transition hover:bg-accent-2"
                    >
                      <MessageCircle size={18} aria-hidden /> Send on WhatsApp
                    </a>
                  )}
                  {showEmail && (
                    <a
                      href={mailHref}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 font-semibold transition hover:border-accent hover:text-accent"
                    >
                      <Mail size={18} aria-hidden /> Send by Email
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={copyMessage}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 font-semibold transition hover:border-accent hover:text-accent"
                  >
                    <Copy size={18} aria-hidden /> {copied ? "Copied!" : "Copy message"}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm text-muted underline underline-offset-4 hover:text-white"
                >
                  Edit my enquiry
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={errorCount ? "form-errors" : undefined}>
                {errorCount > 0 && (
                  <p
                    id="form-errors"
                    role="alert"
                    className="mb-6 flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                  >
                    <AlertCircle size={16} aria-hidden /> Please fix the {errorCount === 1 ? "highlighted field" : `${errorCount} highlighted fields`} and try again.
                  </p>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="Full Name" required error={errors.name}>
                    {({ id, invalid, describedBy }) => (
                      <input
                        id={id}
                        name={id}
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        onChange={set("name")}
                        aria-invalid={invalid}
                        aria-describedby={describedBy}
                        placeholder="Your name"
                        className={`${inputCls} ${invalid ? "border-red-500/60" : "border-line"}`}
                      />
                    )}
                  </Field>

                  <Field id="email" label="Email Address" required error={errors.email}>
                    {({ id, invalid, describedBy }) => (
                      <input
                        id={id}
                        name={id}
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={values.email}
                        onChange={set("email")}
                        aria-invalid={invalid}
                        aria-describedby={describedBy}
                        placeholder="you@example.com"
                        className={`${inputCls} ${invalid ? "border-red-500/60" : "border-line"}`}
                      />
                    )}
                  </Field>

                  <Field
                    id="whatsapp"
                    label="WhatsApp Number"
                    required
                    error={errors.whatsapp}
                    hint="Include your country code, e.g. +91 98765 43210"
                  >
                    {({ id, invalid, describedBy }) => (
                      <input
                        id={id}
                        name={id}
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        value={values.whatsapp}
                        onChange={set("whatsapp")}
                        aria-invalid={invalid}
                        aria-describedby={describedBy}
                        placeholder="+91 98765 43210"
                        className={`${inputCls} ${invalid ? "border-red-500/60" : "border-line"}`}
                      />
                    )}
                  </Field>

                  <Field id="service" label="Service Required" required error={errors.service}>
                    {({ id, invalid, describedBy }) => (
                      <select
                        id={id}
                        name={id}
                        value={values.service}
                        onChange={set("service")}
                        aria-invalid={invalid}
                        aria-describedby={describedBy}
                        className={`${inputCls} ${invalid ? "border-red-500/60" : "border-line"}`}
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    )}
                  </Field>

                  <div className="sm:col-span-2">
                    <Field id="description" label="Project Description" required error={errors.description}>
                      {({ id, invalid, describedBy }) => (
                        <textarea
                          id={id}
                          name={id}
                          rows={5}
                          value={values.description}
                          onChange={set("description")}
                          aria-invalid={invalid}
                          aria-describedby={describedBy}
                          placeholder="Tell us about your idea, the style you like, sizes, platforms…"
                          className={`${inputCls} resize-y ${invalid ? "border-red-500/60" : "border-line"}`}
                        />
                      )}
                    </Field>
                  </div>

                  <Field id="budget" label="Budget Range" required error={errors.budget}>
                    {({ id, invalid, describedBy }) => (
                      <select
                        id={id}
                        name={id}
                        value={values.budget}
                        onChange={set("budget")}
                        aria-invalid={invalid}
                        aria-describedby={describedBy}
                        className={`${inputCls} ${invalid ? "border-red-500/60" : "border-line"}`}
                      >
                        <option value="">Select a budget</option>
                        {budgetOptions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    )}
                  </Field>

                  <Field id="deadline" label="Expected Deadline" required error={errors.deadline}>
                    {({ id, invalid, describedBy }) => (
                      <input
                        id={id}
                        name={id}
                        type="date"
                        min={today || undefined}
                        value={values.deadline}
                        onChange={set("deadline")}
                        aria-invalid={invalid}
                        aria-describedby={describedBy}
                        className={`${inputCls} [color-scheme:dark] ${invalid ? "border-red-500/60" : "border-line"}`}
                      />
                    )}
                  </Field>

                  <div className="sm:col-span-2">
                    <Field
                      id="reference"
                      label="Reference Link"
                      error={errors.reference}
                      hint="Inspiration, Drive/YouTube link, existing brand assets…"
                    >
                      {({ id, invalid, describedBy }) => (
                        <input
                          id={id}
                          name={id}
                          type="url"
                          inputMode="url"
                          value={values.reference}
                          onChange={set("reference")}
                          aria-invalid={invalid}
                          aria-describedby={describedBy}
                          placeholder="https://"
                          className={`${inputCls} ${invalid ? "border-red-500/60" : "border-line"}`}
                        />
                      )}
                    </Field>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="glow-sm mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold text-bg transition hover:bg-accent-2 disabled:cursor-wait disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" aria-hidden /> Preparing your enquiry…
                    </>
                  ) : (
                    <>
                      <Send size={18} aria-hidden /> Send Project Enquiry
                    </>
                  )}
                </button>
                <p className="mt-4 text-center text-xs text-muted">
                  Your enquiry opens pre-filled in {showWhatsApp && showEmail ? "WhatsApp" : showWhatsApp ? "WhatsApp" : "your email app"} so you can send it to us directly.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

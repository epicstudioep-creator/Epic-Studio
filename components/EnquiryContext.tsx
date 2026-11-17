"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type EnquiryContextValue = {
  /** Service chosen from a service card (or "" if none). */
  service: string;
  /** Increments on every selection so the form reacts even to repeat picks. */
  nonce: number;
  /** Preselect a service and scroll to the enquiry form. */
  startProject: (service?: string) => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState({ service: "", nonce: 0 });

  const startProject = useCallback((service = "") => {
    setState((s) => ({ service, nonce: s.nonce + 1 }));
    const el = document.getElementById("enquiry");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", "#enquiry");
    }
  }, []);

  const value = useMemo(() => ({ ...state, startProject }), [state, startProject]);
  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  return ctx;
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { APP_READY_EVENT } from "@/lib/animation";

export function StartupLoader({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<"loading" | "leaving" | "done">("loading");
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let revealTimer: ReturnType<typeof setTimeout>;
    let exitTimer: ReturnType<typeof setTimeout>;
    let cancelled = false;
    let finished = false;
    const started = performance.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveal = () => {
      if (cancelled || finished) return;
      finished = true;
      revealTimer = setTimeout(() => {
        setPhase("leaving");
        exitTimer = setTimeout(() => setPhase("done"), reducedMotion ? 0 : 360);
      }, Math.max(0, (reducedMotion ? 0 : 900) - (performance.now() - started)));
    };
    const ready = () => {
      const images = Array.from(overlay.current?.querySelectorAll("img") ?? []);
      void Promise.all(images.map(image => image.decode().catch(() => {}))).then(reveal);
    };
    if (document.readyState === "complete") ready();
    else window.addEventListener("load", ready, { once: true });
    // A slow third-party resource must never trap visitors behind the splash.
    const safetyTimer = setTimeout(() => {
      finished = true;
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
      setPhase("done");
    }, 4500);
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") {
        finished = true;
        clearTimeout(revealTimer);
        clearTimeout(exitTimer);
        setPhase("done");
      }
    };
    window.addEventListener("keydown", dismiss);
    return () => {
      cancelled = true;
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
      clearTimeout(safetyTimer);
      window.removeEventListener("load", ready);
      window.removeEventListener("keydown", dismiss);
    };
  }, []);

  useEffect(() => {
    if (phase === "done") window.dispatchEvent(new Event(APP_READY_EVENT));
  }, [phase]);

  if (phase === "done") return null;
  return <div ref={overlay} className={`app-loader${phase === "leaving" ? " is-leaving" : ""}`}>{children}</div>;
}

"use client";

import { animate } from "motion/react";
import { useMotionPreference } from "./use-portfolio-ready";
import { useEffect, useRef, type ReactNode } from "react";

export function AnimatedGradientText({ children, text, play = false }: { children: ReactNode; text: string; play?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useMotionPreference();

  useEffect(() => {
    const root = ref.current;
    if (!root || !play || reduce || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layer = root.querySelector<HTMLElement>(".gradient-color-layer");
    const sweep = root.querySelector<HTMLElement>(".gradient-light-sweep");
    if (!layer || !sweep) return;
    const drift = animate(layer, { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }, {
      duration: 6.5, ease: "easeInOut",
    });
    const light = animate(sweep, {
      backgroundPosition: ["140% 50%", "-40% 50%"],
      opacity: [0, 0.7, 0],
    }, { duration: 1.2, delay: 0.08, ease: "easeInOut" });
    return () => {
      drift.stop();
      light.stop();
      layer.style.removeProperty("background-position");
      sweep.style.removeProperty("background-position");
      sweep.style.removeProperty("opacity");
    };
  }, [play, reduce]);

  return <span ref={ref} className="animated-gradient-text">
    <span className="gradient-color-layer">{children}</span>
    <span className="gradient-light-sweep" aria-hidden="true">{text}</span>
  </span>;
}

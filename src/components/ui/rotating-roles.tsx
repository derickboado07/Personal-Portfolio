"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMotionPreference, usePageVisible, usePortfolioReady } from "./use-portfolio-ready";

const roles = ["Web Developer", "Business Analytics", "Creative Designer", "Video Editor"];

export function RotatingRoles() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const ready = usePortfolioReady();
  const visible = usePageVisible();
  const reduce = useMotionPreference();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!ready || !inView || !visible || reduce || paused ||
      matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex(value => (value + 1) % roles.length), 4300);
    return () => window.clearInterval(timer);
  }, [ready, inView, visible, reduce, paused]);

  return <div ref={ref} className="cinematic-roles" data-hero-role>
    <span className="roles-prefix mono" aria-hidden="true">I WORK ACROSS</span>
    <span className="sr-only">{roles.join(", ")}.</span>
    <span className="roles-window" aria-hidden="true">
      {roles.map(role => <span key={role} className="roles-size">{role}</span>)}
      <AnimatePresence initial={false}>
        <motion.span
          key={index}
          className="roles-current"
          initial={reduce ? false : { y: "100%", opacity: 0, filter: "blur(2px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={reduce ? { opacity: 0 } : { y: "-100%", opacity: 0, filter: "blur(2px)" }}
          transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        >{roles[index]}</motion.span>
      </AnimatePresence>
    </span>
    {ready && !reduce && <button className="roles-toggle" type="button"
      onClick={() => setPaused(value => !value)}
      aria-label={paused ? "Resume role rotation" : "Pause role rotation"}
      aria-pressed={paused}
      title={paused ? "Resume roles" : "Pause roles"}
    >{paused ? <Play size={11} aria-hidden="true" /> : <Pause size={11} aria-hidden="true" />}</button>}
  </div>;
}

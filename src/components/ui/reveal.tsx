"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={{ opacity: 1, y: 0 }} whileInView={reduce ? {} : { opacity: [0.6, 1], y: [20, 0] }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

export function SectionHeading({ number, eyebrow, title, description }: { number: string; eyebrow: string; title: ReactNode; description?: string }) {
  return <Reveal><div className="section-kicker"><span className="kicker-number">{number}</span><span>{eyebrow}</span><span className="kicker-line" /></div><h2 className="section-heading">{title}</h2>{description && <p className="section-description">{description}</p>}</Reveal>;
}

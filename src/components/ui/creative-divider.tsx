"use client";
import { motion, useReducedMotion } from "motion/react";

export function CreativeDivider() {
  const reduce = useReducedMotion();
  return <div className="creative-divider" aria-hidden="true"><motion.div className="divider-motion-line" initial={false} whileInView={reduce ? {} : { scaleX: [0, 1] }} viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} /><div className="container"><span>CODE.</span><i>✳</i><span>DATA.</span><i>✳</i><span>CREATIVITY.</span><span className="divider-tail mono">BUILD THE TOOL. UNDERSTAND THE STORY. MAKE IT CONNECT.</span></div></div>;
}

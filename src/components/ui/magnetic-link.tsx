"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import type { ReactNode, PointerEvent } from "react";

export function MagneticLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 260, damping: 24 });
  const smoothY = useSpring(y, { stiffness: 260, damping: 24 });
  const reduce = useReducedMotion();
  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (reduce || event.pointerType !== "mouse" || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
  }
  return <motion.a href={href} className={className} style={{ x: smoothX, y: smoothY }} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }} onBlur={() => { x.set(0); y.set(0); }}>{children}</motion.a>;
}

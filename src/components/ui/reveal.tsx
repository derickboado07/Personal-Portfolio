"use client";

import { useRef, type ReactNode } from "react";
import { useTextEntrance } from "@/components/ui/use-text-entrance";
import { TextReveal } from "@/components/ui/text-reveal";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useTextEntrance(ref, { delay });
  return <div ref={ref} className={className} data-text-reveal>{children}</div>;
}

export function SectionHeading({ number, eyebrow, title, description }: { number: string; eyebrow: string; title: ReactNode; description?: string }) {
  return (
    <Reveal>
      <div className="section-kicker" data-motion-label><span className="kicker-number">{number}</span><span>{eyebrow}</span><span className="kicker-line" /></div>
      <h2 className="section-heading"><TextReveal>{title}</TextReveal></h2>
      {description && <p className="section-description" data-motion-copy>{description}</p>}
    </Reveal>
  );
}

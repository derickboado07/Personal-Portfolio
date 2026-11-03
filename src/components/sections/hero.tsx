"use client";

import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AnimatedHeadline } from "@/components/ui/animated-headline";
import { MagneticTextButton } from "@/components/ui/magnetic-text-button";
import { RotatingRoles } from "@/components/ui/rotating-roles";
import { useMotionPreference } from "@/components/ui/use-portfolio-ready";
import { useHeroSequence } from "@/components/ui/use-hero-sequence";
import { HeroPortrait } from "./hero-portrait";
import { GalaxyBackground } from "./galaxy-background";
import "./hero-personal.css";

const headline = ["I BUILD", "DIGITAL SOLUTIONS", "THAT MAKE", "WORK SIMPLE."];
const specialties = ["WEB DEVELOPER", "BUSINESS ANALYTICS", "CREATIVE"];

export function Hero() {
  const hero = useRef<HTMLElement>(null);
  const settled = useHeroSequence(hero);
  const reduce = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [0, -14]);

  return (
    <section id="home" tabIndex={-1} ref={hero} className="hero-cinematic" aria-labelledby="hero-heading" data-hero-scope>
      <GalaxyBackground />
      <div className="container cinematic-container">
        <div className="cinematic-topline mono">
          <span>INDEPENDENT MIND. PRACTICAL SOLUTIONS.</span>
        </div>

        <div className="cinematic-grid">
          <motion.div className="cinematic-copy" style={{ y: reduce ? 0 : drift }}>
            <p className="cinematic-eyebrow mono">
              {specialties.map(specialty => <span key={specialty}>{specialty}</span>)}
            </p>
            <AnimatedHeadline id="hero-heading" className="cinematic-headline" lines={headline} settled={settled} />
            <RotatingRoles />
            <p className="cinematic-intro">
              <strong>I’m Derick Boado.</strong> I help turn complex business processes into efficient, functional, and user-friendly digital experiences.
            </p>
            <div className="cinematic-ctas">
              <MagneticTextButton href="#projects" className="button cinematic-primary" label="Explore My Work" icon={<ArrowRight size={17} aria-hidden="true" />} />
              <MagneticTextButton href="#contact" className="button cinematic-secondary" label="Let's Work Together" icon={<ArrowUpRight size={17} aria-hidden="true" />} />
            </div>
            <p className="cinematic-support mono"><span aria-hidden="true" />DEVELOP WITH PURPOSE. CREATE WITH CLARITY.</p>
          </motion.div>

          <HeroPortrait />
        </div>

        <div className="cinematic-footer">
          <a className="cinematic-scroll mono" href="#purpose"><span><ArrowDown size={14} aria-hidden="true" /></span> A LITTLE PURPOSE BEHIND THE PIXELS</a>
          <span className="mono cinematic-footer-note">DEVELOP <i>/</i> ANALYZE <i>/</i> CREATE</span>
        </div>
      </div>
    </section>
  );
}

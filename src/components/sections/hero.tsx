"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Braces, ChartNoAxesCombined, Code2, Maximize2, Pause, Play, Scissors, SkipBack, Volume2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolio";
import { MagneticLink } from "@/components/ui/magnetic-link";
import "./hero-personal.css";

export function Hero() {
  const [role, setRole] = useState(0);
  const reduce = useReducedMotion();
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 55]);
  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => setRole(value => (value + 1) % profile.roles.length), 3600);
    return () => clearInterval(timer);
  }, [reduce]);

  return <section id="home" tabIndex={-1} ref={hero} className="hero-section hero-personal">
    <div className="hero-atmosphere" aria-hidden="true" />
    <div className="container hero-container">
      <div className="hero-topline mono"><span><span className="status-dot" /> {profile.location.toUpperCase()}</span><span>{profile.displayName.toUpperCase()} <span className="muted">/ PERSONAL PORTFOLIO</span></span></div>
      <div className="hero-grid">
        <div className="hero-copy">
          <motion.p className="hero-eyebrow mono" initial={false} animate={reduce ? {} : { opacity: [0, 1], y: [10, 0] }} transition={{ duration: 0.6 }}><span>&lt;</span> DEVELOPMENT / ANALYTICS / CREATIVE <span>/&gt;</span></motion.p>
          <h1 className="hero-headline" aria-label={profile.brandStatement}>
            {[<>TURNING IDEAS</>, <>INTO DIGITAL</>, <span key="experiences" className="gradient-text">EXPERIENCES.</span>].map((line, i) => <span className="headline-mask" key={i} aria-hidden="true"><motion.span initial={false} animate={reduce ? {} : { y: ["110%", "0%"], opacity: [0, 1] }} transition={{ duration: 0.9, delay: 0.12 + i * 0.11, ease: [0.22, 1, 0.36, 1] }}>{line}</motion.span></span>)}
            <motion.span className="hero-brand-continuation" aria-hidden="true" initial={false} animate={reduce ? {} : { opacity: [0, 1], y: [10, 0] }} transition={{ duration: 0.8, delay: 0.5 }}>Through <span>code</span>, <span>data</span>, and <span>creativity.</span></motion.span>
          </h1>
          <div className="identity-line"><span className="identity-prefix mono">const derick =</span><span className="identity-role"><AnimatePresence mode="wait"><motion.span key={role} initial={reduce ? false : { y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduce ? {} : { y: -12, opacity: 0 }} transition={{ duration: 0.3 }}>{profile.roles[role]}</motion.span></AnimatePresence></span><span className="typing-caret" aria-hidden="true" /></div>
          <p className="hero-intro">{profile.introduction}</p>
          <div className="hero-ctas"><MagneticLink href="#projects" className="button button-primary">Explore my projects <ArrowDownRight size={18} /></MagneticLink><MagneticLink href="#contact" className="button button-secondary">Let’s connect <ArrowUpRight size={18} /></MagneticLink></div>
          <p className="hero-availability"><span className="status-dot" />{profile.availability}</p>
        </div>
        <motion.div className="hero-visual" style={{ y: visualY }} initial={false} animate={reduce ? {} : { opacity: [0, 1], y: [24, 0] }} transition={{ duration: 1, delay: 0.4 }}>
          <div className="visual-index mono"><span><span className="rec-dot" /> DERICK’S WORKSPACE</span><span>CODE / DATA / CREATE</span></div>
          <div className="editor-composition">
            <div className="preview-window"><div className="window-bar"><span className="window-dots"><i /><i /><i /></span><span>composition_01.mov</span><Maximize2 size={12} /></div><div className="composition-art"><Image src="/assets/reel-art.svg" alt="Original abstract orbital artwork combining luminous indigo ribbons and a cyan sphere" fill priority sizes="(max-width: 700px) 92vw, 46vw" /><span className="frame-corner corner-tl" /><span className="frame-corner corner-tr" /><span className="frame-corner corner-bl" /><span className="frame-corner corner-br" /><span className="art-label mono">BUILD. UNDERSTAND.<br />COMMUNICATE.</span><span className="art-time mono">00:00:12:18</span></div><div className="composition-controls mono"><span><Play size={11} fill="currentColor" /> PREVIEW / CONCEPT</span><span>1920 × 1080 <span className="muted"> / 24 FPS</span></span></div></div>
            <div className="code-window"><div className="window-bar"><span><Code2 size={12} /> derick.ts</span><span className="code-window-dot" /></div><div className="code-lines mono"><div><span>01</span><p><em>const</em> derick = {"{"}</p></div><div><span>02</span><p>&nbsp; basedIn: <b>"Caloocan"</b>,</p></div><div><span>03</span><p>&nbsp; tracks: [</p></div><div><span>04</span><p>&nbsp;&nbsp; <b>"code"</b>, <b>"data"</b>,</p></div><div><span>05</span><p>&nbsp;&nbsp; <b>"creativity"</b></p></div><div><span>06</span><p>&nbsp; ],</p></div><div><span>07</span><p>&nbsp; drivenBy: <b>"learning"</b></p></div><div><span>08</span><p>{"}"};</p></div></div><div className="code-status mono"><span><Braces size={11} /> TypeScript</span><span>UTF-8</span></div></div>
            <div className="floating-note hero-data-note mono"><ChartNoAxesCombined size={15} /><span>ANALYTICS TRACK<br /><strong>POWER BI · POWER QUERY · DAX</strong></span></div>
          </div>
          <InteractiveTimeline />
          <div className="visual-caption mono"><span>BUILD <span>×</span> UNDERSTAND <span>×</span> COMMUNICATE</span><ArrowRight size={14} /></div>
        </motion.div>
      </div>
      <div className="hero-bottom"><a className="scroll-cue mono" href="#about"><span><ArrowDown size={14} /></span> SCROLL TO EXPLORE</a><p className="mono">PRACTICAL SYSTEMS. <span className="muted">CLEAR INSIGHTS. CREATIVE COMMUNICATION.</span></p><span className="hero-bottom-mark" aria-hidden="true">✳</span></div>
    </div>
  </section>;
}

function InteractiveTimeline() {
  const [playing, setPlaying] = useState(false);
  const [frame, setFrame] = useState(32);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setFrame(value => value >= 100 ? 0 : value + 0.5), 100);
    return () => clearInterval(timer);
  }, [playing]);
  const seconds = Math.floor(frame * 0.24).toString().padStart(2, "0");
  return <div className="hero-timeline"><div className="timeline-toolbar"><span className="mono"><Scissors size={12} /> MASTER SEQUENCE</span><div><button type="button" aria-label="Restart timeline preview" onClick={() => { setFrame(0); setPlaying(false); }}><SkipBack size={12} /></button><button type="button" aria-label={playing ? "Pause timeline preview" : "Play timeline preview"} aria-pressed={playing} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={13} /> : <Play size={13} />}</button><span className="timeline-silent" title="Silent visual preview" aria-label="Silent visual preview"><Volume2 size={12} /></span></div><span className="mono timeline-time">00:00:{seconds}:00</span></div><div className="timeline-ruler mono"><span>00:00</span><span>00:08</span><span>00:16</span><span>00:24</span></div><div className="timeline-track-area"><div className="timeline-row"><span className="track-name mono">V1</span><div className="track-clips"><span className="clip clip-indigo"><Code2 size={10} /> digital_experiences</span><span className="clip clip-cyan">motion.mov</span></div></div><div className="timeline-row"><span className="track-name mono">A1</span><div className="track-clips"><span className="clip clip-audio">{Array.from({ length: 54 }, (_, i) => <i key={i} style={{ height: `${18 + ((i * 17 + 11) % 70)}%` }} />)}</span></div></div><div className="timeline-playhead" style={{ left: `calc(30px + (100% - 30px) * ${frame / 100})` }} aria-hidden="true" /><label className="sr-only" htmlFor="timeline-scrub">Scrub creative timeline preview</label><input id="timeline-scrub" className="timeline-scrub" type="range" min="0" max="100" step="0.5" value={frame} onChange={event => setFrame(Number(event.target.value))} /></div><p className="timeline-help mono">INTERACTIVE TIMELINE <span>DRAG TO EXPLORE</span></p></div>;
}



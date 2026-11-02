"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Braces, ChartNoAxesCombined, Code2, Film, GitBranch, Layers, Sparkles } from "lucide-react";
import { skillGroups } from "@/data/portfolio";
import { SectionHeading, Reveal } from "@/components/ui/reveal";
import "./skills-personal.css";

const tabIcons = { development: Code2, analytics: ChartNoAxesCombined, creative: Film };
const tabShortLabels = { development: "Code", analytics: "Data", creative: "Creative" };

export function Skills() {
  const [tab, setTab] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  function onTabKey(event: KeyboardEvent, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % skillGroups.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + skillGroups.length) % skillGroups.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = skillGroups.length - 1;
    else return;
    event.preventDefault(); setTab(next); buttons.current[next]?.focus();
  }
  const group = skillGroups[tab];
  return <section id="skills" tabIndex={-1} className="section skills-section personal-skills"><div className="container"><div className="skills-heading"><SectionHeading number="05" eyebrow="MY PRACTICAL TOOLKIT" title={<>Three tracks.<br /><span className="text-muted">One curious mind.</span></>} /><p className="section-description">Code to build the system. Analytics to understand it. Creative tools to communicate the idea.</p></div>
    <Reveal className="toolkit-window"><div className="toolkit-top"><div className="toolkit-tabs" role="tablist" aria-label="Skill disciplines">{skillGroups.map((item, index) => { const Icon = tabIcons[item.id]; return <button type="button" role="tab" id={`tab-${item.id}`} aria-label={item.label} aria-controls={`panel-${item.id}`} aria-selected={tab === index} tabIndex={tab === index ? 0 : -1} key={item.id} ref={node => { buttons.current[index] = node; }} onClick={() => setTab(index)} onKeyDown={event => onTabKey(event, index)}><Icon size={16} /><span className="skill-tab-file" aria-hidden="true">{item.filename}</span><span className="skill-tab-short" aria-hidden="true">{tabShortLabels[item.id]}</span><span className="tab-dot" /></button>; })}</div><span className="toolkit-caption mono"><GitBranch size={13} /> always-learning</span></div>
      <AnimatePresence mode="wait" initial={false}><motion.div key={tab} role="tabpanel" id={`panel-${group.id}`} aria-labelledby={`tab-${group.id}`} tabIndex={0} className="toolkit-body" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? {} : { opacity: 0, y: -5 }} transition={{ duration: 0.2 }}><div className="toolkit-comment mono"><span>//</span> {group.description}</div><div className="skill-tracks">{group.tracks.map((track, index) => <div className="skill-track" key={track.label}><span className="track-index mono">0{index + 1}</span><div className="skill-track-content"><h3 className="mono">{track.label}</h3><div className="skill-tags">{track.skills.map((skill, i) => <motion.span className={`skill-chip chip-${(i + index) % 3}`} key={skill} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.045 }}><span className="skill-chip-dot" />{skill}</motion.span>)}</div></div><span className="track-end" aria-hidden="true"><Layers size={16} /></span></div>)}</div></motion.div></AnimatePresence>
      <div className="toolkit-status mono"><span><span className="status-dot" /> LEARNING BY BUILDING</span><span><Braces size={13} /> NO FINISH LINE.</span></div>
    </Reveal><p className="portfolio-stack"><Sparkles size={14} /><span>This portfolio is built with <strong>Next.js, TypeScript, Tailwind CSS & Motion.</strong> Part of the learning, too.</span></p>
  </div></section>;
}

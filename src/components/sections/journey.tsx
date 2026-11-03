import { ArrowUpRight, BookOpen, BriefcaseBusiness, ClipboardList, HeartHandshake, Store } from "lucide-react";
import { journey, professionalExperience } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import "./journey-personal.css";

const icons = [BookOpen, ClipboardList, Store, HeartHandshake];

export function Journey() {
  return <div className="journey-section personal-journey"><div className="container">
    <div className="journey-grid">
      <div className="journey-intro"><SectionHeading number="02" eyebrow="THE EXPERIENCES I BRING" title={<>Learning from work.<br /><span className="text-muted">Growing through people.</span></>} description="My path includes IT studies, business experience, creative work, and community. Each gives me another way to understand the people a system is built for." /><Reveal><span className="journey-note mono"><span className="status-dot" /> STILL LEARNING. STILL BUILDING. <ArrowUpRight size={14} /></span></Reveal></div>
      <div className="journey-timeline">{journey.map((item, i) => { const Icon = icons[i % icons.length]; return <Reveal key={item.title} delay={i * 0.06} className="journey-item"><span className="journey-node"><Icon size={18} /></span><div className="journey-content"><p className="mono journey-period">{item.period}</p><h3>{item.title}</h3><p className="journey-organization">{item.organization}</p><p>{item.description}</p></div></Reveal>; })}</div>
    </div>
    <div className="professional-background"><Reveal><div className="experience-heading"><span className="mono"><BriefcaseBusiness size={15} /> PROFESSIONAL BACKGROUND</span><p>Experience outside development, with a perspective I bring into it.</p></div></Reveal><div className="experience-grid">{professionalExperience.map((item, index) => <Reveal key={item.organization} delay={index * 0.06} className="experience-card"><span className="experience-index mono">0{index + 1} / EXPERIENCE</span><h3>{item.organization}</h3><p className="experience-role">{item.role}</p><p>{item.description}</p><span className="experience-focus">{item.focus}</span></Reveal>)}</div></div>
  </div></div>;
}

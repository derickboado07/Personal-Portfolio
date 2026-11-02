import Image from "next/image";
import { ArrowUpRight, Check, Coffee, Database, Layers, LayoutDashboard, Menu, Plus, Search, ShieldCheck, Smartphone, Sparkles } from "lucide-react";
import type { Project } from "@/data/portfolio";
import "@/components/sections/projects.css";

function EnrollmentPreview() {
  return (
    <div className="concept-dashboard enrollment-dashboard" aria-hidden="true">
      <aside className="concept-sidebar"><span className="concept-logo"><Layers size={16} /></span><LayoutDashboard size={13} /><Layers size={13} /><Database size={13} /><ShieldCheck size={13} /><span className="concept-avatar">DB</span></aside>
      <div className="concept-workspace">
        <div className="concept-topline"><span>Academic workspace</span><span className="concept-search"><Search size={10} /> Quick search</span><span className="concept-avatar">D</span></div>
        <div className="concept-heading"><div><small>ENROLLMENT / OVERVIEW</small><strong>A clearer path forward.</strong></div><span className="concept-action"><Plus size={10} /> New enrollment</span></div>
        <div className="concept-summary"><div><span className="concept-icon"><Layers size={12} /></span><small>Connected workflows</small><b>Enrollment</b></div><div><span className="concept-icon"><ShieldCheck size={12} /></span><small>Rule-based support</small><b>Scheduling</b></div><div><span className="concept-icon"><Sparkles size={12} /></span><small>Informed planning</small><b>Analytics</b></div></div>
        <div className="concept-bottom"><div className="concept-chart"><span>Planning overview <ArrowUpRight size={10} /></span><div className="concept-bars">{[35, 52, 43, 70, 58, 80, 68, 90, 78].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div><div className="concept-chart-caption">Illustrative visualization</div></div><div className="concept-steps"><span>Enrollment workflow</span>{["Student information", "Course selection", "Schedule review"].map((label, i) => <div key={label}><i>{i < 2 ? <Check size={8} /> : "03"}</i><span>{label}<small>{i < 2 ? "Connected records" : "Rule-based support"}</small></span></div>)}</div></div>
      </div>
    </div>
  );
}

function CoffeePreview() {
  return (
    <div className="concept-dashboard coffee-dashboard" aria-hidden="true">
      <aside className="concept-sidebar"><span className="concept-logo"><Coffee size={17} /></span><LayoutDashboard size={13} /><Coffee size={13} /><Database size={13} /><span className="concept-avatar">A</span></aside>
      <div className="concept-workspace">
        <div className="concept-topline"><span className="coffee-wordmark">arat<span>coffee</span></span><span>ORDERING & INVENTORY</span><Menu size={12} /></div>
        <div className="concept-heading"><div><small>CRAFTED WITH CARE</small><strong>Freshly brewed. Simply managed.</strong></div></div>
        <div className="coffee-tabs"><span>All drinks</span><span>Coffee</span><span>Non-coffee</span><span>Pastries</span></div>
        <div className="coffee-products">{["Classic latte", "Iced americano", "Matcha latte"].map((label, i) => <div key={label}><div className={`coffee-product-art coffee-drink-${i}`}><i className="coffee-cup"><b /><span>arat</span></i></div><strong>{label}</strong><small>Menu concept</small><span className="coffee-product-add"><Plus size={10} /></span></div>)}</div>
        <div className="coffee-bottom"><span><Database size={11} /> Inventory connected</span><span>From first order to final stock.</span></div>
      </div>
    </div>
  );
}

function SmartloadPreview() {
  return <div className="smartload-concept" aria-hidden="true"><div className="smartload-concept-top"><span><Layers size={17} /> smartload<span className="smartload-dot" /></span><small>FACULTY WORKSPACE</small></div><div className="smartload-concept-content"><div><small>ASSIGN. REVIEW. REFINE.</small><strong>Bring balance<br />to the timetable.</strong><span className="smartload-concept-pill"><Sparkles size={10} /> Human-reviewed evaluation</span></div><div className="smartload-schedule">{Array.from({length: 20}, (_, i) => <span className={[0, 6, 7, 11, 17, 19].includes(i) ? "schedule-block" : ""} key={i} />)}</div></div></div>;
}

function MobilePreview() {
  return <div className="mobile-concept" aria-hidden="true"><div className="mobile-concept-copy"><span><Smartphone size={15} /> FLUTTER × FIREBASE</span><strong>Ideas you<br />can hold.</strong><small>Connected mobile explorations.</small></div><div className="concept-phone"><span className="phone-island" /><div className="phone-top"><span>hello, world.</span><i>D</i></div><div className="phone-gradient-card"><Sparkles size={19} /><strong>Make room<br />for an idea.</strong><span>YOUR CREATIVE SPACE <ArrowUpRight size={9} /></span></div><div className="phone-item"><span /><div><b>A fresh start</b><small>Explore something new</small></div></div><div className="phone-item"><span /><div><b>Stay connected</b><small>Built with Firebase</small></div></div><div className="phone-nav"><LayoutDashboard size={12} /><Search size={12} /><Plus size={12} /></div></div></div>;
}

export function ProjectPreview({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div className={`project-preview project-preview-${project.accent}${large ? " project-preview-large" : ""}${project.image ? " project-preview-real" : ""}`}>
      {project.image ? <Image src={project.image} alt={project.imageAlt || `${project.title} interface`} fill sizes={large ? "(max-width: 760px) 100vw, 1200px" : "(max-width: 760px) 100vw, 600px"} className="project-real-image" /> : <>
        <div className="project-preview-grid" aria-hidden="true" />
        <div className="concept-window"><div className="concept-window-bar"><div className="concept-window-dots"><i /><i /><i /></div><span>{project.slug.replaceAll("-", "_")}.workspace</span><span className="concept-window-symbol">↗</span></div>{project.accent === "indigo" ? <EnrollmentPreview /> : project.accent === "coffee" ? <CoffeePreview /> : project.accent === "cyan" ? <SmartloadPreview /> : <MobilePreview />}</div>
        <span className="project-concept-caption">INTERFACE CONCEPT · NOT A PRODUCT SCREENSHOT</span>
      </>}
    </div>
  );
}

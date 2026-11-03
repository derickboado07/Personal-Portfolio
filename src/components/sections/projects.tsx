import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Code2 } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { ProjectPreview } from "@/components/ui/project-preview";
import "./projects.css";

export function Projects({ platform = "web" }: { platform?: "web" | "mobile" }) {
  const items = projects.filter(project => project.platform === platform);
  const featured = platform === "web" ? items.slice(0, 2) : [];
  const compact = platform === "web" ? items.slice(2) : items;
  const mobile = platform === "mobile";
  return (
    <div className="projects-content">
      <div className="container">
        <Reveal className="projects-section-intro">
          <div><p className="section-kicker"><Code2 size={14} /> 03 / {mobile ? "MOBILE APPLICATIONS" : "SELECTED DEVELOPMENT"}</p><h2 id={`projects-heading-${platform}`} className="section-heading"><TextReveal>{mobile ? <>Small screens.<br /><span className="projects-heading-muted">Big ideas.</span></> : <>Thoughtful code.<br /><span className="projects-heading-muted">Real-world purpose.</span></>}</TextReveal></h2></div>
          <div className="projects-intro-aside"><p className="section-description">{mobile ? "Exploring connected mobile experiences with Flutter, Dart, and Firebase through student projects." : "Business needs meet practical code. ARAT Coffee leads this selection, followed by our team enrollment capstone and academic explorations."}</p><span className="projects-editorial-note mono">SELECTED WORK / 01—{String(items.length).padStart(2, "0")} <ArrowDownRight size={17} /></span></div>
        </Reveal>
        {items.length > 1 && <p className="projects-row-hint mono">SCROLL TO EXPLORE <span aria-hidden="true">→</span></p>}
        <div className="projects-row" role="region" aria-label={`${mobile ? "Mobile application" : "Web development"} projects${items.length > 1 ? ", scroll horizontally" : ""}`} tabIndex={items.length > 1 ? 0 : undefined}>
        <div className="featured-project-grid">
          {featured.map((project, index) => <Reveal key={project.slug} delay={index * 0.1} className={`project-card project-card-${project.accent}`}>
            <Link href={`/projects/${project.slug}`} className="project-image-link" aria-label={`Read the ${project.title} case study`}><ProjectPreview project={project} /><span className="project-preview-link"><ArrowUpRight size={20} /></span></Link>
            <div className="project-card-content"><div className="project-card-meta"><span>{project.category}</span><span className="project-status"><i />{project.status}</span></div><h3><Link href={`/projects/${project.slug}`}>{project.shortTitle}</Link></h3><p className="project-full-title">{project.title}</p><p className="project-overview">{project.overview}</p><div className="project-card-tags">{project.technologies.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>{project.liveUrl && <a className="project-card-live-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit project website <ArrowUpRight size={14} /></a>}<div className="project-card-footer"><span>{project.role}</span><Link href={`/projects/${project.slug}`}>Explore project <ArrowUpRight size={15} /></Link></div></div>
          </Reveal>)}
        </div>
        <div className="compact-project-grid">
          {compact.map((project, index) => <Reveal key={project.slug} delay={index * 0.1} className={`project-card compact-project-card project-card-${project.accent}`}>
            <Link href={`/projects/${project.slug}`} className="project-image-link" aria-label={`Read about ${project.title}`}><ProjectPreview project={project} /></Link><div className="project-card-content"><div className="project-card-meta"><span>{project.category}</span><span className="project-status"><i />{project.status}</span></div><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p className="project-overview">{project.overview}</p><div className="project-card-tags">{project.technologies.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>{project.liveUrl && <a className="project-card-live-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit project website <ArrowUpRight size={14} /></a>}<div className="project-card-footer"><span>{project.role}</span><Link href={`/projects/${project.slug}`} aria-label={`Explore ${project.title}`}>Explore <ArrowUpRight size={15} /></Link></div></div>
          </Reveal>)}
        </div>
        </div>
        <p className="projects-honesty-note mono">FROM IDEAS TO INTERFACES. <span>{mobile ? "The preview is an illustrative concept; project details reflect student work." : "GRC Connect shows actual system screenshots. Other previews are illustrative concepts; project details reflect their business, academic, or prototype context."}</span></p>
      </div>
    </div>
  );
}

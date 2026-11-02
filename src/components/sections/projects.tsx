import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Code2 } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { ProjectPreview } from "@/components/ui/project-preview";
import "./projects.css";

export function Projects() {
  return (
    <section id="projects" tabIndex={-1} className="section projects-section" aria-labelledby="projects-heading">
      <div className="container">
        <Reveal className="projects-section-intro">
          <div><p className="section-kicker"><Code2 size={14} /> 02 / SELECTED DEVELOPMENT</p><h2 id="projects-heading" className="section-heading">Thoughtful code.<br /><span className="projects-heading-muted">Real-world purpose.</span></h2></div>
          <div className="projects-intro-aside"><p className="section-description">Business needs meet practical code. ARAT Coffee leads this selection, followed by our team enrollment capstone and academic explorations.</p><span className="projects-editorial-note mono">SELECTED WORK / 01—04 <ArrowDownRight size={17} /></span></div>
        </Reveal>
        <div className="featured-project-grid">
          {projects.slice(0, 2).map((project, index) => <Reveal key={project.slug} delay={index * 0.1} className={`project-card project-card-${project.accent}`}>
            <Link href={`/projects/${project.slug}`} className="project-image-link" aria-label={`Read the ${project.title} case study`}><ProjectPreview project={project} /><span className="project-preview-link"><ArrowUpRight size={20} /></span></Link>
            <div className="project-card-content"><div className="project-card-meta"><span>{project.category}</span><span className="project-status"><i />{project.status}</span></div><h3><Link href={`/projects/${project.slug}`}>{project.shortTitle}</Link></h3><p className="project-full-title">{project.title}</p><p className="project-overview">{project.overview}</p><div className="project-card-tags">{project.technologies.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>{project.liveUrl && <a className="project-card-live-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit project website <ArrowUpRight size={14} /></a>}<div className="project-card-footer"><span>{project.role}</span><Link href={`/projects/${project.slug}`}>Explore project <ArrowUpRight size={15} /></Link></div></div>
          </Reveal>)}
        </div>
        <div className="compact-project-grid">
          {projects.slice(2).map((project, index) => <Reveal key={project.slug} delay={index * 0.1} className={`project-card compact-project-card project-card-${project.accent}`}>
            <Link href={`/projects/${project.slug}`} className="project-image-link" aria-label={`Read about ${project.title}`}><ProjectPreview project={project} /></Link><div className="project-card-content"><div className="project-card-meta"><span>{project.category}</span><span className="project-status"><i />{project.status}</span></div><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p className="project-overview">{project.overview}</p><div className="project-card-tags">{project.technologies.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>{project.liveUrl && <a className="project-card-live-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit project website <ArrowUpRight size={14} /></a>}<div className="project-card-footer"><span>{project.role}</span><Link href={`/projects/${project.slug}`} aria-label={`Explore ${project.title}`}>Explore <ArrowUpRight size={15} /></Link></div></div>
          </Reveal>)}
        </div>
        <p className="projects-honesty-note mono">FROM IDEAS TO INTERFACES. <span>GRC Connect shows actual system screenshots. Other previews are illustrative concepts; project details reflect their business, academic, or prototype context.</span></p>
      </div>
    </section>
  );
}



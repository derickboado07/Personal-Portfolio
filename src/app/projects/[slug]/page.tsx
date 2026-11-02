import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Braces, CodeXml } from "lucide-react";
import { projects, profile } from "@/data/portfolio";
import { ProjectPreview } from "@/components/ui/project-preview";
import { ProjectGallery } from "@/components/ui/project-gallery";
import { Reveal } from "@/components/ui/reveal";
import "@/components/sections/projects.css";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.overview, alternates: { canonical: `/projects/${slug}` }, openGraph: { title: `${project.title} — Derick Boado`, description: project.overview, url: `/projects/${slug}` } };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
  return <>
    <header className="case-nav container"><Link href="/" className="case-brand" aria-label="Derick Boado home"><Braces size={23} /><span>DERICK<span>CODE / DATA / CREATE</span></span></Link><Link href="/#projects" className="case-back"><ArrowLeft size={15} /> All projects</Link></header>
    <main id="main-content" className={`case-study case-study-${project.accent}`}>
      <section className="container case-intro"><Reveal><p className="section-kicker">PROJECT {project.number} / {project.category}</p><h1>{project.shortTitle}</h1><p className="case-full-title">{project.title}</p><p className="case-description">{project.overview}</p><div className="case-facts"><div><span>ROLE</span><strong>{project.role}</strong></div><div><span>STATUS</span><strong><i /> {project.status}</strong></div><div><span>FOCUS / TECHNOLOGY</span><div className="project-card-tags">{project.technologies.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></div></div></Reveal></section>
      <div className="container"><Reveal><ProjectPreview project={project} large /></Reveal></div>
      {(project.liveUrl || Boolean(project.screenshots?.length)) && <div className="container case-project-actions">{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="button button-primary">Visit project website <ArrowUpRight size={17} /></a>}{Boolean(project.screenshots?.length) && <a href="#project-screenshots" className="button button-secondary">Explore system screenshots <ArrowRight size={17} /></a>}</div>}
      {project.capabilities && <section className="container case-capabilities" aria-labelledby="capability-heading"><Reveal><p className="section-kicker">BUILT AROUND THE BUSINESS</p><h2 id="capability-heading">From a transaction to a clearer picture.</h2></Reveal><div className="capability-grid">{project.capabilities.map(item => <Reveal className="capability-card" key={item.title}><h3>{item.title}</h3><p>{item.description}</p></Reveal>)}</div></section>}
      <section className="container case-story" aria-labelledby="project-story"><Reveal className="case-story-sidebar"><p className="section-kicker">THE THINKING BEHIND IT</p><h2 id="project-story">A problem worth<br />thinking through.</h2><p>{project.context || "Academic exploration. Thoughtful implementation. Room to keep learning."}</p></Reveal><div className="case-story-content"><Reveal><span className="case-story-number mono">01 / THE CHALLENGE</span><h3>Understanding the problem</h3><p>{project.problem}</p></Reveal><Reveal><span className="case-story-number mono">02 / THE APPROACH</span><h3>Connecting the pieces</h3><p>{project.solution}</p></Reveal>{project.contribution && <Reveal><span className="case-story-number mono">03 / MY CONTRIBUTION</span><h3>The part I brought to it</h3><p>{project.contribution}</p></Reveal>}<Reveal className="case-project-note"><span className="case-story-number mono">{project.contribution ? "04" : "03"} / CURRENT STATE</span><h3>{project.status}</h3><p>{project.caseStudyNote || "This project is part of my work as an Information Technology student. The interface artwork above is an original visual concept, not a screenshot of the working application. Verified screenshots and project links can be added as the project develops."}</p><div className="case-external-links">{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="button button-secondary"><CodeXml size={16} /> View source <ArrowUpRight size={15} /></a>}{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="button button-primary">Project website <ArrowUpRight size={15} /></a>}</div></Reveal></div></section>
      {project.screenshots && project.screenshots.length > 0 && <section id="project-screenshots" tabIndex={-1} className="container case-gallery-section" aria-labelledby="gallery-heading"><Reveal><p className="section-kicker">{project.contribution ? "05" : "04"} / INSIDE THE SYSTEM</p><h2 id="gallery-heading">A closer look at the system.</h2><p className="section-description">Explore the student journey, academic planning, registrar workflows, and mobile experience through actual project screenshots.</p></Reveal><ProjectGallery screenshots={project.screenshots} /></section>}
      <section className="case-next container"><Reveal><p className="section-kicker">KEEP EXPLORING / PROJECT {nextProject.number}</p><Link href={`/projects/${nextProject.slug}`}><span>{nextProject.shortTitle}</span><ArrowRight size={35} /></Link></Reveal></section>
    </main>
    <footer className="case-footer container"><span>© {new Date().getFullYear()} {profile.name}</span><Link href="/#contact">Have something in mind? Let’s talk. <ArrowUpRight size={14} /></Link><Link href="/#projects">Back to selected work</Link></footer>
  </>;
}




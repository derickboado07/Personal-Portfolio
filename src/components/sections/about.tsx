import Image from "next/image";
import { ArrowUpRight, ChartNoAxesCombined, CircleDot, Code2, Film, GraduationCap, Guitar, HandHeart, MapPin, Store } from "lucide-react";
import { disciplines, personalDetails, personalValues, profile } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { BrandLogo } from "@/components/ui/brand-logo";
import "./about-personal.css";

const disciplineIcons = { development: Code2, analytics: ChartNoAxesCombined, creative: Film };
const personalIcons = { faith: HandHeart, music: Guitar, basketball: CircleDot, business: Store };

export function About() {
  return <div className="about-section about-personal"><div className="container">
    <SectionHeading number="01" eyebrow="A LITTLE MORE ABOUT ME" title={<>Friends call me Derick.<br /><span className="text-muted">Here’s the person behind the work.</span></>} />

    <div className="about-grid">
      <Reveal className="about-portrait">
        <div className="portrait-frame">
          {profile.portrait ? <Image src={profile.portrait} alt={profile.portraitAlt} fill sizes="(max-width: 760px) 90vw, 410px" className="portrait-image" /> : <>
            <div className="portrait-grid" />
            <BrandLogo variant="card" />
            <span className="portrait-coordinate mono">CALOOCAN CITY / PH</span>
            <span className="portrait-brand-tagline mono">Code. Data. Create.</span>
          </>}
          <div className="portrait-nameplate"><span><strong>{profile.displayName}</strong><span>Developer. Analytical mind. Creative.</span></span><ArrowUpRight size={23} /></div>
        </div>
        <div className="portrait-bottom mono"><span>MARK FREDERICK BOADO</span><span>KNOWN AS DERICK</span></div>
      </Reveal>
      <div className="about-copy"><Reveal>
        <p className="about-lead">Practical by nature.<br /><span className="gradient-text">Creative by instinct.</span></p>
        <p>{profile.biography}</p>
        <p>{profile.approach}</p>
        <p>{profile.enrollmentProject}</p>
        <div className="about-facts">
          <div><MapPin size={17} /><span><small>BASED IN</small>{profile.location}</span></div>
          <div><GraduationCap size={19} /><span><small>STUDYING AT GRC</small>{profile.education}</span></div>
        </div>
        <p className="about-study-note">{profile.educationNote}</p>
      </Reveal></div>
    </div>

    <div className="discipline-grid" aria-label="Three connected strengths">
      {disciplines.map((discipline, index) => {
        const Icon = disciplineIcons[discipline.id];
        return <Reveal key={discipline.id} delay={index * 0.08} className={`discipline-panel discipline-${discipline.id}`}>
          <div className="discipline-panel-top"><span className="discipline-icon"><Icon size={21} /></span><span className="mono">0{index + 1} / {discipline.label}</span></div>
          <div className="discipline-panel-copy"><h3>{discipline.title}</h3><p>{discipline.description}</p></div>
          <div className="discipline-foot mono"><span>{discipline.footnote}</span><span aria-hidden="true">↗</span></div>
        </Reveal>;
      })}
    </div>

    <div className="personal-notes" aria-labelledby="personal-notes-heading">
      <Reveal className="personal-notes-intro"><p className="mono">THE OTHER PARTS OF THE PICTURE</p><h3 id="personal-notes-heading">Away from<br /><span className="text-muted">the screen.</span></h3><p>The things I make time for shape how I work with people, approach a problem, and find a little creative rhythm.</p><span className="personal-notes-signature" aria-hidden="true">— Derick</span></Reveal>
      <div className="personal-notes-grid">{personalDetails.map((detail, index) => {
        const Icon = personalIcons[detail.id];
        return <Reveal key={detail.id} delay={index * 0.06} className={`personal-note personal-note-${detail.id}`}><article>
          <div className="personal-note-meta"><Icon size={18} /><span className="mono">{detail.label}</span><span className="personal-note-index mono">0{index + 1}</span></div>
          <h4>{detail.title}</h4><p>{detail.description}</p>
        </article></Reveal>;
      })}</div>
    </div>

    <Reveal className="personal-values"><span className="mono">WHAT I COME BACK TO</span><ul aria-label="Personal values">{personalValues.map(value => <li key={value}>{value}</li>)}</ul></Reveal>
  </div></div>;
}

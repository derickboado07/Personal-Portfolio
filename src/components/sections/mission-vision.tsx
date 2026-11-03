import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import "./mission-vision.css";

const principles = [
  {
    label: "MY MISSION",
    heading: "Making complex work simple.",
    description:
      "To transform business challenges into smart, efficient, and user-friendly digital solutions that make work simpler and more productive.",
  },
  {
    label: "MY VISION",
    heading: "Empowering businesses through technology.",
    description:
      "To empower businesses of every size through technology that simplifies processes, improves experiences, and creates opportunities for growth.",
  },
];

export function MissionVision() {
  return (
    <section id="purpose" tabIndex={-1} className="purpose-section" aria-labelledby="purpose-heading">
      <div className="container">
        <Reveal className="purpose-heading">
          <p className="purpose-eyebrow mono">MISSION / VISION</p>
          <h2 id="purpose-heading"><TextReveal>Purpose behind the work.</TextReveal></h2>
        </Reveal>
        <div className="purpose-grid">
          {principles.map((principle, index) => (
            <Reveal key={principle.label} className="purpose-reveal" delay={index * 0.1}>
              <article className="purpose-card">
                <div className="purpose-card-label mono">
                  <p>{principle.label}</p>
                  <span aria-hidden="true">0{index + 1}</span>
                </div>
                <h3><TextReveal>{principle.heading}</TextReveal></h3>
                <p className="purpose-description">{principle.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

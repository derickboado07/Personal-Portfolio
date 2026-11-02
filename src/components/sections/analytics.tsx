import Image from "next/image";
import { ArrowDown, ArrowUpRight, ChartNoAxesCombined, Database, FileChartColumnIncreasing, ListFilter, Search, TableProperties } from "lucide-react";
import { analytics } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import "./analytics.css";

const workflowIcons = [Database, Search, FileChartColumnIncreasing];

export function Analytics() {
  return <section id="analytics" tabIndex={-1} className="section analytics-section" aria-labelledby="analytics-heading">
    <div className="container">
      <div className="analytics-editorial-grid">
        <div className="analytics-copy">
          <SectionHeading number="03" eyebrow="THE BUSINESS ANALYTICS SIDE" title={<><span id="analytics-heading">From transactions.<br /><span className="text-muted">To understanding.</span></span></>} />
          <Reveal><p className="analytics-lead">{analytics.title}</p><p className="analytics-body">{analytics.introduction}</p><p className="analytics-body">{analytics.connection}</p><div className="analytics-tool-list" aria-label="Analytics tools">{analytics.tools.map(tool => <span key={tool}>{tool}</span>)}</div></Reveal>
        </div>

        <Reveal className="analytics-workspace" delay={0.1}>
          <div className="analytics-workspace-bar"><span><TableProperties size={14} /> analysis.workspace</span><span className="mono">ACADEMIC PRACTICE</span></div>
          {analytics.reportImage ? <div className="analytics-real-report"><Image src={analytics.reportImage} alt={analytics.reportImageAlt || "Power BI report by Derick Boado"} width={1280} height={800} sizes="(max-width: 760px) 95vw, 600px" /></div> : <div className="analytics-blueprint">
            <div className="analytics-blueprint-label mono"><ChartNoAxesCombined size={15} /><span>HOW I APPROACH A REPORT</span></div>
            <p className="analytics-blueprint-question">Start with a<br /><span>better question.</span></p>
            <div className="analytics-question-tags" aria-label="Business questions I explore"><span>Revenue</span><span>Product categories</span><span>Sales trends</span></div>
            <div className="analytics-flow" aria-label="From dataset to a readable report"><div><Database size={18} /><span>Dataset</span><small>Clean & organize</small></div><ArrowDown size={15} aria-hidden="true" /><div><ListFilter size={18} /><span>Analysis</span><small>Measures & filters</small></div><ArrowDown size={15} aria-hidden="true" /><div><FileChartColumnIncreasing size={18} /><span>Report</span><small>Explain the business</small></div></div>
            <div className="analytics-blueprint-foot"><span className="mono">PROCESS BLUEPRINT</span><span>Actual report examples to be added</span></div>
          </div>}
          <div className="analytics-workspace-status"><span className="status-dot" /><span>{analytics.status}</span></div>
          {analytics.reportUrl && <a href={analytics.reportUrl} target="_blank" rel="noopener noreferrer" className="analytics-report-link">Explore my Power BI report <ArrowUpRight size={16} /></a>}
        </Reveal>
      </div>

      <div className="analytics-workflow">{analytics.workflow.map((step, index) => { const Icon = workflowIcons[index % workflowIcons.length]; return <Reveal className="analytics-workflow-step" key={step.title} delay={index * 0.07}><div className="analytics-step-top"><span className="mono">0{index + 1}</span><Icon size={19} /></div><h3>{step.title}</h3><p>{step.description}</p></Reveal>; })}</div>
    </div>
  </section>;
}

"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Maximize2, X } from "lucide-react";
import type { ProjectScreenshot } from "@/data/portfolio";
import "./project-gallery.css";

export function ProjectGallery({ screenshots }: { screenshots: ProjectScreenshot[] }) {
  const id = useId();
  const [group, setGroup] = useState("All screens");
  const [selectedSource, setSelectedSource] = useState(screenshots[0]?.src ?? "");
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const groups = ["All screens", ...new Set(screenshots.map(screenshot => screenshot.group))];
  const filtered = group === "All screens" ? screenshots : screenshots.filter(screenshot => screenshot.group === group);
  const selectedIndex = Math.max(0, filtered.findIndex(screenshot => screenshot.src === selectedSource));
  const selected = filtered[selectedIndex];

  useEffect(() => {
    if (!open || !dialog.current) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      opener.current?.focus({ preventScroll: true });
    };
  }, [open]);

  if (!selected) return null;

  function step(direction: number) {
    const next = (selectedIndex + direction + filtered.length) % filtered.length;
    setSelectedSource(filtered[next].src);
  }
  function arrowKeys(event: KeyboardEvent) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      step(event.key === "ArrowLeft" ? -1 : 1);
    }
  }
  function expand(event: React.MouseEvent<HTMLButtonElement>) {
    opener.current = event.currentTarget;
    setOpen(true);
  }
  const count = `${String(selectedIndex + 1).padStart(2, "0")} / ${String(filtered.length).padStart(2, "0")}`;

  return <div className="project-gallery">
    <div className="project-gallery-filters" role="group" aria-label="Filter system screenshots">
      {groups.map(item => <button key={item} type="button" aria-pressed={group === item} onClick={() => { setGroup(item); setSelectedSource((item === "All screens" ? screenshots : screenshots.filter(screenshot => screenshot.group === item))[0].src); }}>{item}<span>{item === "All screens" ? screenshots.length : screenshots.filter(screenshot => screenshot.group === item).length}</span></button>)}
    </div>

    <figure className="project-gallery-viewer">
      <div className="project-gallery-toolbar"><span><i /><i /><i /></span><span>{selected.group} / {selected.title}</span><button type="button" onClick={expand} aria-label={`Expand screenshot: ${selected.title}`}><Maximize2 size={16} /><span>Expand</span></button></div>
      <button type="button" className="project-gallery-stage" aria-label={`Open full-size screenshot: ${selected.title}`} onClick={expand} onKeyDown={arrowKeys} style={{ aspectRatio: `${selected.width} / ${selected.height}` }}><Image src={selected.src} alt={selected.alt} fill sizes="(max-width: 760px) 95vw, 1280px" className="project-gallery-image" /><span className="project-gallery-expand-hint"><Maximize2 size={15} /> View full screen</span></button>
      <figcaption className="project-gallery-caption"><div><span className="mono">{selected.group.toUpperCase()}</span><h3>{selected.title}</h3><p>{selected.description}</p></div><div className="project-gallery-controls"><span className="mono" aria-live="polite" aria-atomic="true">{count}</span><button type="button" aria-label="Previous system screenshot" onClick={() => step(-1)} disabled={filtered.length < 2}><ArrowLeft size={18} /></button><button type="button" aria-label="Next system screenshot" onClick={() => step(1)} disabled={filtered.length < 2}><ArrowRight size={18} /></button></div></figcaption>
    </figure>

    <div className="project-gallery-thumbnails" role="group" aria-label="Choose a system screenshot">
      {filtered.map((screenshot, index) => <button type="button" key={screenshot.src} aria-pressed={selected.src === screenshot.src} aria-label={`Show screenshot ${index + 1}: ${screenshot.title}`} onClick={() => setSelectedSource(screenshot.src)}><span className="project-gallery-thumb-image"><Image src={screenshot.src} alt="" fill sizes="160px" /></span><span className="project-gallery-thumb-label"><span className="mono">{String(index + 1).padStart(2, "0")}</span>{screenshot.title}</span></button>)}
    </div>
    <p className="project-gallery-note mono">ACTUAL SYSTEM SCREENSHOTS <span>SELECT A FRAME · USE ARROW KEYS WHEN VIEWING</span></p>

    <dialog className="project-gallery-dialog" ref={dialog} aria-labelledby={`${id}-dialog-title`} aria-describedby={`${id}-dialog-description`} onCancel={event => { event.preventDefault(); setOpen(false); }} onClick={event => { if (event.target === event.currentTarget) setOpen(false); }} onKeyDown={arrowKeys}>
      {open && <div className="project-gallery-dialog-inner"><div className="project-gallery-dialog-bar"><span className="mono">ACTUAL SYSTEM SCREENSHOT / {count}</span><button autoFocus type="button" aria-label="Close screenshot viewer" onClick={() => setOpen(false)}><X size={21} /></button></div><div className="project-gallery-dialog-image"><Image src={selected.src} alt={selected.alt} fill sizes="(max-width: 1600px) 95vw, 1600px" /></div><div className="project-gallery-dialog-footer"><div><h2 id={`${id}-dialog-title`}>{selected.title}</h2><p id={`${id}-dialog-description`}>{selected.description}</p><a href={selected.src} target="_blank" rel="noopener noreferrer">Open original image <ExternalLink size={12} /></a></div><div className="project-gallery-controls"><button type="button" aria-label="Previous full-size screenshot" onClick={() => step(-1)} disabled={filtered.length < 2}><ArrowLeft size={20} /></button><button type="button" aria-label="Next full-size screenshot" onClick={() => step(1)} disabled={filtered.length < 2}><ArrowRight size={20} /></button></div></div></div>}
    </dialog>
  </div>;
}

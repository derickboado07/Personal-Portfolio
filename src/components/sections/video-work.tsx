"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Film, Play } from "lucide-react";
import { creativePractice, showreel, videoCategories, videos, type VideoCategory } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { MediaDialog, type MediaItem } from "@/components/ui/media-dialog";
import "./media-contact.css";

export function VideoWork() {
  const [category, setCategory] = useState<VideoCategory>("All work");
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const reduced = useReducedMotion();
  const filtered = category === "All work" ? videos : videos.filter((video) => video.category === category);

  return (
    <section id="video-work" tabIndex={-1} className="section video-section" aria-labelledby="video-heading">
      <div className="container">
        <Reveal><div className="video-heading-row"><div><p className="section-kicker"><span>04 / THE MOTION SIDE</span></p><h2 id="video-heading" className="section-heading">Every Frame<br />Tells a <span className="gradient-text">Story.</span></h2></div><p className="section-description">The rhythm of a cut. The feeling of a moment.<br />A different medium. The same attention to detail.</p></div></Reveal>
        <Reveal delay={0.1}><button type="button" className="featured-reel" onClick={() => setSelected(showreel)} aria-label={showreel.url ? "Play featured showreel" : "View upcoming showreel details"}>
          <Image className="reel-poster" src={showreel.poster} alt="Original abstract orbital artwork for Derick’s upcoming showreel" fill sizes="(max-width: 768px) 100vw, 1200px" />
          <span className="reel-topline"><span><span className="reel-status-dot" /> {showreel.url ? "FEATURED SHOWREEL" : "SHOWREEL / COMING SOON"}</span><span>DIRECTED BY CURIOSITY</span></span>
          <span className="reel-center"><span className="reel-play"><Play size={23} fill="currentColor" /></span><span className="reel-title">A little rhythm.<br /><em>A clear message.</em></span></span>
          <span className="reel-bottomline"><span>CODE. CUT. CREATE.</span><span>{showreel.url ? "PLAY SHOWREEL" : "THE FIRST REEL IS ON ITS WAY"} <ArrowUpRight size={15} /></span></span>
          <span className="reel-timeline" aria-hidden="true"><span /><i /></span>
        </button></Reveal>
        <Reveal className="creative-practice-note"><div><span className="mono">MUSIC, TIMING & A MESSAGE</span><p>{creativePractice.introduction}</p><p>{creativePractice.musicConnection}</p></div><div className="creative-skill-list">{creativePractice.skills.map(skill => <span className="tag" key={skill}>{skill}</span>)}</div></Reveal>
        <div className="video-collection-heading"><span><Film size={16} /> THE CUTTING ROOM</span><span>SELECT A TRACK ↓</span></div>
        <div className="video-filters" role="group" aria-label="Filter video work by category">{videoCategories.map((filter) => <button key={filter} className={`video-filter ${category === filter ? "is-active" : ""}`} type="button" aria-pressed={category === filter} onClick={() => setCategory(filter)}>{filter}</button>)}</div>
        <p className="visually-hidden" role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? "video" : "videos"} in {category}.</p>
        <motion.div className="video-gallery" layout={!reduced}>
          <AnimatePresence mode="popLayout" initial={false}>{filtered.map((video, index) => <motion.article key={video.id} layout={!reduced} initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }} transition={{ duration: reduced ? 0 : 0.25, delay: index * 0.035 }} className="video-card">
            <button type="button" className="video-card-button" onClick={() => setSelected(video)} aria-label={video.url ? `Play ${video.title}` : `View ${video.title}, coming soon`}><span className="video-card-art"><Image src={video.poster} alt="Abstract placeholder artwork" fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" /><span className="video-frame-corner top-left" /><span className="video-frame-corner bottom-right" /><span className="video-card-play"><Play fill="currentColor" size={17} /></span><span className="video-coming-soon">{video.url ? "PLAY FILM" : "COMING SOON"}</span><span className="video-frame-number">F / {String(videos.indexOf(video) + 1).padStart(2, "0")}</span></span><span className="video-card-info"><span className="video-card-category">{video.category}</span><span className="video-card-title">{video.title}<ArrowUpRight size={18} /></span></span></button>
          </motion.article>)}</AnimatePresence>
        </motion.div>
        <p className="video-placeholder-note">{creativePractice.publicationNote}</p>
      </div>
      <MediaDialog key={selected?.title ?? "closed"} item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}


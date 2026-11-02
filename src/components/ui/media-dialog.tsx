"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Clapperboard, ExternalLink, X } from "lucide-react";

export type MediaItem = { title: string; description: string; poster: string; url: string };

function getMedia(url: string): { kind: "video" | "embed"; src: string } | null {
  if (/^\/assets\/[\w./-]+\.(mp4|webm)$/i.test(url)) return { kind: "video", src: url };
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    if (["www.youtube.com", "youtube.com", "youtu.be", "www.youtube-nocookie.com"].includes(parsed.hostname)) {
      const id = parsed.hostname === "youtu.be" ? parsed.pathname.slice(1) : parsed.searchParams.get("v") || parsed.pathname.split("/").pop();
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return { kind: "embed", src: `https://www.youtube-nocookie.com/embed/${id}?rel=0` };
    }
    if (["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(parsed.hostname)) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      if (id && /^\d+$/.test(id)) return { kind: "embed", src: `https://player.vimeo.com/video/${id}?dnt=1` };
    }
  } catch { /* Missing or unsupported media is an honest placeholder. */ }
  return null;
}

export function MediaDialog({ item, onClose }: { item: MediaItem | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [playbackError, setPlaybackError] = useState(false);
  const media = item ? getMedia(item.url) : null;

  useEffect(() => {
    if (!item || !dialog.current) return;
    const activeElement = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      activeElement?.focus();
    };
  }, [item]);

  if (!item) return null;
  return (
    <dialog ref={dialog} className="media-dialog" aria-labelledby="media-dialog-title" aria-describedby="media-dialog-description" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="media-dialog-inner">
        <button className="media-close" type="button" aria-label="Close video dialog" onClick={onClose}><X size={22} /></button>
        <div className="media-dialog-screen">
          {media?.kind === "video" ? <video key={media.src} controls playsInline preload="metadata" poster={item.poster} onError={() => setPlaybackError(true)}><source src={media.src} />Your browser does not support this video.</video> : media?.kind === "embed" ? <iframe src={media.src} title={item.title} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <><Image src={item.poster} alt="Original abstract placeholder artwork; no video is attached" fill sizes="(max-width: 800px) 95vw, 900px" /><div className="media-placeholder"><Clapperboard size={34} /><span>THE NEXT CUT IS COMING.</span><small>{item.url ? "This media link needs updating." : "Video coming soon · original placeholder artwork"}</small></div></>}
        </div>
        <div className="media-dialog-copy"><span className="section-kicker">{media ? "NOW SHOWING" : "COMING SOON"}</span><h2 id="media-dialog-title">{item.title}</h2><p id="media-dialog-description">{item.description}</p>{playbackError && <p role="alert">This video could not be loaded. Please try again later.</p>}{media?.kind === "embed" && <a href={item.url} target="_blank" rel="noopener noreferrer">Watch on the original platform <ExternalLink size={14} /></a>}</div>
      </div>
    </dialog>
  );
}

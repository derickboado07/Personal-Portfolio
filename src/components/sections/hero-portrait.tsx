"use client";

import { Code2, Film } from "lucide-react";
import Image from "next/image";
import { DBMonogram } from "@/components/ui/db-monogram";
import { useState } from "react";
import { profile } from "@/data/portfolio";

export function HeroPortrait() {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const hasPortrait = Boolean(profile.portrait) && failedSource !== profile.portrait;

  return (
    <figure className="cinematic-portrait">
      <div className="cinematic-portrait-stage">
        <div className="cinematic-portrait-grid" aria-hidden="true" />
        <div className="cinematic-orbit cinematic-orbit-outer" aria-hidden="true" />
        <div className="cinematic-orbit cinematic-orbit-inner" aria-hidden="true" />
        <div className="cinematic-light" aria-hidden="true" />
        {hasPortrait ? (
          <div className="cinematic-photo">
            <Image
              src={profile.portrait}
              alt={profile.portraitAlt}
              fill
              priority
              sizes="(max-width: 600px) 90vw, (max-width: 900px) 540px, (max-width: 1392px) 43vw, 560px"
              onError={() => setFailedSource(profile.portrait)}
            />
          </div>
        ) : (
          <div className="cinematic-placeholder" role="img" aria-label="Derick Boado monogram. Portrait coming soon.">
            <DBMonogram className="cinematic-monogram" dimensional />
            <span className="cinematic-placeholder-label mono">THE PERSON BEHIND THE PROCESS</span>
          </div>
        )}
        <span className="cinematic-frame-label mono">{hasPortrait ? "A DIFFERENT PERSPECTIVE" : "PORTRAIT / COMING SOON"}</span>
        <span className="cinematic-crosshair" aria-hidden="true" />
        <span className="cinematic-code-accent mono" aria-hidden="true"><Code2 size={20} /> built with purpose</span>
        <span className="cinematic-film-accent" aria-hidden="true"><Film size={19} /><span /><span /><span /></span>
        <div className="cinematic-seal mono" aria-hidden="true"><span>DEVELOP</span><span>ANALYZE</span><span>CREATE</span></div>
        <div className="cinematic-nameplate">
          <div><span className="mono">THE MIND BEHIND DBCREATES</span><p>Derick <span>Boado.</span></p></div>
          <span className="cinematic-nameplate-mark" aria-hidden="true">↗</span>
        </div>
      </div>
      <figcaption className="cinematic-portrait-caption mono"><span>CODE. DATA. A CREATIVE PERSPECTIVE.</span><span aria-hidden="true">01 — DB</span></figcaption>
    </figure>
  );
}





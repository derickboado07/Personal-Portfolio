"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Clapperboard, Code2, Smartphone } from "lucide-react";
import "./projects-category.css";

type Category = "web" | "mobile" | "video";
const categories: { id: Category; label: string; hash: string; Icon: typeof Code2 }[] = [
  { id: "web", label: "Web Development", hash: "#web-development", Icon: Code2 },
  { id: "mobile", label: "Mobile Application", hash: "#mobile-application", Icon: Smartphone },
  { id: "video", label: "Video Works", hash: "#video-work", Icon: Clapperboard },
];

export function ProjectsCategory({ web, mobile, video }: { web: ReactNode; mobile: ReactNode; video: ReactNode }) {
  const [active, setActive] = useState<Category>("web");
  const tabs = useRef<Record<Category, HTMLButtonElement | null>>({ web: null, mobile: null, video: null });

  useEffect(() => {
    const fromHash = () => {
      const category = categories.find(item => item.hash === window.location.hash);
      if (category) setActive(category.id);
      else if (window.location.hash === "#projects") setActive("web");
    };
    // Intercept same-hash navigation, which does not fire a hashchange event.
    const fromLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search) return;
      const category = categories.find(item => item.hash === url.hash);
      if (!category && url.hash !== "#projects") return;
      // Native hash links create a history entry without Next's route state. Use
      // its patched history API so Back can restore the page after a case study.
      event.preventDefault();
      if (category) setActive(category.id);
      else setActive("web");
      if (window.location.hash !== url.hash) window.history.pushState(null, "", url.hash);
      document.getElementById(url.hash.slice(1))?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    };
    fromHash();
    // The browser can resolve the hash before the rest of the homepage has
    // settled, leaving a direct category link at the top of the page.
    const initialHash = window.location.hash;
    if (categories.some(item => item.hash === initialHash) || initialHash === "#projects") {
      requestAnimationFrame(() => document.getElementById(initialHash.slice(1))?.scrollIntoView({ behavior: "instant" }));
    }
    window.addEventListener("hashchange", fromHash);
    document.addEventListener("click", fromLink, true);
    return () => {
      window.removeEventListener("hashchange", fromHash);
      document.removeEventListener("click", fromLink, true);
    };
  }, []);

  const select = (category: Category, focus = false) => {
    setActive(category);
    const hash = categories.find(item => item.id === category)!.hash;
    if (window.location.hash !== hash) window.history.pushState(null, "", hash);
    if (focus) tabs.current[category]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let next: Category | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const index = categories.findIndex(item => item.id === active);
      next = categories[(index + direction + categories.length) % categories.length].id;
    }
    else if (event.key === "Home") next = "web";
    else if (event.key === "End") next = "video";
    if (next) { event.preventDefault(); select(next, true); }
  };

  return <section id="projects" tabIndex={-1} className="section projects-section projects-category-shell" aria-label="Projects">
    <span id="web-development" className="projects-category-anchor" tabIndex={-1} aria-label="Web development" />
    <span id="mobile-application" className="projects-category-anchor" tabIndex={-1} aria-label="Mobile application" />
    <span id="video-work" className="projects-category-anchor" tabIndex={-1} aria-label="Video works" />
    <div className="container">
      <div className="projects-category-tabs" role="tablist" aria-label="Project category" onKeyDown={onKeyDown}>
        {categories.map(({ id, label, Icon }) => <button key={id} id={`projects-tab-${id}`} ref={element => { tabs.current[id] = element; }} type="button" role="tab" aria-selected={active === id} aria-controls={`projects-panel-${id}`} tabIndex={active === id ? 0 : -1} onClick={() => select(id)}><Icon size={16} aria-hidden="true" />{label}</button>)}
      </div>
    </div>
    <div id="projects-panel-web" className="projects-category-panel" role="tabpanel" aria-labelledby="projects-tab-web" hidden={active !== "web"}>{web}</div>
    <div id="projects-panel-mobile" className="projects-category-panel" role="tabpanel" aria-labelledby="projects-tab-mobile" hidden={active !== "mobile"}>{mobile}</div>
    <div id="projects-panel-video" className="projects-category-panel" role="tabpanel" aria-labelledby="projects-tab-video" hidden={active !== "video"}>{video}</div>
    <noscript><style>{`.projects-category-tabs { display: none !important; } @layer base { #projects .projects-category-panel[hidden] { display: block !important; } }`}</style></noscript>
  </section>;
}

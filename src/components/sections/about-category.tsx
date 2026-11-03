"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Route, UserRound } from "lucide-react";
import "./about-category.css";

type Category = "about" | "journey";
const categories = [
  { id: "about", label: "More About Me", hash: "#more-about-me", Icon: UserRound },
  { id: "journey", label: "Journey", hash: "#journey", Icon: Route },
] as const;

export function AboutCategory({ about, journey }: { about: ReactNode; journey: ReactNode }) {
  const [active, setActive] = useState<Category>("about");
  const tabs = useRef<Record<Category, HTMLButtonElement | null>>({ about: null, journey: null });

  useEffect(() => {
    const fromHash = () => {
      const category = categories.find(item => item.hash === window.location.hash);
      if (category) setActive(category.id);
      else if (window.location.hash === "#about") setActive("about");
    };
    const fromLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search) return;
      const category = categories.find(item => item.hash === url.hash);
      if (!category && url.hash !== "#about") return;
      // Use Next's patched history API so Back can restore the previous route.
      event.preventDefault();
      setActive(category?.id ?? "about");
      if (window.location.hash !== url.hash) window.history.pushState(null, "", url.hash);
      document.getElementById(url.hash.slice(1))?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    };
    fromHash();
    const initialHash = window.location.hash;
    const frame = categories.some(item => item.hash === initialHash) || initialHash === "#about"
      ? requestAnimationFrame(() => document.getElementById(initialHash.slice(1))?.scrollIntoView({ behavior: "instant" }))
      : 0;
    window.addEventListener("hashchange", fromHash);
    document.addEventListener("click", fromLink, true);
    return () => {
      cancelAnimationFrame(frame);
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
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") next = active === "about" ? "journey" : "about";
    else if (event.key === "Home") next = "about";
    else if (event.key === "End") next = "journey";
    if (next) { event.preventDefault(); select(next, true); }
  };

  return <section id="about" tabIndex={-1} className="section about-category-shell" aria-label="About">
    <span id="more-about-me" className="about-category-anchor" tabIndex={-1} aria-label="More about me" />
    <span id="journey" className="about-category-anchor" tabIndex={-1} aria-label="Journey" />
    <div className="container">
      <div className="about-category-tabs" role="tablist" aria-label="About category" onKeyDown={onKeyDown}>
        {categories.map(({ id, label, Icon }) => <button key={id} id={`about-tab-${id}`} ref={element => { tabs.current[id] = element; }} type="button" role="tab" aria-selected={active === id} aria-controls={`about-panel-${id}`} tabIndex={active === id ? 0 : -1} onClick={() => select(id)}><Icon size={16} aria-hidden="true" />{label}</button>)}
      </div>
    </div>
    <div id="about-panel-about" className="about-category-panel" role="tabpanel" aria-labelledby="about-tab-about" hidden={active !== "about"}>{about}</div>
    <div id="about-panel-journey" className="about-category-panel" role="tabpanel" aria-labelledby="about-tab-journey" hidden={active !== "journey"}>{journey}</div>
    <noscript><style>{`.about-category-tabs { display: none !important; } @layer base { #about .about-category-panel[hidden] { display: block !important; } }`}</style></noscript>
  </section>;
}

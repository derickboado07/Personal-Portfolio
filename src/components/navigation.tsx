"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import { navigation, profile } from "@/data/portfolio";

export function Navigation() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileMenu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-20% 0px -55% 0px", threshold: 0 });
    navigation.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileMenu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
      if (event.key === "Tab") {
        const links = mobileMenu.current?.querySelectorAll<HTMLAnchorElement>("a");
        if (!links?.length) return;
        const first = links[0], last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); menuButton.current?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); menuButton.current?.focus(); }
        else if (document.activeElement === menuButton.current) { event.preventDefault(); (event.shiftKey ? last : first).focus(); }
      }
    };
    const resize = () => { if (window.innerWidth >= 1080) setOpen(false); };
    document.addEventListener("keydown", key);
    window.addEventListener("resize", resize);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", key); window.removeEventListener("resize", resize); };
  }, [open]);

  return <header className={`site-header ${open ? "menu-is-open" : ""}`}>
    <div className="nav-shell container">
      <a className="brand" href="#home" aria-label="Derick Boado, home"><span className="brand-mark" aria-hidden="true">d<span>.</span></span><span className="brand-words"><strong>DERICK</strong><span>CODE / DATA / CREATE</span></span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <a key={item.id} href={`#${item.id}`} className={active === item.id ? "active" : ""} aria-current={active === item.id ? "location" : undefined}>{item.label}</a>)}</nav>
      <div className="nav-actions">{profile.cvPath ? <a className="nav-cta" href={profile.cvPath} download>Download CV <Download size={14} /></a> : <a className="nav-cta" href="#contact">Let’s talk <ArrowUpRight size={15} /></a>}<button className="menu-toggle icon-button" type="button" ref={menuButton} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
    </div>
    <div id="mobile-navigation" ref={mobileMenu} className="mobile-menu" hidden={!open}><nav aria-label="Mobile navigation">{navigation.map((item, index) => <a href={`#${item.id}`} key={item.id} aria-current={active === item.id ? "location" : undefined} onClick={() => { setOpen(false); document.getElementById(item.id)?.focus({ preventScroll: true }); }}><span className="mono">0{index + 1}</span>{item.label}<ArrowUpRight size={20} /></a>)}</nav><p className="mono">CODE. DATA. CREATIVITY.</p></div>
  </header>;
}

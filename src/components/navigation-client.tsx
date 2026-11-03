"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, ChevronDown, Clapperboard, Code2, Download, FolderCode, House, Layers3, Mail, Menu, Route, Smartphone, UserRound, X, type LucideIcon } from "lucide-react";
import { navigation, profile } from "@/data/portfolio";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import "./navigation.css";

const navigationIcons: Record<string, LucideIcon> = { home: House, about: UserRound, "more-about-me": UserRound, projects: FolderCode, "web-development": Code2, "mobile-application": Smartphone, "video-work": Clapperboard, skills: Layers3, journey: Route, contact: Mail };

export function NavigationClient({ logo }: { logo: ReactNode }) {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileMenu = useRef<HTMLDivElement>(null);
  const desktopMenu = useRef<HTMLElement>(null);

  useEffect(() => {
    // Category anchors share the tops of their sections and must not compete
    // with the full-height sections for the active navigation state.
    const sections = ["home", "about", "projects", "skills", "contact"]
      .map(id => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = "home";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
        else break;
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(schedule, { rootMargin: "-20% 0px -55% 0px" });
    const resizeObserver = new ResizeObserver(schedule);
    sections.forEach(section => { observer.observe(section); resizeObserver.observe(section); });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => { observer.disconnect(); resizeObserver.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);

  useEffect(() => {
    if (!dropdown) return;
    const dismiss = (event: PointerEvent) => {
      if (!desktopMenu.current?.contains(event.target as Node)) setDropdown(null);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [dropdown]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileMenu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); setMobileGroup(null); menuButton.current?.focus(); }
      if (event.key === "Tab") {
        const controls = Array.from(mobileMenu.current?.querySelectorAll<HTMLElement>("a, button") ?? [])
          .filter(element => element.getClientRects().length > 0);
        if (!controls.length) return;
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); menuButton.current?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); menuButton.current?.focus(); }
        else if (document.activeElement === menuButton.current) { event.preventDefault(); (event.shiftKey ? last : first).focus(); }
      }
    };
    const resize = () => { if (window.innerWidth >= 1080) { setOpen(false); setMobileGroup(null); } };
    document.addEventListener("keydown", key);
    window.addEventListener("resize", resize);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", key); window.removeEventListener("resize", resize); };
  }, [open]);

  const visitMobileSection = (id: string) => {
    setActive(["web-development", "mobile-application", "video-work"].includes(id) ? "projects" : ["more-about-me", "journey"].includes(id) ? "about" : id);
    setOpen(false);
    setMobileGroup(null);
    document.getElementById(id)?.focus({ preventScroll: true });
  };

  return <header className={`site-header ${open ? "menu-is-open" : ""}`}>
    <div className="nav-shell container">
      <a className="brand brand-home" href="/" aria-label="DBCreates — Derick Boado, home" onClick={() => setOpen(false)}>{logo}</a>
      <nav ref={desktopMenu} className="desktop-nav nav-primary" aria-label="Main navigation">
        {navigation.map(item => {
          const Icon = navigationIcons[item.id];
          const isActive = active === item.id || item.children?.some(child => child.id === active);
          const expanded = dropdown === item.id;
          return <div key={item.id} className="nav-item"
            onPointerEnter={event => { if (event.pointerType === "mouse" && item.children) setDropdown(item.id); }}
            onPointerLeave={event => { if (expanded && event.pointerType === "mouse" && !event.currentTarget.contains(document.activeElement)) setDropdown(null); }}
            onBlur={event => { if (expanded && !event.currentTarget.contains(event.relatedTarget)) setDropdown(null); }}
            onKeyDown={event => {
              if (event.key === "Escape" && expanded) {
                event.preventDefault();
                event.stopPropagation();
                setDropdown(null);
                event.currentTarget.querySelector<HTMLButtonElement>("button")?.focus();
              }
              if (event.key === "ArrowDown" && item.children) {
                event.preventDefault();
                setDropdown(item.id);
                const group = event.currentTarget;
                requestAnimationFrame(() => group.querySelector<HTMLAnchorElement>(".nav-submenu a")?.focus());
              }
            }}>
            <div className="nav-item-row">
              <a href={`#${item.id}`} className={isActive ? "active" : ""} aria-current={isActive ? "location" : undefined} onClick={() => { setActive(item.id); setDropdown(null); }}>
                <Icon size={14} aria-hidden="true" /><span className="nav-label">{item.label}</span>
              </a>
              {item.children && <button className="nav-submenu-toggle" type="button" aria-label={`${item.label} sections`} aria-expanded={expanded} aria-controls={`nav-submenu-${item.id}`} onClick={() => setDropdown(expanded ? null : item.id)}><ChevronDown size={13} aria-hidden="true" /></button>}
            </div>
            {item.children && <div id={`nav-submenu-${item.id}`} className="nav-submenu" hidden={!expanded}>
              {item.children.map(child => {
                const ChildIcon = navigationIcons[child.id];
                return <a key={child.id} href={`#${child.id}`} className={active === child.id ? "active" : ""} aria-current={active === child.id ? "location" : undefined} onClick={() => { setActive(item.id); setDropdown(null); }}><ChildIcon size={15} aria-hidden="true" /><span className="nav-label">{child.label}</span><ArrowUpRight size={13} aria-hidden="true" /></a>;
              })}
            </div>}
          </div>;
        })}
      </nav>
      <div className="nav-actions"><ThemeToggle />{profile.cvPath ? <a className="nav-cta" href={profile.cvPath} download>Download CV <Download size={14} /></a> : <a className="nav-cta" href="#contact">Let’s talk <ArrowUpRight size={15} /></a>}<button className="menu-toggle icon-button" type="button" ref={menuButton} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => { setOpen(!open); setDropdown(null); setMobileGroup(null); }}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
    </div>
    <div id="mobile-navigation" ref={mobileMenu} className="mobile-menu" hidden={!open}>
      <nav aria-label="Mobile navigation">{navigation.map(item => {
        const Icon = navigationIcons[item.id];
        return <div className="mobile-nav-group" key={item.id}>
          {item.children ? <button className="mobile-nav-disclosure" type="button" aria-expanded={mobileGroup === item.id} aria-controls={`mobile-nav-children-${item.id}`} aria-current={active === item.id ? "location" : undefined} onClick={() => setMobileGroup(mobileGroup === item.id ? null : item.id)}><Icon className="mobile-nav-icon" size={20} aria-hidden="true" /><span className="nav-label">{item.label}</span><ChevronDown className="mobile-nav-chevron" size={20} aria-hidden="true" /></button> : <a href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined} onClick={() => visitMobileSection(item.id)}><Icon className="mobile-nav-icon" size={20} aria-hidden="true" /><span className="nav-label">{item.label}</span><ArrowUpRight size={20} aria-hidden="true" /></a>}
          {item.children && <div id={`mobile-nav-children-${item.id}`} className="mobile-nav-children" hidden={mobileGroup !== item.id}>{item.children.map(child => {
            const ChildIcon = navigationIcons[child.id];
            return <a key={child.id} href={`#${child.id}`} aria-current={active === child.id ? "location" : undefined} onClick={() => visitMobileSection(child.id)}><ChildIcon className="mobile-nav-icon" size={16} aria-hidden="true" /><span className="nav-label">{child.label}</span><ArrowUpRight size={16} aria-hidden="true" /></a>;
          })}</div>}
        </div>;
      })}</nav>
      <p className="mono">Code. Data. Create.</p>
    </div>
  </header>;
}

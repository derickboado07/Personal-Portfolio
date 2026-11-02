import { ArrowUpRight, Heart } from "lucide-react";
import { navigation, profile } from "@/data/portfolio";

export function Footer() {
  return <footer className="site-footer"><div className="container"><div className="footer-top"><a className="brand" href="#home" aria-label={`${profile.displayName}, back to top`}><span className="brand-mark" aria-hidden="true">d<span>.</span></span><span className="brand-words"><strong>DERICK</strong><span>CODE / DATA / CREATE</span></span></a><p>Practical ideas. A personal point of view.<br /><span className="text-muted">From {profile.location}, with curiosity.</span></p><a href="#home" className="back-top mono">BACK TO TOP <span><ArrowUpRight size={20} /></span></a></div><nav className="footer-nav" aria-label="Footer navigation">{navigation.map(item => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</nav><div className="footer-bottom mono"><span>© {new Date().getFullYear()} {profile.name.toUpperCase()}</span><span>MADE WITH <Heart size={11} /> FAITH, DISCIPLINE & CURIOSITY.</span><span>THE NEXT CHAPTER IS OPEN <span className="footer-end" /></span></div></div></footer>;
}

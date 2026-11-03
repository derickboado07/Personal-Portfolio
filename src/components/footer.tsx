import { ArrowUpRight, Heart } from "lucide-react";
import { navigation, profile } from "@/data/portfolio";
import { BrandLogo } from "@/components/ui/brand-logo";

export function Footer() {
  return <footer className="site-footer"><div className="container"><div className="footer-top"><div className="footer-identity"><a className="brand brand-home" href="/" aria-label="DBCreates — Derick Boado, home"><BrandLogo variant="footer" /></a><span className="footer-brand-tagline mono">Code. Data. Create.</span></div><p className="footer-brand-description">{profile.brandStatement}</p><a href="#home" className="back-top mono">BACK TO TOP <span><ArrowUpRight size={20} /></span></a></div><nav className="footer-nav" aria-label="Footer navigation">{navigation.map(item => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</nav><div className="footer-bottom mono"><span>© {new Date().getFullYear()} {profile.name.toUpperCase()} · DBCREATES</span><span>MADE WITH <Heart size={11} /> FAITH, DISCIPLINE & CURIOSITY.</span><span>THE NEXT CHAPTER IS OPEN <span className="footer-end" /></span></div></div></footer>;
}

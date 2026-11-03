import Image from "next/image";
import { DBMonogram } from "./db-monogram";
import { brandingAssets } from "@/lib/branding";

type BrandLogoProps = { variant: "navigation" | "footer" | "card" | "loading" };

function BrandMonogram({ className }: { className: string }) {
  return <DBMonogram className={`brand-monogram ${className}`} />;
}

export function BrandLogo({ variant }: BrandLogoProps) {
  if (variant === "loading") {
    const src = brandingAssets.monogram || brandingAssets.primary || brandingAssets.wordmark;
    return src
      ? <span className="brand-logo brand-logo--loading"><Image src={src} alt="DBCreates" fill sizes="160px" className="brand-artwork" loading="eager" /></span>
      : <BrandMonogram className="loader-fallback-mark" />;
  }
  if (variant === "card") {
    if (!brandingAssets.monogram) {
      return <DBMonogram className="portrait-monogram" dimensional />;
    }
    return <div className="portrait-brand-logo"><Image src={brandingAssets.monogram} alt="DBCreates DB monogram" fill sizes="(max-width: 760px) 45vw, 220px" className="brand-artwork" /></div>;
  }

  const horizontal = variant === "footer"
    ? brandingAssets.wordmark || brandingAssets.primary
    : brandingAssets.primary || brandingAssets.wordmark;
  const src = horizontal || brandingAssets.monogram;

  if (!src) {
    return <span className="brand-identity"><span className="brand-wordmark"><BrandMonogram className="brand-mark" /><span className="brand-name">creates</span></span><span className="brand-tagline">CODE / DATA / CREATE</span></span>;
  }

  return <picture className={`brand-logo brand-logo--${variant}${horizontal ? "" : " brand-logo--compact"}${brandingAssets.monogram ? " brand-logo--responsive" : ""}`}>
    {variant === "navigation" && brandingAssets.monogram && <source media="(max-width: 760px)" srcSet={brandingAssets.monogram} />}
    <Image src={src} alt="DBCreates" fill sizes={variant === "navigation" ? "(max-width: 760px) 44px, 168px" : "180px"} className="brand-artwork" loading={variant === "navigation" ? "eager" : "lazy"} />
  </picture>;
}




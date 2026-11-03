import { BrandLogo } from "@/components/ui/brand-logo";

export function LoadingScreen() {
  return <div className="loading-screen" role="status" aria-live="polite" aria-label="Loading DBCreates portfolio">
    <div className="loader-content">
      <div className="loader-emblem" aria-hidden="true">
        <span className="loader-orbit" />
        <span className="loader-orbit loader-orbit-inner" />
        <div className="loader-logo"><BrandLogo variant="loading" /></div>
      </div>
      <p className="loader-tagline mono" aria-hidden="true">CODE. DATA. CREATE.</p>
      <div className="loader-track" aria-hidden="true"><span /></div>
      <p className="loader-caption">Loading portfolio<span className="loader-dots" aria-hidden="true"><i /><i /><i /></span></p>
    </div>
  </div>;
}

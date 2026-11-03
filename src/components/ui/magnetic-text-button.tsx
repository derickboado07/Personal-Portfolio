"use client";

import type { ReactNode } from "react";
import { MagneticLink } from "./magnetic-link";
import "./interactive-text.css";

type MagneticTextButtonProps = {
  href: string;
  label: string;
  className?: string;
  icon?: ReactNode;
};

export function MagneticTextButton({ href, label, className = "", icon }: MagneticTextButtonProps) {
  return (
    <MagneticLink href={href} className={`magnetic-text-button ${className}`}>
      <span className="magnetic-text-label">
        <span className="magnetic-text-copy magnetic-text-primary">{label}</span>
        <span className="magnetic-text-copy magnetic-text-duplicate" aria-hidden="true">{label}</span>
      </span>
      {icon && <span className="magnetic-text-arrow" aria-hidden="true">{icon}</span>}
    </MagneticLink>
  );
}

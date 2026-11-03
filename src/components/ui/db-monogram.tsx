import { useId } from "react";

type DBMonogramProps = { className?: string; dimensional?: boolean };

// Lowercase letterforms share the same metallic face, bevel, and extrusion layers.
export function DBMonogram({ className = "", dimensional = false }: DBMonogramProps) {
  const id = useId();
  const shape = `${id}-shape`;
  const metal = `${id}-metal`;
  const edge = `${id}-edge`;
  const grain = `${id}-grain`;
  const shadow = `${id}-shadow`;
  const bevel = `${id}-bevel`;
  const frame = "M84 62V27L48 6 12 27V69L48 90 84 69";

  return (
    <svg className={`db-emblem ${className}`} viewBox="0 0 96 96" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <g id={shape} fillRule="evenodd" clipRule="evenodd">
          <path id={`${id}-d`} d="M37 27H44V68H28L21 61V49L28 42H37V27ZM30 49L28 51V59L30 61H37V49H30Z" />
          <path id={`${id}-b`} d="M49 27H56V42H65L72 49V61L65 68H49V27ZM56 49V61H63L65 59V51L63 49H56Z" />
          <path id={`${id}-dot`} d="M75 64H79V68H75Z" />
        </g>
        <linearGradient id={metal} x1="25" y1="20" x2="58" y2="78" gradientUnits="userSpaceOnUse">
          {dimensional ? <>
            <stop stopColor="#f4f6fa" />
            <stop offset=".22" stopColor="var(--brand-lavender)" />
            <stop offset=".42" stopColor="#8895b0" />
            <stop offset=".49" stopColor="#e4e8f2" />
            <stop offset=".53" stopColor="#f4f6fa" />
            <stop offset=".57" stopColor="#939fb7" />
            <stop offset=".82" stopColor="var(--brand-lavender)" />
            <stop offset="1" stopColor="#77839e" />
          </> : <>
            <stop stopColor="var(--brand-lavender)" />
            <stop offset=".4" stopColor="var(--foreground)" />
            <stop offset="1" stopColor="var(--brand-periwinkle)" />
          </>}
        </linearGradient>

        {[
          { gradient: `${id}-d-color`, base: "var(--brand-lavender)", shade: "#604880" },

        ].map(({ gradient, base, shade }) => (
          <linearGradient key={gradient} id={gradient} x1="25" y1="20" x2="58" y2="78" gradientUnits="userSpaceOnUse">
            {dimensional ? <>
              <stop stopColor={`color-mix(in srgb, ${base} 75%, white)`} />
              <stop offset=".22" stopColor={base} />
              <stop offset=".42" stopColor={`color-mix(in srgb, ${base} 70%, ${shade})`} />
              <stop offset=".49" stopColor={`color-mix(in srgb, ${base} 65%, white)`} />
              <stop offset=".53" stopColor={`color-mix(in srgb, ${base} 50%, white)`} />
              <stop offset=".57" stopColor={`color-mix(in srgb, ${base} 75%, ${shade})`} />
              <stop offset=".82" stopColor={base} />
              <stop offset="1" stopColor={`color-mix(in srgb, ${base} 65%, ${shade})`} />
            </> : <>
              <stop stopColor={`color-mix(in srgb, ${base} 85%, white)`} />
              <stop offset=".4" stopColor={base} />
              <stop offset="1" stopColor={`color-mix(in srgb, ${base} 85%, ${shade})`} />
            </>}
          </linearGradient>
        ))}
        <linearGradient id={`${id}-b-color`} x1="0" y1="0" x2="1" y2=".15">
          <stop offset=".1" stopColor="var(--brand-lavender)" />
          <stop offset=".54" stopColor="color-mix(in srgb, var(--brand-periwinkle) 60%, var(--cyan))" />
          <stop offset=".85" stopColor="var(--cyan)" />
          <stop offset="1" stopColor="var(--cyan)" />
        </linearGradient>
        <linearGradient id={edge} x1="19" y1="12" x2="76" y2="81" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f4f6fa" />
          <stop offset=".35" stopColor="var(--brand-lavender)" />
          <stop offset=".6" stopColor="#65738f" />
          <stop offset="1" stopColor="#35435d" />
        </linearGradient>
        {dimensional && <>
          <pattern id={grain} width="3" height=".65" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)">
            <path d="M0 .1H3" stroke="#f4f6fa" strokeWidth=".07" opacity=".35" />
            <path d="M0 .36H3" stroke="#0b1220" strokeWidth=".06" opacity=".22" />
            <path d="M0 .55H3" stroke="#f4f6fa" strokeWidth=".04" opacity=".2" />
          </pattern>
          <filter id={shadow} x="-30%" y="-25%" width="170%" height="180%" colorInterpolationFilters="sRGB">
            <feDropShadow dx="1.2" dy="2.2" stdDeviation="1.05" floodColor="#030814" floodOpacity=".65" />
          </filter>
          <filter id={bevel} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceAlpha" stdDeviation=".35" result="surface" />
            <feSpecularLighting in="surface" surfaceScale="1.4" specularConstant=".6" specularExponent="28" lightingColor="#f4f6fa" result="reflection">
              <feDistantLight azimuth="225" elevation="48" />
            </feSpecularLighting>
            <feComposite in="reflection" in2="SourceAlpha" operator="in" result="clippedReflection" />
            <feBlend in="SourceGraphic" in2="clippedReflection" mode="screen" />
          </filter>
        </>}
      </defs>

      <g filter={dimensional ? `url(#${shadow})` : undefined}>
        <path d={frame} transform={dimensional ? "translate(.65 1.25)" : "translate(.3 .5)"} stroke="#303d54" strokeWidth="1.7" />
        <path d={frame} stroke={`url(#${metal})`} strokeWidth="1.5" strokeLinejoin="miter" />
        {dimensional && <path d={frame} stroke={`url(#${edge})`} strokeWidth=".35" opacity=".8" />}

        <use href={`#${shape}`} transform={dimensional ? "translate(.9 1.6)" : "translate(.35 .65)"} fill="#303e57" stroke="#253149" strokeWidth=".35" />
        {dimensional && <>
          <use href={`#${shape}`} transform="translate(.65 1.1)" fill="#52617b" />
          <use href={`#${shape}`} transform="translate(.3 .55)" fill={`url(#${edge})`} />
        </>}
        <g filter={dimensional ? `url(#${bevel})` : undefined}>
          <use href={`#${id}-d`} fill={`url(#${id}-d-color)`} />
          <use href={`#${id}-b`} fill={`url(#${id}-b-color)`} />
          <use href={`#${id}-dot`} fill="var(--cyan)" />
          {dimensional && <use href={`#${shape}`} fill={`url(#${grain})`} opacity=".5" />}
        </g>
        <use href={`#${shape}`} stroke={`url(#${edge})`} strokeWidth={dimensional ? ".4" : ".2"} />
        <path d="M69 77.75 84 69" transform={dimensional ? "translate(.65 1.25)" : undefined} stroke="#12546a" strokeWidth="2.1" />
        <path d="M69 77.75 84 69" stroke="var(--cyan)" strokeWidth="2" />
        {dimensional && <path d="M69 77.4 84 68.65" stroke="#c9f9ff" strokeWidth=".35" opacity=".8" />}
      </g>
    </svg>
  );
}




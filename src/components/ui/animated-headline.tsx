"use client";

import { Fragment } from "react";
import { AnimatedGradientText } from "./animated-gradient-text";

export function AnimatedHeadline({ lines, highlight = lines.length - 1, settled = false, id, className = "" }: {
  lines: readonly string[]; highlight?: number; settled?: boolean; id?: string; className?: string;
}) {
  return <h1 id={id} className={className} aria-label={lines.join(" ")}>
    {lines.map((line, lineIndex) => {
      const words = line.split(" ").map((word, wordIndex) => (
        <Fragment key={word + wordIndex}>
          {wordIndex > 0 ? " " : null}
          <span className="hero-motion-word" data-hero-word data-line={lineIndex} data-word={wordIndex}>{word}</span>
        </Fragment>
      ));
      return <span key={line} className="cinematic-line" aria-hidden="true">
        {lineIndex === highlight
          ? <AnimatedGradientText text={line} play={settled}>{words}</AnimatedGradientText>
          : <span className="cinematic-line-content">{words}</span>}
      </span>;
    })}
  </h1>;
}

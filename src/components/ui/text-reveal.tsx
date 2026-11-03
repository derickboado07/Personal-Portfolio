"use client";

import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import "./section-motion.css";

function plainText(children: ReactNode): string {
  return Children.toArray(children).map(node => {
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (!isValidElement<{ children?: ReactNode }>(node)) return "";
    return node.type === "br" ? " " : plainText(node.props.children);
  }).join("");
}

function splitWords(children: ReactNode, prefix = "word"): ReactNode {
  return Children.map(children, (node, index) => {
    const key = `${prefix}-${index}`;
    if (typeof node === "string" || typeof node === "number") {
      return String(node).split(/(\s+)/u).map((part, partIndex) => /^\s*$/u.test(part) ? part : (
        <span className="section-word-mask" key={`${key}-${partIndex}`}>
          <span data-motion-word>{part}</span>
        </span>
      ));
    }
    if (!isValidElement<{ children?: ReactNode }>(node) || node.type === "br" || node.props.children === undefined) return node;
    return cloneElement(node, undefined, splitWords(node.props.children, key));
  });
}

/** Place inside an existing semantic heading; its text remains one accessible phrase. */
export function TextReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const text = plainText(children).replace(/\s+/gu, " ").trim();
  return (
    <span className={`section-text-reveal ${className}`} data-motion-text>
      <span className="sr-only" data-motion-accessible>{text}</span>
      <span className="section-text-visual" aria-hidden="true">{splitWords(children)}</span>
    </span>
  );
}

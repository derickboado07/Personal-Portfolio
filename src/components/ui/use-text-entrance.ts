"use client";

import { useEffect, useRef, type RefObject } from "react";
import { animate } from "motion/react";
import { useMotionPreference, usePortfolioReady } from "@/components/ui/use-portfolio-ready";

const defaultSelector = [
  "[data-motion-label]", "[data-motion-word]", "[data-motion-copy]", "[data-motion-visual]", "[data-motion-cta]",
  "h1", "h2", "h3", "h4", "p", ".section-kicker", ".toolkit-comment", ".contact-field label", ".experience-focus",
  ".project-image-link", ".portrait-frame", ".featured-reel", ".discipline-icon", ".project-card-meta", ".project-card-footer",
  ".analytics-tool-list", ".creative-skill-list", ".personal-note-meta", ".purpose-card-label",
].join(", ");
const visualSelector = "[data-motion-visual], .project-image-link, .portrait-frame, .featured-reel, .discipline-icon";
const labelSelector = "[data-motion-label], .section-kicker, .project-card-meta, .personal-note-meta, .purpose-card-label";
const ctaSelector = "[data-motion-cta], .project-card-footer, .button";
const visualOwnerSelector = ".analytics-workspace, .toolkit-window, .about-portrait";
const easing = [0.16, 1, 0.3, 1] as const;

type EntranceOptions = { delay?: number; distance?: number; selector?: string };
type SavedStyle = { opacity: string; transform: string; filter: string; willChange: string };

/** Progressive enhancement: text is visible in SSR; Motion only owns an active entrance. */
export function useTextEntrance(ref: RefObject<HTMLElement | null>, { delay = 0, distance = 22, selector = defaultSelector }: EntranceOptions = {}) {
  const reducedMotion = useMotionPreference();
  const ready = usePortfolioReady();
  const played = useRef(new WeakSet<HTMLElement>());

  useEffect(() => {
    const owner = ref.current;
    if (!ready || !owner || reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const styles = new Map<HTMLElement, SavedStyle>();
    const controls = new Set<{ stop: () => void }>();
    let cancelled = false;
    const restore = (element: HTMLElement) => {
      const saved = styles.get(element);
      if (!saved) return;
      element.style.opacity = saved.opacity;
      element.style.transform = saved.transform;
      element.style.filter = saved.filter;
      element.style.willChange = saved.willChange;
      styles.delete(element);
    };

    const all = owner.matches(visualOwnerSelector)
      ? [owner]
      : Array.from(owner.querySelectorAll<HTMLElement>(selector))
        .filter(element => element.closest("[data-text-reveal]") === owner)
        .filter(element => !element.closest("[data-motion-accessible], [data-motion-skip]"));

    // A word mask or visual is animated itself; its parent must never receive a second transform.
    const targets = all.filter(element => {
      if (element.hasAttribute("data-motion-word")) return true;
      if (element.querySelector("[data-motion-word]")) return false;
      return !all.some(parent => parent !== element && parent.contains(element)
        && (parent.matches(visualSelector) || parent.matches(labelSelector)));
    });
    if (!targets.length) return;
    const words = targets.filter(element => element.hasAttribute("data-motion-word"));
    const lastWordAt = words.length ? 0.12 + Math.min((words.length - 1) * 0.035, 0.42) : 0.2;
    const copyAt = Math.max(0.34, lastWordAt + 0.13);
    let copyIndex = 0;
    let visualIndex = 0;
    const schedule = new Map<HTMLElement, { at: number; kind: "word" | "label" | "heading" | "copy" | "visual" | "cta" }>();

    for (const element of targets) {
      if (element.hasAttribute("data-motion-word")) {
        schedule.set(element, { at: 0.12 + Math.min(words.indexOf(element) * 0.035, 0.42), kind: "word" });
      } else if (element.matches(labelSelector)) {
        schedule.set(element, { at: 0, kind: "label" });
      } else if (element.matches(ctaSelector)) {
        schedule.set(element, { at: copyAt + 0.34, kind: "cta" });
      } else if (element.matches(visualSelector) || element === owner) {
        schedule.set(element, { at: copyAt + 0.16 + Math.min(visualIndex++ * 0.06, 0.12), kind: "visual" });
      } else if (element.matches("h1, h2, h3, h4")) {
        schedule.set(element, { at: 0.12, kind: "heading" });
      } else {
        schedule.set(element, { at: copyAt + Math.min(copyIndex++ * 0.06, 0.18), kind: "copy" });
      }
    }

    const play = () => {
      for (const [element, { at, kind }] of schedule) {
        if (played.current.has(element)) continue;
        played.current.add(element);
        styles.set(element, {
          opacity: element.style.opacity,
          transform: element.style.transform,
          filter: element.style.filter,
          willChange: element.style.willChange,
        });
        element.style.willChange = "transform, opacity";
        const control = kind === "word"
          ? animate(element, { y: ["108%", "0%"], opacity: [0, 1], filter: ["blur(2px)", "blur(0px)"] }, { duration: 0.82, delay: delay + at, ease: easing })
          : kind === "label"
            ? animate(element, { x: [-9, 0], opacity: [0, 1] }, { duration: 0.48, delay: delay + at, ease: easing })
            : animate(element, { y: [kind === "copy" ? 12 : kind === "cta" ? 9 : distance, 0], opacity: [0, 1] }, {
              duration: kind === "visual" ? 0.8 : kind === "heading" ? 0.72 : 0.58,
              delay: delay + at,
              ease: easing,
            });
        controls.add(control);
        void control.then(() => {
          controls.delete(control);
          if (!cancelled) { control.stop(); restore(element); }
        });
      }
    };

    // One group trigger preserves the label -> headline -> copy -> visual -> CTA rhythm.
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      play();
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    observer.observe(owner);

    return () => {
      cancelled = true;
      observer.disconnect();
      controls.forEach(control => control.stop());
      styles.forEach((_, element) => restore(element));
    };
  }, [delay, distance, ready, reducedMotion, ref, selector]);
}

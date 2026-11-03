"use client";

import { animate } from "motion/react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { useMotionPreference, usePortfolioReady } from "./use-portfolio-ready";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function useHeroSequence(ref: RefObject<HTMLElement | null>) {
  const ready = usePortfolioReady();
  const reduce = useMotionPreference();
  const played = useRef(false);
  const [headlineComplete, setHeadlineComplete] = useState(false);

  useEffect(() => {
    const hero = ref.current;
    if (!hero || !ready || played.current) return;
    if (reduce || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      played.current = true;
      return;
    }

    const controls: ReturnType<typeof animate>[] = [];
    const targets = new Set<HTMLElement>();
    const restore = (element: HTMLElement) => {
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
      element.style.removeProperty("filter");
    };
    let alive = true;

    const reveal = (selector: string, delay: number, duration = 0.65, x = 0) => {
      hero.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        targets.add(element);
        const control = animate(element, {
          opacity: [0, 1], y: [x ? 0 : 16, 0], x: [x, 0],
        }, { duration, delay: delay + index * 0.065, ease });
        controls.push(control);
        void control.then(() => { if (alive) { control.stop(); restore(element); } });
      });
    };

    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting) || played.current) return;
      played.current = true;
      observer.disconnect();
      hero.dataset.heroMotion = "entering";
      reveal(".cinematic-eyebrow > span", 0, 0.55);

      const words = Array.from(hero.querySelectorAll<HTMLElement>("[data-hero-word]"));
      const headline = words.map(element => {
        targets.add(element);
        const line = Number(element.dataset.line);
        const word = Number(element.dataset.word);
        const control = animate(element, {
          y: ["112%", "0%"], opacity: [0, 1], filter: ["blur(4px)", "blur(0px)"],
        }, { duration: 0.88, delay: 0.16 + line * 0.14 + word * 0.065, ease });
        controls.push(control);
        void control.then(() => { if (alive) { control.stop(); restore(element); } });
        return control;
      });

      reveal("[data-hero-role]", 1.02, 0.6);
      reveal(".cinematic-intro", 1.10, 0.65);
      reveal(".cinematic-portrait", 1.18, 0.85, 20);
      reveal(".cinematic-ctas", 1.36, 0.6);
      reveal(".cinematic-support", 1.46, 0.6);
      void Promise.all(headline).then(() => {
        if (alive) {
          hero.dataset.heroMotion = "settled";
          setHeadlineComplete(true);
        }
      });
    }, { threshold: 0.05 });
    observer.observe(hero);

    // Never leave a keyboard user interacting with a still-hidden action.
    const finish = () => controls.forEach(control => control.complete());
    hero.addEventListener("focusin", finish);
    const visibility = () => { if (document.hidden) finish(); };
    document.addEventListener("visibilitychange", visibility);

    return () => {
      alive = false;
      observer.disconnect();
      hero.removeEventListener("focusin", finish);
      document.removeEventListener("visibilitychange", visibility);
      controls.forEach(control => control.stop());
      targets.forEach(element => {
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
        element.style.removeProperty("filter");
      });
      delete hero.dataset.heroMotion;
    };
  }, [ready, reduce, ref]);

  return headlineComplete;
}

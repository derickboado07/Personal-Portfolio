"use client";

import { useEffect, useRef } from "react";
import { useMotionPreference, usePortfolioReady } from "@/components/ui/use-portfolio-ready";
import "./galaxy-background.css";

type Point = { x: number; y: number };
type Star = Point & { radius: number; brightness: number; phase: number };

/** A decorative canvas: pointer events stay on the homepage's links and controls. */
export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useMotionPreference();
  const ready = usePortfolioReady();

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.closest<HTMLElement>(".hero-cinematic");
    const context = canvas?.getContext("2d");
    if (!canvas || !host || !context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = 0;
    let visible = false;
    let light = document.documentElement.dataset.theme === "light";
    let stars: Star[] = [];
    let connections: [number, number][] = [];
    let trail: Point[] = [];
    let pointerInside = false;
    let ambientActive = false;
    let opacity = 0;
    let head: Point = { x: 0, y: 0 };
    let target: Point = { x: 0, y: 0 };
    const parallax: Point = { x: 0, y: 0 };
    const finePointer = window.matchMedia("(any-pointer: fine)");
    const start = performance.now();

    function paint(time: number, animate: boolean) {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      const ink = light ? "75, 86, 122" : "193, 210, 229";
      const seconds = (time - start) / 1000;
      parallax.x += ((pointerInside ? (target.x / width - 0.5) * 9 : 0) - parallax.x) * 0.06;
      parallax.y += ((pointerInside ? (target.y / height - 0.5) * 9 : 0) - parallax.y) * 0.06;

      context.lineWidth = 0.6;
      for (const [a, b] of connections) {
        context.strokeStyle = `rgba(${ink}, ${light ? 0.11 : 0.085})`;
        context.beginPath();
        context.moveTo(stars[a].x + parallax.x, stars[a].y + parallax.y);
        context.lineTo(stars[b].x + parallax.x, stars[b].y + parallax.y);
        context.stroke();
      }
      for (const star of stars) {
        const shimmer = animate ? Math.sin(seconds * 0.55 + star.phase) * 0.1 : 0;
        context.fillStyle = `rgba(${ink}, ${star.brightness + shimmer})`;
        context.beginPath();
        context.arc(star.x + parallax.x, star.y + parallax.y, star.radius, 0, Math.PI * 2);
        context.fill();
      }

      // Small four-point stars echo the reference without competing with the copy.
      for (const [x, y, size] of [[0.57, 0.22, 6], [0.94, 0.61, 4], [0.16, 0.87, 3]]) {
        context.fillStyle = light ? "#8062b975" : "#b7a5e59c";
        context.beginPath();
        context.moveTo(width * x, height * y - size);
        context.quadraticCurveTo(width * x + 1, height * y - 1, width * x + size, height * y);
        context.quadraticCurveTo(width * x + 1, height * y + 1, width * x, height * y + size);
        context.quadraticCurveTo(width * x - 1, height * y + 1, width * x - size, height * y);
        context.quadraticCurveTo(width * x - 1, height * y - 1, width * x, height * y - size);
        context.fill();
      }

      if (!animate) return;
      // On touch screens an occasional shooting star replaces pointer following.
      const orbit = (seconds % 12) / 2.6;
      const ambient = !pointerInside && orbit < 1;
      const nextOpacity = pointerInside ? 0.85 : ambient ? Math.sin(orbit * Math.PI) * 0.65 : 0;
      opacity += (nextOpacity - opacity) * 0.12;
      if (ambient) {
        const next = { x: width * (0.44 + orbit * 0.44), y: height * (0.08 + orbit * 0.31) };
        if (!ambientActive || trail.length === 0) { head = next; trail = []; }
        target = next;
      }
      ambientActive = ambient;
      head.x += (target.x - head.x) * 0.15;
      head.y += (target.y - head.y) * 0.15;

      if (opacity < 0.008) { trail = []; return; }
      trail.push({ ...head });
      if (trail.length > 30) trail.shift();
      if (trail.length < 2) return;

      const tail = trail[0];
      const gradient = context.createLinearGradient(tail.x, tail.y, head.x + 0.01, head.y + 0.01);
      gradient.addColorStop(0, light ? "#6650bc00" : "#a699f000");
      gradient.addColorStop(0.65, light ? "#6650bc70" : "#b4a5f5a0");
      gradient.addColorStop(1, light ? "#087f96" : "#a0f2ff");
      context.save();
      context.globalAlpha = opacity;
      context.strokeStyle = gradient;
      context.lineWidth = 1.7;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.beginPath();
      trail.forEach((point, index) => {
        if (index === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      });
      context.stroke();
      const glow = context.createRadialGradient(head.x, head.y, 0, head.x, head.y, 15);
      glow.addColorStop(0, light ? "#087f9660" : "#a1eaff80");
      glow.addColorStop(1, "#79ddff00");
      context.fillStyle = glow;
      context.fillRect(head.x - 15, head.y - 15, 30, 30);
      context.fillStyle = light ? "#087f96" : "#e9fcff";
      context.beginPath();
      context.arc(head.x, head.y, 2.1, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }

    function tick(time: number) {
      // Limit decorative work to 30fps, independently of the display's refresh rate.
      if (time - lastTime >= 32) { paint(time, true); lastTime = time; }
      frame = requestAnimationFrame(tick);
    }

    function syncAnimation() {
      cancelAnimationFrame(frame);
      frame = 0;
      if (ready && !reduce && visible && !document.hidden) frame = requestAnimationFrame(tick);
      else paint(performance.now(), false);
    }

    function resize() {
      if (!canvas || !host || !context) return;
      width = host.clientWidth;
      height = host.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      let seed = 823;
      const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
      const count = Math.min(95, Math.max(34, Math.round(width * height / 17000)));
      stars = Array.from({ length: count }, () => ({
        x: random() * width, y: random() * height,
        radius: 0.65 + random() * 0.9, brightness: 0.16 + random() * 0.32, phase: random() * Math.PI * 2,
      }));
      connections = [];
      const distance = width < 600 ? 110 : 155;
      stars.forEach((star, a) => {
        let neighbors = 0;
        for (let b = a + 1; b < stars.length && neighbors < 2; b++) {
          if (Math.hypot(star.x - stars[b].x, star.y - stars[b].y) < distance) {
            connections.push([a, b]);
            neighbors++;
          }
        }
      });
      trail = [];
      opacity = 0;
      paint(performance.now(), false);
    }

    function pointerMove(event: PointerEvent) {
      if (!host || reduce || !finePointer.matches || event.pointerType === "touch") return;
      const bounds = host.getBoundingClientRect();
      target = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
      if (!pointerInside) { head = { ...target }; trail = []; }
      pointerInside = true;
    }
    function pointerLeave() { pointerInside = false; }

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncAnimation(); });
    const themeObserver = new MutationObserver(() => {
      light = document.documentElement.dataset.theme === "light";
      paint(performance.now(), false);
    });
    resize();
    resizeObserver.observe(host);
    intersectionObserver.observe(host);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    host.addEventListener("pointermove", pointerMove, { passive: true });
    host.addEventListener("pointerleave", pointerLeave);
    host.addEventListener("pointercancel", pointerLeave);
    document.addEventListener("visibilitychange", syncAnimation);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      host.removeEventListener("pointermove", pointerMove);
      host.removeEventListener("pointerleave", pointerLeave);
      host.removeEventListener("pointercancel", pointerLeave);
      document.removeEventListener("visibilitychange", syncAnimation);
    };
  }, [reduce, ready]);

  return <div className="hero-galaxy" aria-hidden="true"><canvas ref={canvasRef} className="galaxy-canvas" /></div>;
}

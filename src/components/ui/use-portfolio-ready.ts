"use client";

import { useSyncExternalStore } from "react";
import { APP_READY_EVENT } from "@/lib/animation";

function subscribeReady(callback: () => void) {
  window.addEventListener(APP_READY_EVENT, callback);
  window.addEventListener("pageshow", callback);
  return () => {
    window.removeEventListener(APP_READY_EVENT, callback);
    window.removeEventListener("pageshow", callback);
  };
}

function readySnapshot() {
  return !document.querySelector(".app-loader");
}

function serverNotReady() { return false; }

export function usePortfolioReady() {
  return useSyncExternalStore(subscribeReady, readySnapshot, serverNotReady);
}

function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}
function visibleSnapshot() { return document.visibilityState !== "hidden"; }
function serverVisible() { return true; }

export function usePageVisible() {
  return useSyncExternalStore(subscribeVisibility, visibleSnapshot, serverVisible);
}

function subscribeMotionPreference(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
function motionPreferenceSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function serverReducedMotion() { return true; }

/** Motion's installed hook snapshots the preference; this store also handles live changes. */
export function useMotionPreference() {
  return useSyncExternalStore(subscribeMotionPreference, motionPreferenceSnapshot, serverReducedMotion);
}

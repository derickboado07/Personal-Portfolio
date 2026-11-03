"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

type Theme = "light" | "dark";
const themeEvent = "dbcreates-theme-change";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#f7f8fc" : "#0b1220");
  window.dispatchEvent(new Event(themeEvent));
}

function subscribe(callback: () => void) {
  const system = window.matchMedia("(prefers-color-scheme: light)");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", getSnapshot() === "light" ? "#f7f8fc" : "#0b1220");
  const followPreference = () => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(THEME_STORAGE_KEY); } catch { /* Private browsing can disable storage. */ }
    applyTheme(saved === "light" || saved === "dark" ? saved : system.matches ? "light" : "dark");
  };
  const storageChanged = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) followPreference();
  };
  window.addEventListener(themeEvent, callback);
  window.addEventListener("storage", storageChanged);
  system.addEventListener("change", followPreference);
  return () => {
    window.removeEventListener(themeEvent, callback);
    window.removeEventListener("storage", storageChanged);
    system.removeEventListener("change", followPreference);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerSnapshot() { return undefined; }

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const label = theme ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Switch color theme";

  return <button className="theme-toggle icon-button" type="button" aria-label={label} title={label} onClick={() => {
    const next = getSnapshot() === "dark" ? "light" : "dark";
    try { localStorage.setItem(THEME_STORAGE_KEY, next); } catch { /* The toggle still works without persistence. */ }
    applyTheme(next);
  }}>
    <Sun className="theme-icon theme-icon-sun" size={18} aria-hidden="true" />
    <Moon className="theme-icon theme-icon-moon" size={18} aria-hidden="true" />
  </button>;
}

export const THEME_STORAGE_KEY = "dbcreates-theme";

// Runs before the page paints so a saved preference never flashes the other theme.
export const themeInitScript = `(() => {
  let theme;
  try { theme = localStorage.getItem("${THEME_STORAGE_KEY}"); } catch {}
  if (theme !== "light" && theme !== "dark") {
    theme = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  document.documentElement.dataset.theme = theme;
})();`;

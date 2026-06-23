import { useEffect, useState, useCallback } from "react";

// Reads the current theme from the <html> class (set pre-paint in index.html),
// keeps it in state, persists choices to localStorage, syncs the theme-color
// meta, and broadcasts changes so every hook instance (e.g. the desktop and
// mobile toggles) stays in sync.
const THEME_EVENT = "themechange";

const getInitialTheme = () => {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

const applyTheme = (theme) => {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");

  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    /* ignore */
  }

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#09090b" : "#fafafa");
};

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  // Listen for theme changes triggered by other hook instances.
  useEffect(() => {
    const handler = (e) => setTheme(e.detail);
    window.addEventListener(THEME_EVENT, handler);
    return () => window.removeEventListener(THEME_EVENT, handler);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: next }));
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}

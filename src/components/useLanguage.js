import { useEffect, useState, useCallback } from "react";
import translations from "../translations";

// Language switch (EN / ID) with localStorage persistence and cross-instance
// sync via a window event — mirrors the useTheme() pattern so the desktop and
// mobile toggles (and every translated component) stay in sync.
const LANG_EVENT = "langchange";
const DEFAULT_LANG = "en";

const getInitialLang = () => {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "id") return saved;
  } catch (e) {
    /* ignore */
  }
  return DEFAULT_LANG;
};

const resolve = (obj, path) =>
  path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);

export default function useLanguage() {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    const handler = (e) => setLang(e.detail);
    window.addEventListener(LANG_EVENT, handler);
    return () => window.removeEventListener(LANG_EVENT, handler);
  }, []);

  const setLanguage = useCallback((next) => {
    if (next !== "en" && next !== "id") return;
    try {
      localStorage.setItem("lang", next);
    } catch (e) {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: next }));
    setLang(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLanguage(lang === "en" ? "id" : "en");
  }, [lang, setLanguage]);

  // t('section.key') → string | array; falls back to EN, then the key itself.
  const t = useCallback(
    (key) => {
      const val = resolve(translations[lang], key);
      if (val !== undefined) return val;
      const fb = resolve(translations.en, key);
      return fb !== undefined ? fb : key;
    },
    [lang]
  );

  return { lang, toggleLang, setLanguage, t };
}

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import ui from './strings';

const LanguageContext = createContext(null);

const STORE_KEY = 'inera_lang';
export const LANGS = ['en', 'hi'];

function detect() {
  try {
    const saved = localStorage.getItem(STORE_KEY);
    if (saved && LANGS.includes(saved)) return saved;
  } catch {
    /* storage blocked */
  }
  try {
    if (typeof navigator !== 'undefined' && /^hi/i.test(navigator.language || '')) return 'hi';
  } catch {
    /* ignore */
  }
  return 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detect);

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang;
    document.body.setAttribute('data-lang', lang);
  }, [lang]);

  const setLang = useCallback((next) => {
    if (LANGS.includes(next)) setLangState(next);
  }, []);

  const toggle = useCallback(() => {
    setLangState((l) => (l === 'en' ? 'hi' : 'en'));
  }, []);

  /** t: fixed UI label lookup */
  const t = useCallback((key) => ui[lang]?.[key] ?? ui.en[key] ?? key, [lang]);

  /**
   * L: resolve an admin-editable bilingual value.
   * Accepts {en, hi} objects, plain strings, or undefined.
   * Falls back to English when the Hindi field is empty.
   */
  const L = useCallback(
    (value) => {
      if (value == null) return '';
      if (typeof value === 'string') return value;
      if (typeof value === 'object') {
        const v = value[lang];
        if (typeof v === 'string' && v.trim()) return v;
        const fb = value.en ?? value.hi;
        return typeof fb === 'string' ? fb : '';
      }
      return String(value);
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, toggle, t, L }), [lang, setLang, toggle, t, L]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}

export default LanguageContext;

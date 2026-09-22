import { createContext, useContext, useEffect, useMemo } from 'react';

const ThemeContext = createContext(null);

export const groupTheme = {
  bg: '#F5F2EB',
  bgSoft: '#EDE8DE',
  surface: '#FFFFFF',
  fg: '#0A0A0C',
  muted: '#5A5A67',
  accent: '#C09B3A',
  accentSoft: 'rgba(192,155,58,0.13)',
  rule: 'rgba(10,10,12,0.14)',
  onLight: '#0A0A0C',
  mode: 'light',
};

export const inkTheme = {
  bg: '#0A0A0C',
  bgSoft: '#121216',
  surface: '#191920',
  fg: '#F3F0E9',
  muted: '#A29C90',
  accent: '#C09B3A',
  accentSoft: 'rgba(192,155,58,0.14)',
  rule: 'rgba(243,240,233,0.13)',
  onLight: '#0A0A0C',
  mode: 'dark',
};

/**
 * Applies a palette as CSS custom properties so every child can style with
 * `var(--fg)`, `var(--accent)` etc. Also syncs the document background so
 * overscroll never flashes the wrong colour.
 */
export default function ThemeScope({ theme = groupTheme, children, className = '' }) {
  const vars = useMemo(
    () => ({
      '--bg': theme.bg,
      '--bg-soft': theme.bgSoft,
      '--surface': theme.surface,
      '--fg': theme.fg,
      '--muted': theme.muted,
      '--accent': theme.accent,
      '--accent-soft': theme.accentSoft,
      '--rule': theme.rule,
      backgroundColor: theme.bg,
      color: theme.fg,
    }),
    [theme]
  );

  useEffect(() => {
    document.body.style.background = theme.bg;
    document.body.style.color = theme.fg;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme.bg);
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <div style={vars} className={`min-h-screen ${className}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext) || groupTheme;
}

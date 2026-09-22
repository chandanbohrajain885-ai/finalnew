import { useLang, LANGS } from './LanguageContext';

/**
 * Two-state language switch — English / हिन्दी.
 * Always visible in every header so the choice is never buried.
 */
export default function LanguageToggle({ compact = false }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className="inline-flex items-center rounded-sm border"
      style={{ borderColor: 'var(--rule)' }}
      role="group"
      aria-label="Language"
    >
      {LANGS.map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
              compact ? '' : 'sm:px-3'
            }`}
            style={{
              background: active ? 'var(--accent)' : 'transparent',
              color: active ? '#fff' : 'var(--muted)',
            }}
          >
            {code === 'en' ? 'EN' : 'हि'}
          </button>
        );
      })}
    </div>
  );
}

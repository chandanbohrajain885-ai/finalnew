import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, CornerDownLeft } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useSite } from './SiteDataContext';
import { buildIndex, search, suggestions } from './knowledge';

/**
 * Command-palette search across everything published on the site.
 * Opens with ⌘K / Ctrl-K, the magnifier in any header, or `/`.
 */
export default function AISearch({ open, onClose }) {
  const { t, L, lang } = useLang();
  const { data } = useSite();
  const [q, setQ] = useState('');
  const [cursor, setCursor] = useState(0);
  const nav = useNavigate();
  const inputRef = useRef(null);

  const index = useMemo(() => buildIndex(data, L), [data, L]);
  const chips = useMemo(() => suggestions(L, data, lang), [L, data, lang]);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    return search(index, q, { limit: 8 }).map((r) => r.doc);
  }, [q, index]);

  useEffect(() => {
    if (open) {
      setQ('');
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCursor((c) => Math.min(c + 1, Math.max(results.length - 1, 0)));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCursor((c) => Math.max(c - 1, 0));
      }
      if (e.key === 'Enter' && results[cursor]) {
        nav(results[cursor].path);
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, results, cursor, nav, onClose]);

  if (!open) return null;

  return (
    <div className="no-print fixed inset-0 z-[115]">
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" onClick={onClose} />
      <div
        className="dock-panel absolute left-1/2 top-[12vh] w-[min(92vw,640px)] -translate-x-1/2 overflow-hidden rounded-sm"
        style={{ background: 'var(--surface)', border: '1px solid var(--rule)' }}
        role="dialog"
        aria-label={t('aiSearchTitle')}
      >
        <div
          className="flex items-center gap-3 px-4 py-3.5"
          style={{ borderBottom: '1px solid var(--rule)' }}
        >
          <Search size={16} style={{ color: 'var(--accent)' }} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setCursor(0);
            }}
            placeholder={t('aiSearchPlaceholder')}
            className="w-full bg-transparent text-[0.95rem] outline-none"
            style={{ color: 'var(--fg)' }}
          />
          <button onClick={onClose} aria-label={t('close')} className="opacity-50 hover:opacity-90">
            <X size={16} />
          </button>
        </div>

        <div className="max-h-[52vh] overflow-y-auto">
          {q.trim() && results.length === 0 && (
            <p className="px-4 py-8 text-center text-sm" style={{ color: 'var(--muted)' }}>
              {t('aiSearchNone')}
            </p>
          )}

          {results.map((r, i) => (
            <button
              key={r.id}
              onMouseEnter={() => setCursor(i)}
              onClick={() => {
                nav(r.path);
                onClose();
              }}
              className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors"
              style={{
                background: i === cursor ? 'var(--accent-soft)' : 'transparent',
                borderBottom: '1px solid var(--rule)',
              }}
            >
              <span className="num-marker mt-1 shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.87rem] font-medium">{r.title}</span>
                <span
                  className="mt-0.5 block truncate text-[0.73rem]"
                  style={{ color: 'var(--muted)' }}
                >
                  {r.body.replace(/\s+/g, ' ').slice(0, 120)}
                </span>
              </span>
              {i === cursor && <CornerDownLeft size={13} className="mt-1 shrink-0 opacity-50" />}
            </button>
          ))}

          {!q.trim() && (
            <div className="px-4 py-5">
              <p className="eyebrow mb-3" style={{ color: 'var(--muted)' }}>
                {t('aiSuggest')}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {chips.map((c) => (
                  <button
                    key={c}
                    onClick={() => setQ(c)}
                    className="rounded-sm border px-2.5 py-1.5 text-[0.72rem] transition-opacity hover:opacity-70"
                    style={{ borderColor: 'var(--rule)', color: 'var(--muted)' }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          className="flex items-center justify-between px-4 py-2.5 text-[0.62rem]"
          style={{ borderTop: '1px solid var(--rule)', color: 'var(--muted)' }}
        >
          <span>{t('aiSearchHint')}</span>
          <span>↑ ↓ ⏎</span>
        </div>
      </div>
    </div>
  );
}

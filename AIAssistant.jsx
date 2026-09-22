import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, X, CornerDownLeft, RotateCcw } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useSite } from './SiteDataContext';
import { buildIndex, answer, suggestions } from './knowledge';

/**
 * The site's resident assistant.
 * It reads the live site data, builds a retrieval index in the browser and
 * answers from that index only — so it can never invent a fact, never needs
 * an API key, and always reflects whatever the admin last published.
 */
export default function AIAssistant({ scopeEntity = null }) {
  const { t, L, lang } = useLang();
  const { data } = useSite();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [thread, setThread] = useState([]);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  const index = useMemo(() => buildIndex(data, L), [data, L]);
  const chips = useMemo(() => suggestions(L, data, lang), [L, data, lang]);

  useEffect(() => {
    setThread([{ role: 'bot', text: t('aiGreeting'), links: [] }]);
  }, [lang, t]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [thread, busy, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 260);
  }, [open]);

  const ask = useCallback(
    (raw) => {
      const q = (raw ?? input).trim();
      if (!q || busy) return;
      setThread((th) => [...th, { role: 'user', text: q }]);
      setInput('');
      setBusy(true);
      // a short, deliberate beat — the answer is computed synchronously
      window.setTimeout(() => {
        let res;
        try {
          res = answer(data, L, t, q, index);
        } catch {
          res = { text: t('aiNoAnswer'), links: [] };
        }
        if (scopeEntity && res.links?.length === 0) res.links = [];
        setThread((th) => [...th, { role: 'bot', text: res.text, links: res.links || [] }]);
        setBusy(false);
      }, 420);
    },
    [input, busy, data, L, t, index, scopeEntity]
  );

  const reset = () => setThread([{ role: 'bot', text: t('aiGreeting'), links: [] }]);

  return (
    <>
      {/* launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="no-print fixed bottom-5 right-5 z-[95] flex items-center gap-2 rounded-full px-4 py-3 text-[0.66rem] uppercase tracking-[0.18em] shadow-lg transition-all duration-500 ease-editorial hover:-translate-y-0.5 sm:bottom-7 sm:right-7"
        style={{ background: 'var(--accent)', color: '#fff' }}
        aria-label={t('aiOpen')}
      >
        <span className="relative grid place-items-center">
          <Sparkles size={15} />
        </span>
        <span className="hidden sm:inline">{open ? t('close') : t('aiOpen')}</span>
      </button>

      {/* panel */}
      <div
        className={`no-print fixed inset-x-3 bottom-[4.6rem] z-[96] flex max-h-[min(74vh,640px)] flex-col overflow-hidden rounded-sm transition-all duration-[550ms] ease-editorial sm:inset-x-auto sm:right-7 sm:w-[400px] ${
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        } dock-panel`}
        style={{ background: 'var(--surface)', border: '1px solid var(--rule)' }}
        role="dialog"
        aria-label={t('aiTitle')}
      >
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: '1px solid var(--rule)', background: 'var(--bg-soft)' }}
        >
          <div className="min-w-0">
            <p className="text-[0.78rem] font-semibold">{t('aiTitle')}</p>
            <p className="truncate text-[0.63rem]" style={{ color: 'var(--muted)' }}>
              {t('aiSubtitle')}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={reset}
              aria-label={t('aiClear')}
              className="grid h-7 w-7 place-items-center rounded-sm transition-opacity hover:opacity-60"
              style={{ color: 'var(--muted)' }}
            >
              <RotateCcw size={13} />
            </button>
            <button
              onClick={() => setOpen(false)}
              aria-label={t('close')}
              className="grid h-7 w-7 place-items-center rounded-sm transition-opacity hover:opacity-60"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {thread.map((m, i) => (
            <div key={i} className={m.role === 'user' ? 'flex justify-end' : ''}>
              <div
                className={`max-w-[92%] rounded-sm px-3 py-2.5 text-[0.82rem] leading-relaxed ${
                  m.role === 'user' ? 'text-white' : ''
                }`}
                style={
                  m.role === 'user'
                    ? { background: 'var(--accent)' }
                    : { background: 'var(--bg-soft)', border: '1px solid var(--rule)' }
                }
              >
                {m.text}
                {m.links?.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {m.links.slice(0, 4).map((lk, j) => (
                      <Link
                        key={j}
                        to={lk.path}
                        onClick={() => setOpen(false)}
                        className="inline-flex max-w-full items-center gap-1 truncate rounded-sm border px-2 py-1 text-[0.63rem] uppercase tracking-[0.12em] transition-colors"
                        style={{ borderColor: 'var(--rule)', color: 'var(--accent)' }}
                      >
                        {lk.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {busy && (
            <div
              className="inline-flex items-center gap-1.5 rounded-sm px-3 py-2.5"
              style={{ background: 'var(--bg-soft)', border: '1px solid var(--rule)' }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="typing-dot h-1.5 w-1.5 rounded-full"
                  style={{ background: 'var(--accent)', animationDelay: `${i * 0.14}s` }}
                />
              ))}
            </div>
          )}

          {thread.length <= 1 && !busy && (
            <div className="pt-1">
              <p className="eyebrow mb-2" style={{ color: 'var(--muted)' }}>
                {t('aiSuggest')}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {chips.slice(0, 5).map((c) => (
                  <button
                    key={c}
                    onClick={() => ask(c)}
                    className="rounded-sm border px-2.5 py-1.5 text-left text-[0.7rem] transition-colors hover:opacity-70"
                    style={{ borderColor: 'var(--rule)', color: 'var(--muted)' }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ borderTop: '1px solid var(--rule)' }}>
          <div className="flex items-end gap-2 px-3 py-2.5">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  ask();
                }
              }}
              placeholder={t('aiPlaceholder')}
              className="field max-h-28 flex-1"
              style={{ minHeight: 'auto', background: 'transparent', border: '1px solid var(--rule)' }}
            />
            <button
              onClick={() => ask()}
              disabled={!input.trim() || busy}
              aria-label={t('formSend')}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-sm transition-opacity disabled:opacity-35"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              <CornerDownLeft size={15} />
            </button>
          </div>
          <p className="px-3 pb-2.5 text-[0.6rem]" style={{ color: 'var(--muted)' }}>
            {t('aiDisclaimer')}
          </p>
        </div>
      </div>
    </>
  );
}

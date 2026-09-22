import { useState, useMemo, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useSite } from './SiteDataContext';
import { sectors } from './sectors';
import Reveal from './Reveal';

/**
 * Filterable gallery with a keyboard- and swipe-driven lightbox.
 * `entity` limits it to one sector's pictures; omit it for the Group.
 */
export default function Gallery({ entity = null, limit = null, showFilters = true }) {
  const { t, L } = useLang();
  const { data } = useSite();
  const [cat, setCat] = useState('all');
  const [open, setOpen] = useState(-1);

  const cats = data.galleryCategories || [];

  const items = useMemo(() => {
    let list = (data.gallery || []).filter((g) => g.active !== false && g.image);
    if (entity) list = list.filter((g) => g.entity === entity);
    if (cat !== 'all') list = list.filter((g) => g.category === cat);
    return limit ? list.slice(0, limit) : list;
  }, [data.gallery, entity, cat, limit]);

  const close = useCallback(() => setOpen(-1), []);
  const next = useCallback(() => setOpen((i) => (i < 0 ? i : (i + 1) % items.length)), [items.length]);
  const prev = useCallback(
    () => setOpen((i) => (i < 0 ? i : (i - 1 + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (open < 0) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, next, prev]);

  if (!items.length && cat === 'all') {
    return (
      <div
        className="flex flex-col items-center gap-3 px-6 py-16 text-center"
        style={{ border: '1px dashed var(--rule)' }}
      >
        <ImageOff size={22} style={{ color: 'var(--muted)' }} />
        <p className="text-[0.9rem]" style={{ color: 'var(--muted)' }}>
          {t('galleryEmpty')}
        </p>
      </div>
    );
  }

  const current = items[open];

  return (
    <>
      {showFilters && cats.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <Chip active={cat === 'all'} onClick={() => setCat('all')}>
            {t('galleryAll')}
          </Chip>
          {cats.map((c) => (
            <Chip key={c.id} active={cat === c.key} onClick={() => setCat(c.key)}>
              {L(c.name)}
            </Chip>
          ))}
        </div>
      )}

      <div className="columns-2 gap-3 sm:gap-4 md:columns-3">
        {items.map((g, i) => (
          <Reveal
            key={g.id}
            delay={(i % 6) * 60}
            className="group mb-3 break-inside-avoid sm:mb-4"
          >
            <button
              onClick={() => setOpen(i)}
              className="relative block w-full overflow-hidden text-left"
              style={{ border: '1px solid var(--rule)' }}
            >
              <img
                src={g.image}
                alt={L(g.title)}
                loading="lazy"
                className="w-full transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.035]"
              />
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-500 ease-editorial group-hover:translate-y-0 group-hover:opacity-100"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72), transparent)' }}
              >
                <span className="block text-[0.82rem] font-medium text-white">{L(g.title)}</span>
                {g.entity && sectors[g.entity] && (
                  <span className="block text-[0.62rem] uppercase tracking-[0.16em] text-white/70">
                    {sectors[g.entity].code}
                  </span>
                )}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {items.length === 0 && (
        <p className="py-10 text-center text-[0.88rem]" style={{ color: 'var(--muted)' }}>
          {t('galleryEmptyCategory')}
        </p>
      )}

      {/* lightbox */}
      {open >= 0 && current && (
        <div className="no-print fixed inset-0 z-[118] flex flex-col bg-black/90" onClick={close}>
          <div className="flex items-start justify-between gap-4 p-4 text-white/80 sm:p-6">
            <div className="min-w-0">
              <p className="truncate text-[0.95rem] font-medium text-white">{L(current.title)}</p>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-white/50">
                {open + 1} / {items.length}
                {current.year ? ` · ${current.year}` : ''}
              </p>
            </div>
            <button onClick={close} aria-label={t('close')} className="shrink-0 p-1 hover:text-white">
              <X size={22} />
            </button>
          </div>

          <div
            className="flex min-h-0 flex-1 items-center justify-center px-3 pb-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={prev}
              aria-label="Previous"
              className="hidden shrink-0 p-3 text-white/55 transition-colors hover:text-white sm:block"
            >
              <ChevronLeft size={30} />
            </button>
            <img
              src={current.image}
              alt={L(current.title)}
              className="max-h-full min-h-0 max-w-full object-contain"
            />
            <button
              onClick={next}
              aria-label="Next"
              className="hidden shrink-0 p-3 text-white/55 transition-colors hover:text-white sm:block"
            >
              <ChevronRight size={30} />
            </button>
          </div>

          {L(current.caption) && (
            <p
              className="mx-auto max-w-2xl px-5 pb-6 text-center text-[0.85rem] leading-relaxed text-white/65"
              onClick={(e) => e.stopPropagation()}
            >
              {L(current.caption)}
            </p>
          )}

          <div className="flex justify-center gap-6 pb-5 sm:hidden" onClick={(e) => e.stopPropagation()}>
            <button onClick={prev} aria-label="Previous" className="p-2 text-white/70">
              <ChevronLeft size={26} />
            </button>
            <button onClick={next} aria-label="Next" className="p-2 text-white/70">
              <ChevronRight size={26} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="rounded-sm border px-3.5 py-1.5 text-[0.68rem] uppercase tracking-[0.14em] transition-all duration-500"
      style={
        active
          ? { background: 'var(--accent)', borderColor: 'var(--accent)', color: '#fff' }
          : { borderColor: 'var(--rule)', color: 'var(--muted)' }
      }
    >
      {children}
    </button>
  );
}

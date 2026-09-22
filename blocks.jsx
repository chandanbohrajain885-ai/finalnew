import { useState, useMemo } from 'react';
import { Star, Search, ShieldCheck, ShieldX, MapPin, Briefcase, ArrowRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useSite } from './SiteDataContext';
import { sectors } from './sectors';
import Reveal from './Reveal';
import { GoldButton } from './ui';

/* ── Reviews ────────────────────────────────────────────────── */
export function Reviews({ kind = null, entity = null, limit = null }) {
  const { L } = useLang();
  const { data } = useSite();

  const items = useMemo(() => {
    let list = (data.reviews || []).filter((r) => r.active !== false);
    if (kind) list = list.filter((r) => r.kind === kind);
    if (entity) list = list.filter((r) => r.entity === entity);
    return limit ? list.slice(0, limit) : list;
  }, [data.reviews, kind, entity, limit]);

  if (!items.length) return null;

  return (
    <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: 'var(--rule)' }}>
      {items.map((r, i) => (
        <Reveal key={r.id} delay={i * 70} className="flex flex-col p-7" style={{ background: 'var(--bg)' }}>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, s) => (
              <Star
                key={s}
                size={13}
                strokeWidth={1.4}
                style={{ color: 'var(--accent)' }}
                fill={s < (r.rating || 5) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <p className="mt-5 flex-1 text-[0.93rem] leading-relaxed">“{L(r.text)}”</p>
          <div className="mt-6 pt-4" style={{ borderTop: '1px solid var(--rule)' }}>
            <p className="text-[0.92rem] font-medium">{r.name}</p>
            <p className="mt-0.5 text-[0.76rem]" style={{ color: 'var(--muted)' }}>
              {L(r.role)}
            </p>
            {L(r.place) && (
              <p className="mt-0.5 text-[0.72rem]" style={{ color: 'var(--muted)' }}>
                {L(r.place)}
              </p>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Highlights ─────────────────────────────────────────────── */
export function Highlights({ entity = null, limit = null }) {
  const { L } = useLang();
  const { data } = useSite();

  const items = useMemo(() => {
    let list = (data.highlights || []).filter((h) => h.active !== false);
    if (entity) list = list.filter((h) => h.entity === entity);
    return limit ? list.slice(0, limit) : list;
  }, [data.highlights, entity, limit]);

  if (!items.length) return null;

  return (
    <div className="grid gap-px sm:grid-cols-2" style={{ background: 'var(--rule)' }}>
      {items.map((h, i) => (
        <Reveal key={h.id} delay={i * 70} className="p-7 sm:p-8" style={{ background: 'var(--bg)' }}>
          <div className="flex items-center gap-3">
            <span
              className="px-2 py-1 text-[0.6rem] uppercase tracking-[0.16em]"
              style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
            >
              {L(h.tag)}
            </span>
            <span className="num-marker">{h.date}</span>
            {h.entity && sectors[h.entity] && (
              <span className="num-marker" style={{ color: sectors[h.entity].theme.accent, opacity: 1 }}>
                {sectors[h.entity].code}
              </span>
            )}
          </div>
          <h3 className="display mt-4 text-[1.45rem] leading-tight">{L(h.title)}</h3>
          <p className="mt-3 text-[0.92rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
            {L(h.body)}
          </p>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Careers ────────────────────────────────────────────────── */
export function CareersList({ entity = null }) {
  const { t, L } = useLang();
  const { data } = useSite();
  const [open, setOpen] = useState(null);

  const items = useMemo(() => {
    let list = (data.careers || []).filter((c) => c.active !== false);
    if (entity) list = list.filter((c) => c.entity === entity);
    return list;
  }, [data.careers, entity]);

  if (!items.length) {
    return (
      <p className="px-6 py-12 text-center text-[0.9rem]" style={{ border: '1px dashed var(--rule)', color: 'var(--muted)' }}>
        {t('careersNone')}
      </p>
    );
  }

  return (
    <div style={{ borderTop: '1px solid var(--rule)' }}>
      {items.map((c, i) => {
        const isOpen = open === c.id;
        return (
          <Reveal key={c.id} delay={i * 50} style={{ borderBottom: '1px solid var(--rule)' }}>
            <button
              onClick={() => setOpen(isOpen ? null : c.id)}
              className="grid w-full gap-3 py-6 text-left sm:grid-cols-12 sm:items-center"
              aria-expanded={isOpen}
            >
              <span className="display text-[1.35rem] leading-tight sm:col-span-5">{L(c.title)}</span>
              <span
                className="flex items-center gap-1.5 text-[0.76rem] sm:col-span-3"
                style={{ color: 'var(--muted)' }}
              >
                <Briefcase size={12} />
                {L(c.department)}
              </span>
              <span
                className="flex items-center gap-1.5 text-[0.76rem] sm:col-span-3"
                style={{ color: 'var(--muted)' }}
              >
                <MapPin size={12} />
                {L(c.location)}
              </span>
              <span className="text-right sm:col-span-1">
                <ArrowRight
                  size={15}
                  className="inline transition-transform duration-500"
                  style={{ color: 'var(--accent)', transform: isOpen ? 'rotate(90deg)' : 'none' }}
                />
              </span>
            </button>
            <div
              className="grid transition-all duration-[650ms] ease-editorial"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <div className="max-w-3xl pb-7">
                  <p className="text-[0.95rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {L(c.description)}
                  </p>
                  <p className="mt-3 text-[0.78rem]" style={{ color: 'var(--muted)' }}>
                    {L(c.type)}
                    {c.entity && sectors[c.entity] ? ` · ${sectors[c.entity].code}` : ''}
                  </p>
                  <div className="mt-5">
                    <GoldButton
                      href={`mailto:${data.group?.contact?.email}?subject=${encodeURIComponent(
                        `Application — ${L(c.title)}`
                      )}`}
                    >
                      {t('careersApply')}
                    </GoldButton>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ── Certificate verification ───────────────────────────────── */
export function CertificateVerifier() {
  const { t, L } = useLang();
  const { data } = useSite();
  const [q, setQ] = useState('');
  const [result, setResult] = useState(null);

  const check = (e) => {
    e.preventDefault();
    const num = q.trim().toLowerCase();
    if (!num) return;
    const found = (data.certificates || []).find(
      (c) => String(c.number || '').toLowerCase() === num
    );
    setResult(found ? { ok: true, cert: found } : { ok: false });
  };

  return (
    <div>
      <form onSubmit={check} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--muted)' }}
          />
          <input
            className="field pl-9"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setResult(null);
            }}
            placeholder={t('verifyPlaceholder')}
          />
        </div>
        <GoldButton type="submit">{t('verifyAction')}</GoldButton>
      </form>

      {result?.ok && (
        <div className="mt-6 p-6" style={{ border: '1px solid var(--accent)', background: 'var(--accent-soft)' }}>
          <p className="flex items-center gap-2 text-[0.82rem] font-medium" style={{ color: 'var(--accent)' }}>
            <ShieldCheck size={16} />
            {t('verifyFound')}
          </p>
          <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            <Row label={t('verifyName')} value={result.cert.holder} />
            <Row label={t('verifyNumber')} value={result.cert.number} />
            <Row label={t('verifyProgramme')} value={L(result.cert.programme)} />
            <Row label={t('verifyIssued')} value={result.cert.issued} />
            {result.cert.entity && sectors[result.cert.entity] && (
              <Row label={t('sectorLabel')} value={sectors[result.cert.entity].code} />
            )}
            {L(result.cert.remarks) && <Row label={t('verifyRemarks')} value={L(result.cert.remarks)} />}
          </dl>
        </div>
      )}

      {result && !result.ok && (
        <div className="mt-6 p-6" style={{ border: '1px solid var(--rule)' }}>
          <p className="flex items-center gap-2 text-[0.82rem] font-medium" style={{ color: '#b4472e' }}>
            <ShieldX size={16} />
            {t('verifyNotFound')}
          </p>
          <p className="mt-2 text-[0.88rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
            {t('verifyNotFoundBody')}
          </p>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <dt className="eyebrow" style={{ color: 'var(--muted)' }}>
        {label}
      </dt>
      <dd className="mt-1 text-[0.95rem]">{value}</dd>
    </div>
  );
}

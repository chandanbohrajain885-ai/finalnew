import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, ArrowRight, Mail, Linkedin } from 'lucide-react';
import Reveal from './Reveal';
import { useLang } from './LanguageContext';

/* ── Section header: number, eyebrow, display title ─────────── */
export function SectionHead({ index, eyebrow, title, body, align = 'left', className = '' }) {
  return (
    <Reveal className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
        {index && <span className="num-marker">{index}</span>}
        <span className="h-px w-8" style={{ background: 'var(--accent)' }} />
        <span className="eyebrow" style={{ color: 'var(--muted)' }}>
          {eyebrow}
        </span>
      </div>
      {title && (
        <h2 className="display lang-serif mt-5 text-[clamp(1.9rem,4.4vw,3.1rem)]">{title}</h2>
      )}
      {body && (
        <p className="mt-4 text-[0.98rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
          {body}
        </p>
      )}
    </Reveal>
  );
}

/* ── Section wrapper ────────────────────────────────────────── */
export function Section({ children, className = '', id, tone = 'base' }) {
  const bg = tone === 'soft' ? 'var(--bg-soft)' : tone === 'surface' ? 'var(--surface)' : 'var(--bg)';
  return (
    <section id={id} className={`relative ${className}`} style={{ background: bg }}>
      <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">{children}</div>
    </section>
  );
}

/* ── Stat strip ─────────────────────────────────────────────── */
export function Stats({ items = [] }) {
  const { L } = useLang();
  const live = items.filter((s) => s.active !== false);
  if (!live.length) return null;
  return (
    <div
      className="grid grid-cols-2 gap-px md:grid-cols-4"
      style={{ background: 'var(--rule)', border: '1px solid var(--rule)' }}
    >
      {live.map((s, i) => (
        <Reveal
          key={s.id}
          delay={i * 70}
          className="px-5 py-7 text-center sm:px-6 sm:py-9"
          style={{ background: 'var(--bg)' }}
        >
          <p
            className="display text-[clamp(1.7rem,3.6vw,2.6rem)] leading-none"
            style={{ color: 'var(--accent)' }}
          >
            {s.value}
          </p>
          <p
            className="mt-3 text-[0.68rem] uppercase leading-snug tracking-[0.16em]"
            style={{ color: 'var(--muted)' }}
          >
            {L(s.label)}
          </p>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Person card ────────────────────────────────────────────── */
export function PersonCard({ person, size = 'md', delay = 0 }) {
  const { L } = useLang();
  const initials = (person.name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  return (
    <Reveal delay={delay} className="group">
      <div
        className="relative overflow-hidden"
        style={{ background: 'var(--bg-soft)', border: '1px solid var(--rule)' }}
      >
        <div className={`relative ${size === 'lg' ? 'aspect-[4/5]' : 'aspect-[4/5]'} overflow-hidden`}>
          {person.image ? (
            <img
              src={person.image}
              alt={person.name}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.04]"
            />
          ) : (
            <div
              className="grid h-full w-full place-items-center"
              style={{ background: 'var(--accent-soft)' }}
            >
              <span className="display text-5xl" style={{ color: 'var(--accent)' }}>
                {initials}
              </span>
            </div>
          )}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.42), transparent)' }}
          />
        </div>

        <div className="px-5 py-5">
          <h3 className="display text-[1.35rem] leading-tight">{person.name}</h3>
          <p
            className="mt-1 text-[0.68rem] uppercase tracking-[0.17em]"
            style={{ color: 'var(--accent)' }}
          >
            {L(person.designation)}
          </p>
          {person.entity && (
            <p className="mt-1 text-[0.68rem]" style={{ color: 'var(--muted)' }}>
              {L(person.entity)}
            </p>
          )}
          {person.note && (
            <p className="mt-3 text-[0.84rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
              {L(person.note)}
            </p>
          )}
          {(person.email || person.linkedin) && (
            <div className="mt-4 flex items-center gap-2">
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  aria-label={`Email ${person.name}`}
                  className="grid h-8 w-8 place-items-center rounded-sm border transition-transform duration-500 hover:-translate-y-0.5"
                  style={{ borderColor: 'var(--rule)', color: 'var(--muted)' }}
                >
                  <Mail size={13} />
                </a>
              )}
              {person.linkedin && (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${person.name} on LinkedIn`}
                  className="grid h-8 w-8 place-items-center rounded-sm border transition-transform duration-500 hover:-translate-y-0.5"
                  style={{ borderColor: 'var(--rule)', color: 'var(--muted)' }}
                >
                  <Linkedin size={13} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

/* ── Accordion (FAQ) ────────────────────────────────────────── */
export function Accordion({ items = [] }) {
  const { L } = useLang();
  const [open, setOpen] = useState(null);
  const live = items.filter((f) => f.active !== false);
  if (!live.length) return null;

  return (
    <div style={{ borderTop: '1px solid var(--rule)' }}>
      {live.map((f, i) => {
        const isOpen = open === f.id;
        return (
          <Reveal key={f.id} delay={i * 50} style={{ borderBottom: '1px solid var(--rule)' }}>
            <button
              onClick={() => setOpen(isOpen ? null : f.id)}
              className="flex w-full items-start justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="display text-[1.2rem] leading-snug sm:text-[1.35rem]">{L(f.q)}</span>
              <span
                className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border"
                style={{ borderColor: 'var(--rule)', color: 'var(--accent)' }}
              >
                {isOpen ? <Minus size={12} /> : <Plus size={12} />}
              </span>
            </button>
            <div
              className="grid transition-all duration-[650ms] ease-editorial"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p
                  className="max-w-3xl pb-6 pr-10 text-[0.94rem] leading-relaxed"
                  style={{ color: 'var(--muted)' }}
                >
                  {L(f.a)}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ── Buttons ────────────────────────────────────────────────── */
export function GoldButton({ to, href, children, onClick, type, disabled, className = '' }) {
  const cls = `btn-solid ${className}`;
  const style = { background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' };
  const inner = (
    <>
      {children}
      <ArrowRight size={14} />
    </>
  );
  if (to) return <Link to={to} className={cls} style={style}>{inner}</Link>;
  if (href)
    return (
      <a href={href} className={cls} style={style}>
        {inner}
      </a>
    );
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${cls} disabled:opacity-50`} style={style}>
      {inner}
    </button>
  );
}

export function GhostButton({ to, href, children, className = '' }) {
  const cls = `btn-solid ${className}`;
  const style = { borderColor: 'var(--rule)', color: 'var(--fg)', background: 'transparent' };
  const inner = (
    <>
      {children}
      <ArrowRight size={14} />
    </>
  );
  if (to) return <Link to={to} className={cls} style={style}>{inner}</Link>;
  return (
    <a href={href} className={cls} style={style}>
      {inner}
    </a>
  );
}

/* ── Announcement marquee ───────────────────────────────────── */
export function Marquee({ items = [] }) {
  const { L } = useLang();
  const live = items.filter((a) => a.active !== false);
  if (!live.length) return null;
  const doubled = [...live, ...live];
  return (
    <div
      className="no-print overflow-hidden py-2.5"
      style={{ background: 'var(--bg-soft)', borderBottom: '1px solid var(--rule)' }}
    >
      <div className="marquee-track">
        {doubled.map((a, i) => (
          <span
            key={`${a.id}-${i}`}
            className="flex shrink-0 items-center gap-3 whitespace-nowrap px-6 text-[0.72rem]"
            style={{ color: 'var(--muted)' }}
          >
            <span className="h-1 w-1 rounded-full" style={{ background: 'var(--accent)' }} />
            {L(a.text)}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Numbered process rail ──────────────────────────────────── */
export function ProcessRail({ items = [] }) {
  const { L } = useLang();
  const live = items.filter((p) => p.active !== false);
  if (!live.length) return null;
  return (
    <ol className="mt-10">
      {live.map((p, i) => (
        <Reveal
          as="li"
          key={p.id}
          delay={i * 60}
          className="grid gap-4 py-7 sm:grid-cols-12"
          style={{ borderTop: '1px solid var(--rule)' }}
        >
          <div className="sm:col-span-2">
            <span className="num-marker" style={{ color: 'var(--accent)', opacity: 1 }}>
              {p.step}
            </span>
          </div>
          <h3 className="display text-[1.5rem] leading-tight sm:col-span-4">{L(p.title)}</h3>
          <p
            className="text-[0.93rem] leading-relaxed sm:col-span-6"
            style={{ color: 'var(--muted)' }}
          >
            {L(p.desc)}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}

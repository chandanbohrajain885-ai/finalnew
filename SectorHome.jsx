import { useOutletContext, Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useLang } from './LanguageContext';
import Reveal from './Reveal';
import { Section, SectionHead, Stats, ProcessRail, Accordion, Marquee, GoldButton, GhostButton } from './ui';

export default function SectorHome() {
  const { entity, cfg, base } = useOutletContext();
  const { t, L } = useLang();
  const dark = cfg.theme.mode === 'dark';

  const offerings = (entity.offerings || []).filter((o) => o.active !== false);

  return (
    <>
      {/* ── hero ─────────────────────────────────────────────── */}
      <section
        className={`grain ${dark ? 'grain-dark' : ''} relative flex min-h-[92svh] items-center overflow-hidden px-5 pb-16 pt-32 sm:px-8`}
        style={{ background: cfg.theme.bg }}
      >
        <svg
          className="pointer-events-none absolute -right-[18%] top-1/2 h-[120vmin] w-[120vmin] -translate-y-1/2 opacity-[0.13]"
          viewBox="0 0 800 800"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="400" cy="400" r="330" stroke={cfg.theme.accent} strokeWidth="0.6" />
          <circle cx="400" cy="400" r="245" stroke={cfg.theme.accent} strokeWidth="0.4" />
          <circle cx="400" cy="400" r="160" stroke={cfg.theme.accent} strokeWidth="0.3" />
        </svg>

        <div className="relative mx-auto grid w-full max-w-content items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: 'var(--accent)' }} />
              <span className="eyebrow" style={{ color: 'var(--muted)' }}>
                {L(entity.sector)}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="display lang-serif mt-6 text-[clamp(2.2rem,5.6vw,4.2rem)] leading-[1.03]">
                {L(entity.name)}
              </h1>
              <p
                className="mt-4 text-[0.74rem] uppercase tracking-[0.26em]"
                style={{ color: 'var(--accent)' }}
              >
                {L(entity.tagline)}
              </p>
            </Reveal>

            <Reveal delay={170}>
              <p className="display lang-serif mt-9 max-w-xl text-[clamp(1.25rem,2.4vw,1.85rem)] leading-[1.3]">
                {L(entity.hero?.headline)}
              </p>
              <p
                className="mt-5 max-w-xl text-[0.98rem] leading-relaxed"
                style={{ color: 'var(--muted)' }}
              >
                {L(entity.hero?.sub)}
              </p>
            </Reveal>

            <Reveal delay={250} className="mt-9 flex flex-wrap items-center gap-3">
              <GoldButton to={`${base}/contact`}>{L(entity.cta?.action)}</GoldButton>
              <GhostButton to={`${base}/what-we-do`}>{t('navOfferings')}</GhostButton>
            </Reveal>

            <Reveal delay={320} className="mt-9 flex items-center gap-3">
              <span
                className="relative grid h-2 w-2 place-items-center rounded-full pulse-ring"
                style={{
                  background: entity.stage === 'operating' ? cfg.theme.accent : 'var(--muted)',
                  color: cfg.theme.accent,
                }}
              />
              <span
                className="text-[0.66rem] uppercase tracking-[0.2em]"
                style={{ color: 'var(--muted)' }}
              >
                {L(entity.stageNote)}
              </span>
            </Reveal>
          </div>

          <Reveal variant="reveal-scale" delay={140} className="lg:col-span-5">
            <img
              src={cfg.logo}
              alt={L(entity.name)}
              className="drift mx-auto w-[min(62vw,330px)] object-contain"
            />
            <p
              className="mt-6 text-center text-[0.6rem] uppercase tracking-[0.26em]"
              style={{ color: 'var(--muted)' }}
            >
              {t('partOfGroup')}
            </p>
          </Reveal>
        </div>

        <a
          href="#overview"
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.56rem] uppercase tracking-[0.3em] sm:flex"
          style={{ color: 'var(--muted)' }}
        >
          <ArrowDown size={13} className="drift" />
        </a>
      </section>

      <Marquee items={entity.announcements} />

      {/* ── stats ────────────────────────────────────────────── */}
      <Section id="overview" tone="soft">
        <Stats items={entity.stats} />
      </Section>

      {/* ── about lead ───────────────────────────────────────── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead index="01" eyebrow={t('sectionOverview')} />
            <Reveal delay={110} className="mt-7">
              <p className="display lang-serif text-[clamp(1.5rem,2.8vw,2.1rem)] leading-[1.22]">
                {L(entity.about?.lead)}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal className="rich text-[1rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
              {(entity.about?.body || []).slice(0, 2).map((p, i) => (
                <p key={i}>{L(p)}</p>
              ))}
            </Reveal>
            <Reveal delay={120} className="mt-8">
              <GhostButton to={`${base}/about`}>{t('readMore')}</GhostButton>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── offerings ────────────────────────────────────────── */}
      {offerings.length > 0 && (
        <Section tone="soft">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead index="02" eyebrow={t('sectionOfferings')} title={t('navOfferings')} />
            <Reveal delay={100}>
              <GhostButton to={`${base}/what-we-do`}>{t('viewAll')}</GhostButton>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: 'var(--rule)' }}>
            {offerings.slice(0, 6).map((o, i) => (
              <Reveal
                key={o.id}
                delay={i * 70}
                className="group p-7"
                style={{ background: 'var(--bg)' }}
              >
                <span className="num-marker">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display mt-3 text-[1.4rem] leading-tight">{L(o.title)}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {L(o.desc)}
                </p>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ── process ──────────────────────────────────────────── */}
      {(entity.process || []).length > 0 && (
        <Section>
          <SectionHead index="03" eyebrow={t('sectionProcess')} />
          <ProcessRail items={entity.process} />
        </Section>
      )}

      {/* ── faqs ─────────────────────────────────────────────── */}
      {(entity.faqs || []).length > 0 && (
        <Section tone="soft">
          <SectionHead index="04" eyebrow={t('sectionFaq')} />
          <div className="mt-10">
            <Accordion items={entity.faqs} />
          </div>
        </Section>
      )}

      {/* ── closing ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'var(--accent)' }}>
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <Reveal className="flex flex-col items-start justify-between gap-7 text-white md:flex-row md:items-end">
            <div>
              <h2 className="display lang-serif max-w-xl text-[clamp(1.8rem,3.8vw,2.7rem)] leading-tight">
                {L(entity.cta?.title)}
              </h2>
              <p className="mt-4 max-w-lg text-[0.97rem] leading-relaxed text-white/85">
                {L(entity.cta?.body)}
              </p>
            </div>
            <Link
              to={`${base}/contact`}
              className="btn-solid shrink-0"
              style={{ background: '#fff', color: 'var(--accent)', borderColor: '#fff' }}
            >
              {L(entity.cta?.action)}
              <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useSite } from './SiteDataContext';
import { sectorList, entityPath } from './sectors';
import Reveal from './Reveal';
import Globe from './Globe';
import Gallery from './Gallery';
import { Highlights, Reviews } from './blocks';
import { Section, SectionHead, Stats, PersonCard, Marquee, GhostButton } from './ui';
import { LOGO } from './assets';

export default function GroupHome() {
  const { t, L } = useLang();
  const { data } = useSite();
  const g = data.group;

  return (
    <>
      <Hero g={g} t={t} L={L} />
      <Marquee items={g.announcements} />
      <SectorGrid data={data} t={t} L={L} g={g} />
      <Standing g={g} t={t} L={L} />
      <Atlas t={t} L={L} data={data} />
      <Chairperson g={g} t={t} L={L} />
      <Leadership g={g} t={t} L={L} />
      <Charter g={g} t={t} L={L} />
      <Values t={t} L={L} data={data} />
      <LatestAndVoices t={t} data={data} />
      <GalleryStrip t={t} data={data} />
      <Closing t={t} L={L} g={g} />
    </>
  );
}

/* ── Atlas teaser ───────────────────────────────────────────── */
function Atlas({ t, L, data }) {
  const offices = (data.offices || []).filter((o) => o.active !== false);
  const [sel, setSel] = useState(offices.find((o) => o.kind === 'hq')?.id || offices[0]?.id || null);
  if (!offices.length) return null;
  const current = offices.find((o) => o.id === sel);

  return (
    <Section tone="soft" id="atlas">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead index="03" eyebrow={t('sectionPresence')} title={t('atlasTitle')} />
          <div className="mt-8" style={{ borderTop: '1px solid var(--rule)' }}>
            {offices.map((o) => (
              <button
                key={o.id}
                onClick={() => setSel(o.id)}
                onMouseEnter={() => setSel(o.id)}
                className="flex w-full items-baseline justify-between gap-4 py-3.5 text-left"
                style={{ borderBottom: '1px solid var(--rule)' }}
              >
                <span
                  className="display text-[1.35rem]"
                  style={{ opacity: o.id === sel ? 1 : 0.55 }}
                >
                  {o.city}
                </span>
                <span className="text-[0.66rem] uppercase tracking-[0.16em]" style={{ color: 'var(--muted)' }}>
                  {L(o.region)}
                </span>
              </button>
            ))}
          </div>
          {current && (
            <p className="mt-5 text-[0.9rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
              {L(current.note)}
            </p>
          )}
          <Reveal delay={120} className="mt-8">
            <GhostButton to="/atlas">{t('navAtlas')}</GhostButton>
          </Reveal>
        </div>

        <Reveal variant="reveal-scale" className="lg:col-span-6 lg:col-start-7">
          <Globe
            offices={offices}
            selectedId={sel}
            onSelect={(o) => setSel(o.id)}
            accent="var(--accent)"
            fg="var(--fg)"
          />
          <p
            className="mt-1 text-center text-[0.6rem] uppercase tracking-[0.2em]"
            style={{ color: 'var(--muted)' }}
          >
            {t('atlasHint')}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/* ── Values ─────────────────────────────────────────────────── */
function Values({ t, L, data }) {
  const items = (data.values || []).filter((v) => v.active !== false);
  if (!items.length) return null;
  return (
    <Section tone="soft">
      <SectionHead index="07" eyebrow={t('sectionValues')} />
      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {items.map((v, i) => (
          <Reveal key={v.id} delay={i * 80} className="pt-5" style={{ borderTop: '2px solid var(--accent)' }}>
            <h3 className="display text-[1.4rem] leading-tight">{L(v.title)}</h3>
            <p className="mt-3 text-[0.91rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
              {L(v.body)}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── Highlights + voices ────────────────────────────────────── */
function LatestAndVoices({ t, data }) {
  const hasHighlights = (data.highlights || []).some((h) => h.active !== false);
  const hasReviews = (data.reviews || []).some((r) => r.active !== false);
  if (!hasHighlights && !hasReviews) return null;

  return (
    <>
      {hasHighlights && (
        <Section>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead index="08" eyebrow={t('sectionHighlights')} title={t('navNews')} />
            <Reveal delay={100}>
              <GhostButton to="/highlights">{t('viewAll')}</GhostButton>
            </Reveal>
          </div>
          <div className="mt-12">
            <Highlights limit={4} />
          </div>
        </Section>
      )}

      {hasReviews && (
        <Section tone="soft">
          <SectionHead index="09" eyebrow={t('sectionReviews')} />
          <div className="mt-12">
            <Reviews limit={3} />
          </div>
        </Section>
      )}
    </>
  );
}

/* ── Gallery strip ──────────────────────────────────────────── */
function GalleryStrip({ t, data }) {
  const has = (data.gallery || []).some((g) => g.active !== false && g.image);
  if (!has) return null;
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead index="10" eyebrow={t('navGallery')} title={t('navGallery')} />
        <Reveal delay={100}>
          <GhostButton to="/gallery">{t('viewAll')}</GhostButton>
        </Reveal>
      </div>
      <div className="mt-12">
        <Gallery limit={6} showFilters={false} />
      </div>
    </Section>
  );
}

/* ── 1. The arrival ─────────────────────────────────────────── */
function Hero({ g, t, L }) {
  return (
    <section className="grain grain-dark relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink px-5 pb-24 pt-32 text-ivory">
      {/* an engraved arc, drawn once — not a gradient blob */}
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 h-[135vmin] w-[135vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.16]"
        viewBox="0 0 800 800"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="400" cy="400" r="300" stroke="#C09B3A" strokeWidth="0.6" />
        <circle cx="400" cy="400" r="228" stroke="#C09B3A" strokeWidth="0.4" />
        <circle cx="400" cy="400" r="366" stroke="#C09B3A" strokeWidth="0.3" />
        <line x1="34" y1="400" x2="766" y2="400" stroke="#C09B3A" strokeWidth="0.3" />
        <line x1="400" y1="34" x2="400" y2="766" stroke="#C09B3A" strokeWidth="0.3" />
      </svg>

      <Reveal variant="reveal-scale" className="relative z-10 flex flex-col items-center">
        <img
          src={LOGO.group}
          alt="InEra Group"
          className="drift w-[min(74vw,430px)] select-none"
          draggable="false"
        />

        <div className="mt-9 h-px w-24 bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

        <p className="lang-serif mt-7 text-center text-[0.66rem] uppercase leading-loose tracking-[0.34em] text-ivory/55">
          {t('aGroupOf')}
        </p>
        <p className="lang-serif mt-2 text-center text-[0.78rem] uppercase tracking-[0.26em] text-gold-light/90">
          InEra Software Private Limited
        </p>

        <p className="mt-10 text-center text-[0.6rem] uppercase tracking-[0.3em] text-ivory/35">
          {L(g.hero?.kicker)}
        </p>
      </Reveal>

      <a
        href="#sectors"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.58rem] uppercase tracking-[0.3em] text-ivory/40 transition-colors hover:text-gold"
      >
        {L(g.hero?.scrollCue)}
        <ArrowDown size={13} className="drift" />
      </a>
    </section>
  );
}

/* ── 2. The four brand trusts ───────────────────────────────── */
function SectorGrid({ data, t, L, g }) {
  return (
    <Section id="sectors">
      <SectionHead
        index="01"
        eyebrow={L(g.sectorsIntro?.eyebrow)}
        title={L(g.sectorsIntro?.title)}
        body={L(g.sectorsIntro?.body)}
      />

      <div className="mt-12 grid gap-px sm:grid-cols-2" style={{ background: 'var(--rule)' }}>
        {sectorList.map((s, i) => {
          const e = data.entities[s.id];
          if (!e || e.active === false) return null;
          return (
            <Reveal key={s.id} delay={i * 90}>
              <Link
                to={entityPath(s.id)}
                className="sector-card group flex h-full flex-col justify-between p-7 sm:p-9"
                style={{ background: 'var(--bg)' }}
              >
                <span
                  className="sector-wash"
                  style={{
                    background: `linear-gradient(160deg, ${s.theme.accent}14, transparent 62%)`,
                  }}
                />

                <div className="flex items-start justify-between gap-5">
                  <div className="min-w-0">
                    <span className="num-marker">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="display lang-serif mt-3 text-[clamp(1.5rem,2.6vw,2rem)] leading-tight">
                      {L(e.name)}
                    </h3>
                    <p
                      className="mt-2 text-[0.66rem] uppercase tracking-[0.2em]"
                      style={{ color: s.theme.accent }}
                    >
                      {L(e.sector)}
                    </p>
                  </div>
                  <img
                    src={s.logo}
                    alt=""
                    loading="lazy"
                    className="h-16 w-16 shrink-0 object-contain transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.07] sm:h-20 sm:w-20"
                  />
                </div>

                <p
                  className="mt-6 max-w-sm text-[0.92rem] leading-relaxed"
                  style={{ color: 'var(--muted)' }}
                >
                  {L(e.tagline)}
                </p>

                <div
                  className="mt-7 flex items-center justify-between pt-4"
                  style={{ borderTop: '1px solid var(--rule)' }}
                >
                  <span
                    className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em]"
                    style={{ color: 'var(--muted)' }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: e.stage === 'operating' ? s.theme.accent : 'var(--muted)',
                      }}
                    />
                    {e.stage === 'operating' ? t('statusOperating') : t('statusCommissioning')}
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 text-[0.64rem] uppercase tracking-[0.2em] transition-transform duration-500 ease-editorial group-hover:translate-x-1"
                    style={{ color: s.theme.accent }}
                  >
                    {t('exploreSector')}
                    <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      {/* parent company strip */}
      <Reveal
        className="mt-px flex flex-col items-start justify-between gap-5 p-7 sm:flex-row sm:items-center sm:p-8"
        style={{ background: 'var(--bg-soft)', border: '1px solid var(--rule)' }}
      >
        <div className="flex items-center gap-5">
          <img src={LOGO.software} alt="" className="h-12 w-12 object-contain" />
          <div>
            <p className="eyebrow" style={{ color: 'var(--muted)' }}>
              {t('parentCompany')}
            </p>
            <p className="display mt-1 text-[1.4rem]">{L(data.entities.software?.name)}</p>
          </div>
        </div>
        <GhostButton to={entityPath('software')}>{t('readMore')}</GhostButton>
      </Reveal>
    </Section>
  );
}

/* ── 3. What the Group is, in its own words ─────────────────── */
function Standing({ g, t, L }) {
  return (
    <Section tone="soft">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead index="02" eyebrow={L(g.statement?.eyebrow)} />
          <Reveal delay={120} className="mt-8">
            <p className="display lang-serif text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.18]">
              {L(g.statement?.lead)}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal className="rich text-[1rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
            {(g.statement?.body || []).map((p, i) => (
              <p key={i}>{L(p)}</p>
            ))}
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <Reveal delay={80}>
              <p className="eyebrow" style={{ color: 'var(--accent)' }}>
                {t('sectionVision')}
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed">{L(g.vision)}</p>
            </Reveal>
            <Reveal delay={160}>
              <p className="eyebrow" style={{ color: 'var(--accent)' }}>
                {t('sectionMission')}
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed">{L(g.mission)}</p>
            </Reveal>
          </div>

          <Reveal delay={200} className="mt-10">
            <GhostButton to="/about">{t('readMore')}</GhostButton>
          </Reveal>
        </div>
      </div>

      <div className="mt-16">
        <Stats items={g.stats} />
      </div>
    </Section>
  );
}

/* ── 4. Chairperson — centred portrait, then the note ───────── */
function Chairperson({ g, t, L }) {
  const c = g.chairperson;
  if (!c || c.active === false) return null;
  return (
    <Section>
      <SectionHead index="04" eyebrow={t('sectionChairperson')} align="center" />

      <Reveal variant="reveal-scale" className="mx-auto mt-12 w-[min(78vw,320px)]">
        <div className="relative">
          <div
            className="absolute -inset-3 -z-10"
            style={{ border: '1px solid var(--rule)' }}
            aria-hidden="true"
          />
          {c.image ? (
            <img
              src={c.image}
              alt={c.name}
              className="aspect-[4/5] w-full object-cover object-top"
              style={{ background: 'var(--bg-soft)' }}
            />
          ) : (
            <div
              className="grid aspect-[4/5] w-full place-items-center"
              style={{ background: 'var(--accent-soft)' }}
            >
              <span className="display text-6xl" style={{ color: 'var(--accent)' }}>
                {c.name?.[0]}
              </span>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal delay={120} className="mx-auto mt-8 max-w-3xl text-center">
        <h3 className="display lang-serif text-[clamp(1.7rem,3.4vw,2.4rem)]">{c.name}</h3>
        <p className="mt-2 text-[0.68rem] uppercase tracking-[0.22em]" style={{ color: 'var(--accent)' }}>
          {L(c.designation)}
        </p>

        <blockquote className="relative mt-9">
          <span
            className="display pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 text-[5rem] leading-none opacity-15"
            style={{ color: 'var(--accent)' }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p className="display lang-serif relative text-[clamp(1.15rem,2.2vw,1.55rem)] italic leading-[1.55]">
            {L(c.message)}
          </p>
        </blockquote>

        {c.email && (
          <a
            href={`mailto:${c.email}`}
            className="link-draw mt-8 inline-block text-[0.74rem] tracking-[0.1em]"
            style={{ color: 'var(--muted)' }}
          >
            {c.email}
          </a>
        )}
      </Reveal>
    </Section>
  );
}

/* ── 5. Group leadership ────────────────────────────────────── */
function Leadership({ g, t, L }) {
  const people = (g.leadership || []).filter((p) => p.active !== false);
  if (!people.length) return null;
  return (
    <Section tone="soft">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead index="05" eyebrow={t('sectionLeadership')} title={t('navLeadership')} />
        <Reveal delay={120}>
          <GhostButton to="/leadership">{t('viewAll')}</GhostButton>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {people.slice(0, 3).map((p, i) => (
          <PersonCard key={p.id} person={p} delay={i * 90} />
        ))}
      </div>
    </Section>
  );
}

/* ── 6. Governing charter ───────────────────────────────────── */
function Charter({ g, t, L }) {
  const items = g.charter || [];
  if (!items.length) return null;
  return (
    <Section>
      <SectionHead index="06" eyebrow={t('sectionCharter')} title={L(g.intent?.title)} />
      <div className="mt-12 grid gap-px sm:grid-cols-2" style={{ background: 'var(--rule)' }}>
        {items.map((c, i) => (
          <Reveal key={c.id} delay={i * 80} className="p-7 sm:p-8" style={{ background: 'var(--bg)' }}>
            <span className="num-marker">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="display mt-3 text-[1.5rem] leading-tight">{L(c.title)}</h3>
            <p className="mt-3 text-[0.93rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
              {L(c.body)}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── 7. Closing ─────────────────────────────────────────────── */
function Closing({ t, L, g }) {
  return (
    <section className="grain grain-dark relative overflow-hidden bg-ink text-ivory">
      <div className="mx-auto max-w-content px-5 py-20 text-center sm:px-8 sm:py-28">
        <Reveal>
          <img src={LOGO.group} alt="" className="mx-auto h-16 w-auto object-contain" />
          <p className="display lang-serif mx-auto mt-8 max-w-2xl text-[clamp(1.5rem,3.2vw,2.3rem)] leading-tight">
            {L(g.registeredMark)}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="btn-solid"
              style={{ background: '#C09B3A', borderColor: '#C09B3A', color: '#fff' }}
            >
              {t('navContact')}
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/about"
              className="btn-solid"
              style={{ borderColor: 'rgba(243,240,233,0.28)', color: '#F3F0E9' }}
            >
              {t('navAbout')}
              <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

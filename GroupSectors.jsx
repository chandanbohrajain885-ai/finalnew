import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useSite } from './SiteDataContext';
import { sectorList, entityPath, sectors } from './sectors';
import Reveal from './Reveal';
import PageHead from './PageHead';
import { Section, SectionHead, GhostButton } from './ui';

/**
 * The sector index — every brand trust on one page, with what each one
 * does, where it stands, and a way in.
 */
export default function GroupSectors() {
  const { t, L } = useLang();
  const { data } = useSite();
  const g = data.group;

  return (
    <>
      <PageHead
        eyebrow={t('navSectors')}
        title={L(g.sectorsIntro?.title)}
        meta={L(g.sectorsIntro?.body)}
      />

      <Section>
        {sectorList.map((s, i) => {
          const e = data.entities[s.id];
          if (!e || e.active === false) return null;
          const offerings = (e.offerings || []).filter((o) => o.active !== false).slice(0, 4);
          return (
            <Reveal
              key={s.id}
              delay={i * 70}
              className="grid gap-8 py-12 lg:grid-cols-12"
              style={{ borderTop: '1px solid var(--rule)' }}
            >
              <div className="lg:col-span-3">
                <span className="num-marker">{String(i + 1).padStart(2, '0')}</span>
                <img
                  src={s.logo}
                  alt=""
                  loading="lazy"
                  className="mt-4 h-24 w-24 object-contain sm:h-28 sm:w-28"
                />
              </div>

              <div className="lg:col-span-5">
                <h2 className="display lang-serif text-[clamp(1.6rem,3vw,2.3rem)] leading-tight">
                  {L(e.name)}
                </h2>
                <p
                  className="mt-2 text-[0.66rem] uppercase tracking-[0.2em]"
                  style={{ color: s.theme.accent }}
                >
                  {L(e.sector)} · {L(e.tagline)}
                </p>
                <p className="mt-5 text-[0.96rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {L(e.about?.lead)}
                </p>

                <div className="mt-6 flex items-center gap-2.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: e.stage === 'operating' ? s.theme.accent : 'var(--muted)',
                    }}
                  />
                  <span
                    className="text-[0.64rem] uppercase tracking-[0.18em]"
                    style={{ color: 'var(--muted)' }}
                  >
                    {L(e.stageNote)}
                  </span>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    to={entityPath(s.id)}
                    className="btn-solid"
                    style={{ background: s.theme.accent, borderColor: s.theme.accent, color: '#fff' }}
                  >
                    {t('exploreSector')}
                    <ArrowRight size={14} />
                  </Link>
                  <GhostButton to={`${entityPath(s.id)}/what-we-do`}>{t('navOfferings')}</GhostButton>
                </div>
              </div>

              <div className="lg:col-span-4">
                {offerings.length > 0 && (
                  <>
                    <p className="eyebrow" style={{ color: 'var(--muted)' }}>
                      {t('sectionOfferings')}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {offerings.map((o) => (
                        <li
                          key={o.id}
                          className="flex items-start gap-2.5 text-[0.9rem]"
                        >
                          <span
                            className="mt-2 h-px w-3 shrink-0"
                            style={{ background: s.theme.accent }}
                          />
                          {L(o.title)}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </Reveal>
          );
        })}

        {/* parent company */}
        <Reveal
          className="grid gap-8 py-12 lg:grid-cols-12"
          style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}
        >
          <div className="lg:col-span-3">
            <span className="num-marker">—</span>
            <img
              src={sectors.software.logo}
              alt=""
              loading="lazy"
              className="mt-4 h-20 w-20 object-contain"
            />
          </div>
          <div className="lg:col-span-9">
            <p className="eyebrow" style={{ color: 'var(--muted)' }}>
              {t('parentCompany')}
            </p>
            <h2 className="display lang-serif mt-2 text-[clamp(1.5rem,2.6vw,2rem)] leading-tight">
              {L(data.entities.software?.name)}
            </h2>
            <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
              {L(data.entities.software?.about?.lead)}
            </p>
            <div className="mt-6">
              <GhostButton to={entityPath('software')}>{t('readMore')}</GhostButton>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section tone="soft">
        <SectionHead index="02" eyebrow={t('sectionPresence')} title={t('atlasTitle')} />
        <Reveal delay={100} className="mt-8">
          <GhostButton to="/atlas">{t('navAtlas')}</GhostButton>
        </Reveal>
      </Section>
    </>
  );
}

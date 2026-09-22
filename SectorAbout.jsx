import { useOutletContext } from 'react-router-dom';
import { useLang } from './LanguageContext';
import { useSite } from './SiteDataContext';
import Reveal from './Reveal';
import PageHead from './PageHead';
import { Section, SectionHead, Stats, Accordion, GhostButton } from './ui';

export default function SectorAbout() {
  const { entity, cfg } = useOutletContext();
  const { t, L } = useLang();
  const { data } = useSite();

  return (
    <>
      <PageHead
        eyebrow={t('navAbout')}
        title={L(entity.name)}
        meta={L(entity.stageNote)}
        logo={cfg.logo}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead index="01" eyebrow={t('sectionOverview')} />
            <Reveal delay={110} className="mt-7">
              <p className="display lang-serif text-[clamp(1.4rem,2.5vw,1.95rem)] leading-[1.24]">
                {L(entity.about?.lead)}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal className="rich text-[1.02rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
              {(entity.about?.body || []).map((p, i) => (
                <p key={i}>{L(p)}</p>
              ))}
            </Reveal>

            <Reveal
              delay={140}
              className="mt-10 p-6"
              style={{ background: 'var(--bg-soft)', border: '1px solid var(--rule)' }}
            >
              <p className="eyebrow" style={{ color: 'var(--muted)' }}>
                {t('partOfGroup')}
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed">{L(data.group?.registeredMark)}</p>
              <div className="mt-5">
                <GhostButton to="/about">{t('backToGroup')}</GhostButton>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHead index="02" eyebrow={t('sectionAtAGlance')} />
        <div className="mt-10">
          <Stats items={entity.stats} />
        </div>
      </Section>

      {(entity.faqs || []).length > 0 && (
        <Section>
          <SectionHead index="03" eyebrow={t('sectionFaq')} />
          <div className="mt-10">
            <Accordion items={entity.faqs} />
          </div>
        </Section>
      )}
    </>
  );
}

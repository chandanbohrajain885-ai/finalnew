import { useOutletContext, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLang } from './LanguageContext';
import Reveal from './Reveal';
import PageHead from './PageHead';
import { Section, SectionHead, ProcessRail } from './ui';

export default function SectorOfferings() {
  const { entity, cfg, base } = useOutletContext();
  const { t, L } = useLang();
  const offerings = (entity.offerings || []).filter((o) => o.active !== false);

  return (
    <>
      <PageHead
        eyebrow={t('navOfferings')}
        title={L(entity.hero?.headline)}
        meta={L(entity.tagline)}
        logo={cfg.logo}
      />

      <Section>
        <SectionHead index="01" eyebrow={t('sectionOfferings')} />
        <div className="mt-10">
          {offerings.map((o, i) => (
            <Reveal
              key={o.id}
              delay={i * 55}
              className="group grid gap-5 py-8 sm:grid-cols-12"
              style={{ borderTop: '1px solid var(--rule)' }}
            >
              <div className="sm:col-span-2">
                <span className="num-marker" style={{ color: 'var(--accent)', opacity: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="display text-[clamp(1.35rem,2.2vw,1.75rem)] leading-tight sm:col-span-4">
                {L(o.title)}
              </h3>
              <p
                className="text-[0.96rem] leading-relaxed sm:col-span-6"
                style={{ color: 'var(--muted)' }}
              >
                {L(o.desc)}
              </p>
            </Reveal>
          ))}
          <div style={{ borderTop: '1px solid var(--rule)' }} />
        </div>
      </Section>

      {(entity.process || []).length > 0 && (
        <Section tone="soft">
          <SectionHead index="02" eyebrow={t('sectionProcess')} />
          <ProcessRail items={entity.process} />
        </Section>
      )}

      <section style={{ background: 'var(--accent)' }}>
        <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-16">
          <Reveal className="flex flex-col items-start justify-between gap-6 text-white md:flex-row md:items-center">
            <h2 className="display lang-serif max-w-xl text-[clamp(1.6rem,3.2vw,2.3rem)] leading-tight">
              {L(entity.cta?.title)}
            </h2>
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

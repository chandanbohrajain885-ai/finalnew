import { useLang } from './LanguageContext';
import { useSite } from './SiteDataContext';
import { sectorList, entityPath } from './sectors';
import Reveal from './Reveal';
import { Section, SectionHead, Stats, GhostButton } from './ui';
import PageHead from './PageHead';
import { Link } from 'react-router-dom';

export default function GroupAbout() {
  const { t, L } = useLang();
  const { data } = useSite();
  const g = data.group;

  return (
    <>
      <PageHead
        eyebrow={t('navAbout')}
        title={L(g.statement?.lead)}
        meta={L(g.legalParent)}
      />

      {/* why it was created */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead index="01" eyebrow={t('sectionHistory')} title={L(g.whyCreated?.title)} />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal className="rich text-[1.02rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
              {(g.whyCreated?.body || []).map((p, i) => (
                <p key={i}>{L(p)}</p>
              ))}
            </Reveal>
            <Reveal delay={120} className="mt-10 rich text-[1.02rem] leading-relaxed">
              {(g.statement?.body || []).map((p, i) => (
                <p key={i}>{L(p)}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </Section>

      {/* vision / mission / intent */}
      <Section tone="soft">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            { key: 'v', label: t('sectionVision'), text: L(g.vision) },
            { key: 'm', label: t('sectionMission'), text: L(g.mission) },
            {
              key: 'i',
              label: L(g.intent?.title),
              text: (g.intent?.body || []).map((b) => L(b)).join(' '),
            },
          ].map((item, i) => (
            <Reveal key={item.key} delay={i * 90} className="pt-6" style={{ borderTop: '2px solid var(--accent)' }}>
              <p className="eyebrow" style={{ color: 'var(--accent)' }}>
                {item.label}
              </p>
              <p className="display lang-serif mt-4 text-[clamp(1.25rem,2.1vw,1.6rem)] leading-[1.32]">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* charter */}
      <Section>
        <SectionHead index="02" eyebrow={t('sectionCharter')} />
        <div className="mt-10">
          {(g.charter || []).map((c, i) => (
            <Reveal
              key={c.id}
              delay={i * 60}
              className="grid gap-4 py-7 sm:grid-cols-12"
              style={{ borderTop: '1px solid var(--rule)' }}
            >
              <div className="sm:col-span-2">
                <span className="num-marker" style={{ color: 'var(--accent)', opacity: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="display text-[1.5rem] leading-tight sm:col-span-4">{L(c.title)}</h3>
              <p
                className="text-[0.95rem] leading-relaxed sm:col-span-6"
                style={{ color: 'var(--muted)' }}
              >
                {L(c.body)}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* timeline */}
      <Section tone="soft">
        <SectionHead index="03" eyebrow={t('sectionHistory')} title={t('year')} />
        <div className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: 'var(--rule)' }}>
          {(g.milestones || [])
            .filter((m) => m.active !== false)
            .map((m, i) => (
              <Reveal key={m.id} delay={i * 80} className="p-7" style={{ background: 'var(--bg)' }}>
                <p className="display text-[2.4rem] leading-none" style={{ color: 'var(--accent)' }}>
                  {m.year}
                </p>
                <h3 className="mt-4 text-[0.95rem] font-semibold leading-snug">{L(m.title)}</h3>
                <p className="mt-2 text-[0.86rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {L(m.body)}
                </p>
              </Reveal>
            ))}
        </div>
      </Section>

      {/* structure diagram */}
      <Section>
        <SectionHead index="04" eyebrow={t('sectionAtAGlance')} title={t('navSectors')} />

        <Reveal className="mt-12">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              to={entityPath('software')}
              className="inline-block px-6 py-4 transition-colors"
              style={{ border: '1px solid var(--rule)', background: 'var(--bg-soft)' }}
            >
              <p className="eyebrow" style={{ color: 'var(--muted)' }}>
                {t('parentCompany')}
              </p>
              <p className="display mt-1 text-[1.3rem]">{L(data.entities.software?.name)}</p>
            </Link>
            <div className="mx-auto h-10 w-px" style={{ background: 'var(--rule)' }} />
            <div
              className="inline-block px-8 py-4"
              style={{ border: '1px solid var(--accent)', background: 'var(--accent-soft)' }}
            >
              <p className="display text-[1.5rem]">InEra Group</p>
              <p className="eyebrow mt-1" style={{ color: 'var(--muted)' }}>
                {t('sectionCharter')}
              </p>
            </div>
            <div className="mx-auto h-10 w-px" style={{ background: 'var(--rule)' }} />
          </div>

          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: 'var(--rule)' }}>
            {sectorList.map((s) => (
              <Link
                key={s.id}
                to={entityPath(s.id)}
                className="sector-card flex flex-col items-center gap-3 p-6 text-center"
                style={{ background: 'var(--bg)' }}
              >
                <img src={s.logo} alt="" loading="lazy" className="h-14 w-14 object-contain" />
                <p className="text-[0.88rem] font-medium leading-snug">{L(data.entities[s.id]?.name)}</p>
                <p className="text-[0.64rem] uppercase tracking-[0.16em]" style={{ color: s.theme.accent }}>
                  {L(data.entities[s.id]?.sector)}
                </p>
              </Link>
            ))}
          </div>
        </Reveal>

        <div className="mt-16">
          <Stats items={g.stats} />
        </div>

        <Reveal delay={120} className="mt-12 text-center">
          <GhostButton to="/leadership">{t('navLeadership')}</GhostButton>
        </Reveal>
      </Section>
    </>
  );
}

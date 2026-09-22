import { useOutletContext } from 'react-router-dom';
import { useLang } from './LanguageContext';
import { useSite } from './SiteDataContext';
import Reveal from './Reveal';
import PageHead from './PageHead';
import { Section, SectionHead, PersonCard, GhostButton } from './ui';

export default function SectorPeople() {
  const { entity, cfg } = useOutletContext();
  const { t, L } = useLang();
  const { data } = useSite();

  const team = (entity.team || []).filter((p) => p.active !== false);
  const groupLeaders = (data.group?.leadership || []).filter((p) => p.active !== false);
  const chair = data.group?.chairperson;

  return (
    <>
      <PageHead
        eyebrow={t('navTeam')}
        title={t('sectionPeople')}
        meta={L(entity.name)}
        logo={cfg.logo}
      />

      <Section>
        {team.length > 0 ? (
          <>
            <SectionHead index="01" eyebrow={L(entity.name)} />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((p, i) => (
                <PersonCard key={p.id} person={p} delay={i * 80} />
              ))}
            </div>
          </>
        ) : (
          <Reveal
            className="p-8 sm:p-10"
            style={{ background: 'var(--bg-soft)', border: '1px solid var(--rule)' }}
          >
            <p className="eyebrow" style={{ color: 'var(--accent)' }}>
              {t('sectionPeople')}
            </p>
            <p className="display lang-serif mt-4 max-w-2xl text-[clamp(1.35rem,2.5vw,1.9rem)] leading-[1.3]">
              {L(entity.stageNote)}
            </p>
            <p className="mt-4 max-w-2xl text-[0.96rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
              {L(entity.about?.lead)}
            </p>
            <p className="mt-6 text-[0.9rem]" style={{ color: 'var(--muted)' }}>
              {L(data.group?.registeredMark)}
            </p>
          </Reveal>
        )}
      </Section>

      <Section tone="soft">
        <SectionHead index={team.length ? '02' : '01'} eyebrow={t('sectionLeadership')} title={t('backToGroup')} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {chair && chair.active !== false && (
            <PersonCard
              person={{ ...chair, note: null, entity: { en: 'InEra Group', hi: 'इनएरा ग्रुप' } }}
              delay={0}
            />
          )}
          {groupLeaders.slice(0, 2).map((p, i) => (
            <PersonCard key={p.id} person={p} delay={(i + 1) * 80} />
          ))}
        </div>
        <Reveal delay={180} className="mt-10">
          <GhostButton to="/leadership">{t('viewAll')}</GhostButton>
        </Reveal>
      </Section>
    </>
  );
}

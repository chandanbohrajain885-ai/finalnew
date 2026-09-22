import { useLang } from './LanguageContext';
import { useSite } from './SiteDataContext';
import { ENTITY_IDS, sectors, entityPath } from './sectors';
import Reveal from './Reveal';
import PageHead from './PageHead';
import { Section, SectionHead, PersonCard } from './ui';
import { Link } from 'react-router-dom';

export default function GroupLeadership() {
  const { t, L } = useLang();
  const { data } = useSite();
  const g = data.group;
  const c = g.chairperson;
  const people = (g.leadership || []).filter((p) => p.active !== false);

  return (
    <>
      <PageHead eyebrow={t('navLeadership')} title={t('sectionLeadership')} meta={L(g.legalParent)} />

      {/* chairperson, centred */}
      {c && c.active !== false && (
        <Section>
          <SectionHead index="01" eyebrow={t('sectionChairperson')} align="center" />

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
            <Reveal variant="reveal-scale" className="lg:col-span-5 lg:col-start-2">
              <div className="relative">
                <div className="absolute -inset-3 -z-10" style={{ border: '1px solid var(--rule)' }} />
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

            <Reveal delay={120} className="lg:col-span-5">
              <h2 className="display lang-serif text-[clamp(1.9rem,3.8vw,2.7rem)] leading-tight">
                {c.name}
              </h2>
              <p
                className="mt-2 text-[0.7rem] uppercase tracking-[0.22em]"
                style={{ color: 'var(--accent)' }}
              >
                {L(c.designation)}
              </p>
              <p className="display lang-serif mt-7 text-[clamp(1.05rem,1.9vw,1.35rem)] italic leading-[1.6]">
                “{L(c.message)}”
              </p>
              {c.email && (
                <a
                  href={`mailto:${c.email}`}
                  className="link-draw mt-7 inline-block text-[0.8rem]"
                  style={{ color: 'var(--muted)' }}
                >
                  {c.email}
                </a>
              )}
            </Reveal>
          </div>
        </Section>
      )}

      {/* group leadership */}
      {people.length > 0 && (
        <Section tone="soft">
          <SectionHead index="02" eyebrow={t('sectionLeadership')} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {people.map((p, i) => (
              <PersonCard key={p.id} person={p} delay={i * 80} />
            ))}
          </div>
        </Section>
      )}

      {/* people per sector */}
      <Section>
        <SectionHead index="03" eyebrow={t('navSectors')} title={t('sectionPeople')} />
        <div className="mt-10 grid gap-px sm:grid-cols-2" style={{ background: 'var(--rule)' }}>
          {ENTITY_IDS.map((id) => {
            const e = data.entities[id];
            const team = (e?.team || []).filter((p) => p.active !== false);
            return (
              <Reveal key={id} className="p-7" style={{ background: 'var(--bg)' }}>
                <div className="flex items-center gap-4">
                  <img src={sectors[id].logo} alt="" loading="lazy" className="h-12 w-12 object-contain" />
                  <div>
                    <Link to={entityPath(id)} className="link-draw display text-[1.3rem]">
                      {L(e?.name)}
                    </Link>
                    <p
                      className="text-[0.62rem] uppercase tracking-[0.16em]"
                      style={{ color: sectors[id].theme.accent }}
                    >
                      {L(e?.sector)}
                    </p>
                  </div>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {team.length ? (
                    team.map((p) => (
                      <li key={p.id} className="text-[0.88rem]">
                        <span className="font-medium">{p.name}</span>
                        <span style={{ color: 'var(--muted)' }}> — {L(p.designation)}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-[0.85rem]" style={{ color: 'var(--muted)' }}>
                      {L(e?.stageNote)}
                    </li>
                  )}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </>
  );
}

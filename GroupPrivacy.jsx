import { useLang } from './LanguageContext';
import { useSite } from './SiteDataContext';
import PageHead from './PageHead';
import Reveal from './Reveal';
import { Section } from './ui';

export default function GroupPrivacy() {
  const { t, L } = useLang();
  const { data } = useSite();
  const legal = data.legal || {};
  return (
    <>
      <PageHead
        eyebrow={t('navPrivacy')}
        title={L(legal.privacyTitle)}
        meta={L(legal.privacyUpdated)}
      />
      <Section>
        <div className="max-w-3xl">
          {(legal.privacy || []).map((s, i) => (
            <Reveal
              key={s.id}
              delay={i * 50}
              className="grid gap-4 py-7 sm:grid-cols-12"
              style={{ borderTop: '1px solid var(--rule)' }}
            >
              <div className="sm:col-span-1">
                <span className="num-marker">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h2 className="display text-[1.4rem] leading-tight sm:col-span-4">{L(s.heading)}</h2>
              <p className="text-[0.95rem] leading-relaxed sm:col-span-7" style={{ color: 'var(--muted)' }}>
                {L(s.body)}
              </p>
            </Reveal>
          ))}
          <div style={{ borderTop: '1px solid var(--rule)' }} />
        </div>
      </Section>
    </>
  );
}

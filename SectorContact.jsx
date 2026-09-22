import { useOutletContext } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useSite } from './SiteDataContext';
import Reveal from './Reveal';
import PageHead from './PageHead';
import { Section, SectionHead } from './ui';
import EnquiryForm from './EnquiryForm';

export default function SectorContact() {
  const { id, entity, cfg } = useOutletContext();
  const { t, L } = useLang();
  const { data } = useSite();
  const g = data.group;

  const rows = [
    {
      Icon: Mail,
      label: t('emailUs'),
      value: entity.contact?.email || g.contact?.email,
      href: `mailto:${entity.contact?.email || g.contact?.email}`,
    },
    {
      Icon: Phone,
      label: t('callUs'),
      value: entity.contact?.phone || g.contact?.phone,
      href: `tel:${(entity.contact?.phone || g.contact?.phone || '').replace(/\s/g, '')}`,
    },
    { Icon: MapPin, label: t('location'), value: L(g.contact?.address) },
    { Icon: Clock, label: t('officeHours'), value: L(g.contact?.hours) },
  ];

  return (
    <>
      <PageHead
        eyebrow={t('navContact')}
        title={L(entity.cta?.title)}
        meta={L(entity.cta?.body)}
        logo={cfg.logo}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead index="01" eyebrow={t('sectionContact')} />
            <div className="mt-8">
              {rows.map((r, i) => (
                <Reveal
                  key={r.label}
                  delay={i * 60}
                  className="flex items-start gap-4 py-5"
                  style={{ borderTop: '1px solid var(--rule)' }}
                >
                  <r.Icon size={16} className="mt-1 shrink-0" style={{ color: 'var(--accent)' }} />
                  <div className="min-w-0">
                    <p className="eyebrow" style={{ color: 'var(--muted)' }}>
                      {r.label}
                    </p>
                    {r.href ? (
                      <a href={r.href} className="link-draw mt-1 block break-words text-[0.98rem]">
                        {r.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-[0.98rem]">{r.value}</p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal
              delay={260}
              className="mt-10 p-6"
              style={{ background: 'var(--bg-soft)', border: '1px solid var(--rule)' }}
            >
              <p className="eyebrow" style={{ color: 'var(--muted)' }}>
                {t('statusOperating')} / {t('statusCommissioning')}
              </p>
              <p className="mt-2 text-[0.93rem] leading-relaxed">{L(entity.stageNote)}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHead index="02" eyebrow={t('writeToUs')} />
            <div className="mt-8">
              <EnquiryForm defaultEntity={id} lockEntity />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

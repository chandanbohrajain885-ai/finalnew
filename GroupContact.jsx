import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useSite } from './SiteDataContext';
import { ENTITY_IDS, sectors, entityPath } from './sectors';
import Reveal from './Reveal';
import PageHead from './PageHead';
import { Section, SectionHead } from './ui';
import EnquiryForm from './EnquiryForm';
import { Link } from 'react-router-dom';

export default function GroupContact() {
  const { t, L } = useLang();
  const { data } = useSite();
  const g = data.group;

  const rows = [
    { Icon: Mail, label: t('emailUs'), value: g.contact?.email, href: `mailto:${g.contact?.email}` },
    {
      Icon: Phone,
      label: t('callUs'),
      value: g.contact?.phone,
      href: `tel:${(g.contact?.phone || '').replace(/\s/g, '')}`,
    },
    g.contact?.whatsapp && {
      Icon: MessageCircle,
      label: t('whatsapp'),
      value: g.contact?.phone,
      href: `https://wa.me/${g.contact.whatsapp}`,
    },
    { Icon: MapPin, label: t('location'), value: L(g.contact?.address) },
    { Icon: Clock, label: t('officeHours'), value: L(g.contact?.hours) },
  ].filter(Boolean);

  return (
    <>
      <PageHead eyebrow={t('navContact')} title={t('writeToUs')} meta={L(g.registeredMark)} />

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
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHead index="02" eyebrow={t('writeToUs')} />
            <div className="mt-8">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHead index="03" eyebrow={t('navSectors')} title={t('formSelectEntity')} />
        <div className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: 'var(--rule)' }}>
          {ENTITY_IDS.map((id) => {
            const e = data.entities[id];
            return (
              <Reveal key={id} className="p-6" style={{ background: 'var(--bg)' }}>
                <img src={sectors[id].logo} alt="" loading="lazy" className="h-12 w-12 object-contain" />
                <Link to={`${entityPath(id)}/contact`} className="link-draw mt-4 block text-[1.02rem] font-medium">
                  {L(e?.name)}
                </Link>
                <p className="mt-2 break-all text-[0.8rem]" style={{ color: 'var(--muted)' }}>
                  {e?.contact?.email}
                </p>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </>
  );
}

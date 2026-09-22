import { useState } from 'react';
import { MapPin, Phone, Mail, Building2 } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useSite } from './SiteDataContext';
import { sectors, entityPath } from './sectors';
import { Link } from 'react-router-dom';
import Globe from './Globe';
import Reveal from './Reveal';
import PageHead from './PageHead';
import { Section, SectionHead } from './ui';

export default function GroupAtlas() {
  const { t, L } = useLang();
  const { data } = useSite();
  const offices = (data.offices || []).filter((o) => o.active !== false);
  const [selected, setSelected] = useState(offices[0]?.id || null);
  const current = offices.find((o) => o.id === selected);

  const kindLabel = (k) =>
    k === 'hq' ? t('atlasHQ') : k === 'partner' ? t('atlasPartner') : t('atlasOffice');

  return (
    <>
      <PageHead eyebrow={t('sectionPresence')} title={t('atlasTitle')} meta={L(data.group?.legalParent)} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* globe */}
          <div className="lg:col-span-7">
            <Reveal variant="reveal-scale">
              <Globe
                offices={offices}
                selectedId={selected}
                onSelect={(o) => setSelected(o.id)}
                accent="var(--accent)"
                fg="var(--fg)"
              />
            </Reveal>
            <p className="mt-2 text-center text-[0.64rem] uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
              {t('atlasHint')}
            </p>
          </div>

          {/* office list + detail */}
          <div className="lg:col-span-5">
            <SectionHead index="01" eyebrow={t('atlasOffices')} />

            <div className="mt-7" style={{ borderTop: '1px solid var(--rule)' }}>
              {offices.map((o) => {
                const on = o.id === selected;
                return (
                  <button
                    key={o.id}
                    onClick={() => setSelected(o.id)}
                    onMouseEnter={() => setSelected(o.id)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors"
                    style={{ borderBottom: '1px solid var(--rule)' }}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: on ? 'var(--accent)' : 'var(--muted)' }}
                      />
                      <span className="min-w-0">
                        <span
                          className="block truncate text-[1.02rem]"
                          style={{ opacity: on ? 1 : 0.7, fontWeight: on ? 500 : 400 }}
                        >
                          {o.city}
                        </span>
                        <span className="block truncate text-[0.7rem]" style={{ color: 'var(--muted)' }}>
                          {L(o.region)} · {L(o.country)}
                        </span>
                      </span>
                    </span>
                    <span
                      className="shrink-0 text-[0.6rem] uppercase tracking-[0.16em]"
                      style={{ color: on ? 'var(--accent)' : 'var(--muted)' }}
                    >
                      {kindLabel(o.kind)}
                    </span>
                  </button>
                );
              })}
            </div>

            {current && (
              <div className="mt-8 p-6" style={{ background: 'var(--bg-soft)', border: '1px solid var(--rule)' }}>
                <h3 className="display text-[1.7rem] leading-tight">{current.city}</h3>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.18em]" style={{ color: 'var(--accent)' }}>
                  {kindLabel(current.kind)}
                </p>

                {L(current.note) && (
                  <p className="mt-4 text-[0.92rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {L(current.note)}
                  </p>
                )}

                <ul className="mt-5 space-y-2.5 text-[0.88rem]">
                  {L(current.address) && (
                    <li className="flex items-start gap-2.5">
                      <MapPin size={14} className="mt-1 shrink-0" style={{ color: 'var(--accent)' }} />
                      <span style={{ color: 'var(--muted)' }}>{L(current.address)}</span>
                    </li>
                  )}
                  {current.phone && (
                    <li className="flex items-start gap-2.5">
                      <Phone size={14} className="mt-1 shrink-0" style={{ color: 'var(--accent)' }} />
                      <a href={`tel:${current.phone.replace(/\s/g, '')}`} className="link-draw">
                        {current.phone}
                      </a>
                    </li>
                  )}
                  {current.email && (
                    <li className="flex items-start gap-2.5">
                      <Mail size={14} className="mt-1 shrink-0" style={{ color: 'var(--accent)' }} />
                      <a href={`mailto:${current.email}`} className="link-draw break-all">
                        {current.email}
                      </a>
                    </li>
                  )}
                </ul>

                {(current.entities || []).length > 0 && (
                  <div className="mt-6 pt-4" style={{ borderTop: '1px solid var(--rule)' }}>
                    <p className="eyebrow" style={{ color: 'var(--muted)' }}>
                      <Building2 size={11} className="mr-1.5 inline" />
                      {t('atlasPresentHere')}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {current.entities
                        .filter((id) => sectors[id])
                        .map((id) => (
                          <Link
                            key={id}
                            to={entityPath(id)}
                            className="border px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.14em] transition-opacity hover:opacity-70"
                            style={{ borderColor: 'var(--rule)', color: sectors[id].theme.accent }}
                          >
                            {sectors[id].code}
                          </Link>
                        ))}
                    </div>
                  </div>
                )}

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${current.lat},${current.lng}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-draw mt-6 inline-block text-[0.7rem] uppercase tracking-[0.16em]"
                  style={{ color: 'var(--accent)' }}
                >
                  {current.lat.toFixed(4)}°, {current.lng.toFixed(4)}° →
                </a>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

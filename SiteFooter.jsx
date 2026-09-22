import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Youtube, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useSite } from './SiteDataContext';
import { sectorList, entityPath } from './sectors';
import { LOGO } from './assets';

export default function SiteFooter({ compact = false, entity = null }) {
  const { t, L } = useLang();
  const { data } = useSite();
  const g = data.group;
  const year = new Date().getFullYear();

  // a sector's own links win where it has set them; otherwise the Group's
  const entSocial = entity ? data.entities?.[entity]?.social : null;
  const hasOwn = entSocial && Object.values(entSocial).some((v) => v);
  const socialLinks = hasOwn ? entSocial : g.social || {};

  const social = [
    { key: 'linkedin', Icon: Linkedin },
    { key: 'instagram', Icon: Instagram },
    { key: 'youtube', Icon: Youtube },
  ].filter((s) => socialLinks[s.key]);

  return (
    <footer
      className="no-print relative"
      style={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--rule)' }}
    >
      <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* brand block */}
          <div className="md:col-span-5">
            <img src={LOGO.group} alt="InEra Group" className="h-14 w-auto object-contain" />
            <p
              className="mt-5 max-w-sm text-sm leading-relaxed"
              style={{ color: 'var(--muted)' }}
            >
              {L(g.registeredMark)}
            </p>

            {social.length > 0 && (
              <div className="mt-6 flex items-center gap-2">
                {social.map(({ key, Icon }) => (
                  <a
                    key={key}
                    href={socialLinks[key]}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={key}
                    className="grid h-9 w-9 place-items-center rounded-sm border transition-all duration-500 ease-editorial hover:-translate-y-0.5"
                    style={{ borderColor: 'var(--rule)', color: 'var(--muted)' }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* sectors */}
          {!compact && (
            <div className="md:col-span-3">
              <h4 className="eyebrow" style={{ color: 'var(--muted)' }}>
                {t('navSectors')}
              </h4>
              <ul className="mt-5 space-y-2.5">
                {sectorList.map((s) => (
                  <li key={s.id}>
                    <Link
                      to={entityPath(s.id)}
                      className="link-draw text-sm transition-opacity hover:opacity-70"
                    >
                      {L(data.entities[s.id]?.name)}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Link
                    to={entityPath('software')}
                    className="link-draw text-sm"
                    style={{ color: 'var(--muted)' }}
                  >
                    {L(data.entities.software?.name)}
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* group pages */}
          {!compact && (
            <div className="md:col-span-2">
              <h4 className="eyebrow" style={{ color: 'var(--muted)' }}>
                {t('backToGroup')}
              </h4>
              <ul className="mt-5 space-y-2.5">
                {[
                  ['/about', t('navAbout')],
                  ['/sectors', t('navSectors')],
                  ['/leadership', t('navLeadership')],
                  ['/atlas', t('navAtlas')],
                  ['/gallery', t('navGallery')],
                  ['/highlights', t('navNews')],
                  ['/careers', t('navCareers')],
                  ['/verify', t('navVerify')],
                  ['/privacy', t('navPrivacy')],
                ].map(([to, label]) => (
                  <li key={to}>
                    <Link to={to} className="link-draw text-sm transition-opacity hover:opacity-70">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* contact */}
          <div className={compact ? 'md:col-span-7' : 'md:col-span-2'}>
            <h4 className="eyebrow" style={{ color: 'var(--muted)' }}>
              {t('sectionContact')}
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="mt-1 shrink-0" style={{ color: 'var(--accent)' }} />
                <a href={`mailto:${g.contact?.email}`} className="link-draw break-all">
                  {g.contact?.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="mt-1 shrink-0" style={{ color: 'var(--accent)' }} />
                <a href={`tel:${(g.contact?.phone || '').replace(/\s/g, '')}`} className="link-draw">
                  {g.contact?.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-1 shrink-0" style={{ color: 'var(--accent)' }} />
                <span style={{ color: 'var(--muted)' }}>{L(g.contact?.address)}</span>
              </li>
            </ul>
            <p className="mt-4 text-xs" style={{ color: 'var(--muted)' }}>
              {L(g.contact?.hours)}
            </p>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col-reverse items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center"
          style={{ borderTop: '1px solid var(--rule)' }}
        >
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            © {year} InEra Software Private Limited. {t('copyright')}
            <span className="mx-2 opacity-40">·</span>
            {t('legalLine')}
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 text-[0.64rem] uppercase tracking-[0.2em] transition-opacity hover:opacity-70"
            style={{ color: 'var(--muted)' }}
          >
            <ArrowUp size={12} />
            {t('backTop')}
          </button>
        </div>
      </div>
    </footer>
  );
}

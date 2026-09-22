import { useState, useEffect } from 'react';
import { Outlet, useParams, Navigate, useLocation } from 'react-router-dom';
import useCommandK from './useCommandK';
import ThemeScope from './ThemeScope';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import AIAssistant from './AIAssistant';
import AISearch from './AISearch';
import { routeToEntity, sectors, entityPath } from './sectors';
import { useSite } from './SiteDataContext';
import { useLang } from './LanguageContext';

/**
 * Each sector runs as a site of its own: its own palette, its own
 * navigation, its own assistant — inside the Group's frame.
 */
export default function SectorLayout() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const { data } = useSite();
  const { t, L } = useLang();
  const [searchOpen, setSearchOpen] = useState(false);

  const id = routeToEntity[slug];
  const nameForTitle = id ? L(data.entities?.[id]?.name) : '';

  useCommandK(() => setSearchOpen(true));

  useEffect(() => {
    if (nameForTitle) document.title = `${nameForTitle} — InEra Group`;
  }, [nameForTitle, pathname]);

  if (!id) return <Navigate to="/404" replace />;

  const entity = data.entities?.[id];
  const cfg = sectors[id];
  if (!entity || entity.active === false) return <Navigate to="/" replace />;

  const base = entityPath(id);
  const nav = [
    { label: t('navHome'), to: base, end: true },
    { label: t('navAbout'), to: `${base}/about` },
    { label: t('navOfferings'), to: `${base}/what-we-do` },
    ...(id === 'soi' ? [{ label: t('navAdmissions'), to: `${base}/admissions` }] : []),
    { label: t('navTeam'), to: `${base}/people` },
    { label: t('navGallery'), to: `${base}/gallery` },
    { label: t('navContact'), to: `${base}/contact` },
  ];

  const isHome = pathname === base || pathname === `${base}/`;

  return (
    <ThemeScope theme={cfg.theme}>
      <SiteHeader
        brand={{
          logo: cfg.logo,
          label: entity.shortName || L(entity.name),
          sublabel: L(entity.sector),
          home: base,
        }}
        nav={nav}
        overHero={isHome}
        heroMode={cfg.theme.mode}
        onOpenSearch={() => setSearchOpen(true)}
        upLink={{ label: t('backToGroup'), to: '/' }}
      />

      <main>
        <Outlet context={{ id, entity, cfg, base }} />
      </main>

      <SiteFooter entity={id} />
      <AIAssistant scopeEntity={id} />
      <AISearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </ThemeScope>
  );
}

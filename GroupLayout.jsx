import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ThemeScope, { groupTheme } from './ThemeScope';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import AIAssistant from './AIAssistant';
import AISearch from './AISearch';
import { useLang } from './LanguageContext';
import useCommandK from './useCommandK';
import { LOGO } from './assets';

export default function GroupLayout() {
  const { t } = useLang();
  const { pathname } = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const isHome = pathname === '/';

  useCommandK(() => setSearchOpen(true));

  const nav = [
    { label: t('navHome'), to: '/', end: true },
    { label: t('navAbout'), to: '/about' },
    { label: t('navLeadership'), to: '/leadership' },
    { label: t('navSectors'), to: '/sectors' },
    { label: t('navGallery'), to: '/gallery' },
    { label: t('navCareers'), to: '/careers' },
    { label: t('navContact'), to: '/contact' },
  ];

  useEffect(() => {
    const here = nav.find((n) => n.to === pathname && n.to !== '/');
    document.title = here ? `${here.label} — InEra Group` : 'InEra Group';
    // nav is rebuilt each render; pathname is the only real dependency
  }, [pathname]);

  return (
    <ThemeScope theme={groupTheme}>
      <SiteHeader
        brand={{ logo: LOGO.group, label: 'InEra Group', sublabel: '', home: '/' }}
        nav={nav}
        overHero={isHome}
        heroMode="dark"
        onOpenSearch={() => setSearchOpen(true)}
      />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <AIAssistant />
      <AISearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </ThemeScope>
  );
}

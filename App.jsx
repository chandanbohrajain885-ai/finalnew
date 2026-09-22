import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import { SiteDataProvider } from './SiteDataContext';
import Intro, { hasSeenIntro } from './Intro';

import GroupLayout from './GroupLayout';
import GroupHome from './GroupHome';
import GroupAbout from './GroupAbout';
import GroupLeadership from './GroupLeadership';
import GroupSectors from './GroupSectors';
import GroupAtlas from './GroupAtlas';
import GroupGallery from './GroupGallery';
import GroupCareers from './GroupCareers';
import GroupNews from './GroupNews';
import GroupVerify from './GroupVerify';
import GroupPrivacy from './GroupPrivacy';
import GroupContact from './GroupContact';

import SectorLayout from './SectorLayout';
import SectorHome from './SectorHome';
import SectorAbout from './SectorAbout';
import SectorOfferings from './SectorOfferings';
import SectorPeople from './SectorPeople';
import SectorGallery from './SectorGallery';
import SectorAdmissions from './SectorAdmissions';
import SectorContact from './SectorContact';

import AdminPage from './AdminPage';
import NotFound from './NotFound';

/** Reset scroll on navigation, but leave in-page anchors alone. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);
  return null;
}

/** The arrival sequence plays once per session, on the Group landing page. */
function IntroGate() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(() => pathname === '/' && !hasSeenIntro());
  if (!show) return null;
  return <Intro onDone={() => setShow(false)} />;
}

export default function App() {
  return (
    <LanguageProvider>
      <SiteDataProvider>
        <BrowserRouter>
          <ScrollToTop />
          <IntroGate />
          <Routes>
            <Route element={<GroupLayout />}>
              <Route path="/" element={<GroupHome />} />
              <Route path="/about" element={<GroupAbout />} />
              <Route path="/sectors" element={<GroupSectors />} />
              <Route path="/leadership" element={<GroupLeadership />} />
              <Route path="/atlas" element={<GroupAtlas />} />
              <Route path="/gallery" element={<GroupGallery />} />
              <Route path="/highlights" element={<GroupNews />} />
              <Route path="/careers" element={<GroupCareers />} />
              <Route path="/verify" element={<GroupVerify />} />
              <Route path="/privacy" element={<GroupPrivacy />} />
              <Route path="/contact" element={<GroupContact />} />
            </Route>

            <Route path="/admin" element={<AdminPage />} />

            <Route path="/:slug" element={<SectorLayout />}>
              <Route index element={<SectorHome />} />
              <Route path="about" element={<SectorAbout />} />
              <Route path="what-we-do" element={<SectorOfferings />} />
              <Route path="people" element={<SectorPeople />} />
              <Route path="gallery" element={<SectorGallery />} />
              <Route path="admissions" element={<SectorAdmissions />} />
              <Route path="contact" element={<SectorContact />} />
            </Route>

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </SiteDataProvider>
    </LanguageProvider>
  );
}

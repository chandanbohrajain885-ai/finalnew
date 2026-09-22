import { useLang } from './LanguageContext';
import { useSite } from './SiteDataContext';
import PageHead from './PageHead';
import Gallery from './Gallery';
import { Section } from './ui';

export default function GroupGallery() {
  const { t, L } = useLang();
  const { data } = useSite();
  return (
    <>
      <PageHead
        eyebrow={t('navGallery')}
        title={t('navGallery')}
        meta={L(data.group?.registeredMark)}
      />
      <Section>
        <Gallery />
      </Section>
    </>
  );
}

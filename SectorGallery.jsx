import { useOutletContext } from 'react-router-dom';
import { useLang } from './LanguageContext';
import PageHead from './PageHead';
import Gallery from './Gallery';
import { Section, SectionHead } from './ui';
import { Reviews, Highlights } from './blocks';

export default function SectorGallery() {
  const { id, entity, cfg } = useOutletContext();
  const { t, L } = useLang();
  return (
    <>
      <PageHead
        eyebrow={t('navGallery')}
        title={t('navGallery')}
        meta={L(entity.name)}
        logo={cfg.logo}
      />
      <Section>
        <Gallery entity={id} />
      </Section>
      <Section tone="soft">
        <SectionHead index="01" eyebrow={t('sectionHighlights')} />
        <div className="mt-10">
          <Highlights entity={id} />
        </div>
      </Section>
      <Section>
        <SectionHead index="02" eyebrow={t('sectionReviews')} />
        <div className="mt-10">
          <Reviews entity={id} />
        </div>
      </Section>
    </>
  );
}

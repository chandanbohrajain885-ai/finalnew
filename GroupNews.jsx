import { useLang } from './LanguageContext';
import PageHead from './PageHead';
import { Section, SectionHead } from './ui';
import { Highlights, Reviews } from './blocks';

export default function GroupNews() {
  const { t } = useLang();
  return (
    <>
      <PageHead eyebrow={t('sectionHighlights')} title={t('navNews')} />
      <Section>
        <SectionHead index="01" eyebrow={t('sectionHighlights')} />
        <div className="mt-10">
          <Highlights />
        </div>
      </Section>
      <Section tone="soft">
        <SectionHead index="02" eyebrow={t('sectionReviews')} title={t('sectionClients')} />
        <div className="mt-10">
          <Reviews kind="client" />
        </div>
      </Section>
      <Section>
        <SectionHead index="03" eyebrow={t('sectionReviews')} title={t('sectionStudents')} />
        <div className="mt-10">
          <Reviews kind="student" />
        </div>
      </Section>
    </>
  );
}

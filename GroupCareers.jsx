import { useLang } from './LanguageContext';
import PageHead from './PageHead';
import { Section, SectionHead } from './ui';
import { CareersList } from './blocks';

export default function GroupCareers() {
  const { t } = useLang();
  return (
    <>
      <PageHead eyebrow={t('navCareers')} title={t('navCareers')} />
      <Section>
        <SectionHead index="01" eyebrow={t('navCareers')} />
        <div className="mt-10">
          <CareersList />
        </div>
      </Section>
    </>
  );
}

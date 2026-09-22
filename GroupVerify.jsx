import { useLang } from './LanguageContext';
import PageHead from './PageHead';
import { Section, SectionHead } from './ui';
import { CertificateVerifier } from './blocks';

export default function GroupVerify() {
  const { t } = useLang();
  return (
    <>
      <PageHead eyebrow={t('navVerify')} title={t('verifyTitle')} meta={t('verifyIntro')} />
      <Section>
        <div className="max-w-2xl">
          <SectionHead index="01" eyebrow={t('verifyTitle')} />
          <div className="mt-8">
            <CertificateVerifier />
          </div>
        </div>
      </Section>
    </>
  );
}

import { Link } from 'react-router-dom';
import { useLang } from './LanguageContext';
import { LOGO } from './assets';

export default function NotFound() {
  const { t } = useLang();
  return (
    <div className="grain grain-dark flex min-h-screen flex-col items-center justify-center bg-ink px-5 text-center text-ivory">
      <img src={LOGO.group} alt="InEra Group" className="h-16 w-auto object-contain" />
      <p className="num-marker mt-10 text-gold">404</p>
      <h1 className="display lang-serif mt-3 text-[clamp(2rem,5vw,3.2rem)]">{t('notFound')}</h1>
      <Link
        to="/"
        className="btn-solid mt-9"
        style={{ background: '#C09B3A', borderColor: '#C09B3A', color: '#fff' }}
      >
        {t('goHome')}
      </Link>
    </div>
  );
}

import { useEffect, useState, useCallback } from 'react';
import { useLang } from './LanguageContext';
import { LOGO } from './assets';

const SEEN_KEY = 'inera_intro_seen_v1';

export function hasSeenIntro() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* ignore */
  }
}

/**
 * The arrival sequence.
 * Ink-black field → the Group mark strikes in with a double blink and a
 * light sweep → a hairline rule draws beneath it → the parent line settles
 * → the field tears along the horizon and lifts away to reveal the site.
 *
 * The same artwork is drawn inside both halves, each positioned so the two
 * register perfectly while joined and split cleanly when they part.
 */
export default function Intro({ onDone }) {
  const { t } = useLang();
  const [phase, setPhase] = useState('hold'); // hold → part → gone

  const finish = useCallback(() => {
    setPhase((p) => (p === 'hold' ? 'part' : p));
  }, []);

  useEffect(() => {
    if (phase !== 'hold') return undefined;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = setTimeout(finish, reduce ? 500 : 3350);
    return () => clearTimeout(timer);
  }, [phase, finish]);

  useEffect(() => {
    if (phase !== 'part') return undefined;
    const timer = setTimeout(() => {
      setPhase('gone');
      markSeen();
      onDone?.();
    }, 1000);
    return () => clearTimeout(timer);
  }, [phase, onDone]);

  useEffect(() => {
    document.body.style.overflow = phase === 'gone' ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [phase]);

  useEffect(() => {
    const onKey = (e) => {
      if (['Escape', 'Enter', ' '].includes(e.key)) finish();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finish]);

  if (phase === 'gone') return null;
  const parting = phase === 'part';

  return (
    <div className="fixed inset-0 z-[120] select-none" aria-hidden={parting}>
      <div className={`absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-ink ${parting ? 'curtain-top' : ''}`}>
        <Artwork t={t} offset="0" />
      </div>
      <div className={`absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-ink ${parting ? 'curtain-bottom' : ''}`}>
        <Artwork t={t} offset="-50vh" />
      </div>

      {/* hairline that sits exactly on the tear */}
      {!parting && (
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gold/25" />
      )}

      {!parting && (
        <button
          onClick={finish}
          className="eyebrow absolute bottom-7 right-7 z-10 text-ivory/45 transition-colors hover:text-gold"
        >
          {t('skipIntro')} →
        </button>
      )}
    </div>
  );
}

function Artwork({ t, offset }) {
  return (
    <div
      className="absolute left-0 flex w-full flex-col items-center justify-center px-6"
      style={{ top: offset, height: '100vh' }}
    >
      <div className="relative">
        <img
          src={LOGO.group}
          alt="InEra Group"
          className="intro-logo w-[min(60vw,360px)]"
          draggable="false"
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="intro-sweep absolute inset-y-0 -left-1/3 w-1/3"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,246,214,0.5), transparent)',
              filter: 'blur(7px)',
            }}
          />
        </div>
      </div>

      <div className="intro-rule mt-8 h-px w-[min(52vw,300px)] bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

      <p className="intro-caption lang-serif mt-6 text-center text-[0.64rem] uppercase leading-relaxed tracking-[0.3em] text-ivory/50">
        {t('aGroupOf')}
        <br />
        <span className="mt-2 inline-block text-[0.6rem] tracking-[0.26em] text-gold/80">
          InEra Software Private Limited
        </span>
      </p>
    </div>
  );
}

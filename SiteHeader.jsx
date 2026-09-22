import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Search, ArrowUpRight } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { useLang } from './LanguageContext';
import { useScrollY, useScrollProgress } from './useReveal';

/**
 * One header serves the Group site and every sector site.
 * It is transparent over a hero and settles into a solid bar on scroll.
 */
export default function SiteHeader({
  brand,
  nav = [],
  overHero = false,
  heroMode = 'light',
  onOpenSearch,
  upLink = null,
}) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const y = useScrollY();
  const progress = useScrollProgress();
  const { pathname } = useLocation();

  const solid = !overHero || y > 90;
  // while floating over a dark hero, invert the bar's own palette
  const onDark = !solid && heroMode === 'dark';
  const barVars = onDark
    ? {
        color: '#F3F0E9',
        '--fg': '#F3F0E9',
        '--muted': 'rgba(243,240,233,0.62)',
        '--rule': 'rgba(243,240,233,0.22)',
      }
    : {};

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className="no-print fixed inset-x-0 top-0 z-[90] transition-all duration-700 ease-editorial"
        style={{
          background: solid ? 'var(--bg)' : 'transparent',
          borderBottom: solid ? '1px solid var(--rule)' : '1px solid transparent',
          boxShadow: solid && y > 140 ? '0 1px 24px rgba(0,0,0,0.06)' : 'none',
          ...barVars,
        }}
      >
        <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-5 sm:px-8">
          {/* brand */}
          <Link
            to={brand.home}
            className="group flex min-w-0 items-center gap-3 py-3.5"
            aria-label={brand.label}
          >
            <img
              src={brand.logo}
              alt=""
              className="h-10 w-10 shrink-0 object-contain transition-transform duration-700 ease-editorial group-hover:scale-105 sm:h-11 sm:w-11"
            />
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[0.82rem] font-semibold tracking-[0.02em]">
                {brand.label}
              </span>
              {brand.sublabel && (
                <span
                  className="block truncate text-[0.58rem] uppercase tracking-[0.2em]"
                  style={{ color: 'var(--muted)' }}
                >
                  {brand.sublabel}
                </span>
              )}
            </span>
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `link-draw whitespace-nowrap text-[0.7rem] uppercase tracking-[0.14em] xl:text-[0.74rem] xl:tracking-[0.17em] transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {upLink && (
              <Link
                to={upLink.to}
                className="hidden items-center gap-1 text-[0.64rem] uppercase tracking-[0.18em] transition-opacity hover:opacity-70 md:inline-flex"
                style={{ color: 'var(--muted)' }}
              >
                {upLink.label}
                <ArrowUpRight size={12} />
              </Link>
            )}
            <button
              onClick={onOpenSearch}
              aria-label={t('aiSearchOpen')}
              className="grid h-8 w-8 place-items-center rounded-sm border transition-colors duration-300"
              style={{ borderColor: 'var(--rule)', color: 'var(--muted)' }}
            >
              <Search size={14} />
            </button>
            <LanguageToggle />
            <button
              onClick={() => setOpen(true)}
              aria-label={t('menu')}
              className="grid h-8 w-8 place-items-center rounded-sm border lg:hidden"
              style={{ borderColor: 'var(--rule)', color: 'var(--fg)' }}
            >
              <Menu size={16} />
            </button>
          </div>
        </div>

        {/* reading progress hairline */}
        <div
          className="h-px origin-left transition-transform duration-150"
          style={{ background: 'var(--accent)', transform: `scaleX(${progress})` }}
        />
      </header>

      {/* mobile drawer */}
      <div
        className={`no-print fixed inset-0 z-[110] lg:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/45 transition-opacity duration-500 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-[min(86vw,360px)] flex-col transition-transform duration-[650ms] ease-editorial ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ background: 'var(--bg)', borderLeft: '1px solid var(--rule)' }}
        >
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: '1px solid var(--rule)' }}
          >
            <span className="eyebrow" style={{ color: 'var(--muted)' }}>
              {t('menu')}
            </span>
            <button onClick={() => setOpen(false)} aria-label={t('close')} className="p-1">
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-6">
            {nav.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `display block py-3 text-[1.7rem] transition-colors ${
                    isActive ? '' : 'opacity-65'
                  }`
                }
                style={({ isActive }) => ({ color: isActive ? 'var(--accent)' : 'var(--fg)' })}
              >
                <span className="num-marker mr-3 align-middle">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.label}
              </NavLink>
            ))}
            {upLink && (
              <Link
                to={upLink.to}
                className="mt-6 inline-flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.18em]"
                style={{ color: 'var(--muted)' }}
              >
                {upLink.label}
                <ArrowUpRight size={12} />
              </Link>
            )}
          </nav>

          <div className="px-6 pb-7" style={{ borderTop: '1px solid var(--rule)' }}>
            <div className="pt-5">
              <LanguageToggle />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

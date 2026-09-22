import Reveal, { MaskedLines } from './Reveal';

/**
 * The masthead that opens every interior page.
 * Deliberately typographic — a rule, a label, a large serif line.
 */
export default function PageHead({ eyebrow, title, meta, logo, tone = 'soft' }) {
  return (
    <header
      className="relative overflow-hidden pt-28 sm:pt-32"
      style={{ background: tone === 'soft' ? 'var(--bg-soft)' : 'var(--bg)' }}
    >
      <div className="mx-auto max-w-content px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-14">
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-10" style={{ background: 'var(--accent)' }} />
          <span className="eyebrow" style={{ color: 'var(--muted)' }}>
            {eyebrow}
          </span>
        </Reveal>

        <div className="mt-6 flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="display lang-serif max-w-3xl text-[clamp(2.1rem,5.4vw,4rem)] leading-[1.04]">
            <MaskedLines lines={[title]} />
          </h1>
          {logo && (
            <Reveal variant="reveal-scale" delay={140}>
              <img src={logo} alt="" className="h-24 w-24 object-contain sm:h-32 sm:w-32" />
            </Reveal>
          )}
        </div>

        {meta && (
          <Reveal delay={200} className="mt-6 max-w-2xl text-[0.95rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
            {meta}
          </Reveal>
        )}
      </div>
      <div className="h-px w-full" style={{ background: 'var(--rule)' }} />
    </header>
  );
}

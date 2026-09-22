import { useReveal } from './useReveal';

/**
 * Wrapper that fades/slides its children in on scroll.
 * `as` lets it render any tag; `delay` staggers groups.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  variant = 'reveal',
  threshold,
  style,
  ...rest
}) {
  const [ref, shown] = useReveal({ threshold });
  return (
    <Tag
      ref={ref}
      className={`${variant} ${shown ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Display heading whose lines slide up from a mask. */
export function MaskedLines({ lines = [], className = '', delayStep = 90 }) {
  const [ref, shown] = useReveal({ threshold: 0.2 });
  return (
    <span ref={ref} className={`${shown ? 'in' : ''} ${className}`}>
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          <span style={{ transitionDelay: `${i * delayStep}ms` }}>{line}</span>
        </span>
      ))}
    </span>
  );
}

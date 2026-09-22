import { useEffect, useRef } from 'react';

/**
 * ⌘K / Ctrl-K — and a bare `/` when nothing is focused — opens site search.
 */
export default function useCommandK(open) {
  const ref = useRef(open);
  ref.current = open;

  useEffect(() => {
    const fire = () => ref.current?.();
    const onKey = (e) => {
      const tag = (e.target?.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'textarea' || e.target?.isContentEditable;
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        fire();
        return;
      }
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        fire();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
}

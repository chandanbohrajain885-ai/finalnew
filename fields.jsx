import { useRef, useState } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, Eye, EyeOff, Upload, X } from 'lucide-react';

/* ── labelled plain text ────────────────────────────────────── */
export function Field({ label, value, onChange, type = 'text', hint, mono = false }) {
  return (
    <label className="block">
      <span className="eyebrow mb-1.5 block text-ink-400">{label}</span>
      <input
        type={type}
        className={`field ${mono ? 'font-mono text-[0.8rem]' : ''}`}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <span className="mt-1 block text-[0.68rem] text-ink-400">{hint}</span>}
    </label>
  );
}

export function Area({ label, value, onChange, rows = 4, hint }) {
  return (
    <label className="block">
      <span className="eyebrow mb-1.5 block text-ink-400">{label}</span>
      <textarea className="field" rows={rows} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      {hint && <span className="mt-1 block text-[0.68rem] text-ink-400">{hint}</span>}
    </label>
  );
}

/* ── bilingual text ─────────────────────────────────────────── */
export function BiField({ label, value, onChange, area = false, rows = 3, hint }) {
  const v = typeof value === 'object' && value !== null ? value : { en: value || '', hi: '' };
  const set = (k) => (e) => onChange({ ...v, [k]: e.target.value });
  const Input = area ? 'textarea' : 'input';
  const common = { className: 'field', ...(area ? { rows } : {}) };

  return (
    <div>
      <span className="eyebrow mb-1.5 block text-ink-400">{label}</span>
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <span className="mb-1 block text-[0.6rem] uppercase tracking-[0.16em] text-ink-400">English</span>
          <Input {...common} value={v.en ?? ''} onChange={set('en')} />
        </div>
        <div>
          <span className="mb-1 block text-[0.6rem] uppercase tracking-[0.16em] text-ink-400">हिन्दी</span>
          <Input {...common} value={v.hi ?? ''} onChange={set('hi')} />
        </div>
      </div>
      {hint && <span className="mt-1 block text-[0.68rem] text-ink-400">{hint}</span>}
    </div>
  );
}

/* ── list of bilingual paragraphs ───────────────────────────── */
export function BiParagraphs({ label, value = [], onChange }) {
  const list = Array.isArray(value) ? value : [];
  const setAt = (i, v) => onChange(list.map((p, j) => (i === j ? v : p)));
  const add = () => onChange([...list, { en: '', hi: '' }]);
  const remove = (i) => onChange(list.filter((_, j) => j !== i));
  const move = (i, d) => {
    const next = [...list];
    const j = i + d;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="eyebrow text-ink-400">{label}</span>
        <button type="button" onClick={add} className="admin-mini">
          <Plus size={12} /> Add paragraph
        </button>
      </div>
      <div className="space-y-3">
        {list.map((p, i) => (
          <div key={i} className="rounded-sm border border-ink/10 bg-white p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="num-marker">¶ {String(i + 1).padStart(2, '0')}</span>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => move(i, -1)} className="admin-icon">
                  <ChevronUp size={13} />
                </button>
                <button type="button" onClick={() => move(i, 1)} className="admin-icon">
                  <ChevronDown size={13} />
                </button>
                <button type="button" onClick={() => remove(i)} className="admin-icon text-red-600">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
            <BiField label="" value={p} onChange={(v) => setAt(i, v)} area rows={3} />
          </div>
        ))}
        {list.length === 0 && <p className="text-[0.8rem] text-ink-400">No paragraphs yet.</p>}
      </div>
    </div>
  );
}

/* ── generic repeatable list ────────────────────────────────── */
export function ListEditor({ label, items = [], onChange, template, renderItem, titleOf, addLabel = 'Add item' }) {
  const list = Array.isArray(items) ? items : [];
  const [openId, setOpenId] = useState(null);

  const setAt = (i, v) => onChange(list.map((x, j) => (i === j ? v : x)));
  const add = () => {
    const item = { ...template(), id: `x${Date.now()}${Math.floor(Math.random() * 99)}` };
    onChange([...list, item]);
    setOpenId(item.id);
  };
  const remove = (i) => {
    if (!window.confirm('Delete this entry? This publishes immediately.')) return;
    onChange(list.filter((_, j) => j !== i));
  };
  const move = (i, d) => {
    const next = [...list];
    const j = i + d;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="eyebrow text-ink-400">
          {label} <span className="ml-1 opacity-60">({list.length})</span>
        </span>
        <button type="button" onClick={add} className="admin-mini">
          <Plus size={12} /> {addLabel}
        </button>
      </div>

      <div className="space-y-2">
        {list.map((item, i) => {
          const open = openId === item.id;
          return (
            <div key={item.id ?? i} className="rounded-sm border border-ink/10 bg-white">
              <div className="flex items-center gap-2 px-3 py-2.5">
                <span className="num-marker w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="min-w-0 flex-1 truncate text-left text-[0.85rem] font-medium"
                >
                  {titleOf(item) || <span className="text-ink-400">Untitled</span>}
                </button>
                {'active' in item && (
                  <button
                    type="button"
                    onClick={() => setAt(i, { ...item, active: item.active === false })}
                    className="admin-icon"
                    title={item.active === false ? 'Hidden — click to show' : 'Visible — click to hide'}
                  >
                    {item.active === false ? (
                      <EyeOff size={13} className="text-ink-400" />
                    ) : (
                      <Eye size={13} className="text-emerald-600" />
                    )}
                  </button>
                )}
                <button type="button" onClick={() => move(i, -1)} className="admin-icon">
                  <ChevronUp size={13} />
                </button>
                <button type="button" onClick={() => move(i, 1)} className="admin-icon">
                  <ChevronDown size={13} />
                </button>
                <button type="button" onClick={() => remove(i)} className="admin-icon text-red-600">
                  <Trash2 size={13} />
                </button>
              </div>
              {open && (
                <div className="space-y-4 border-t border-ink/10 bg-ivory/40 px-3 py-4">
                  {renderItem(item, (v) => setAt(i, v))}
                </div>
              )}
            </div>
          );
        })}
        {list.length === 0 && (
          <p className="rounded-sm border border-dashed border-ink/15 px-3 py-6 text-center text-[0.8rem] text-ink-400">
            Nothing here yet — use “{addLabel}”.
          </p>
        )}
      </div>
    </div>
  );
}

/* ── image field: URL or upload (compressed to a data URL) ──── */
export function ImageField({ label, value, onChange, hint }) {
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const pick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const dataUrl = await compress(file, 900, 0.82);
      onChange(dataUrl);
    } catch {
      window.alert('Could not read that image.');
    }
    setBusy(false);
    e.target.value = '';
  };

  return (
    <div>
      <span className="eyebrow mb-1.5 block text-ink-400">{label}</span>
      <div className="flex items-start gap-3">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-sm border border-ink/10 bg-ivory-200">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center text-[0.6rem] text-ink-400">none</div>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <input
            className="field font-mono text-[0.75rem]"
            placeholder="https://… (or use Upload)"
            value={value?.startsWith('data:') ? '(uploaded image)' : value ?? ''}
            readOnly={value?.startsWith('data:')}
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => fileRef.current?.click()} className="admin-mini" disabled={busy}>
              <Upload size={12} /> {busy ? 'Processing…' : 'Upload'}
            </button>
            {value && (
              <button type="button" onClick={() => onChange('')} className="admin-mini text-red-600">
                <X size={12} /> Remove
              </button>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={pick} />
        </div>
      </div>
      {hint && <span className="mt-1.5 block text-[0.68rem] text-ink-400">{hint}</span>}
    </div>
  );
}

function compress(file, maxSize, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ── small layout helpers ───────────────────────────────────── */
export function Card({ title, description, children }) {
  return (
    <section className="rounded-sm border border-ink/10 bg-ivory/50 p-4 sm:p-5">
      {title && (
        <header className="mb-4">
          <h3 className="text-[0.95rem] font-semibold">{title}</h3>
          {description && <p className="mt-1 text-[0.78rem] text-ink-400">{description}</p>}
        </header>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function Grid2({ children }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

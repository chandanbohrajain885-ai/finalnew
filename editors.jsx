import { useRef, useState } from 'react';
import { Upload, Trash2, Check, Plus, Download } from 'lucide-react';
import { useSite } from './SiteDataContext';
import { sectors, ALL_ENTITY_IDS } from './sectors';
import { Field, BiField, ListEditor, ImageField, Card, Grid2 } from './fields';

/* ============================================================
   Collection editors.
   Every one takes a `scope`: null for the Group workspace (all
   records), or an entity id for a sector workspace — in which
   case it shows only that sector's records and tags anything
   new with that sector automatically.
   ============================================================ */

/** Records belonging to this workspace. */
function view(all, scope) {
  const list = Array.isArray(all) ? all : [];
  return scope ? list.filter((x) => x.entity === scope) : list;
}

/** Put an edited subset back into the full collection. */
function merge(all, scope, next) {
  const list = Array.isArray(all) ? all : [];
  if (!scope) return next;
  const tagged = next.map((x) => ({ ...x, entity: scope }));
  const others = list.filter((x) => x.entity !== scope);
  return [...tagged, ...others];
}

function EntityPicker({ value, onChange, allowNone = true, label = 'Sector' }) {
  return (
    <label className="block">
      <span className="eyebrow mb-1.5 block text-ink-400">{label}</span>
      <select className="field" value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
        {allowNone && <option value="">InEra Group (all)</option>}
        {ALL_ENTITY_IDS.map((id) => (
          <option key={id} value={id}>
            {sectors[id].code}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ── Offices / Atlas (Group only) ───────────────────────────── */
export function OfficesEditor() {
  const { data, update } = useSite();
  return (
    <Card
      title="Locations on the globe"
      description="Right-click a spot in Google Maps and the first line of the menu is the latitude, longitude pair. Paste each number into its own box. Cities close together are spread apart automatically on the globe — visitors can also zoom in."
    >
      <ListEditor
        label="Offices"
        items={data.offices}
        onChange={(v) => update((d) => { d.offices = v; })}
        addLabel="Add office"
        template={() => ({
          city: '',
          region: { en: '', hi: '' },
          country: { en: 'India', hi: 'भारत' },
          lat: 20,
          lng: 78,
          kind: 'office',
          entities: [],
          address: { en: '', hi: '' },
          note: { en: '', hi: '' },
          phone: '',
          email: '',
          active: true,
        })}
        titleOf={(it) => it.city}
        renderItem={(it, setItem) => (
          <>
            <Grid2>
              <Field label="City" value={it.city} onChange={(v) => setItem({ ...it, city: v })} />
              <label className="block">
                <span className="eyebrow mb-1.5 block text-ink-400">Kind</span>
                <select
                  className="field"
                  value={it.kind || 'office'}
                  onChange={(e) => setItem({ ...it, kind: e.target.value })}
                >
                  <option value="hq">Headquarters</option>
                  <option value="office">Office</option>
                  <option value="partner">Partner location</option>
                </select>
              </label>
            </Grid2>
            <BiField label="State / region" value={it.region} onChange={(v) => setItem({ ...it, region: v })} />
            <BiField label="Country" value={it.country} onChange={(v) => setItem({ ...it, country: v })} />
            <Grid2>
              <Field
                label="Latitude"
                type="number"
                mono
                value={it.lat}
                onChange={(v) => setItem({ ...it, lat: parseFloat(v) || 0 })}
                hint="−90 to 90"
              />
              <Field
                label="Longitude"
                type="number"
                mono
                value={it.lng}
                onChange={(v) => setItem({ ...it, lng: parseFloat(v) || 0 })}
                hint="−180 to 180"
              />
            </Grid2>
            <BiField label="Address" value={it.address} onChange={(v) => setItem({ ...it, address: v })} area />
            <BiField label="Short note" value={it.note} onChange={(v) => setItem({ ...it, note: v })} area />
            <Grid2>
              <Field label="Phone" value={it.phone} onChange={(v) => setItem({ ...it, phone: v })} />
              <Field label="Email" value={it.email} onChange={(v) => setItem({ ...it, email: v })} />
            </Grid2>
            <div>
              <span className="eyebrow mb-2 block text-ink-400">Entities present here</span>
              <div className="flex flex-wrap gap-2">
                {ALL_ENTITY_IDS.map((id) => {
                  const on = (it.entities || []).includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() =>
                        setItem({
                          ...it,
                          entities: on
                            ? it.entities.filter((x) => x !== id)
                            : [...(it.entities || []), id],
                        })
                      }
                      className="rounded-lg border px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.12em]"
                      style={
                        on
                          ? {
                              background: sectors[id].theme.accent,
                              borderColor: sectors[id].theme.accent,
                              color: '#fff',
                            }
                          : { borderColor: 'rgba(255,255,255,0.14)', color: 'rgba(243,240,233,0.5)' }
                      }
                    >
                      {sectors[id].code}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      />
    </Card>
  );
}

/* ── Gallery ────────────────────────────────────────────────── */
export function GalleryEditor({ scope = null }) {
  const { data, update } = useSite();
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const cats = data.galleryCategories || [];
  const items = view(data.gallery, scope);

  const setItems = (next) => update((d) => { d.gallery = merge(d.gallery, scope, next); });

  const addFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setBusy(true);
    const made = [];
    for (const file of files) {
      try {
        const image = await shrink(file, 1400, 0.8);
        made.push({
          id: `g${Date.now()}${Math.floor(Math.random() * 999)}`,
          title: { en: file.name.replace(/\.[^.]+$/, ''), hi: '' },
          caption: { en: '', hi: '' },
          category: cats[0]?.key || '',
          entity: scope || '',
          year: String(new Date().getFullYear()),
          image,
          active: true,
        });
      } catch {
        /* skip unreadable file */
      }
    }
    update((d) => {
      d.gallery = [...made, ...(d.gallery || [])];
    });
    setBusy(false);
    e.target.value = '';
  };

  return (
    <>
      <Card
        title="Add pictures"
        description={
          scope
            ? 'Uploads here are tagged to this sector and appear on its own gallery page as well as the Group gallery.'
            : 'Select several at once. Each is resized before it is stored.'
        }
      >
        <button onClick={() => fileRef.current?.click()} className="admin-mini" disabled={busy}>
          <Upload size={12} /> {busy ? 'Processing…' : 'Upload pictures'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={addFiles} />
        <p className="text-[0.75rem] text-ink-400">
          Photographs are scaled to 1400px on the long edge. Keep the whole library under roughly 200
          pictures so the site stays quick to load.
        </p>
      </Card>

      {!scope && (
        <Card title="Categories" description="The filter chips shown above the gallery.">
          <ListEditor
            label="Categories"
            items={cats}
            onChange={(v) => update((d) => { d.galleryCategories = v; })}
            addLabel="Add category"
            template={() => ({ key: `c${Date.now()}`, name: { en: '', hi: '' } })}
            titleOf={(it) => it.name?.en}
            renderItem={(it, setItem) => (
              <>
                <BiField label="Name" value={it.name} onChange={(v) => setItem({ ...it, name: v })} />
                <Field
                  label="Key"
                  mono
                  value={it.key}
                  onChange={(v) => setItem({ ...it, key: v })}
                  hint="Used internally. Change it and any picture on the old key loses its category."
                />
              </>
            )}
          />
        </Card>
      )}

      <Card title={`Pictures (${items.length})`}>
        <ListEditor
          label="Pictures"
          items={items}
          onChange={setItems}
          addLabel="Add blank entry"
          template={() => ({
            title: { en: '', hi: '' },
            caption: { en: '', hi: '' },
            category: cats[0]?.key || '',
            entity: scope || '',
            year: String(new Date().getFullYear()),
            image: '',
            active: true,
          })}
          titleOf={(it) => it.title?.en || 'Untitled picture'}
          renderItem={(it, setItem) => (
            <>
              <ImageField label="Picture" value={it.image} onChange={(v) => setItem({ ...it, image: v })} />
              <BiField label="Title" value={it.title} onChange={(v) => setItem({ ...it, title: v })} />
              <BiField label="Caption" value={it.caption} onChange={(v) => setItem({ ...it, caption: v })} area />
              <Grid2>
                <label className="block">
                  <span className="eyebrow mb-1.5 block text-ink-400">Category</span>
                  <select
                    className="field"
                    value={it.category || ''}
                    onChange={(e) => setItem({ ...it, category: e.target.value })}
                  >
                    <option value="">—</option>
                    {cats.map((c) => (
                      <option key={c.id} value={c.key}>
                        {c.name?.en}
                      </option>
                    ))}
                  </select>
                </label>
                <Field label="Year" value={it.year} onChange={(v) => setItem({ ...it, year: v })} />
              </Grid2>
              {!scope && (
                <EntityPicker value={it.entity} onChange={(v) => setItem({ ...it, entity: v })} />
              )}
            </>
          )}
        />
      </Card>
    </>
  );
}

function shrink(file, maxSize, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ── Highlights ─────────────────────────────────────────────── */
export function HighlightsEditor({ scope = null }) {
  const { data, update } = useSite();
  const items = view(data.highlights, scope);
  return (
    <Card
      title="Highlights"
      description={
        scope
          ? "Shown on this sector's gallery page, and in the Group's Latest section."
          : "The 'Latest' cards on the Group home page and the highlights page."
      }
    >
      <ListEditor
        label="Highlights"
        items={items}
        onChange={(v) => update((d) => { d.highlights = merge(d.highlights, scope, v); })}
        addLabel="Add highlight"
        template={() => ({
          tag: { en: '', hi: '' },
          date: String(new Date().getFullYear()),
          title: { en: '', hi: '' },
          body: { en: '', hi: '' },
          entity: scope || '',
          active: true,
        })}
        titleOf={(it) => it.title?.en}
        renderItem={(it, setItem) => (
          <>
            <Grid2>
              <Field label="Date / year" value={it.date} onChange={(v) => setItem({ ...it, date: v })} />
              {!scope && <EntityPicker value={it.entity} onChange={(v) => setItem({ ...it, entity: v })} />}
            </Grid2>
            <BiField label="Tag" value={it.tag} onChange={(v) => setItem({ ...it, tag: v })} />
            <BiField label="Title" value={it.title} onChange={(v) => setItem({ ...it, title: v })} />
            <BiField label="Body" value={it.body} onChange={(v) => setItem({ ...it, body: v })} area />
          </>
        )}
      />
    </Card>
  );
}

/* ── Careers ────────────────────────────────────────────────── */
export function CareersEditor({ scope = null }) {
  const { data, update } = useSite();
  const items = view(data.careers, scope);
  return (
    <Card
      title="Open roles"
      description="Hide a role instead of deleting it if it may come back."
    >
      <ListEditor
        label="Roles"
        items={items}
        onChange={(v) => update((d) => { d.careers = merge(d.careers, scope, v); })}
        addLabel="Add role"
        template={() => ({
          title: { en: '', hi: '' },
          entity: scope || '',
          department: { en: '', hi: '' },
          type: { en: 'Full-time', hi: 'पूर्णकालिक' },
          location: { en: '', hi: '' },
          description: { en: '', hi: '' },
          active: true,
        })}
        titleOf={(it) => it.title?.en}
        renderItem={(it, setItem) => (
          <>
            <BiField label="Role title" value={it.title} onChange={(v) => setItem({ ...it, title: v })} />
            {!scope && <EntityPicker value={it.entity} onChange={(v) => setItem({ ...it, entity: v })} />}
            <BiField label="Department" value={it.department} onChange={(v) => setItem({ ...it, department: v })} />
            <BiField label="Type" value={it.type} onChange={(v) => setItem({ ...it, type: v })} />
            <BiField label="Location" value={it.location} onChange={(v) => setItem({ ...it, location: v })} />
            <BiField
              label="Description"
              value={it.description}
              onChange={(v) => setItem({ ...it, description: v })}
              area
              rows={4}
            />
          </>
        )}
      />
    </Card>
  );
}

/* ── Reviews ────────────────────────────────────────────────── */
export function ReviewsEditor({ scope = null }) {
  const { data, update } = useSite();
  const items = view(data.reviews, scope);
  return (
    <Card
      title="Reviews"
      description="Only publish words a real client or participant actually gave you. Invented testimonials are the fastest way to lose a reader."
    >
      <ListEditor
        label="Reviews"
        items={items}
        onChange={(v) => update((d) => { d.reviews = merge(d.reviews, scope, v); })}
        addLabel="Add review"
        template={() => ({
          kind: scope === 'soi' ? 'student' : 'client',
          entity: scope || '',
          name: '',
          role: { en: '', hi: '' },
          place: { en: '', hi: '' },
          rating: 5,
          text: { en: '', hi: '' },
          active: true,
        })}
        titleOf={(it) => `${it.name || 'Unnamed'} · ${it.kind}`}
        renderItem={(it, setItem) => (
          <>
            <Grid2>
              <Field label="Name" value={it.name} onChange={(v) => setItem({ ...it, name: v })} />
              <label className="block">
                <span className="eyebrow mb-1.5 block text-ink-400">Kind</span>
                <select className="field" value={it.kind} onChange={(e) => setItem({ ...it, kind: e.target.value })}>
                  <option value="client">Client</option>
                  <option value="student">Participant / student</option>
                </select>
              </label>
            </Grid2>
            <Grid2>
              {!scope && <EntityPicker value={it.entity} onChange={(v) => setItem({ ...it, entity: v })} />}
              <Field
                label="Rating (1–5)"
                type="number"
                value={it.rating}
                onChange={(v) => setItem({ ...it, rating: Math.max(1, Math.min(5, parseInt(v, 10) || 5)) })}
              />
            </Grid2>
            <BiField label="Role" value={it.role} onChange={(v) => setItem({ ...it, role: v })} />
            <BiField label="Place / institution" value={it.place} onChange={(v) => setItem({ ...it, place: v })} />
            <BiField label="Review" value={it.text} onChange={(v) => setItem({ ...it, text: v })} area rows={5} />
          </>
        )}
      />
    </Card>
  );
}

/* ── Certificates ───────────────────────────────────────────── */
export function CertificatesEditor({ scope = null }) {
  const { data, update } = useSite();
  const [bulk, setBulk] = useState('');
  const [msg, setMsg] = useState('');
  const items = view(data.certificates, scope);

  const importBulk = () => {
    const rows = bulk.split('\n').map((l) => l.trim()).filter(Boolean);
    const made = [];
    for (const line of rows) {
      const [number, holder, programme, issued] = line.split(',').map((x) => (x || '').trim());
      if (!number || !holder) continue;
      made.push({
        id: `c${Date.now()}${Math.floor(Math.random() * 9999)}`,
        number,
        holder,
        programme: { en: programme || '', hi: '' },
        issued: issued || '',
        entity: scope || 'soi',
        remarks: { en: '', hi: '' },
      });
    }
    if (!made.length) {
      setMsg('Nothing could be read. Check the format.');
      return;
    }
    update((d) => {
      d.certificates = [...made, ...(d.certificates || [])];
    });
    setBulk('');
    setMsg(`${made.length} certificate${made.length === 1 ? '' : 's'} added.`);
  };

  return (
    <>
      <Card
        title="Bulk add"
        description="One certificate per line: number, name, programme, date. Commas separate the four fields."
      >
        <textarea
          className="field font-mono text-[0.78rem]"
          rows={6}
          value={bulk}
          onChange={(e) => setBulk(e.target.value)}
          placeholder={'SOI-2026-0001, Ananya Kulkarni, Full-stack Development, 12 March 2026\nSOI-2026-0002, Mohammed Imran, AI & Automation, 12 March 2026'}
        />
        <div className="flex items-center gap-3">
          <button onClick={importBulk} className="admin-mini">
            <Plus size={12} /> Add these
          </button>
          {msg && <span className="text-[0.78rem] text-ink-400">{msg}</span>}
        </div>
      </Card>

      <Card title={`Register (${items.length})`} description="Anyone can check a number on /verify; nobody can browse the list.">
        <ListEditor
          label="Certificates"
          items={items}
          onChange={(v) => update((d) => { d.certificates = merge(d.certificates, scope, v); })}
          addLabel="Add certificate"
          template={() => ({
            number: '',
            holder: '',
            programme: { en: '', hi: '' },
            issued: '',
            entity: scope || 'soi',
            remarks: { en: '', hi: '' },
          })}
          titleOf={(it) => `${it.number || '—'} · ${it.holder || ''}`}
          renderItem={(it, setItem) => (
            <>
              <Grid2>
                <Field label="Certificate number" mono value={it.number} onChange={(v) => setItem({ ...it, number: v })} />
                <Field label="Issued on" value={it.issued} onChange={(v) => setItem({ ...it, issued: v })} />
              </Grid2>
              <Field label="Issued to" value={it.holder} onChange={(v) => setItem({ ...it, holder: v })} />
              <BiField label="Programme" value={it.programme} onChange={(v) => setItem({ ...it, programme: v })} />
              {!scope && (
                <EntityPicker value={it.entity} onChange={(v) => setItem({ ...it, entity: v })} allowNone={false} />
              )}
              <BiField label="Remarks" value={it.remarks} onChange={(v) => setItem({ ...it, remarks: v })} />
            </>
          )}
        />
      </Card>
    </>
  );
}

/* ── Values & legal (Group only) ────────────────────────────── */
export function ValuesEditor() {
  const { data, update } = useSite();
  const legal = data.legal || {};
  const setLegal = (k, v) => update((d) => { d.legal = { ...(d.legal || {}), [k]: v }; });

  return (
    <>
      <Card title="How we work" description="The values block on the Group home page.">
        <ListEditor
          label="Values"
          items={data.values}
          onChange={(v) => update((d) => { d.values = v; })}
          addLabel="Add value"
          template={() => ({ title: { en: '', hi: '' }, body: { en: '', hi: '' }, active: true })}
          titleOf={(it) => it.title?.en}
          renderItem={(it, setItem) => (
            <>
              <BiField label="Title" value={it.title} onChange={(v) => setItem({ ...it, title: v })} />
              <BiField label="Body" value={it.body} onChange={(v) => setItem({ ...it, body: v })} area />
            </>
          )}
        />
      </Card>

      <Card title="Privacy page">
        <BiField label="Page title" value={legal.privacyTitle} onChange={(v) => setLegal('privacyTitle', v)} />
        <BiField label="Updated line" value={legal.privacyUpdated} onChange={(v) => setLegal('privacyUpdated', v)} />
        <ListEditor
          label="Sections"
          items={legal.privacy}
          onChange={(v) => setLegal('privacy', v)}
          addLabel="Add section"
          template={() => ({ heading: { en: '', hi: '' }, body: { en: '', hi: '' } })}
          titleOf={(it) => it.heading?.en}
          renderItem={(it, setItem) => (
            <>
              <BiField label="Heading" value={it.heading} onChange={(v) => setItem({ ...it, heading: v })} />
              <BiField label="Body" value={it.body} onChange={(v) => setItem({ ...it, body: v })} area rows={4} />
            </>
          )}
        />
      </Card>
    </>
  );
}

/* ── Admissions ─────────────────────────────────────────────── */
export function AdmissionsEditor() {
  const { data, update } = useSite();
  const adm = data.admissions || {};
  const set = (k, v) => update((d) => { d.admissions = { ...(d.admissions || {}), [k]: v }; });

  return (
    <>
      <Card title="Status" description="The application page on the School of Intelligence site.">
        <label className="flex items-center gap-2 text-[0.88rem]">
          <input type="checkbox" checked={adm.open !== false} onChange={(e) => set('open', e.target.checked)} />
          Admissions are open
        </label>
        <BiField label="Page heading" value={adm.heading} onChange={(v) => set('heading', v)} />
        <BiField label="Intro" value={adm.intro} onChange={(v) => set('intro', v)} area />
        <BiField label="Eligibility note" value={adm.note} onChange={(v) => set('note', v)} area />
      </Card>
      <Card title="Tracks">
        <ListEditor
          label="Tracks"
          items={adm.tracks}
          onChange={(v) => set('tracks', v)}
          addLabel="Add track"
          template={() => ({ name: { en: '', hi: '' }, active: true })}
          titleOf={(it) => it.name?.en}
          renderItem={(it, setItem) => (
            <BiField label="Name" value={it.name} onChange={(v) => setItem({ ...it, name: v })} />
          )}
        />
      </Card>
    </>
  );
}

/* ── Inboxes ────────────────────────────────────────────────── */
export function Inbox({ kind = 'enquiries', scope = null }) {
  const { data, update } = useSite();
  const key = kind;
  const all = data[key] || [];
  const rows = scope ? all.filter((r) => r.entity === scope) : all;

  const toggle = (id) =>
    update((d) => {
      d[key] = (d[key] || []).map((r) => (r.id === id ? { ...r, read: !r.read } : r));
    });
  const remove = (id) =>
    update((d) => {
      d[key] = (d[key] || []).filter((r) => r.id !== id);
    });

  const csv = () => {
    const head = ['Date', 'Name', 'Email', 'Phone', 'Organisation', 'Sector', 'Message'];
    const lines = rows.map((r) =>
      [r.created_at, r.name, r.email, r.phone, r.organisation, r.entity, (r.message || '').replace(/\n/g, ' | ')]
        .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`)
        .join(',')
    );
    const blob = new Blob([[head.join(','), ...lines].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inera-${key}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card
      title={kind === 'applications' ? 'Applications' : 'Enquiries'}
      description={`${rows.length} received${scope ? ' for this sector' : ''}`}
    >
      {rows.length > 0 && (
        <button onClick={csv} className="admin-mini">
          <Download size={12} /> Download as CSV
        </button>
      )}
      {rows.length === 0 && (
        <p className="rounded-lg border border-dashed border-ink/15 px-4 py-10 text-center text-[0.85rem] text-ink-400">
          Nothing here yet.
        </p>
      )}
      <div className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.id}
            className="rounded-lg border p-4"
            style={{
              borderColor: r.read ? 'rgba(255,255,255,0.08)' : 'rgba(192,155,58,0.45)',
              background: r.read ? 'rgba(255,255,255,0.02)' : 'rgba(192,155,58,0.06)',
            }}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[0.92rem] font-semibold">
                  {r.name}
                  <span className="text-ink-400 font-normal">
                    {' '}
                    · {r.entity && sectors[r.entity] ? sectors[r.entity].code : 'Group'}
                    {r.mode ? ` · ${r.mode}` : ''}
                  </span>
                </p>
                <p className="text-[0.78rem] text-ink-400">
                  {r.email}
                  {r.phone ? ` · ${r.phone}` : ''}
                  {r.organisation ? ` · ${r.organisation}` : ''}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <span className="mr-2 text-[0.68rem] text-ink-400">
                  {new Date(r.created_at).toLocaleString()}
                </span>
                <button onClick={() => toggle(r.id)} className="admin-icon" title="Mark read/unread">
                  <Check size={14} className={r.read ? 'text-emerald-400' : 'text-ink-400'} />
                </button>
                <button onClick={() => remove(r.id)} className="admin-icon text-red-600">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-[0.87rem] leading-relaxed">{r.message}</p>
            <a href={`mailto:${r.email}`} className="admin-mini mt-3">
              Reply by email
            </a>
          </div>
        ))}
      </div>
    </Card>
  );
}

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Lock,
  LogOut,
  Eye,
  EyeOff,
  ArrowLeft,
  Globe,
  Globe2,
  Image as ImageIcon,
  Megaphone,
  Briefcase,
  MessageSquare,
  ShieldCheck,
  Scale,
  GraduationCap,
  FileText,
  Inbox as InboxIcon,
  Users,
  Star,
  BarChart3,
  Phone,
  Sparkles,
  HelpCircle,
  ListTree,
  Download,
  Upload,
  RotateCcw,
  AlertTriangle,
  Check,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { useSite } from './SiteDataContext';
import { sectors, ALL_ENTITY_IDS, entityPath } from './sectors';
import { Field, BiField, BiParagraphs, ListEditor, ImageField, Card, Grid2 } from './fields';
import {
  OfficesEditor,
  GalleryEditor,
  HighlightsEditor,
  CareersEditor,
  ReviewsEditor,
  CertificatesEditor,
  ValuesEditor,
  AdmissionsEditor,
  Inbox,
} from './editors';
import { LOGO } from './assets';

const PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD || 'Mahaveernirmalachandan').trim();
const AUTH_KEY = 'inera_admin_ok';

/* ── workspaces ─────────────────────────────────────────────── */
const WORKSPACES = [
  { id: 'group', label: 'InEra Group', sub: 'Umbrella', logo: LOGO.group, accent: '#C09B3A' },
  ...ALL_ENTITY_IDS.map((id) => ({
    id,
    label: sectors[id].code,
    sub: id === 'software' ? 'Parent company' : 'Sector',
    logo: sectors[id].logo,
    accent: sectors[id].theme.accent,
  })),
];

/** Every workspace gets the same shape of console. */
function tabsFor(ws) {
  const group = ws === 'group';
  const base = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'identity', label: 'Identity', icon: Sparkles },
    { id: 'hero', label: 'Hero', icon: LayoutDashboard },
    { id: 'about', label: 'About', icon: FileText },
    { id: 'offerings', label: group ? 'Charter' : 'What We Do', icon: ListTree },
    { id: 'process', label: group ? 'Milestones' : 'How We Work', icon: ListTree },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
    { id: 'people', label: group ? 'Leadership' : 'People', icon: Users },
    ...(group ? [] : [{ id: 'faqs', label: 'Questions', icon: HelpCircle }]),
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'highlights', label: 'Highlights', icon: Star },
    { id: 'careers', label: 'Careers', icon: Briefcase },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'contact', label: 'Contact & Social', icon: Phone },
  ];

  const extra = [];
  if (group) extra.push({ id: 'offices', label: 'Offices & Atlas', icon: Globe2 });
  if (group || ws === 'soi') {
    extra.push({ id: 'certificates', label: 'Certificates', icon: ShieldCheck });
    extra.push({ id: 'admissions', label: 'Admissions', icon: GraduationCap });
  }
  if (group) extra.push({ id: 'values', label: 'Values & Legal', icon: Scale });

  const inbox = [
    { id: 'enquiries', label: 'Enquiries', icon: InboxIcon },
    { id: 'applications', label: 'Applications', icon: FileText },
    ...(group ? [{ id: 'backup', label: 'Backup', icon: Download }] : []),
  ];

  return [...base, ...extra, ...inbox];
}

/* ── root ───────────────────────────────────────────────────── */
export default function AdminPage() {
  const [authed, setAuthed] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.title = 'Admin — InEra Group';
    document.body.style.background = '#08080b';
    document.body.style.color = '#F3F0E9';
    return () => {
      document.body.style.background = '';
      document.body.style.color = '';
    };
  }, []);

  if (!authed) return <LoginScreen onPass={() => setAuthed(true)} />;
  return <Console onLogout={() => setAuthed(false)} />;
}

/* ── login ──────────────────────────────────────────────────── */
function LoginScreen({ onPass }) {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (pw === PASSWORD) {
        try {
          sessionStorage.setItem(AUTH_KEY, '1');
        } catch {
          /* ignore */
        }
        onPass();
      } else {
        setErr('That password is not correct.');
        setPw('');
      }
      setLoading(false);
    }, 450);
  };

  return (
    <div className="admin-dark grain grain-dark relative flex min-h-screen items-center justify-center bg-[#08080b] p-4">
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <img src={LOGO.group} alt="InEra Group" className="mx-auto h-16 w-auto object-contain" />
          <h1 className="display mt-6 text-[2rem] text-ivory">Admin Panel</h1>
          <p className="mt-1 text-[0.72rem] uppercase tracking-[0.22em] text-ivory/35">
            InEra Software Private Limited
          </p>
        </div>

        <div className="glass rounded-2xl border border-white/10 p-8">
          <h2 className="mb-6 flex items-center justify-center gap-2 text-[0.9rem] font-semibold text-ivory">
            <Lock size={15} className="text-gold" /> Secure login
          </h2>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="mb-2 block text-[0.68rem] uppercase tracking-[0.18em] text-ivory/45">
                Admin password
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  autoFocus
                  value={pw}
                  onChange={(e) => {
                    setPw(e.target.value);
                    setErr('');
                  }}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  className="field pr-11"
                  style={err ? { borderColor: 'rgba(248,113,113,0.6)' } : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory/35 transition-colors hover:text-ivory"
                  aria-label={show ? 'Hide password' : 'Show password'}
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {err && <p className="mt-2 text-[0.78rem] text-red-400">{err}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gold py-3 text-sm font-semibold text-white transition-all hover:bg-gold-deep disabled:opacity-50"
            >
              {loading ? 'Authenticating…' : 'Login to admin panel'}
            </button>
          </form>
        </div>

        <Link
          to="/"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-ivory/40 transition-colors hover:text-ivory"
        >
          <ArrowLeft size={14} /> Back to website
        </Link>
      </div>
    </div>
  );
}

/* ── console shell ──────────────────────────────────────────── */
function Console({ onLogout }) {
  const { data, status } = useSite();
  const [ws, setWs] = useState('group');
  const [tab, setTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const tabs = useMemo(() => tabsFor(ws), [ws]);
  const active = tabs.find((x) => x.id === tab) || tabs[0];
  const workspace = WORKSPACES.find((w) => w.id === ws);
  const scope = ws === 'group' ? null : ws;

  // switching workspace resets to a tab that exists there
  useEffect(() => {
    if (!tabsFor(ws).some((x) => x.id === tab)) setTab('dashboard');
  }, [ws, tab]);

  const unread = (data.enquiries || []).filter(
    (e) => !e.read && (!scope || e.entity === scope)
  ).length;
  const unreadApps = (data.applications || []).filter(
    (e) => !e.read && (!scope || e.entity === scope)
  ).length;

  const badge = (id) => (id === 'enquiries' ? unread : id === 'applications' ? unreadApps : 0);

  return (
    <div
      className="admin-dark flex min-h-screen bg-[#08080b]"
      style={{ '--ac': workspace.accent }}
    >
      {/* ── sidebar ─────────────────────────────────────────── */}
      <aside
        className={`${
          sidebarOpen ? 'w-60' : 'w-16'
        } flex min-h-screen flex-shrink-0 flex-col border-r border-white/5 bg-[#0c0c11] transition-all duration-300`}
      >
        <div className="flex items-center gap-3 border-b border-white/5 p-4">
          <img src={LOGO.group} alt="" className="h-8 w-8 shrink-0 object-contain" />
          {sidebarOpen && (
            <div className="min-w-0">
              <div className="truncate text-[0.72rem] font-bold text-ivory">InEra Admin</div>
              <div className="text-[0.55rem] uppercase tracking-[0.18em] text-ivory/30">
                Control panel
              </div>
            </div>
          )}
        </div>

        {/* workspace switcher */}
        <div className="border-b border-white/5 p-3">
          {sidebarOpen && (
            <p className="mb-2 px-1 text-[0.58rem] uppercase tracking-[0.2em] text-ivory/30">
              Workspace
            </p>
          )}
          <div className="space-y-1">
            {WORKSPACES.map((w) => {
              const on = ws === w.id;
              return (
                <button
                  key={w.id}
                  onClick={() => setWs(w.id)}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-[0.78rem] transition-all ${
                    on ? 'text-ivory' : 'text-ivory/45 hover:bg-white/5 hover:text-ivory'
                  }`}
                  style={
                    on
                      ? { background: `${w.accent}22`, border: `1px solid ${w.accent}55` }
                      : { border: '1px solid transparent' }
                  }
                  title={w.label}
                >
                  <img src={w.logo} alt="" className="h-5 w-5 shrink-0 object-contain" />
                  {sidebarOpen && (
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{w.label}</span>
                      <span className="block truncate text-[0.58rem] uppercase tracking-[0.14em] text-ivory/30">
                        {w.sub}
                      </span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {tabs.map((x) => {
            const on = tab === x.id;
            const n = badge(x.id);
            return (
              <button
                key={x.id}
                onClick={() => setTab(x.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[0.82rem] transition-all ${
                  on ? 'text-ivory' : 'text-ivory/45 hover:bg-white/5 hover:text-ivory'
                }`}
                style={on ? { background: `${workspace.accent}1f`, border: `1px solid ${workspace.accent}44` } : undefined}
                title={x.label}
              >
                <x.icon size={15} className="shrink-0" />
                {sidebarOpen && <span className="flex-1 truncate font-medium">{x.label}</span>}
                {sidebarOpen && n > 0 && (
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[0.58rem] font-semibold text-white"
                    style={{ background: workspace.accent }}
                  >
                    {n}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-white/5 p-3">
          <Link
            to={ws === 'group' ? '/' : entityPath(ws)}
            target="_blank"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[0.82rem] text-ivory/45 transition-colors hover:bg-white/5 hover:text-ivory"
          >
            <Globe size={15} className="shrink-0" />
            {sidebarOpen && <span className="font-medium">View site</span>}
          </Link>
          <button
            onClick={() => {
              try {
                sessionStorage.removeItem(AUTH_KEY);
              } catch {
                /* ignore */
              }
              onLogout();
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[0.82rem] text-red-400/70 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={15} className="shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* ── main ────────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 flex-shrink-0 items-center justify-between gap-4 border-b border-white/5 bg-[#0c0c11] px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <button
              onClick={() => setSidebarOpen((o) => !o)}
              className="p-1 text-ivory/40 transition-colors hover:text-ivory"
              aria-label="Toggle sidebar"
            >
              <LayoutDashboard size={16} />
            </button>
            <span className="text-[0.7rem] text-ivory/25">Admin</span>
            <span className="text-[0.7rem] text-ivory/15">/</span>
            <span className="text-[0.7rem] font-medium" style={{ color: workspace.accent }}>
              {workspace.label}
            </span>
            <span className="text-[0.7rem] text-ivory/15">/</span>
            <span className="truncate text-[0.7rem] font-medium text-ivory/60">{active.label}</span>
          </div>
          <SaveState status={status} />
        </header>

        {!status.cloud && (
          <div className="flex items-start gap-2 border-b border-amber-400/25 bg-amber-400/10 px-4 py-2 text-[0.74rem] text-amber-200/90 sm:px-6">
            <AlertTriangle size={14} className="mt-0.5 shrink-0" />
            <p>
              Cloud storage is not configured, so edits save in <b>this browser only</b> and visitors
              will not see them. Add <code className="font-mono">VITE_SUPABASE_URL</code> and{' '}
              <code className="font-mono">VITE_SUPABASE_ANON_KEY</code> in Vercel → Settings →
              Environment Variables, then redeploy. Steps are in{' '}
              <code className="font-mono">SUPABASE_SETUP.md</code>.
            </p>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h1 className="display text-[1.9rem] leading-tight text-ivory">{active.label}</h1>
                <p className="mt-1 text-[0.8rem] text-ivory/40">
                  {workspace.label} · changes publish to the live site immediately
                </p>
              </div>
              <Link
                to={ws === 'group' ? '/' : entityPath(ws)}
                target="_blank"
                className="admin-mini shrink-0"
              >
                <ExternalLink size={12} /> Open
              </Link>
            </div>

            <Panel ws={ws} scope={scope} tab={tab} setTab={setTab} setWs={setWs} />
          </div>
        </main>
      </div>
    </div>
  );
}

function SaveState({ status }) {
  if (status.saving)
    return (
      <span className="flex shrink-0 items-center gap-1.5 text-[0.7rem] text-ivory/50">
        <Loader2 size={11} className="animate-spin" /> Publishing…
      </span>
    );
  if (status.error)
    return (
      <span className="shrink-0 text-[0.7rem] text-red-400">
        Publish failed: {String(status.error).slice(0, 40)}
      </span>
    );
  if (status.cloud)
    return (
      <span className="flex shrink-0 items-center gap-1.5 text-[0.7rem] font-medium text-emerald-400/80">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        Live
      </span>
    );
  return (
    <span className="flex shrink-0 items-center gap-1.5 text-[0.7rem] font-medium text-amber-400/70">
      <span className="inline-block h-2 w-2 rounded-full bg-amber-400/70" />
      Local only
    </span>
  );
}

/* ── panel router ───────────────────────────────────────────── */
function Panel({ ws, scope, tab, setTab, setWs }) {
  const group = ws === 'group';

  switch (tab) {
    case 'dashboard':
      return <Dashboard ws={ws} scope={scope} setTab={setTab} setWs={setWs} />;
    case 'identity':
      return group ? <GroupIdentity /> : <EntityIdentity id={ws} />;
    case 'hero':
      return group ? <GroupHeroPanel /> : <EntityHero id={ws} />;
    case 'about':
      return group ? <GroupAboutPanel /> : <EntityAbout id={ws} />;
    case 'offerings':
      return group ? <GroupCharter /> : <EntityList id={ws} field="offerings" />;
    case 'process':
      return group ? <GroupMilestones /> : <EntityProcess id={ws} />;
    case 'stats':
      return group ? <GroupStats /> : <EntityStats id={ws} />;
    case 'people':
      return group ? <GroupPeople /> : <EntityPeople id={ws} />;
    case 'faqs':
      return <EntityFaqs id={ws} />;
    case 'gallery':
      return <GalleryEditor scope={scope} />;
    case 'highlights':
      return <HighlightsEditor scope={scope} />;
    case 'careers':
      return <CareersEditor scope={scope} />;
    case 'reviews':
      return <ReviewsEditor scope={scope} />;
    case 'announcements':
      return group ? <GroupAnnouncements /> : <EntityAnnouncements id={ws} />;
    case 'contact':
      return group ? <GroupContactPanel /> : <EntityContact id={ws} />;
    case 'offices':
      return <OfficesEditor />;
    case 'certificates':
      return <CertificatesEditor scope={scope} />;
    case 'admissions':
      return <AdmissionsEditor />;
    case 'values':
      return <ValuesEditor />;
    case 'enquiries':
      return <Inbox kind="enquiries" scope={scope} />;
    case 'applications':
      return <Inbox kind="applications" scope={scope} />;
    case 'backup':
      return <Backup />;
    default:
      return null;
  }
}

/* ── dashboard ──────────────────────────────────────────────── */
function Dashboard({ ws, scope, setTab, setWs }) {
  const { data, status } = useSite();
  const group = ws === 'group';
  const e = group ? null : data.entities[ws];

  const count = (arr) => (arr || []).filter((x) => !scope || x.entity === scope).length;

  const cards = group
    ? [
        ['Sectors', ALL_ENTITY_IDS.length, 'identity'],
        ['Offices', (data.offices || []).length, 'offices'],
        ['Pictures', (data.gallery || []).length, 'gallery'],
        ['Open roles', (data.careers || []).filter((c) => c.active !== false).length, 'careers'],
        ['Reviews', (data.reviews || []).length, 'reviews'],
        ['Certificates', (data.certificates || []).length, 'certificates'],
        ['Enquiries', (data.enquiries || []).length, 'enquiries'],
        ['Applications', (data.applications || []).length, 'applications'],
      ]
    : [
        ['Offerings', (e?.offerings || []).length, 'offerings'],
        ['People', (e?.team || []).length, 'people'],
        ['Pictures', count(data.gallery), 'gallery'],
        ['Highlights', count(data.highlights), 'highlights'],
        ['Open roles', count(data.careers), 'careers'],
        ['Reviews', count(data.reviews), 'reviews'],
        ['Enquiries', count(data.enquiries), 'enquiries'],
        ['Questions', (e?.faqs || []).length, 'faqs'],
      ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.map(([label, n, go]) => (
          <button
            key={label}
            onClick={() => setTab(go)}
            className="glass rounded-xl border border-white/8 p-4 text-left transition-colors hover:border-white/20"
          >
            <p className="display text-[1.9rem] leading-none text-ivory">{n}</p>
            <p className="mt-2 text-[0.66rem] uppercase tracking-[0.14em] text-ivory/40">{label}</p>
          </button>
        ))}
      </div>

      <Card title="Publishing" description="Where your edits go when you change something here.">
        <div className="flex items-start gap-3 text-[0.88rem]">
          {status.cloud ? (
            <>
              <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" />
              <p className="text-ivory/70">
                Connected. Every change is written to the database as you type and appears on the
                public site straight away — open browsers refresh within about 25 seconds.
              </p>
            </>
          ) : (
            <>
              <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-400" />
              <p className="text-ivory/70">
                Not connected. Edits stay in this browser only. Follow{' '}
                <code className="font-mono">SUPABASE_SETUP.md</code> to make them live.
              </p>
            </>
          )}
        </div>
        <p className="text-[0.78rem] text-ivory/40">
          Last published: {status.lastSaved ? new Date(status.lastSaved).toLocaleString() : '—'}
        </p>
      </Card>

      {group && (
        <Card title="Jump to a sector" description="Each sector has the same console, scoped to itself.">
          <div className="grid gap-2 sm:grid-cols-2">
            {ALL_ENTITY_IDS.map((id) => (
              <button
                key={id}
                onClick={() => {
                  setWs(id);
                  setTab('dashboard');
                }}
                className="flex items-center gap-3 rounded-xl border border-white/8 p-3 text-left transition-colors hover:border-white/20"
              >
                <img src={sectors[id].logo} alt="" className="h-9 w-9 shrink-0 object-contain" />
                <span className="min-w-0">
                  <span className="block truncate text-[0.88rem] text-ivory">
                    {data.entities[id]?.name?.en}
                  </span>
                  <span
                    className="block text-[0.6rem] uppercase tracking-[0.14em]"
                    style={{ color: sectors[id].theme.accent }}
                  >
                    {sectors[id].code}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

/* ── group panels ───────────────────────────────────────────── */
function useGroup() {
  const { data, update } = useSite();
  const set = (path, value) =>
    update((d) => {
      let node = d.group;
      const keys = path.split('.');
      keys.slice(0, -1).forEach((k) => {
        node[k] = node[k] ?? {};
        node = node[k];
      });
      node[keys[keys.length - 1]] = value;
    });
  return { g: data.group, set };
}

function GroupIdentity() {
  const { g, set } = useGroup();
  return (
    <Card title="Identity lines" description="Shown under the logo on the landing page and in the footer.">
      <BiField label="Parent line" value={g.legalParent} onChange={(v) => set('legalParent', v)} />
      <BiField label="Trademark statement" value={g.registeredMark} onChange={(v) => set('registeredMark', v)} area />
      <Grid2>
        <BiField label="Hero kicker" value={g.hero?.kicker} onChange={(v) => set('hero.kicker', v)} />
        <BiField label="Scroll cue" value={g.hero?.scrollCue} onChange={(v) => set('hero.scrollCue', v)} />
      </Grid2>
    </Card>
  );
}

function GroupHeroPanel() {
  const { g, set } = useGroup();
  return (
    <Card title="Sector section" description="The introduction above the four sector cards, and on /sectors.">
      <BiField label="Eyebrow" value={g.sectorsIntro?.eyebrow} onChange={(v) => set('sectorsIntro.eyebrow', v)} />
      <BiField label="Title" value={g.sectorsIntro?.title} onChange={(v) => set('sectorsIntro.title', v)} />
      <BiField label="Body" value={g.sectorsIntro?.body} onChange={(v) => set('sectorsIntro.body', v)} area />
    </Card>
  );
}

function GroupAboutPanel() {
  const { g, set } = useGroup();
  return (
    <>
      <Card title="Statement, vision & mission">
        <BiField label="Section eyebrow" value={g.statement?.eyebrow} onChange={(v) => set('statement.eyebrow', v)} />
        <BiField label="Lead sentence" value={g.statement?.lead} onChange={(v) => set('statement.lead', v)} area />
        <BiParagraphs label="Statement paragraphs" value={g.statement?.body} onChange={(v) => set('statement.body', v)} />
        <BiField label="Vision" value={g.vision} onChange={(v) => set('vision', v)} area />
        <BiField label="Mission" value={g.mission} onChange={(v) => set('mission', v)} area />
      </Card>
      <Card title="Why the Group was created">
        <BiField label="Title" value={g.whyCreated?.title} onChange={(v) => set('whyCreated.title', v)} />
        <BiParagraphs label="Paragraphs" value={g.whyCreated?.body} onChange={(v) => set('whyCreated.body', v)} />
        <BiField label="Intent title" value={g.intent?.title} onChange={(v) => set('intent.title', v)} />
        <BiParagraphs label="Intent paragraphs" value={g.intent?.body} onChange={(v) => set('intent.body', v)} />
      </Card>
    </>
  );
}

function GroupCharter() {
  const { g, set } = useGroup();
  return (
    <Card title="Governing charter" description="The four principles every brand trust is held to.">
      <ListEditor
        label="Charter points"
        items={g.charter}
        onChange={(v) => set('charter', v)}
        addLabel="Add point"
        template={() => ({ title: { en: '', hi: '' }, body: { en: '', hi: '' } })}
        titleOf={(it) => it.title?.en}
        renderItem={(it, s) => (
          <>
            <BiField label="Title" value={it.title} onChange={(v) => s({ ...it, title: v })} />
            <BiField label="Body" value={it.body} onChange={(v) => s({ ...it, body: v })} area />
          </>
        )}
      />
    </Card>
  );
}

function GroupMilestones() {
  const { g, set } = useGroup();
  return (
    <Card title="Milestones" description="The timeline on the About page.">
      <ListEditor
        label="Timeline entries"
        items={g.milestones}
        onChange={(v) => set('milestones', v)}
        addLabel="Add milestone"
        template={() => ({ year: '', title: { en: '', hi: '' }, body: { en: '', hi: '' }, active: true })}
        titleOf={(it) => `${it.year} — ${it.title?.en || ''}`}
        renderItem={(it, s) => (
          <>
            <Field label="Year" value={it.year} onChange={(v) => s({ ...it, year: v })} />
            <BiField label="Title" value={it.title} onChange={(v) => s({ ...it, title: v })} />
            <BiField label="Body" value={it.body} onChange={(v) => s({ ...it, body: v })} area />
          </>
        )}
      />
    </Card>
  );
}

function GroupStats() {
  const { g, set } = useGroup();
  return <StatsCard items={g.stats} onChange={(v) => set('stats', v)} />;
}

function GroupAnnouncements() {
  const { g, set } = useGroup();
  return (
    <Card title="Announcement ticker" description="The scrolling line under the Group hero.">
      <ListEditor
        label="Announcements"
        items={g.announcements}
        onChange={(v) => set('announcements', v)}
        addLabel="Add announcement"
        template={() => ({ text: { en: '', hi: '' }, active: true })}
        titleOf={(it) => it.text?.en}
        renderItem={(it, s) => <BiField label="Text" value={it.text} onChange={(v) => s({ ...it, text: v })} area />}
      />
    </Card>
  );
}

function GroupPeople() {
  const { g, set } = useGroup();
  return (
    <>
      <Card title="Chairperson" description="The centred portrait and note on the landing and leadership pages.">
        <Grid2>
          <Field label="Name" value={g.chairperson?.name} onChange={(v) => set('chairperson.name', v)} />
          <Field label="Email" value={g.chairperson?.email} onChange={(v) => set('chairperson.email', v)} />
        </Grid2>
        <BiField
          label="Designation"
          value={g.chairperson?.designation}
          onChange={(v) => set('chairperson.designation', v)}
        />
        <ImageField
          label="Portrait"
          value={g.chairperson?.image}
          onChange={(v) => set('chairperson.image', v)}
          hint="Use Upload for a photo from your computer. Portrait crop, 4:5."
        />
        <BiField
          label="Message"
          value={g.chairperson?.message}
          onChange={(v) => set('chairperson.message', v)}
          area
          rows={5}
        />
        <Field label="LinkedIn" value={g.chairperson?.linkedin} onChange={(v) => set('chairperson.linkedin', v)} />
      </Card>

      <Card title="Group leadership">
        <PeopleList items={g.leadership} onChange={(v) => set('leadership', v)} withEntity />
      </Card>
    </>
  );
}

function GroupContactPanel() {
  const { g, set } = useGroup();
  return (
    <>
      <Card title="Contact">
        <Grid2>
          <Field label="Email" value={g.contact?.email} onChange={(v) => set('contact.email', v)} />
          <Field label="Phone" value={g.contact?.phone} onChange={(v) => set('contact.phone', v)} />
        </Grid2>
        <Field
          label="WhatsApp number"
          value={g.contact?.whatsapp}
          onChange={(v) => set('contact.whatsapp', v)}
          hint="Digits only, with country code — e.g. 917022866045"
        />
        <BiField label="Address" value={g.contact?.address} onChange={(v) => set('contact.address', v)} />
        <BiField label="Office hours" value={g.contact?.hours} onChange={(v) => set('contact.hours', v)} />
      </Card>
      <SocialCard value={g.social} onChange={(k, v) => set(`social.${k}`, v)} />
    </>
  );
}

/* ── entity panels ──────────────────────────────────────────── */
function useEntity(id) {
  const { data, update } = useSite();
  const set = (path, value) =>
    update((d) => {
      let node = d.entities[id];
      const keys = path.split('.');
      keys.slice(0, -1).forEach((k) => {
        node[k] = node[k] ?? {};
        node = node[k];
      });
      node[keys[keys.length - 1]] = value;
    });
  return { e: data.entities[id], set };
}

function EntityIdentity({ id }) {
  const { e, set } = useEntity(id);
  if (!e) return null;
  return (
    <Card title="Identity" description="How this brand trust names and describes itself.">
      <BiField label="Full name" value={e.name} onChange={(v) => set('name', v)} />
      <Grid2>
        <Field label="Short name (header)" value={e.shortName} onChange={(v) => set('shortName', v)} />
        <label className="block">
          <span className="eyebrow mb-1.5 block text-ink-400">Stage</span>
          <select className="field" value={e.stage || 'operating'} onChange={(ev) => set('stage', ev.target.value)}>
            <option value="operating">Operating</option>
            <option value="commissioning">In commissioning</option>
          </select>
        </label>
      </Grid2>
      <BiField label="Sector label" value={e.sector} onChange={(v) => set('sector', v)} />
      <BiField label="Tagline" value={e.tagline} onChange={(v) => set('tagline', v)} />
      <BiField label="Stage note" value={e.stageNote} onChange={(v) => set('stageNote', v)} />
      <label className="flex items-center gap-2 text-[0.88rem]">
        <input type="checkbox" checked={e.active !== false} onChange={(ev) => set('active', ev.target.checked)} />
        Show this sector on the Group site
      </label>
    </Card>
  );
}

function EntityHero({ id }) {
  const { e, set } = useEntity(id);
  if (!e) return null;
  return (
    <>
      <Card title="Hero" description="The first thing a visitor reads on this sector's home page.">
        <BiField label="Headline" value={e.hero?.headline} onChange={(v) => set('hero.headline', v)} area />
        <BiField label="Sub-paragraph" value={e.hero?.sub} onChange={(v) => set('hero.sub', v)} area rows={4} />
      </Card>
      <Card title="Call to action" description="The gold band at the foot of the home and What We Do pages.">
        <BiField label="CTA title" value={e.cta?.title} onChange={(v) => set('cta.title', v)} />
        <BiField label="CTA body" value={e.cta?.body} onChange={(v) => set('cta.body', v)} area />
        <BiField label="Button label" value={e.cta?.action} onChange={(v) => set('cta.action', v)} />
      </Card>
    </>
  );
}

function EntityAbout({ id }) {
  const { e, set } = useEntity(id);
  if (!e) return null;
  return (
    <Card title="About">
      <BiField label="Lead sentence" value={e.about?.lead} onChange={(v) => set('about.lead', v)} area />
      <BiParagraphs label="Paragraphs" value={e.about?.body} onChange={(v) => set('about.body', v)} />
    </Card>
  );
}

function EntityList({ id, field }) {
  const { e, set } = useEntity(id);
  if (!e) return null;
  return (
    <Card title="What we do" description="Service lines, listed on the home page and the What We Do page.">
      <ListEditor
        label="Offerings"
        items={e[field]}
        onChange={(v) => set(field, v)}
        addLabel="Add offering"
        template={() => ({ title: { en: '', hi: '' }, desc: { en: '', hi: '' }, active: true })}
        titleOf={(it) => it.title?.en}
        renderItem={(it, s) => (
          <>
            <BiField label="Title" value={it.title} onChange={(v) => s({ ...it, title: v })} />
            <BiField label="Description" value={it.desc} onChange={(v) => s({ ...it, desc: v })} area />
          </>
        )}
      />
    </Card>
  );
}

function EntityProcess({ id }) {
  const { e, set } = useEntity(id);
  if (!e) return null;
  return (
    <Card title="How we work" description="The numbered rail of steps.">
      <ListEditor
        label="Process steps"
        items={e.process}
        onChange={(v) => set('process', v)}
        addLabel="Add step"
        template={() => ({ step: '', title: { en: '', hi: '' }, desc: { en: '', hi: '' }, active: true })}
        titleOf={(it) => `${it.step} ${it.title?.en || ''}`}
        renderItem={(it, s) => (
          <>
            <Field label="Step number (e.g. 01)" value={it.step} onChange={(v) => s({ ...it, step: v })} />
            <BiField label="Title" value={it.title} onChange={(v) => s({ ...it, title: v })} />
            <BiField label="Description" value={it.desc} onChange={(v) => s({ ...it, desc: v })} area />
          </>
        )}
      />
    </Card>
  );
}

function EntityStats({ id }) {
  const { e, set } = useEntity(id);
  if (!e) return null;
  return (
    <>
      <StatsCard items={e.stats} onChange={(v) => set('stats', v)} />
      {e.programme && (
        <Card title="Programme details" description="Used by the assistant when someone asks about fees.">
          <Grid2>
            <Field label="Fee" value={e.programme.fee} onChange={(v) => set('programme.fee', v)} />
            <Field
              label="Minimum batch"
              value={e.programme.minStudents}
              onChange={(v) => set('programme.minStudents', v)}
            />
          </Grid2>
          <Grid2>
            <BiField label="Mode" value={e.programme.mode} onChange={(v) => set('programme.mode', v)} />
            <BiField label="Duration" value={e.programme.duration} onChange={(v) => set('programme.duration', v)} />
          </Grid2>
        </Card>
      )}
    </>
  );
}

function EntityPeople({ id }) {
  const { e, set } = useEntity(id);
  if (!e) return null;
  return (
    <Card title="People" description="Shown on this sector's People page.">
      <PeopleList items={e.team} onChange={(v) => set('team', v)} />
    </Card>
  );
}

function EntityFaqs({ id }) {
  const { e, set } = useEntity(id);
  if (!e) return null;
  return (
    <Card title="Questions" description="The accordion on the home and About pages.">
      <ListEditor
        label="FAQs"
        items={e.faqs}
        onChange={(v) => set('faqs', v)}
        addLabel="Add question"
        template={() => ({ q: { en: '', hi: '' }, a: { en: '', hi: '' }, active: true })}
        titleOf={(it) => it.q?.en}
        renderItem={(it, s) => (
          <>
            <BiField label="Question" value={it.q} onChange={(v) => s({ ...it, q: v })} />
            <BiField label="Answer" value={it.a} onChange={(v) => s({ ...it, a: v })} area rows={4} />
          </>
        )}
      />
    </Card>
  );
}

function EntityAnnouncements({ id }) {
  const { e, set } = useEntity(id);
  if (!e) return null;
  return (
    <Card
      title="Announcements"
      description="Notices for this sector. Leave empty and nothing is shown."
    >
      <ListEditor
        label="Announcements"
        items={e.announcements}
        onChange={(v) => set('announcements', v)}
        addLabel="Add announcement"
        template={() => ({ text: { en: '', hi: '' }, active: true })}
        titleOf={(it) => it.text?.en}
        renderItem={(it, s) => <BiField label="Text" value={it.text} onChange={(v) => s({ ...it, text: v })} area />}
      />
    </Card>
  );
}

function EntityContact({ id }) {
  const { e, set } = useEntity(id);
  if (!e) return null;
  return (
    <>
      <Card title="Contact" description="Used on this sector's contact page and by the assistant.">
        <Grid2>
          <Field label="Email" value={e.contact?.email} onChange={(v) => set('contact.email', v)} />
          <Field label="Phone" value={e.contact?.phone} onChange={(v) => set('contact.phone', v)} />
        </Grid2>
      </Card>
      <SocialCard value={e.social} onChange={(k, v) => set(`social.${k}`, v)} />
    </>
  );
}

/* ── shared cards ───────────────────────────────────────────── */
function StatsCard({ items, onChange }) {
  return (
    <Card title="Figures" description="The four-up numbers strip.">
      <ListEditor
        label="Stats"
        items={items}
        onChange={onChange}
        addLabel="Add figure"
        template={() => ({ value: '', label: { en: '', hi: '' }, active: true })}
        titleOf={(it) => `${it.value} · ${it.label?.en || ''}`}
        renderItem={(it, s) => (
          <>
            <Field label="Value" value={it.value} onChange={(v) => s({ ...it, value: v })} />
            <BiField label="Label" value={it.label} onChange={(v) => s({ ...it, label: v })} />
          </>
        )}
      />
    </Card>
  );
}

function PeopleList({ items, onChange, withEntity = false }) {
  return (
    <ListEditor
      label="People"
      items={items}
      onChange={onChange}
      addLabel="Add person"
      template={() => ({
        name: '',
        designation: { en: '', hi: '' },
        ...(withEntity ? { entity: { en: '', hi: '' } } : {}),
        note: { en: '', hi: '' },
        image: '',
        email: '',
        linkedin: '',
        active: true,
      })}
      titleOf={(it) => it.name}
      renderItem={(it, s) => (
        <>
          <Grid2>
            <Field label="Name" value={it.name} onChange={(v) => s({ ...it, name: v })} />
            <Field label="Email" value={it.email} onChange={(v) => s({ ...it, email: v })} />
          </Grid2>
          <BiField label="Designation" value={it.designation} onChange={(v) => s({ ...it, designation: v })} />
          {withEntity && (
            <BiField label="Entity / area" value={it.entity} onChange={(v) => s({ ...it, entity: v })} />
          )}
          <BiField label="Short note" value={it.note} onChange={(v) => s({ ...it, note: v })} area />
          <ImageField label="Photo" value={it.image} onChange={(v) => s({ ...it, image: v })} />
          <Field label="LinkedIn" value={it.linkedin} onChange={(v) => s({ ...it, linkedin: v })} />
        </>
      )}
    />
  );
}

function SocialCard({ value = {}, onChange }) {
  return (
    <Card title="Social links" description="Leave a field empty and that icon is not shown.">
      <Grid2>
        <Field label="LinkedIn" value={value.linkedin} onChange={(v) => onChange('linkedin', v)} />
        <Field label="Instagram" value={value.instagram} onChange={(v) => onChange('instagram', v)} />
        <Field label="YouTube" value={value.youtube} onChange={(v) => onChange('youtube', v)} />
        <Field label="Facebook" value={value.facebook} onChange={(v) => onChange('facebook', v)} />
      </Grid2>
    </Card>
  );
}

/* ── backup ─────────────────────────────────────────────────── */
function Backup() {
  const { data, replaceAll, resetAll, status } = useSite();
  const [msg, setMsg] = useState('');

  const download = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inera-group-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const upload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        replaceAll(JSON.parse(reader.result));
        setMsg('Restored and published.');
      } catch {
        setMsg('That file could not be read as site content.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-5">
      <Card title="Export" description="One JSON file with every word on the site, in both languages.">
        <button onClick={download} className="admin-mini">
          <Download size={12} /> Download content file
        </button>
        <p className="text-[0.76rem] text-ivory/40">
          Last published: {status.lastSaved ? new Date(status.lastSaved).toLocaleString() : '—'}
        </p>
      </Card>

      <Card title="Restore" description="Replaces all content with the uploaded file and publishes it.">
        <label className="admin-mini inline-flex cursor-pointer">
          <Upload size={12} /> Choose file
          <input type="file" accept="application/json" className="hidden" onChange={upload} />
        </label>
        {msg && <p className="text-[0.82rem]">{msg}</p>}
      </Card>

      <Card title="Reset" description="Returns every page to the content this site shipped with.">
        <button
          onClick={() => {
            if (window.confirm('Reset all content to the original? This publishes immediately.')) resetAll();
          }}
          className="admin-mini text-red-600"
        >
          <RotateCcw size={12} /> Reset all content
        </button>
      </Card>
    </div>
  );
}

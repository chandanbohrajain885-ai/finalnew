/* ============================================================
   Cloud storage — Supabase over plain REST (PostgREST).
   Deliberately written against fetch instead of the Supabase SDK:
   two small requests are all this site needs, the bundle stays
   light, and there is no client library to break on upgrade.
   ============================================================ */

const URL_BASE = (import.meta.env.VITE_SUPABASE_URL || '').trim().replace(/\/+$/, '');
const ANON = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

const configured =
  URL_BASE.startsWith('http') && ANON.length > 20 && !URL_BASE.includes('your_supabase');

export const isCloudReady = () => configured;

function headers(extra = {}) {
  return {
    apikey: ANON,
    Authorization: `Bearer ${ANON}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

async function request(path, options = {}, timeoutMs = 12000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${URL_BASE}/rest/v1/${path}`, {
      ...options,
      headers: headers(options.headers),
      signal: controller.signal,
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { ok: false, reason: `${res.status} ${body.slice(0, 160)}` };
    }
    const text = await res.text();
    return { ok: true, data: text ? JSON.parse(text) : null };
  } catch (e) {
    return { ok: false, reason: e?.name === 'AbortError' ? 'timeout' : e?.message || 'network' };
  } finally {
    clearTimeout(timer);
  }
}

/* ── site content ───────────────────────────────────────────── */

export async function cloudLoad() {
  if (!configured) return null;
  const res = await request('site_config?id=eq.1&select=data,updated_at');
  if (!res.ok || !Array.isArray(res.data) || !res.data.length) return null;
  const row = res.data[0];
  if (!row?.data || Object.keys(row.data).length === 0) return null;
  return { data: row.data, updatedAt: row.updated_at };
}

export async function cloudSave(payload) {
  if (!configured) return { ok: false, reason: 'not-configured' };
  return request('site_config', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify([{ id: 1, data: payload, updated_at: new Date().toISOString() }]),
  });
}

/**
 * Lightweight live sync: re-checks the stored timestamp on an interval and
 * whenever the tab regains focus, and calls back only when it has moved.
 * Cheap, resilient, and needs no websocket.
 */
export function cloudWatch(onChange, { intervalMs = 25000 } = {}) {
  if (!configured) return () => {};
  let stamp = null;
  let stopped = false;

  const tick = async () => {
    if (stopped || document.hidden) return;
    const res = await request('site_config?id=eq.1&select=data,updated_at');
    if (!res.ok || !Array.isArray(res.data) || !res.data.length) return;
    const row = res.data[0];
    if (!row?.updated_at) return;
    if (stamp === null) {
      stamp = row.updated_at;
      return;
    }
    if (row.updated_at !== stamp) {
      stamp = row.updated_at;
      if (row.data && Object.keys(row.data).length) onChange(row.data);
    }
  };

  const timer = setInterval(tick, intervalMs);
  const onFocus = () => tick();
  window.addEventListener('focus', onFocus);
  document.addEventListener('visibilitychange', onFocus);

  return () => {
    stopped = true;
    clearInterval(timer);
    window.removeEventListener('focus', onFocus);
    document.removeEventListener('visibilitychange', onFocus);
  };
}

/* ── enquiries ──────────────────────────────────────────────── */

export async function cloudSaveEnquiry(row) {
  if (!configured) return { ok: false, reason: 'not-configured' };
  return request('enquiries', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify([row]),
  });
}

export async function cloudListEnquiries() {
  if (!configured) return [];
  const res = await request('enquiries?select=*&order=created_at.desc&limit=500');
  return res.ok && Array.isArray(res.data) ? res.data : [];
}

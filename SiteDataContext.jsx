import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import defaultSiteData from './defaults';
import { isCloudReady, cloudLoad, cloudSave, cloudWatch } from './supabase';

const SiteDataContext = createContext(null);

const LOCAL_KEY = 'inera_site_data_v1';

/* ── deep merge: cloud/local data over defaults ─────────────── */
function isPlainObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

export function deepMerge(base, override) {
  if (override === undefined || override === null) return base;
  if (Array.isArray(override)) return override; // arrays replace wholesale
  if (!isPlainObject(base) || !isPlainObject(override)) return override;
  const out = { ...base };
  for (const k of Object.keys(override)) {
    out[k] = deepMerge(base[k], override[k]);
  }
  return out;
}

function readLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeLocal(data) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  } catch {
    /* quota / private mode */
  }
}

export function SiteDataProvider({ children }) {
  const [data, setData] = useState(() => deepMerge(defaultSiteData, readLocal()));
  const [status, setStatus] = useState({
    cloud: isCloudReady(),
    loaded: false,
    saving: false,
    lastSaved: null,
    error: null,
  });
  const saveTimer = useRef(null);
  const pending = useRef(null);

  /* initial cloud load */
  useEffect(() => {
    let alive = true;
    (async () => {
      if (!isCloudReady()) {
        setStatus((s) => ({ ...s, loaded: true }));
        return;
      }
      const cloud = await cloudLoad();
      if (!alive) return;
      if (cloud?.data) {
        setData(deepMerge(defaultSiteData, cloud.data));
        writeLocal(cloud.data);
      }
      setStatus((s) => ({ ...s, loaded: true }));
    })();
    return () => {
      alive = false;
    };
  }, []);

  /* realtime updates from other devices/admins */
  useEffect(() => {
    if (!isCloudReady()) return undefined;
    const off = cloudWatch((next) => {
      setData(deepMerge(defaultSiteData, next));
      writeLocal(next);
    });
    return off;
  }, []);

  /* debounced publish */
  const publish = useCallback((next) => {
    writeLocal(next);
    pending.current = next;
    if (!isCloudReady()) {
      setStatus((s) => ({ ...s, lastSaved: new Date().toISOString(), error: null }));
      return;
    }
    setStatus((s) => ({ ...s, saving: true }));
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      const payload = pending.current;
      const res = await cloudSave(payload);
      setStatus((s) => ({
        ...s,
        saving: false,
        lastSaved: res.ok ? new Date().toISOString() : s.lastSaved,
        error: res.ok ? null : res.reason,
      }));
    }, 650);
  }, []);

  /**
   * update(mutator) — mutator receives a structured clone of the
   * current data and returns the next state (or mutates in place).
   */
  const update = useCallback(
    (mutator) => {
      setData((prev) => {
        const draft = JSON.parse(JSON.stringify(prev));
        const result = mutator(draft);
        const next = result === undefined ? draft : result;
        next.updatedAt = new Date().toISOString();
        publish(next);
        return next;
      });
    },
    [publish]
  );

  const replaceAll = useCallback(
    (raw) => {
      const next = deepMerge(defaultSiteData, raw);
      next.updatedAt = new Date().toISOString();
      setData(next);
      publish(next);
    },
    [publish]
  );

  const resetAll = useCallback(() => {
    const next = JSON.parse(JSON.stringify(defaultSiteData));
    next.updatedAt = new Date().toISOString();
    setData(next);
    publish(next);
  }, [publish]);

  const value = useMemo(
    () => ({ data, update, replaceAll, resetAll, status }),
    [data, update, replaceAll, resetAll, status]
  );

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error('useSite must be used inside <SiteDataProvider>');
  return ctx;
}

export default SiteDataContext;

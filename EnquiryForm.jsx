import { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useSite } from './SiteDataContext';
import { cloudSaveEnquiry, isCloudReady } from './supabase';
import { GoldButton } from './ui';
import { ENTITY_IDS } from './sectors';

/**
 * Enquiry form used on the Group contact page and on every sector site.
 * Writes to Supabase when configured, and always keeps a copy in the
 * published site record so it shows up in the admin inbox.
 */
export default function EnquiryForm({ defaultEntity = '', lockEntity = false }) {
  const { t, L } = useLang();
  const { data, update } = useSite();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    org: '',
    entity: defaultEntity,
    message: '',
    company: '', // honeypot
  });
  const [state, setState] = useState('idle'); // idle | sending | sent | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.company) return; // bot
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setState('required');
      return;
    }
    setState('sending');

    const row = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      organisation: form.org.trim(),
      entity: form.entity || 'group',
      message: form.message.trim(),
      created_at: new Date().toISOString(),
    };

    let ok = true;
    if (isCloudReady()) {
      const res = await cloudSaveEnquiry(row);
      ok = res.ok;
    }

    // always mirror into the published record so /admin sees it
    update((d) => {
      d.enquiries = [{ id: `e${Date.now()}`, ...row, read: false }, ...(d.enquiries || [])].slice(0, 300);
    });

    setState(ok ? 'sent' : 'sent');
    setForm({ name: '', email: '', phone: '', org: '', entity: defaultEntity, message: '', company: '' });
  };

  if (state === 'sent') {
    return (
      <div
        className="flex items-start gap-3 p-6"
        style={{ background: 'var(--accent-soft)', border: '1px solid var(--rule)' }}
      >
        <Check size={18} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
        <div>
          <p className="text-[0.95rem]">{t('formSent')}</p>
          <button
            onClick={() => setState('idle')}
            className="mt-2 text-[0.72rem] uppercase tracking-[0.16em] underline"
            style={{ color: 'var(--accent)' }}
          >
            {t('writeToUs')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <input
        tabIndex={-1}
        autoComplete="off"
        value={form.company}
        onChange={set('company')}
        className="hidden"
        aria-hidden="true"
      />

      <label className="block">
        <span className="eyebrow mb-1.5 block" style={{ color: 'var(--muted)' }}>
          {t('formName')} *
        </span>
        <input className="field" value={form.name} onChange={set('name')} required />
      </label>

      <label className="block">
        <span className="eyebrow mb-1.5 block" style={{ color: 'var(--muted)' }}>
          {t('formEmail')} *
        </span>
        <input type="email" className="field" value={form.email} onChange={set('email')} required />
      </label>

      <label className="block">
        <span className="eyebrow mb-1.5 block" style={{ color: 'var(--muted)' }}>
          {t('formPhone')}
        </span>
        <input className="field" value={form.phone} onChange={set('phone')} />
      </label>

      <label className="block">
        <span className="eyebrow mb-1.5 block" style={{ color: 'var(--muted)' }}>
          {t('formOrg')}
        </span>
        <input className="field" value={form.org} onChange={set('org')} />
      </label>

      {!lockEntity && (
        <label className="block sm:col-span-2">
          <span className="eyebrow mb-1.5 block" style={{ color: 'var(--muted)' }}>
            {t('formSelectEntity')}
          </span>
          <select className="field" value={form.entity} onChange={set('entity')}>
            <option value="">{t('formGeneral')}</option>
            {ENTITY_IDS.map((id) => (
              <option key={id} value={id}>
                {L(data.entities[id]?.name)}
              </option>
            ))}
            <option value="software">{L(data.entities.software?.name)}</option>
          </select>
        </label>
      )}

      <label className="block sm:col-span-2">
        <span className="eyebrow mb-1.5 block" style={{ color: 'var(--muted)' }}>
          {t('formMessage')} *
        </span>
        <textarea className="field" rows={5} value={form.message} onChange={set('message')} required />
      </label>

      {state === 'required' && (
        <p
          className="flex items-center gap-2 text-[0.8rem] sm:col-span-2"
          style={{ color: '#b4472e' }}
        >
          <AlertCircle size={14} />
          {t('formRequired')}
        </p>
      )}

      <div className="sm:col-span-2">
        <GoldButton type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? t('formSending') : t('formSend')}
        </GoldButton>
      </div>
    </form>
  );
}

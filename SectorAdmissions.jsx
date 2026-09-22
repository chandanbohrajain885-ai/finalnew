import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Check, AlertCircle } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useSite } from './SiteDataContext';
import { cloudSaveEnquiry, isCloudReady } from './supabase';
import PageHead from './PageHead';
import { Section, SectionHead, GoldButton, Stats } from './ui';
import { Reviews } from './blocks';

export default function SectorAdmissions() {
  const { id, entity, cfg } = useOutletContext();
  const { t, L } = useLang();
  const { data } = useSite();
  const adm = data.admissions || {};
  const [mode, setMode] = useState('individual');

  return (
    <>
      <PageHead
        eyebrow={t('navAdmissions')}
        title={L(adm.heading) || t('navAdmissions')}
        meta={L(adm.intro)}
        logo={cfg.logo}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead index="01" eyebrow={t('navAdmissions')} />
            {entity.programme && (
              <dl className="mt-8 space-y-4">
                <Fact label={t('verifyProgramme')} value={L(entity.name)} />
                <Fact label="Fee" value={`${entity.programme.fee} ${t('aiPerStudent')}`} />
                <Fact label={t('admissionsStudents')} value={entity.programme.minStudents} />
                <Fact label="Mode" value={L(entity.programme.mode)} />
                <Fact label="Duration" value={L(entity.programme.duration)} />
              </dl>
            )}
            {L(adm.note) && (
              <p
                className="mt-8 p-4 text-[0.85rem] leading-relaxed"
                style={{ background: 'var(--bg-soft)', border: '1px solid var(--rule)', color: 'var(--muted)' }}
              >
                {L(adm.note)}
              </p>
            )}
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {adm.open === false ? (
              <p className="p-6" style={{ border: '1px solid var(--rule)', color: 'var(--muted)' }}>
                {t('admissionsClosed')}
              </p>
            ) : (
              <>
                <div className="mb-7 flex gap-2">
                  {[
                    ['individual', t('admissionsIndividual')],
                    ['institution', t('admissionsInstitution')],
                  ].map(([k, label]) => (
                    <button
                      key={k}
                      onClick={() => setMode(k)}
                      className="border px-4 py-2 text-[0.68rem] uppercase tracking-[0.14em] transition-all duration-500"
                      style={
                        mode === k
                          ? { background: 'var(--accent)', borderColor: 'var(--accent)', color: '#fff' }
                          : { borderColor: 'var(--rule)', color: 'var(--muted)' }
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <ApplicationForm mode={mode} entityId={id} tracks={adm.tracks || []} />
              </>
            )}
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHead index="02" eyebrow={t('sectionAtAGlance')} />
        <div className="mt-10">
          <Stats items={entity.stats} />
        </div>
      </Section>

      <Section>
        <SectionHead index="03" eyebrow={t('sectionReviews')} title={t('sectionStudents')} />
        <div className="mt-10">
          <Reviews kind="student" entity={id} />
        </div>
      </Section>
    </>
  );
}

function Fact({ label, value }) {
  if (!value) return null;
  return (
    <div className="pt-3" style={{ borderTop: '1px solid var(--rule)' }}>
      <dt className="eyebrow" style={{ color: 'var(--muted)' }}>
        {label}
      </dt>
      <dd className="mt-1 text-[1.05rem]">{value}</dd>
    </div>
  );
}

function ApplicationForm({ mode, entityId, tracks }) {
  const { t, L } = useLang();
  const { update } = useSite();
  const [f, setF] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    role: '',
    students: '',
    track: '',
    message: '',
    company: '',
  });
  const [state, setState] = useState('idle');
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (f.company) return;
    if (!f.name.trim() || !f.email.trim()) {
      setState('required');
      return;
    }
    setState('sending');

    const row = {
      name: f.name.trim(),
      email: f.email.trim(),
      phone: f.phone.trim(),
      organisation: f.college.trim(),
      entity: entityId,
      message: [
        `APPLICATION (${mode})`,
        f.track && `Track: ${f.track}`,
        f.year && `Year: ${f.year}`,
        f.role && `Role: ${f.role}`,
        f.students && `Students: ${f.students}`,
        f.message && `Notes: ${f.message}`,
      ]
        .filter(Boolean)
        .join('\n'),
      created_at: new Date().toISOString(),
    };

    if (isCloudReady()) await cloudSaveEnquiry(row);

    update((d) => {
      d.applications = [
        { id: `a${Date.now()}`, mode, ...row, read: false },
        ...(d.applications || []),
      ].slice(0, 400);
    });

    setState('sent');
  };

  if (state === 'sent') {
    return (
      <div
        className="flex items-start gap-3 p-6"
        style={{ background: 'var(--accent-soft)', border: '1px solid var(--rule)' }}
      >
        <Check size={18} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
        <p className="text-[0.95rem]">{t('admissionsSent')}</p>
      </div>
    );
  }

  const live = tracks.filter((x) => x.active !== false);

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <input tabIndex={-1} className="hidden" value={f.company} onChange={set('company')} aria-hidden="true" />

      <Input label={`${t('formName')} *`} value={f.name} onChange={set('name')} required />
      <Input label={`${t('formEmail')} *`} value={f.email} onChange={set('email')} type="email" required />
      <Input label={t('formPhone')} value={f.phone} onChange={set('phone')} />
      <Input label={t('admissionsCollege')} value={f.college} onChange={set('college')} />

      {mode === 'individual' ? (
        <>
          <Input label={t('admissionsYear')} value={f.year} onChange={set('year')} />
          <label className="block">
            <span className="eyebrow mb-1.5 block" style={{ color: 'var(--muted)' }}>
              {t('admissionsTrack')}
            </span>
            <select className="field" value={f.track} onChange={set('track')}>
              <option value="">—</option>
              {live.map((tr) => (
                <option key={tr.id} value={L(tr.name)}>
                  {L(tr.name)}
                </option>
              ))}
            </select>
          </label>
        </>
      ) : (
        <>
          <Input label={t('admissionsRole')} value={f.role} onChange={set('role')} />
          <Input label={t('admissionsStudents')} value={f.students} onChange={set('students')} />
        </>
      )}

      <label className="block sm:col-span-2">
        <span className="eyebrow mb-1.5 block" style={{ color: 'var(--muted)' }}>
          {t('formMessage')}
        </span>
        <textarea className="field" rows={4} value={f.message} onChange={set('message')} />
      </label>

      {state === 'required' && (
        <p className="flex items-center gap-2 text-[0.8rem] sm:col-span-2" style={{ color: '#b4472e' }}>
          <AlertCircle size={14} />
          {t('formRequired')}
        </p>
      )}

      <div className="sm:col-span-2">
        <GoldButton type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? t('formSending') : t('admissionsSubmit')}
        </GoldButton>
      </div>
    </form>
  );
}

function Input({ label, ...rest }) {
  return (
    <label className="block">
      <span className="eyebrow mb-1.5 block" style={{ color: 'var(--muted)' }}>
        {label}
      </span>
      <input className="field" {...rest} />
    </label>
  );
}

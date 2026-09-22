/* ============================================================
   InEra site intelligence
   A self-contained retrieval + intent engine that answers only
   from this website's own content. No external API, no keys.
   ============================================================ */

import { sectors, ENTITY_IDS, entityPath } from './sectors';

/* ── text utilities ─────────────────────────────────────────── */

const STOP = new Set([
  'the','a','an','of','and','or','to','in','on','for','is','are','was','were','be','been',
  'do','does','did','what','who','whom','which','how','when','where','why','can','could',
  'you','your','yours','we','our','us','i','me','my','it','its','this','that','these','those',
  'with','about','from','as','at','by','if','so','than','then','there','their','they','them',
  'have','has','had','will','would','should','shall','may','might','please','tell','know',
  'क्या','कौन','कैसे','कब','कहाँ','क्यों','है','हैं','था','थे','की','के','का','को','में','से',
  'और','या','पर','यह','वह','हम','मैं','आप','कर','करें','बताइए','बताएं','हेतु','लिए','एक',
]);

export function normalize(s) {
  return String(s || '')
    .toLowerCase()
    // \p{M} keeps Devanagari matras attached — without it Hindi words
    // shatter into single consonants and nothing ever matches.
    .replace(/[^\p{L}\p{M}\p{N}\s₹%+]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenize(s) {
  return normalize(s)
    .split(' ')
    .filter((w) => w.length > 1 && !STOP.has(w));
}

function stem(w) {
  if (w.length <= 3) return w;
  return w
    .replace(/(ing|ies|ied|ed|es|s)$/u, '')
    .replace(/(ों|ाएँ|ाएं|ियाँ|ियां|ता|ने|की|का|के)$/u, '');
}

/* ── index construction ─────────────────────────────────────── */

function flatten(value, L) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map((v) => flatten(v, L)).join(' · ');
  if (typeof value === 'object') {
    if ('en' in value || 'hi' in value) return L(value);
    return Object.values(value)
      .map((v) => flatten(v, L))
      .join(' · ');
  }
  return '';
}

/**
 * Build a searchable document index from live site data.
 * Each doc: { id, title, body, path, entity, kind, tokens }
 */
export function buildIndex(data, L) {
  const docs = [];
  const push = (d) => {
    const text = `${d.title} ${d.body}`;
    docs.push({ ...d, tokens: tokenize(text).map(stem) });
  };

  const g = data.group || {};

  push({
    id: 'group-what',
    kind: 'group',
    entity: null,
    path: '/about',
    title: 'What InEra Group is',
    body: `${L(g.statement?.lead)} ${flatten(g.statement?.body, L)} ${L(g.legalParent)} ${L(g.registeredMark)}`,
  });
  push({
    id: 'group-vision',
    kind: 'group',
    entity: null,
    path: '/about',
    title: 'Vision of InEra Group',
    body: L(g.vision),
  });
  push({
    id: 'group-mission',
    kind: 'group',
    entity: null,
    path: '/about',
    title: 'Mission of InEra Group',
    body: L(g.mission),
  });
  push({
    id: 'group-why',
    kind: 'group',
    entity: null,
    path: '/about',
    title: L(g.whyCreated?.title) || 'Why the Group was created',
    body: flatten(g.whyCreated?.body, L),
  });
  (g.charter || []).forEach((c) =>
    push({
      id: `charter-${c.id}`,
      kind: 'charter',
      entity: null,
      path: '/about',
      title: L(c.title),
      body: L(c.body),
    })
  );
  (g.milestones || [])
    .filter((m) => m.active !== false)
    .forEach((m) =>
      push({
        id: `milestone-${m.id}`,
        kind: 'history',
        entity: null,
        path: '/about',
        title: `${m.year} — ${L(m.title)}`,
        body: L(m.body),
      })
    );

  if (g.chairperson?.active !== false && g.chairperson?.name) {
    push({
      id: 'chairperson',
      kind: 'person',
      entity: null,
      path: '/leadership',
      title: `${g.chairperson.name} — ${L(g.chairperson.designation)}`,
      body: `${L(g.chairperson.designation)} chairperson chairman head ${L(g.chairperson.message)} ${g.chairperson.email || ''}`,
    });
  }
  (g.leadership || [])
    .filter((p) => p.active !== false)
    .forEach((p) =>
      push({
        id: `leader-${p.id}`,
        kind: 'person',
        entity: null,
        path: '/leadership',
        title: `${p.name} — ${L(p.designation)}`,
        body: `${L(p.designation)} ${L(p.entity)} ${L(p.note)} ${p.email || ''}`,
      })
    );

  (data.offices || [])
    .filter((o) => o.active !== false)
    .forEach((o) =>
      push({
        id: `office-${o.id}`,
        kind: 'office',
        entity: null,
        path: '/atlas',
        title: `${o.city} — ${L(o.region)}`,
        body: `office location branch where based ${o.city} ${L(o.region)} ${L(o.country)} ${L(o.address)} ${L(o.note)} ${o.phone || ''}`,
      })
    );

  (data.values || [])
    .filter((v) => v.active !== false)
    .forEach((v) =>
      push({
        id: `value-${v.id}`,
        kind: 'value',
        entity: null,
        path: '/about',
        title: L(v.title),
        body: L(v.body),
      })
    );

  (data.highlights || [])
    .filter((h) => h.active !== false)
    .forEach((h) =>
      push({
        id: `highlight-${h.id}`,
        kind: 'highlight',
        entity: h.entity || null,
        path: '/highlights',
        title: `${L(h.title)} (${h.date})`,
        body: `${L(h.tag)} ${L(h.body)}`,
      })
    );

  (data.careers || [])
    .filter((c) => c.active !== false)
    .forEach((c) =>
      push({
        id: `career-${c.id}`,
        kind: 'career',
        entity: c.entity || null,
        path: '/careers',
        title: `${L(c.title)} — ${L(c.department)}`,
        body: `job role vacancy hiring career opening ${L(c.description)} ${L(c.location)} ${L(c.type)}`,
      })
    );

  (data.reviews || [])
    .filter((r) => r.active !== false)
    .forEach((r) =>
      push({
        id: `review-${r.id}`,
        kind: 'review',
        entity: r.entity || null,
        path: '/highlights',
        title: `${r.name} — ${L(r.role)}`,
        body: `review testimonial feedback ${L(r.text)}`,
      })
    );

  ((data.legal || {}).privacy || []).forEach((s) =>
    push({
      id: `privacy-${s.id}`,
      kind: 'legal',
      entity: null,
      path: '/privacy',
      title: `${L(s.heading)} — ${L((data.legal || {}).privacyTitle)}`,
      body: `privacy data policy ${L(s.body)}`,
    })
  );

  push({
    id: 'gallery-doc',
    kind: 'gallery',
    entity: null,
    path: '/gallery',
    title: 'Gallery',
    body: `gallery photos pictures images events workshops ${(data.gallery || []).length} published`,
  });

  push({
    id: 'verify-doc',
    kind: 'verify',
    entity: 'soi',
    path: '/verify',
    title: 'Certificate verification',
    body: 'verify certificate number check authenticity register issued',
  });

  push({
    id: 'group-contact',
    kind: 'contact',
    entity: null,
    path: '/contact',
    title: 'Contact InEra Group',
    body: `contact email phone address office reach ${g.contact?.email || ''} ${g.contact?.phone || ''} ${L(g.contact?.address)} ${L(g.contact?.hours)}`,
  });

  ENTITY_IDS.concat('software').forEach((id) => {
    const e = data.entities?.[id];
    if (!e || e.active === false) return;
    const base = entityPath(id);
    const nm = L(e.name);
    push({
      id: `${id}-overview`,
      kind: 'entity',
      entity: id,
      path: base,
      title: nm,
      body: `${sectors[id].code} ${e.shortName} ${L(e.sector)} ${L(e.tagline)} ${L(e.hero?.headline)} ${L(e.hero?.sub)} ${L(e.stageNote)}`,
    });
    push({
      id: `${id}-about`,
      kind: 'entity',
      entity: id,
      path: `${base}/about`,
      title: `About ${nm}`,
      body: `${L(e.about?.lead)} ${flatten(e.about?.body, L)}`,
    });
    (e.offerings || [])
      .filter((o) => o.active !== false)
      .forEach((o) =>
        push({
          id: `${id}-off-${o.id}`,
          kind: 'offering',
          entity: id,
          path: `${base}/what-we-do`,
          title: `${L(o.title)} — ${nm}`,
          body: L(o.desc),
        })
      );
    (e.process || [])
      .filter((p) => p.active !== false)
      .forEach((p) =>
        push({
          id: `${id}-proc-${p.id}`,
          kind: 'process',
          entity: id,
          path: `${base}/what-we-do`,
          title: `${p.step} ${L(p.title)} — ${nm}`,
          body: L(p.desc),
        })
      );
    (e.team || [])
      .filter((p) => p.active !== false)
      .forEach((p) =>
        push({
          id: `${id}-team-${p.id}`,
          kind: 'person',
          entity: id,
          path: `${base}/people`,
          title: `${p.name} — ${L(p.designation)}`,
          body: `${nm} ${L(p.note)} ${p.email || ''}`,
        })
      );
    (e.faqs || [])
      .filter((f) => f.active !== false)
      .forEach((f) =>
        push({
          id: `${id}-faq-${f.id}`,
          kind: 'faq',
          entity: id,
          path: `${base}/about`,
          title: L(f.q),
          body: L(f.a),
        })
      );
    (e.stats || [])
      .filter((s) => s.active !== false)
      .forEach((s) =>
        push({
          id: `${id}-stat-${s.id}`,
          kind: 'stat',
          entity: id,
          path: base,
          title: `${L(s.label)} — ${nm}`,
          body: `${s.value} ${L(s.label)}`,
        })
      );
    if (e.programme) {
      push({
        id: `${id}-programme`,
        kind: 'programme',
        entity: id,
        path: base,
        title: `Programme details — ${nm}`,
        body: `fee cost price ${e.programme.fee} per student, minimum ${e.programme.minStudents} students, mode ${L(e.programme.mode)}, duration ${L(e.programme.duration)}`,
      });
    }
    push({
      id: `${id}-contact`,
      kind: 'contact',
      entity: id,
      path: `${base}/contact`,
      title: `Contact ${nm}`,
      body: `contact email phone ${e.contact?.email || ''} ${e.contact?.phone || ''}`,
    });
  });

  return docs;
}

/* ── scoring ────────────────────────────────────────────────── */

export function search(index, query, { limit = 6, entity = null } = {}) {
  const qTokens = tokenize(query).map(stem);
  if (!qTokens.length) return [];
  const qSet = new Set(qTokens);

  const df = new Map();
  index.forEach((d) => {
    new Set(d.tokens).forEach((tk) => {
      if (qSet.has(tk)) df.set(tk, (df.get(tk) || 0) + 1);
    });
  });

  const N = index.length || 1;
  const scored = index
    .map((d) => {
      let score = 0;
      const titleTokens = new Set(tokenize(d.title).map(stem));
      qTokens.forEach((tk) => {
        const freq = d.tokens.reduce((n, x) => n + (x === tk ? 1 : 0), 0);
        if (!freq) return;
        const idf = Math.log(1 + N / (1 + (df.get(tk) || 0)));
        score += idf * (1 + Math.log(freq));
        if (titleTokens.has(tk)) score += idf * 1.6;
      });
      if (entity && d.entity === entity) score *= 1.35;
      if (!score) return null;
      return { doc: d, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

/* ── intent detection ───────────────────────────────────────── */

const ENTITY_HINTS = {
  iit: ['iit', 'information technology', 'software', 'tech', 'development', 'app', 'website', 'ai', 'automation', 'सूचना', 'प्रौद्योगिकी', 'सॉफ्टवेयर', 'सॉफ़्टवेयर'],
  soi: ['soi', 'school of intelligence', 'education', 'course', 'student', 'internship', 'training', 'certificate', 'admission', 'batch', 'शिक्षा', 'छात्र', 'विद्यार्थी', 'प्रमाणपत्र', 'प्रवेश'],
  cafe: ['cafe', 'café', 'coffee', 'food', 'beverage', 'restaurant', 'menu', 'कैफ़े', 'कैफे', 'कॉफ़ी', 'कॉफी', 'भोजन'],
  ics: ['ics', 'consultancy', 'consulting', 'advisory', 'advice', 'strategy', 'consultant', 'परामर्श', 'सलाह', 'रणनीति'],
  software: ['private limited', 'pvt', 'ispl', 'parent company', 'legal', 'incorporated', 'trademark', 'मूल कंपनी', 'निगमित', 'ट्रेडमार्क'],
};

export function detectEntity(query) {
  const q = normalize(query);
  let best = null;
  let bestHint = '';
  Object.entries(ENTITY_HINTS).forEach(([id, hints]) => {
    hints.forEach((h) => {
      if (q.includes(h) && h.length > bestHint.length) {
        best = id;
        bestHint = h;
      }
    });
  });
  return best ? { id: best, hint: bestHint } : null;
}

const hasAny = (q, list) => list.some((w) => q.includes(w));

/** Words that, on their own, mean "give me the overview". */
const OVERVIEW_TOKENS = new Set([
  'open', 'opening', 'live', 'running', 'status', 'overview', 'detail', 'details',
  'info', 'information', 'company', 'entity', 'sector', 'business', 'work', 'exist',
  'जानकारी', 'बारे', 'परिचय', 'खुल', 'चुका', 'स्थिति', 'विवरण', 'काम', 'कार्य',
]);

/**
 * answer(data, L, t, query) → { text, links:[{label, path}], kind }
 * Deterministic, content-grounded. Never invents.
 */
export function answer(data, L, t, query, index) {
  const q = normalize(query);
  const g = data.group || {};
  const found = detectEntity(query);
  const ent = found?.id || null;
  // what is left of the question once the brand name is removed —
  // this is what decides between "tell me about X" and a specific question
  const remainder = found ? tokenize(q.replace(found.hint, ' ')) : tokenize(q);
  const links = [];
  const E = (id) => data.entities?.[id];

  const greet = new Set(['hi', 'hello', 'hey', 'namaste', 'नमस्ते', 'हैलो', 'हेलो', 'हाय']);
  const words = q.split(' ').filter(Boolean);
  if (words.length <= 2 && words.some((w) => greet.has(w))) {
    return { text: t('aiGreeting'), links: [], kind: 'greeting' };
  }

  const LOCATION_WORDS = [
    'office', 'offices', 'located', 'location', 'locations', 'branch', 'branches',
    'where are you', 'where is', 'city', 'cities', 'presence',
    'कार्यालय', 'शाखा', 'स्थान', 'कहाँ', 'कहां', 'उपस्थिति',
  ];
  const asksLocation = hasAny(q, LOCATION_WORDS);

  /* contact — but a question about *where* is answered by the Atlas below */
  if (
    !asksLocation &&
    hasAny(q, ['contact', 'email', 'phone', 'call', 'reach', 'whatsapp', 'address', 'संपर्क', 'ईमेल', 'फोन', 'दूरभाष', 'पता'])
  ) {
    const e = ent ? E(ent) : null;
    const email = e?.contact?.email || g.contact?.email;
    const phone = e?.contact?.phone || g.contact?.phone;
    const who = e ? L(e.name) : 'InEra Group';
    links.push({ label: t('navContact'), path: ent ? `${entityPath(ent)}/contact` : '/contact' });
    return {
      text: `${who} — ${t('emailUs')}: ${email}. ${t('callUs')}: ${phone}. ${L(g.contact?.address)}. ${L(g.contact?.hours)}`,
      links,
      kind: 'contact',
    };
  }

  /* offices / where are you */
  if (asksLocation) {
    const list = (data.offices || []).filter((o) => o.active !== false);
    if (list.length) {
      links.push({ label: t('navAtlas'), path: '/atlas' });
      const hq = list.find((o) => o.kind === 'hq');
      const names = list.map((o) => `${o.city} (${L(o.region)})`).join(', ');
      return {
        text: `${t('atlasOffices')}: ${names}.${hq ? ` ${t('atlasHQ')}: ${hq.city}.` : ''}`,
        links,
        kind: 'office',
      };
    }
  }

  /* careers */
  if (hasAny(q, ['job', 'jobs', 'career', 'careers', 'vacancy', 'hiring', 'opening', 'apply for', 'नौकरी', 'रिक्ति', 'भर्ती', 'करियर'])) {
    const list = (data.careers || []).filter((c) => c.active !== false);
    links.push({ label: t('navCareers'), path: '/careers' });
    if (!list.length) return { text: t('careersNone'), links, kind: 'career' };
    const names = list.map((c) => `${L(c.title)} (${L(c.location)})`).join('; ');
    return { text: `${t('navCareers')}: ${names}.`, links, kind: 'career' };
  }

  /* certificate verification */
  if (hasAny(q, ['verify', 'verification', 'certificate number', 'authentic', 'सत्यापन', 'प्रमाणपत्र संख्या'])) {
    links.push({ label: t('navVerify'), path: '/verify' });
    return { text: t('verifyIntro'), links, kind: 'verify' };
  }

  /* gallery */
  if (hasAny(q, ['gallery', 'photo', 'photos', 'picture', 'pictures', 'images', 'गैलरी', 'चित्र', 'फ़ोटो', 'फोटो'])) {
    links.push({ label: t('navGallery'), path: '/gallery' });
    const n = (data.gallery || []).filter((g) => g.active !== false && g.image).length;
    return {
      text: n ? `${t('navGallery')} — ${n}.` : t('galleryEmpty'),
      links,
      kind: 'gallery',
    };
  }

  /* leadership / chairperson */
  if (hasAny(q, ['chairperson', 'chairman', 'chair', 'founder', 'ceo', 'director', 'leader', 'leadership', 'who runs', 'who owns', 'head', 'अध्यक्ष', 'संस्थापक', 'नेतृत्व', 'निदेशक'])) {
    const c = g.chairperson;
    const others = (g.leadership || []).filter((p) => p.active !== false);
    links.push({ label: t('navLeadership'), path: '/leadership' });
    const list = others.map((p) => `${p.name} — ${L(p.designation)}`).join('; ');
    return {
      text: `${c?.name} — ${L(c?.designation)}.${list ? ` ${t('aiAlsoLeads')}: ${list}.` : ''}`,
      links,
      kind: 'person',
    };
  }

  /* sectors list */
  if (hasAny(q, ['sector', 'sectors', 'entities', 'brand trust', 'brands', 'companies', 'divisions', 'how many', 'क्षेत्र', 'इकाइयाँ', 'इकाइयां', 'कितने'])) {
    ENTITY_IDS.forEach((id) => links.push({ label: L(E(id)?.name), path: entityPath(id) }));
    const names = ENTITY_IDS.map((id) => `${L(E(id)?.name)} (${L(E(id)?.sector)})`).join(', ');
    return {
      text: `${t('aiFourSectors')}: ${names}. ${t('aiOwnedBy')}`,
      links,
      kind: 'sectors',
    };
  }

  /* fee / price */
  if (hasAny(q, ['fee', 'fees', 'price', 'cost', 'charge', 'शुल्क', 'कीमत', 'मूल्य'])) {
    const soi = E('soi');
    if ((!ent || ent === 'soi') && soi?.programme) {
      links.push({ label: L(soi.name), path: entityPath('soi') });
      return {
        text: `${L(soi.name)} — ${soi.programme.fee} ${t('aiPerStudent')} · ${t('aiMinBatch')}: ${soi.programme.minStudents} ${t('aiStudents')} · ${L(soi.programme.mode)} · ${L(soi.programme.duration)}.`,
        links,
        kind: 'programme',
      };
    }
    const e = ent ? E(ent) : null;
    if (e) {
      links.push({ label: L(e.name), path: `${entityPath(ent)}/contact` });
      return {
        text: `${L(e.name)} ${t('aiQuoteLine')}`,
        links,
        kind: 'programme',
      };
    }
  }

  /* what is the group / about */
  if (
    hasAny(q, [
      'what is inera group',
      'about inera group',
      'about the group',
      'what is the group',
      'inera group',
      'इनएरा ग्रुप',
      'समूह क्या',
      'ग्रुप क्या',
      'ग्रुप के बारे',
      'समूह के बारे',
    ]) &&
    !ent
  ) {
    links.push({ label: t('navAbout'), path: '/about' });
    return {
      text: `${L(g.statement?.lead)} ${L(g.legalParent)}.`,
      links,
      kind: 'group',
    };
  }

  if (hasAny(q, ['vision', 'दृष्टि'])) {
    links.push({ label: t('navAbout'), path: '/about' });
    return { text: `${t('sectionVision')}: ${L(g.vision)}`, links, kind: 'group' };
  }
  if (hasAny(q, ['mission', 'ध्येय', 'उद्देश्य'])) {
    links.push({ label: t('navAbout'), path: '/about' });
    return { text: `${t('sectionMission')}: ${L(g.mission)}`, links, kind: 'group' };
  }

  /* entity-specific overview */
  // "tell me about X" / "is X open?" — nothing specific is being asked
  if (ent && (remainder.length === 0 || remainder.every((w) => OVERVIEW_TOKENS.has(w)))) {
    const e = E(ent);
    const offerings = (e.offerings || [])
      .filter((o) => o.active !== false)
      .slice(0, 4)
      .map((o) => L(o.title))
      .join(', ');
    links.push({ label: L(e.name), path: entityPath(ent) });
    links.push({ label: t('navOfferings'), path: `${entityPath(ent)}/what-we-do` });
    return {
      text: `${L(e.name)} — ${L(e.sector)}. ${L(e.about?.lead)} ${L(e.stageNote)}.${offerings ? ` ${t('aiMainAreas')}: ${offerings}.` : ''}`,
      links,
      kind: 'entity',
    };
  }

  /* retrieval fallback */
  const hits = search(index, query, { limit: 3, entity: ent });
  if (hits.length) {
    const top = hits[0].doc;
    const seen = new Set();
    hits.forEach((h) => {
      if (seen.has(h.doc.path)) return;
      seen.add(h.doc.path);
      links.push({ label: h.doc.title, path: h.doc.path });
    });
    const body = top.body.replace(/\s+/g, ' ').trim();
    const trimmed = body.length > 460 ? `${body.slice(0, 450).replace(/[^\s]*$/, '')}…` : body;
    return { text: trimmed || top.title, links, kind: 'retrieved' };
  }

  return { text: t('aiNoAnswer'), links: [{ label: t('navContact'), path: '/contact' }], kind: 'none' };
}

export function suggestions(L, data, lang) {
  const en = [
    'What is InEra Group?',
    'What are the four sectors?',
    'Where are your offices?',
    'Who is the chairperson?',
    'What does IIT do?',
    'Is InEra Café open yet?',
    'SOI programme fee?',
    'Are you hiring?',
    'How do I verify a certificate?',
  ];
  const hi = [
    'इनएरा ग्रुप क्या है?',
    'चारों क्षेत्र कौन से हैं?',
    'आपके कार्यालय कहाँ हैं?',
    'अध्यक्ष कौन हैं?',
    'IIT क्या करता है?',
    'क्या इनएरा कैफ़े खुल चुका है?',
    'SOI का शुल्क कितना है?',
    'क्या भर्ती चल रही है?',
    'प्रमाणपत्र सत्यापन कैसे करें?',
  ];
  return lang === 'hi' ? hi : en;
}

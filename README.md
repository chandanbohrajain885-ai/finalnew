# InEra Group — website

One React application that serves six sites:

| Route | Site |
|---|---|
| `/` | **InEra Group** — the umbrella landing site |
| `/information-technology` | **InEra Information Technology (IIT)** |
| `/school-of-intelligence` | **InEra School of Intelligence (SOI)** |
| `/cafe` | **InEra Café** |
| `/consultancy-services` | **InEra Consultancy Services (ICS)** |
| `/inera-software` | **InEra Software Private Limited** (parent company) |
| `/sectors` | **Sectors** — the index of all four brand trusts |
| `/atlas` | **The Atlas** — interactive globe of every office |
| `/gallery` · `/highlights` · `/careers` · `/verify` · `/privacy` | Group pages |
| `/admin` | Content console (password-gated) |

Each sector site has its own palette, its own header and footer, and its own
pages: Home · About · What we do · People · Gallery · Contact.
The School of Intelligence also has **Admissions**, with an application form
for individuals and for institutions.

---

## 1. Run it locally

```bash
npm install
npm run dev          # http://localhost:5173
```

```bash
npm run build        # production build into dist/
npm run preview      # serve the built site
```

Requires Node 18 or newer.

---

## 2. Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel → **Add New → Project** → import that repository.
3. Vercel reads `vercel.json` and needs no manual settings:
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add the two environment variables from step 3 below.
5. Deploy, then point your domain (`ineragroup.com` or whichever you register)
   at the project in **Settings → Domains**.

`vercel.json` already rewrites every path to `index.html`, so deep links like
`/school-of-intelligence/contact` work on a hard refresh.

---

## 3. Make the admin panel publish live (Supabase)

Without this, `/admin` still works but edits stay in your own browser and
visitors never see them. Full walkthrough: **`SUPABASE_SETUP.md`**.

Short version:

1. Create a free project at supabase.com.
2. SQL Editor → paste `supabase/schema.sql` → Run.
3. Settings → API → copy the **Project URL** and the **anon public** key.
4. Vercel → Settings → Environment Variables:

   ```
   VITE_SUPABASE_URL        = https://xxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY   = eyJhbGciOi...
   VITE_ADMIN_PASSWORD      = (optional — your own admin password)
   ```

5. Redeploy.

The admin header then reads **“Live · changes publish instantly.”** Every edit
is written to Supabase immediately; open browsers pick it up within about 25
seconds, and any page load after that is current.

---

## 4. The admin console — one per sector

Open **`/admin`** on your deployed site (`https://your-domain/admin`).
Default password: `Mahaveernirmalachandan` — override it with
`VITE_ADMIN_PASSWORD`. There is deliberately no link to it from the website.

### Workspaces

The top of the left rail is a **workspace switcher**:

```
InEra Group   ← umbrella
IIT           ← InEra Information Technology
SOI           ← InEra School of Intelligence
CAFÉ          ← InEra Café
ICS           ← InEra Consultancy Services
ISPL          ← InEra Software Private Limited
```

Pick one and **the entire console becomes that entity's own control panel**,
with the same tabs every time. The panel takes on that sector's accent colour
so you always know which one you are editing.

### The tabs, in every workspace

| Tab | Group workspace | Sector workspace |
|---|---|---|
| Dashboard | counts, publish status, jump to a sector | counts and publish status for that sector |
| Identity | parent line, trademark statement, hero kicker | name, short name, sector label, tagline, stage, show/hide |
| Hero | the sector-section intro | headline, sub-paragraph, call to action |
| About | statement, vision, mission, why the Group exists | lead sentence and paragraphs |
| Charter / What We Do | the four governing principles | service lines |
| Milestones / How We Work | the timeline | the numbered process steps |
| Stats | the figures strip | the figures strip (+ programme fee for SOI) |
| Leadership / People | chairperson + group leadership | that sector's own people |
| Questions | — | the FAQ accordion |
| Gallery | every picture, plus the categories | only that sector's pictures; uploads auto-tagged |
| Highlights | all highlight cards | only that sector's |
| Careers | all open roles | only that sector's |
| Reviews | all reviews | only that sector's |
| Announcements | the Group ticker | that sector's own ticker |
| Contact & Social | email, phone, WhatsApp, address, hours, links | that sector's email, phone and links |
| Offices & Atlas | every office on the globe | — |
| Certificates | the whole register | SOI only |
| Admissions | the application page | SOI only |
| Values & Legal | values block, privacy page | — |
| Enquiries | every contact-form message | only messages for that sector |
| Applications | every admissions application | only that sector's |
| Backup | export / restore / reset | — |

### How editing works

- Every text field has an **English** box and a **हिन्दी** box. Leave Hindi
  empty and the site falls back to English for that field.
- There is **no Save button**, on purpose. Each keystroke is written to the
  database about half a second after you stop typing. The header shows
  **Live** while connected and **Publishing…** while a write is in flight.
- The public site picks the change up on the next page load, and open
  browsers refresh themselves within about 25 seconds.
- Lists can be reordered with the arrows, hidden with the eye (so a record
  survives without being published), and deleted outright.
- Photos can be uploaded — they are resized in the browser and stored with
  the content — or referenced by path if you put the file in `public/`.

## 4a. The Atlas globe

`/atlas` draws an orthographic globe in plain SVG — no mapping library, no
tiles, no API key, nothing to pay for. It shows a graticule, a marker for every
office at its real coordinates, and a great-circle arc from headquarters to
each one. Drag to turn it; click a city to open its details; hovering the list
spins the globe to that city. It is drawn from the same office records the
admin console edits, so adding an office in `/admin` puts it on the globe
immediately.

Cities that sit close together — Belagavi, Bengaluru and Pune are only a few
degrees apart — would print their labels on top of one another, so labels are
laid out with a collision pass: each one takes the nearest free slot and is
joined back to its marker by a leader line. **Zoom in** with the `+` button or
the scroll wheel and the markers themselves separate; `↻` resumes the idle
rotation after you have dragged it.

To find a city's coordinates: open Google Maps, right-click the spot, and the
first line of the menu is `latitude, longitude`. Paste each number into its own
box.

## 5. Languages

English and हिन्दी. The switch sits in every header; the choice is remembered
per visitor. Interface labels come from `src/i18n/strings.js`; all page content
comes from the admin data.

---

## 6. The assistant and search

`src/lib/knowledge.js` builds a search index in the browser from whatever
content is currently published, then answers questions from it — intent rules
for the common questions (contact, leadership, sectors, fees, "what is X"),
TF-IDF retrieval for everything else, in both languages.

It answers questions about the Group, any sector, leadership, offices,
services, fees, careers, certificate verification, the gallery and the privacy
policy — in both languages.

There is **no API key and no external service**. It cannot invent a fact,
cannot run up a bill, and updates the moment you publish an edit.

Search opens from the magnifier in any header, or with `⌘K` / `Ctrl-K` (or `/`).

## 6a. Printing

Every page has a print stylesheet: `Ctrl-P` / `⌘P` on any sector page gives a
clean one-page brief with the navigation, assistant and decoration stripped
out. Useful for sending a sector overview to someone who wants a PDF.

---

## 7. Structure

```
public/
  logos/        group · iit · soi · cafe · ics · software  (transparent PNG)
  team/         portraits
src/
  data/
    defaults.js  entity + group content, both languages
    extras.js    offices, gallery, careers, reviews, certificates, legal
    sectors.js   palettes, logos, URL slugs
  i18n/         strings.js  LanguageContext.jsx
  context/      SiteDataContext.jsx   ← load / merge / publish
  lib/
    supabase.js     cloud read + write over REST
    knowledge.js    index, search, answers
  components/   header, footer, intro, assistant, search, Globe, Gallery,
                blocks (reviews / highlights / careers / verification),
                UI atoms, admin fields
  pages/        Group pages, sector/ pages, admin/editors.jsx,
                AdminPage, NotFound
supabase/schema.sql
```

---

## 8. Changing a sector's colours

`src/data/sectors.js` holds each entity's palette, logo and URL slug. These are
structural, so they are deliberately not editable from `/admin` — change them
here and redeploy.

# Making `/admin` publish to the live site

Ten minutes, once. Free tier is more than enough.

---

## Why this is needed

The website content lives in a single database row. Without a database, the
admin console can only write to the browser you are sitting at — your edits
would look right to you and be invisible to everyone else. Supabase gives the
site one shared place to keep that row.

---

## Step 1 — Create the project

1. Go to **supabase.com** and sign in.
2. **New project**.
   - Name: `inera-group`
   - Database password: generate one and keep it somewhere safe (you will not
     need it for this website, but you will need it if you ever open the
     database directly).
   - Region: **South Asia (Mumbai)** — closest to your visitors.
3. Wait for it to finish provisioning (about two minutes).

---

## Step 2 — Create the tables

1. In the left sidebar: **SQL Editor → New query**.
2. Open `supabase/schema.sql` from this project, copy everything, paste it in.
3. Press **Run**.

You should see `Success. No rows returned.` That has created:

- `site_config` — one row holding the whole website's content
- `enquiries` — messages from the contact forms
- the access policies for both

If the last line about `supabase_realtime` reports an error, ignore it — the
site syncs by polling and does not depend on it.

---

## Step 3 — Copy the two keys

**Settings → API**:

- **Project URL** → looks like `https://abcdefghijkl.supabase.co`
- **Project API keys → `anon` `public`** → a long string starting `eyJ…`

Use the **anon public** key. Never put the `service_role` key in a website —
it bypasses every access rule.

---

## Step 4 — Add them to Vercel

Vercel → your project → **Settings → Environment Variables**. Add:

| Name | Value |
|---|---|
| `VITE_SUPABASE_URL` | your Project URL |
| `VITE_SUPABASE_ANON_KEY` | your anon public key |
| `VITE_ADMIN_PASSWORD` | a password of your choosing (optional) |

Tick **Production**, **Preview** and **Development** for each.

Then **Deployments → ⋯ → Redeploy**. Environment variables are baked in at
build time, so a redeploy is required — saving them alone does nothing.

---

## Step 5 — Confirm

1. Open `https://your-domain/admin` and sign in.
2. The line under the title should read **“Live · changes publish instantly.”**
   If it reads *“Local only”*, the variables did not reach the build — check
   the spelling (`VITE_` prefix included) and redeploy.
3. Change something small — the hero kicker, say — then open the site in a
   private window. The change is there.

---

## Running it locally with the same database

Create a file named `.env` in the project root:

```
VITE_SUPABASE_URL=https://abcdefghijkl.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
VITE_ADMIN_PASSWORD=your-password
```

`.env` is git-ignored. Restart `npm run dev` after creating it.

---

## A note on security

The policies in `schema.sql` let anyone holding the anon key write to
`site_config`. The anon key ships inside every website that uses Supabase —
that is what it is for — so in practice the admin password is what protects
your content, and that is the normal arrangement for a site this size.

If you later want database-level protection as well:

1. Supabase → **Authentication → Users → Add user**, and create one account
   for yourself.
2. In the SQL editor, change the two `site_config` write policies from
   `using (true)` to `to authenticated using (true)`.
3. Sign that account in from the admin console before editing.

Tell me when you want this and I will wire the sign-in step into `/admin`.

---

## Backups

Admin → **Backup → Download content file** gives you a single JSON file with
every word on the site in both languages. Keep one after any large edit. The
same screen restores it.

# Deploying to Vercel — exact steps

## A. Get the code onto GitHub

```bash
cd inera-group
git init
git add .
git commit -m "InEra Group website"
git branch -M main
git remote add origin https://github.com/<you>/inera-group.git
git push -u origin main
```

`node_modules` and `.env` are excluded by `.gitignore` — do not commit them.

## B. Import into Vercel

1. vercel.com → **Add New → Project** → **Import Git Repository**.
2. Pick the repository. Vercel detects **Vite** on its own.
3. Leave the build settings as detected:
   - Build command `npm run build`
   - Output directory `dist`
   - Install command `npm install`
4. Before the first deploy, open **Environment Variables** and add:

   ```
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   VITE_ADMIN_PASSWORD
   ```

   (See `SUPABASE_SETUP.md`. The site builds and runs without them, but the
   admin console will only save locally.)

5. **Deploy**.

## C. Domain

**Settings → Domains → Add.** Enter `ineragroup.com` (or whatever you
register), then set the DNS records Vercel shows you at your registrar:

- apex `ineragroup.com` → `A` record to Vercel's IP, as shown
- `www` → `CNAME` to `cname.vercel-dns.com`

Add both and mark one as the primary so the other redirects to it.

Nothing in the code hardcodes a domain, so `ineragroup.com`,
`ineragroups.com` or `inera.group` all work without a code change.

## D. After each content change

Nothing. Content edits from `/admin` go straight to the database and appear on
the live site — no rebuild, no redeploy.

Redeploy only when you change **code**, **logos in `public/`**, or
**environment variables**.

## E. If a deep link 404s

`vercel.json` contains the SPA rewrite:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

If a URL like `/cafe/contact` 404s on refresh, that file did not make it into
the repository. Confirm `vercel.json` is committed at the project root.

## F. Build fails on Vercel

- **"Cannot find module"** — commit `package.json` and run a clean
  `npm install` locally to regenerate `package-lock.json`, then push it.
- **Node version** — Vercel → Settings → General → Node.js Version → **20.x**.
- Read the build log top to bottom; the first red line is the real cause, the
  rest are consequences.

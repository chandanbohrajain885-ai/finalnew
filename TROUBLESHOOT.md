# If the Vercel build fails

## First — read the actual error

The Build Logs box scrolls on its own. Open the failed deployment →
**Build Logs** → scroll to the **bottom** of that box. The cause is the last
red line. Everything above it is noise.

---

## 1. `Rollup failed to resolve import "/src/main.jsx"` + `✓ 2 modules transformed`

**This is the one that has bitten this project twice.**

It does not mean anything is wrong with the code. It means the `src` folder is
not in the GitHub repository — the build had nothing to compile.

Cause: GitHub's web uploader silently skips folders when you pick files
through the "choose your files" dialog.

Fix: push with **GitHub Desktop** or the **command line** — see
`START-HERE.md`, Route A or B. Confirm before deploying by opening the
repository on github.com and clicking into `src`; you should see `main.jsx`,
`App.jsx`, `index.css` and the `pages/`, `components/`, `data/` folders.

From a terminal you can check in one line:

```bash
git ls-files src | wc -l      # must print 50
```

---

## 2. `Could not resolve entry module "index.html"`

Vercel is building the wrong folder — usually because the repository has an
extra folder at the top:

```
your-repo/
  ineragroup/          ← package.json is in here, not at the top
    package.json
```

Fix either way:

- **Vercel:** Settings → General → **Root Directory** → `ineragroup` → Save.
- **Repo:** move everything up one level so `package.json` is at the top.

---

## 3. `vite: command not found`

Vercel installed production dependencies only.

Settings → General → Build & Development Settings → **Install Command**:

```
npm install --include=dev
```

---

## 4. `Cannot find module @rollup/rollup-linux-x64-gnu`

An npm bug with platform-specific optional packages.

**Cannot happen in this version** — the project uses Vite 4.5.5, whose bundler
is pure JavaScript with no platform binaries, and every dependency version is
pinned exactly.

---

## 5. An esbuild error, or `npm warn allow-scripts`

Newer npm (11+) blocks package install scripts, and esbuild uses one.

`.nvmrc` pins **Node 20**, which ships npm 10 and does not block scripts, so
this should not arise. If Vercel ignores `.nvmrc`:

Settings → General → **Node.js Version → 20.x** → Save → Redeploy.

---

## 6. The site builds but pages 404 on refresh

`vercel.json` holds the single-page-app rewrite:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

If `/cafe/contact` 404s on a hard refresh, `vercel.json` is missing from the
repository. Check it is there and redeploy.

---

## 7. The site loads but the logos are missing

The `public` folder did not reach GitHub — same cause as #1.
It should contain `logos/` (6 PNG files), `team/` (4 photos) and
`favicon.png`.

---

## After changing anything in the Vercel dashboard

Settings changes do not rebuild by themselves:

**Deployments → the top one → ⋯ → Redeploy → untick "Use existing Build
Cache" → Redeploy**

---

## The fastest test of all

```bash
npm install
npm run build
```

Run it on your own machine before pushing. It prints the complete error
immediately, and if it succeeds locally it will succeed on Vercel.

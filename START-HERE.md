# START HERE — getting this onto GitHub and Vercel

This folder is **already a git repository** with everything committed. That is
deliberate: the last two deployments failed because the `src` folder never
reached GitHub, and a ready-made repository makes that impossible.

Do not re-zip, re-copy, or move files around before pushing. Push this folder
exactly as it is.

---

## What must end up in the repository

If any of these is missing, the build will fail:

```
ineragroup/
├── src/          50 files   ← the entire website. THIS is what went missing before.
├── public/       11 files   ← logos and photographs
├── supabase/      1 file    ← the database schema
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── .nvmrc
└── (documentation .md files)
```

---

## Route A — GitHub Desktop (easiest, no typing)

1. Install **GitHub Desktop** from desktop.github.com and sign in.
2. **File → Add local repository…** → choose this `ineragroup` folder.
   It will be recognised straight away, because the repository already exists.
3. Click **Publish repository**.
   - Name: `ineragroup`
   - **Untick "Keep this code private"** if you want it public — either works.
4. Done. Every file goes up, folders included.

If you want to push into your existing empty repo instead, use Route B.

---

## Route B — Command line (two commands)

Open a terminal **inside this folder** and run:

```bash
git remote add origin https://github.com/chandanbohrajain885-ai/ineragroup.git
git push -u origin main --force
```

`--force` replaces what is currently in that repository, which is what you
want — the current contents are the broken partial upload.

If it says `remote origin already exists`:

```bash
git remote set-url origin https://github.com/chandanbohrajain885-ai/ineragroup.git
git push -u origin main --force
```

---

## Route C — GitHub website upload (only if A and B are impossible)

This is the route that failed last time. It works **only** if you drag folders,
never if you use the "choose your files" dialog.

1. On the repository page: **Add file ▾ → Upload files**.
2. Open this `ineragroup` folder in File Explorer, press **Ctrl + A**.
3. **Drag the whole selection onto the browser window.** Use Chrome or Edge.
4. **Check the file list before committing.** You must see paths containing
   slashes, like `src/main.jsx` and `public/logos/group.png`.
   If every line is a bare filename with no slash, the folders did not attach —
   stop, and use Route A instead.
5. Commit to `main`.

---

## Then: Vercel

1. vercel.com → **Add New → Project** → import `ineragroup`.
2. It auto-detects Vite. Leave the build settings alone.
3. **Root Directory**: leave it blank/`.` — `package.json` is at the top of the
   repository.
4. Add the environment variables (see `SUPABASE_SETUP.md`):

   ```
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   VITE_ADMIN_PASSWORD
   ```

   The site builds and runs without them; the admin panel just saves locally
   instead of publishing live.
5. **Deploy.**

### A successful build looks like this

```
✓ 1500+ modules transformed.
dist/index.html
dist/assets/index-XXXXXXXX.css
dist/assets/index-XXXXXXXX.js
✓ built in 10s
```

If it says **`✓ 2 modules transformed`**, the `src` folder did not reach
GitHub. Go back to Route A.

---

## Check it worked

| URL | What you should see |
|---|---|
| `/` | Gold logo blinks in on black, then the screen splits open |
| `/sectors` | All four brand trusts listed |
| `/atlas` | A globe you can drag, with Belagavi, Bengaluru and Pune |
| `/information-technology` | The IIT site in navy |
| `/school-of-intelligence` | The SOI site in midnight and gold |
| `/cafe` | The Café site in cream and green |
| `/consultancy-services` | The ICS site in ivory and navy |
| `/inera-software` | The parent company page |
| `/admin` | The password screen |

Click the **EN / हि** switch in the header — the whole site changes language.

---

## Then, in this order

1. Follow `SUPABASE_SETUP.md` so the admin panel publishes live.
2. Change the admin password with `VITE_ADMIN_PASSWORD`. The default is the
   one from your old public repository, so treat it as already compromised.
3. Open `/admin` and correct the seeded content — see "What to check" in
   `README.md`.

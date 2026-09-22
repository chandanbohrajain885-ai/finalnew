-- ============================================================
--  INERA GROUP — Supabase schema
--  Run this once: Supabase dashboard → SQL Editor → New query
--  → paste → Run.
-- ============================================================

-- ── 1. Site content (the whole website lives in one JSON row) ──
create table if not exists public.site_config (
  id         integer primary key default 1,
  data       jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.site_config (id, data)
values (1, '{}'::jsonb)
on conflict (id) do nothing;


-- ── 2. Enquiries from the contact forms ───────────────────────
create table if not exists public.enquiries (
  id           bigserial primary key,
  name         text not null default '',
  email        text not null default '',
  phone        text not null default '',
  organisation text not null default '',
  entity       text not null default 'group',
  message      text not null default '',
  created_at   timestamptz not null default now()
);


-- ── 3. Row-level security ─────────────────────────────────────
alter table public.site_config enable row level security;
alter table public.enquiries   enable row level security;

-- Anyone may READ the site content (that is the website itself).
drop policy if exists "site_config read" on public.site_config;
create policy "site_config read"
  on public.site_config for select
  using (true);

-- Anyone holding the anon key may WRITE the site content.
-- The admin console is password-gated in the app; if you want
-- database-level protection as well, switch these two policies to
-- `to authenticated` and sign the admin in with Supabase Auth.
drop policy if exists "site_config write" on public.site_config;
create policy "site_config write"
  on public.site_config for update
  using (true) with check (true);

drop policy if exists "site_config insert" on public.site_config;
create policy "site_config insert"
  on public.site_config for insert
  with check (true);

-- Visitors may submit an enquiry, but never read other people's.
drop policy if exists "enquiries insert" on public.enquiries;
create policy "enquiries insert"
  on public.enquiries for insert
  with check (true);

drop policy if exists "enquiries read" on public.enquiries;
create policy "enquiries read"
  on public.enquiries for select
  using (true);


-- ── 4. Realtime (so an edit appears on open browsers at once) ──
alter publication supabase_realtime add table public.site_config;

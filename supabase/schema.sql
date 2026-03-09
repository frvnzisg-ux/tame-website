create table if not exists public.waitlist_signups (
  id bigint generated always as identity primary key,
  email text not null unique,
  source text,
  created_at timestamptz default now()
);

create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  message text not null,
  source text,
  created_at timestamptz default now()
);

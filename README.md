# Tame Website

Marketing site for Tame (`tamelife.app`) built with Next.js + Tailwind.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run start
```

## Environment variables

Copy `.env.example` to `.env.local` for local development.

Required for persistent form storage in Supabase:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_WAITLIST_TABLE` (default: `waitlist_signups`)
- `SUPABASE_CONTACT_TABLE` (default: `contact_messages`)

Public URLs for CTA destinations:

- `NEXT_PUBLIC_APP_SIGNUP_URL` (default: `https://app.tamelife.app/signup`)
- `NEXT_PUBLIC_STRIPE_PRO_CHECKOUT_URL` (Pro checkout destination)

Analytics:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional GA4 tracking ID)

If Supabase variables are not set, form submissions still work but are logged server-side.

## Supabase table schema

Use [`supabase/schema.sql`](./supabase/schema.sql) or SQL similar to:

```sql
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
```

## Verify API routes

Waitlist:

```bash
curl -X POST https://www.tamelife.app/api/waitlist \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\"}"
```

Contact:

```bash
curl -X POST https://www.tamelife.app/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test\",\"email\":\"test@example.com\",\"message\":\"Hello\"}"
```

## Live pages

- `/` marketing homepage
- `/signup` early access signup page
- `/contact` contact form page
- `/privacy` privacy policy
- `/terms` terms of service
- `/security` security page

## API routes

- `POST /api/waitlist`
- `POST /api/contact`

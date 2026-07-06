# ReviewTap

Marketing site + order system + admin dashboard for **ReviewTap** — NFC Google
Review Cards that open a business's Google review page with one phone tap.

Built with **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS ·
Framer Motion · Lucide Icons · Supabase**.

## Pages

| Route          | Purpose                                                        |
| -------------- | -------------------------------------------------------------- |
| `/`            | Home: hero, animated card mockup, stats, how it works, benefits, testimonials, FAQ, CTA |
| `/products`    | Pricing cards for Card / Stand / Sticker                        |
| `/order`       | Order form → saved to Supabase `orders`                         |
| `/support`     | Support form → saved to Supabase `support_tickets`              |
| `/contact`     | Contact form → saved to Supabase `contact_messages`             |
| `/about`       | Mission page                                                    |
| `/admin/login` | Supabase Auth sign-in                                           |
| `/admin`       | Protected dashboard: view/complete/export orders, tickets, messages |

## 1. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The whole site works without Supabase; forms and
the admin dashboard show a friendly "not connected yet" notice until step 2.

## 2. Connect Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run the contents of [`supabase/schema.sql`](supabase/schema.sql)
   (creates the three tables + row-level security).
3. Create your admin login: **Authentication → Users → Add user** (email + password).
4. Copy `.env.example` to `.env.local` and fill in the values from
   **Project Settings → API**:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Restart `npm run dev`. Forms now save to the database and `/admin` requires login.

### Security model

- Website visitors can only **insert** rows (RLS policies, anon key).
- Reading and updating requires an **authenticated** Supabase user.
- `/admin` routes are additionally guarded by `middleware.ts`.

## 3. Deploy to Vercel

1. Push this repo to GitHub.
2. In [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
   Vercel auto-detects Next.js; no build settings needed.
3. Add the three environment variables from `.env.example`
   (set `NEXT_PUBLIC_SITE_URL` to your production URL, e.g. `https://reviewtap.com`).
4. Deploy.

## Project structure

```
app/                  Routes (App Router) + API routes + SEO files
  api/                orders / support / contact POST endpoints
  admin/              Login + protected dashboard
components/           Reusable UI
  home/               Home page sections
  forms/              Order / support / contact forms
  ui/                 Button, fields, spinner, slot
lib/                  Supabase clients, types, product catalog, utils
supabase/schema.sql   Database schema + RLS policies
middleware.ts         Auth guard for /admin
```

## Customizing

- **Contact details:** search for `reviewtap.example` and `+46 70 123 45 67`
  and replace with your real email/phone (footer, contact and support pages).
- **Prices/products:** edit `lib/products.ts` — products, order form and
  API validation all read from it.
- **Stats:** edit the numbers in `components/home/stats.tsx`.
- **Maps:** replace the placeholder block in `app/contact/page.tsx` with your
  Google Maps `<iframe>`.

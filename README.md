# Karaoke App

Shared-room karaoke MVP built with Next.js and Supabase.

## Phase A Scope

This repository currently includes:

- A Next.js 16 app with TypeScript, Tailwind CSS, and ESLint
- Environment parsing helpers for Supabase configuration
- Shared Supabase clients for browser and server usage
- An initial MVP data model and demo seed SQL
- Unit and browser smoke-test scaffolding

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
cp .env.example .env.local
```

3. Fill in your Supabase values:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (optional unless you need admin/server tasks)

4. Start the app:

```bash
npm run dev
```

The homepage will be available at `http://localhost:3000`.

## Scripts

- `npm run dev` starts the Next.js dev server
- `npm run build` creates a production build
- `npm run start` serves the production build
- `npm run lint` runs ESLint
- `npm run test` runs unit tests
- `npm run test:e2e` runs the Playwright smoke test

## Supabase Notes

- SQL schema lives in [supabase/migrations/20260516154000_phase_a_foundation.sql](/Users/melvin/Documents/demo/karaoke-app/supabase/migrations/20260516154000_phase_a_foundation.sql)
- Demo seed data lives in [supabase/seed.sql](/Users/melvin/Documents/demo/karaoke-app/supabase/seed.sql)
- Relationship notes live in [docs/data-model.md](/Users/melvin/Documents/demo/karaoke-app/docs/data-model.md)

You can apply the schema with your preferred Supabase workflow, for example via the Supabase CLI or the SQL editor.

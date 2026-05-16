# Karaoke App

A shared-room karaoke MVP built with Next.js and Supabase.

## Current Scope

This branch covers the app foundation plus the first room flow:

- Landing page with host room creation
- Server-side room creation and session persistence
- Room lobby page with participant list and empty queue state
- Supabase-backed schema and demo seed data for rooms, singers, songs, and lyric lines
- Unit tests with Vitest and browser smoke tests with Playwright

The next milestones are tracked in the phase docs under [`docs/phases`](./docs/phases).

## Stack

- Next.js 16 with React 19 and TypeScript
- Tailwind CSS 4
- Supabase for persistence
- Zod for environment validation
- Vitest and Testing Library for unit tests
- Playwright for end-to-end coverage

## Local Setup

1. Install dependencies.

```bash
npm install
```

2. Copy the example environment file.

```bash
cp .env.example .env.local
```

3. Fill in these values in `.env.local`.

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

4. Apply the schema and seed data to your Supabase project.

- Migration: [`supabase/migrations/20260516154000_phase_a_foundation.sql`](./supabase/migrations/20260516154000_phase_a_foundation.sql)
- Seed: [`supabase/seed.sql`](./supabase/seed.sql)
- Data model notes: [`docs/data-model.md`](./docs/data-model.md)

5. Start the app.

```bash
npm run dev
```

Open `http://localhost:3000`.

## Current User Flow

1. Enter a host display name and optional room name on the homepage.
2. Submit the form to create a room.
3. Land in `/rooms/[code]` with the host session attached.
4. View the lobby, participant list, and empty queue placeholder.

Join-by-code, catalog browsing, queue management, and karaoke playback are planned next and documented in the phase files.

## Scripts

- `npm run dev` starts the Next.js dev server
- `npm run build` creates a production build
- `npm run start` serves the production build
- `npm run lint` runs ESLint
- `npm run test` runs the Vitest suite
- `npm run test:e2e` runs the Playwright tests

## Project Docs

- [`docs/phases/phase-a-foundation-and-setup.md`](./docs/phases/phase-a-foundation-and-setup.md)
- [`docs/phases/phase-b-room-entry.md`](./docs/phases/phase-b-room-entry.md)
- [`docs/phases/phase-c-song-catalog-and-queue.md`](./docs/phases/phase-c-song-catalog-and-queue.md)
- [`docs/phases/phase-d-karaoke-playback.md`](./docs/phases/phase-d-karaoke-playback.md)
- [`docs/phases/phase-e-realtime-and-resilience.md`](./docs/phases/phase-e-realtime-and-resilience.md)
- [`docs/phases/phase-f-polish-and-launch-readiness.md`](./docs/phases/phase-f-polish-and-launch-readiness.md)

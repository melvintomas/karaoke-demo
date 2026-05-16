# Phase A - Foundation and Setup

## Goal

Create the project foundation, backend wiring, and initial data model for the MVP.

## Phase Checklist

- [x] A1: Bootstrap the web app
- [ ] A2: Set up backend and environment wiring
- [ ] A3: Define the MVP data model

## Tickets

### A1: Bootstrap the web app

- [x] Ticket status

Goal:
- Create the initial Next.js app with TypeScript, Tailwind, linting, and a clean folder structure.

Acceptance criteria:
- [x] The app starts locally with one command
- [x] The repository includes a base layout, homepage route, and shared UI/component directories
- [x] Linting runs successfully

Unit coverage:
- [x] Add one basic smoke test for the homepage shell or a shared utility if test tooling is introduced here

E2E coverage:
- [x] Verify the homepage loads successfully in a browser test

### A2: Set up backend and environment wiring

- [x] Ticket status

Goal:
- Connect the app to Supabase and add environment variable handling.

Acceptance criteria:
- [x] The app can read backend configuration from environment variables
- [x] A backend client is available for server and client usage
- [x] The setup is documented in the project README or setup doc

Unit coverage:
- [x] Validate environment parsing and backend client initialization helpers

E2E coverage:
- [ ] Verify the app boots in a test environment with mock or test backend settings

### A3: Define the MVP data model

- [x] Ticket status

Goal:
- Create the initial schema for rooms, participants, songs, queue items, and lyric lines.

Acceptance criteria:
- [x] Tables or collections exist for all MVP entities
- [x] Relationships are documented and match the room, queue, and player flow
- [x] Seed data can be inserted for demo songs

Unit coverage:
- [x] Validate schema helpers, data mapping functions, and lyric serialization logic

E2E coverage:
- [ ] Verify seeded data can be read by the app and shown in a basic page or test flow

## Parallel Notes

- [ ] After A2, A3 can run in parallel with B1 and C1

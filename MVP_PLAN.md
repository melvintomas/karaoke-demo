# Karaoke App MVP Plan

This plan has been split into smaller phase documents so the work is easier to track and assign.

## Phase Docs

- [Phase A - Foundation and Setup](docs/phases/phase-a-foundation-and-setup.md)
- [Phase B - Room Entry](docs/phases/phase-b-room-entry.md)
- [Phase C - Song Catalog and Queue](docs/phases/phase-c-song-catalog-and-queue.md)
- [Phase D - Karaoke Playback](docs/phases/phase-d-karaoke-playback.md)
- [Phase E - Realtime and Resilience](docs/phases/phase-e-realtime-and-resilience.md)
- [Phase F - Polish and Launch Readiness](docs/phases/phase-f-polish-and-launch-readiness.md)

## Product Goal

Build a web app that lets a group create a karaoke room, add songs to a shared queue, and sing along to synced lyrics in a simple full-screen player.

## MVP Definition

The first version should support this core loop:

1. A user creates a room.
2. Other users join the room.
3. Users browse or search a small demo song catalog.
4. Users add songs to the shared queue.
5. The active singer opens a karaoke player view.
6. Lyrics advance in sync with the song.
7. The room moves to the next singer/song.

## Global Checklist

- [ ] Confirm MVP scope and out-of-scope features
- [ ] Finalize app setup and backend wiring
- [ ] Ship create-room and join-room flows
- [ ] Ship shared song catalog and queue
- [ ] Ship karaoke player with synced lyrics
- [ ] Ship realtime synchronization
- [ ] Complete polish, accessibility, and smoke tests
- [ ] Prepare preview deployment and demo flow

## Out of Scope for MVP

- Large licensed song catalogs
- User accounts and profiles
- Scoring and pitch detection
- Video backgrounds and advanced visualizers
- Payments or subscriptions
- Native mobile apps
- Social feed or public sharing

## Parallel Work Overview

### After Phase A2

- [ ] Phase A3: Define the MVP data model
- [ ] Phase B1: Create room flow
- [ ] Phase C1: Seed demo song catalog

### After Phase A3 and B1

- [ ] Phase B2: Join room flow
- [ ] Phase B3: Room lobby and participant list

### After Phase C1

- [ ] Phase C2: Song search and browsing UI
- [ ] Phase D2: Synced lyric engine

### After Phase C3

- [ ] Phase C4: Host queue management
- [ ] Phase D1: Karaoke player shell

### After Phase D1 and D2

- [ ] Phase D3: Host playback controls
- [ ] Phase E1: Realtime room synchronization

### Late-stage parallel work

- [ ] Phase E2: Presence and reconnect behavior
- [ ] Phase F1: Error, loading, and empty states
- [ ] Phase F2: Accessibility and responsive pass

## Suggested Team Split

### Track 1: Platform and backend

- [ ] A1
- [ ] A2
- [ ] A3
- [ ] E1
- [ ] E2

### Track 2: Room and queue experience

- [ ] B1
- [ ] B2
- [ ] B3
- [ ] C2
- [ ] C3
- [ ] C4

### Track 3: Song and player experience

- [ ] C1
- [ ] D1
- [ ] D2
- [ ] D3
- [ ] F2

## Recommended First Technical Slice

1. Create room
2. Join room
3. Add demo song to queue
4. Open karaoke player
5. Advance synced lyrics for one song

That gives us an end-to-end prototype quickly and helps validate the hardest product assumptions early.

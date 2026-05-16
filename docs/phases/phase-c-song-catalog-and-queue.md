# Phase C - Song Catalog and Queue

## Goal

Let users browse demo songs and build a shared singing queue.

## Phase Checklist

- [ ] C1: Seed demo song catalog
- [ ] C2: Song search and browsing UI
- [ ] C3: Add songs to queue
- [ ] C4: Host queue management

## Tickets

### C1: Seed demo song catalog

- [ ] Ticket status

Goal:
- Add a small demo library with audio metadata and synced lyrics.

Acceptance criteria:
- [ ] At least 5 demo songs are available in development
- [ ] Each song includes title, artist, duration, audio source, and lyric timing data
- [ ] Invalid or incomplete songs are excluded from the catalog

Unit coverage:
- [ ] Test lyric parsing and song validation helpers

E2E coverage:
- [ ] Verify the catalog page loads seeded songs

### C2: Song search and browsing UI

- [ ] Ticket status

Goal:
- Let users browse and search the demo song list.

Acceptance criteria:
- [ ] Users can open the catalog from the room
- [ ] Users can search by song title or artist
- [ ] No-results and loading states are present

Unit coverage:
- [ ] Test catalog filtering logic

E2E coverage:
- [ ] Verify a user can find a song by search term

### C3: Add songs to queue

- [ ] Ticket status

Goal:
- Let a participant queue a song for themselves.

Acceptance criteria:
- [ ] A user can add a song to the room queue
- [ ] The queued item stores singer name, song, and queue position
- [ ] The queue updates immediately in the room view

Unit coverage:
- [ ] Test queue insertion and queue-position assignment logic

E2E coverage:
- [ ] Verify a user can add a song and see it appear in the shared queue

### C4: Host queue management

- [ ] Ticket status

Goal:
- Let the host manage the running order.

Acceptance criteria:
- [ ] The host can remove queue items
- [ ] The host can reorder queue items
- [ ] Guests cannot use host-only queue controls

Unit coverage:
- [ ] Test queue reorder and permission logic

E2E coverage:
- [ ] Verify the host can reorder the queue and guests cannot access those controls

## Parallel Notes

- [ ] After C1, C2 can run in parallel with D2
- [ ] After C3, C4 can run in parallel with D1

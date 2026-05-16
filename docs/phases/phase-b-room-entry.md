# Phase B - Room Entry

## Goal

Make it possible for hosts and guests to enter and share a karaoke room.

## Phase Checklist

- [x] B1: Create room flow
- [x] B2: Join room flow
- [x] B3: Room lobby and participant list

## Tickets

### B1: Create room flow

- [x] Ticket status

Goal:
- Let a host create a new karaoke room.

Acceptance criteria:
- [x] A user can create a room from the homepage
- [x] A unique room code is generated
- [x] The user is redirected into the new room as host
- [x] The host receives a durable local session token so later room actions do not depend on re-entering their name

Unit coverage:
- [x] Test room-code generation and room-creation service logic

E2E coverage:
- [x] Verify a user can create a room and land on the room lobby

### B2: Join room flow

- [x] Ticket status

Goal:
- Let a guest join an existing room with a room code.

Acceptance criteria:
- [x] A user can enter a room code and display name
- [x] The app validates whether the room exists
- [x] The joined user appears in the room lobby
- [x] The guest receives a durable local session token so refresh and player navigation can restore their room identity

Unit coverage:
- [x] Test room-code validation and participant-creation logic

E2E coverage:
- [x] Verify a second browser session can join the same room

### B3: Room lobby and participant list

- [x] Ticket status

Goal:
- Show a shared lobby before singing starts.

Acceptance criteria:
- [x] The room page shows room code, host status, and participant list
- [x] The host is visually distinguishable from guests
- [x] Empty-state messaging is shown when no songs are queued yet
- [x] The lobby can render in a host-only state before any guests join, then expand cleanly once guest sessions are present

Unit coverage:
- [x] Test participant sorting or lobby view-model helpers

E2E coverage:
- [x] Verify joined users see the same participant list in the lobby

## Parallel Notes

- [ ] After B1, B2 and the host-only lobby shell can move in parallel
- [ ] The shared participant list behavior in B3 depends on B2 being in place

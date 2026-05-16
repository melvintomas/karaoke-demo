# Phase B - Room Entry

## Goal

Make it possible for hosts and guests to enter and share a karaoke room.

## Phase Checklist

- [ ] B1: Create room flow
- [ ] B2: Join room flow
- [ ] B3: Room lobby and participant list

## Tickets

### B1: Create room flow

- [ ] Ticket status

Goal:
- Let a host create a new karaoke room.

Acceptance criteria:
- [ ] A user can create a room from the homepage
- [ ] A unique room code is generated
- [ ] The user is redirected into the new room as host

Unit coverage:
- [ ] Test room-code generation and room-creation service logic

E2E coverage:
- [ ] Verify a user can create a room and land on the room lobby

### B2: Join room flow

- [ ] Ticket status

Goal:
- Let a guest join an existing room with a room code.

Acceptance criteria:
- [ ] A user can enter a room code and display name
- [ ] The app validates whether the room exists
- [ ] The joined user appears in the room lobby

Unit coverage:
- [ ] Test room-code validation and participant-creation logic

E2E coverage:
- [ ] Verify a second browser session can join the same room

### B3: Room lobby and participant list

- [ ] Ticket status

Goal:
- Show a shared lobby before singing starts.

Acceptance criteria:
- [ ] The room page shows room code, host status, and participant list
- [ ] The host is visually distinguishable from guests
- [ ] Empty-state messaging is shown when no songs are queued yet

Unit coverage:
- [ ] Test participant sorting or lobby view-model helpers

E2E coverage:
- [ ] Verify joined users see the same participant list in the lobby

## Parallel Notes

- [ ] After A3 and B1, B2 and B3 can move in parallel

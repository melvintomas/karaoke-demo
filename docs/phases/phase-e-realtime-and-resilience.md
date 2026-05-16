# Phase E - Realtime and Resilience

## Goal

Keep the room synchronized across users and resilient during refresh or reconnect events.

## Phase Checklist

- [ ] E1: Realtime room synchronization
- [ ] E2: Presence and reconnect behavior

## Tickets

### E1: Realtime room synchronization

- [ ] Ticket status

Goal:
- Keep room, queue, and active-song state in sync for all participants.

Acceptance criteria:
- [ ] Participant joins update across active sessions
- [ ] Queue changes appear across sessions without refresh
- [ ] Active-song state changes propagate to all connected clients

Unit coverage:
- [ ] Test event reducers, reconciliation logic, or subscription handlers

E2E coverage:
- [ ] Verify two browser sessions stay in sync while joining and updating the queue

### E2: Presence and reconnect behavior

- [ ] Ticket status

Goal:
- Make the live room more resilient during refreshes and reconnections.

Acceptance criteria:
- [ ] Connected users are visibly marked as present
- [ ] A refreshed client can rejoin the active room session
- [ ] The active player state is restored after reconnect

Unit coverage:
- [ ] Test session restoration and presence-mapping logic

E2E coverage:
- [ ] Verify a user can refresh during an active room and recover into the same state

## Parallel Notes

- [ ] After D1 and D2, E1 can run in parallel with D3
- [ ] Near the end, E2 can run in parallel with F1 and F2

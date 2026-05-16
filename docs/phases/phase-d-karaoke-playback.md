# Phase D - Karaoke Playback

## Goal

Deliver the player experience for singing with synced lyrics.

## Phase Checklist

- [ ] D1: Karaoke player shell
- [ ] D2: Synced lyric engine
- [ ] D3: Host playback controls

## Tickets

### D1: Karaoke player shell

- [ ] Ticket status

Goal:
- Build the full-screen player view and load the active song.

Acceptance criteria:
- [ ] The player displays song title, artist, and active singer
- [ ] The player opens from the queue or room state
- [ ] The layout works on desktop and mobile widths

Unit coverage:
- [ ] Test player state selectors or formatting helpers

E2E coverage:
- [ ] Verify a queued song can be opened in the player

### D2: Synced lyric engine

- [ ] Ticket status

Goal:
- Highlight the active lyric line based on song timing.

Acceptance criteria:
- [ ] The player renders lyric lines in time order
- [ ] The current line updates according to playback time
- [ ] Completed, active, and upcoming lyric states are visually distinct

Unit coverage:
- [ ] Test lyric time parsing and current-line selection logic

E2E coverage:
- [ ] Verify lyric highlighting advances during playback for a demo song

### D3: Host playback controls

- [ ] Ticket status

Goal:
- Let the host control the performance flow.

Acceptance criteria:
- [ ] The host can play, pause, restart, and skip to the next song
- [ ] Guests can see the current playback state
- [ ] Skipping advances the queue correctly

Unit coverage:
- [ ] Test playback state transitions and next-song behavior

E2E coverage:
- [ ] Verify the host can start a song, pause it, and move to the next item

## Parallel Notes

- [ ] After C1, D2 can run in parallel with C2
- [ ] After C3, D1 can run in parallel with C4
- [ ] After D1 and D2, D3 can run in parallel with E1

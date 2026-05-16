# Phase F - Polish and Launch Readiness

## Goal

Harden the MVP for demos, testing, and early feedback.

## Phase Checklist

- [ ] F1: Error, loading, and empty states
- [ ] F2: Accessibility and responsive pass
- [ ] F3: MVP smoke test suite and preview deployment

## Tickets

### F1: Error, loading, and empty states

- [ ] Ticket status

Goal:
- Make the core flows understandable and safe.

Acceptance criteria:
- [ ] Invalid room codes show helpful feedback
- [ ] Loading and empty states exist for room, queue, and catalog screens
- [ ] Missing song or lyric data degrades gracefully

Unit coverage:
- [ ] Test validation and error-state helper logic

E2E coverage:
- [ ] Verify invalid join attempts and missing-data states show user-friendly messages

### F2: Accessibility and responsive pass

- [ ] Ticket status

Goal:
- Improve readability and device support before demoing.

Acceptance criteria:
- [ ] The app is usable on common mobile and desktop widths
- [ ] Keyboard focus states are visible
- [ ] Lyric contrast and text sizing support readable playback

Unit coverage:
- [ ] Add targeted component tests for accessible labels or keyboard interactions where practical

E2E coverage:
- [ ] Verify the main flows work at one mobile viewport and one desktop viewport

### F3: MVP smoke test suite and preview deployment

- [ ] Ticket status

Goal:
- Prepare the app for repeated demos and early feedback.

Acceptance criteria:
- [ ] A smoke test suite covers create room, join room, add song, start song, and next song
- [ ] A preview deployment path exists
- [ ] The team has a short QA checklist for demo day

Unit coverage:
- [ ] Fill any remaining gaps in core room, queue, and lyric utilities

E2E coverage:
- [ ] Add one end-to-end happy-path scenario covering the full MVP loop

## Parallel Notes

- [ ] Near the end, F1 and F2 can run in parallel with E2
- [ ] F3 should be treated as shared hardening work across the team

# MVP Data Model

## Entities

### `rooms`

- One room is the top-level collaboration space
- A room has many participants
- A room has many queue items
- A room tracks its active queue item and lifecycle state

### `participants`

- A participant belongs to one room
- A participant can add many queue items
- A participant may be the current host for a room

### `songs`

- A song stores the playable catalog metadata
- A song has many lyric lines
- A song can appear in many queue items across rooms

### `lyric_lines`

- Each lyric line belongs to one song
- Lines are stored with start and end timing in milliseconds
- Ordering is derived from `line_index`

### `queue_items`

- A queue item belongs to one room
- A queue item references one song
- A queue item references the participant who queued it
- A queue item stores status and position in the room queue

## Relationship Summary

- `rooms.id -> participants.room_id`
- `rooms.id -> queue_items.room_id`
- `rooms.active_queue_item_id -> queue_items.id`
- `participants.id -> queue_items.queued_by_participant_id`
- `songs.id -> lyric_lines.song_id`
- `songs.id -> queue_items.song_id`

## Demo Seed Shape

The seed file includes:

- One demo room
- Two demo participants
- Two demo songs
- Timed lyric lines for each song
- Two starter queue items

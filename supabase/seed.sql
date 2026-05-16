insert into public.rooms (id, code, name, status)
values ('11111111-1111-1111-1111-111111111111', 'DEMO42', 'Friday Night Karaoke', 'lobby')
on conflict (id) do nothing;

insert into public.participants (id, room_id, display_name, is_host)
values
  ('22222222-2222-2222-2222-222222222221', '11111111-1111-1111-1111-111111111111', 'Alex', true),
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Sam', false)
on conflict (id) do nothing;

update public.rooms
set host_participant_id = '22222222-2222-2222-2222-222222222221'
where id = '11111111-1111-1111-1111-111111111111';

insert into public.songs (id, slug, title, artist, duration_ms, audio_url)
values
  (
    '33333333-3333-3333-3333-333333333331',
    'midnight-city-demo',
    'Midnight City Demo',
    'The Neon Hearts',
    94000,
    'https://example.com/audio/midnight-city-demo.mp3'
  ),
  (
    '33333333-3333-3333-3333-333333333332',
    'spotlight-demo',
    'Spotlight Demo',
    'Cassette Kids',
    87000,
    'https://example.com/audio/spotlight-demo.mp3'
  )
on conflict (id) do nothing;

insert into public.lyric_lines (song_id, line_index, start_ms, end_ms, text)
values
  ('33333333-3333-3333-3333-333333333331', 0, 0, 2300, 'Streetlights wake the room tonight'),
  ('33333333-3333-3333-3333-333333333331', 1, 2500, 5200, 'Every voice is rising with the beat'),
  ('33333333-3333-3333-3333-333333333331', 2, 5400, 8100, 'Hands up when the chorus hits the ceiling'),
  ('33333333-3333-3333-3333-333333333332', 0, 0, 2100, 'Step into the glow and find your note'),
  ('33333333-3333-3333-3333-333333333332', 1, 2400, 4700, 'Hold the line and let the whole room sing'),
  ('33333333-3333-3333-3333-333333333332', 2, 5000, 7600, 'Spotlight hearts are louder than the speakers')
on conflict (song_id, line_index) do nothing;

insert into public.queue_items (id, room_id, song_id, queued_by_participant_id, position, status)
values
  (
    '44444444-4444-4444-4444-444444444441',
    '11111111-1111-1111-1111-111111111111',
    '33333333-3333-3333-3333-333333333331',
    '22222222-2222-2222-2222-222222222221',
    1,
    'queued'
  ),
  (
    '44444444-4444-4444-4444-444444444442',
    '11111111-1111-1111-1111-111111111111',
    '33333333-3333-3333-3333-333333333332',
    '22222222-2222-2222-2222-222222222222',
    2,
    'queued'
  )
on conflict (id) do nothing;

update public.rooms
set active_queue_item_id = '44444444-4444-4444-4444-444444444441'
where id = '11111111-1111-1111-1111-111111111111';
